import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { redactSensitive } from "@/lib/assistant";
import { enquiryConfirmation, enquiryNotification, type EmailMessage } from "@/lib/email";

const MAX_BODY_BYTES = 20_000;
const RESEND_API = "https://api.resend.com/emails";

/** JSON reply that no browser or CDN may cache. */
function reply(body: Record<string, unknown>, status: number) {
    return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** The visitor's address: Vercel's own header first, since x-forwarded-for can be appended to by anyone upstream. */
function clientIp(request: Request): string {
    return (
        request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip")?.trim() ||
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        "unknown"
    );
}

/** Only this site (production, Vercel previews and local dev) may post enquiries; stops other sites and scripts using it as a mail relay. */
function isAllowedOrigin(origin: string | null): boolean {
    if (!origin) return false;
    try {
        const host = new URL(origin).host;
        return (
            host === new URL(siteConfig.url).host ||
            host === process.env.VERCEL_URL ||
            /^stackwise-site(-[a-z0-9-]+)?\.vercel\.app$/.test(host) ||
            /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)
        );
    } catch {
        return false;
    }
}

// Zod Schema to validate contact form submissions
const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Please enter a valid email address").max(200),
    phone: z.string().max(30).optional(),
    projectType: z.string().min(1, "Project type is required").max(120),
    timeline: z.string().min(1, "Timeline is required").max(80),
    budget: z.string().min(1, "Budget qualification is required").max(80),
    details: z.string().min(10, "Tell us more details (at least 10 characters)").max(5000),
    botField: z.string().optional(),
});

// In-memory rate limiter. Each serverless instance keeps its own map, so this is a brake on bursts rather
// than a hard guarantee; the origin check and honeypot carry the rest.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5; // 5 inquiries per hour
const WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_TRACKED = 5_000;

/** Drops expired entries so the map can't grow without bound on a long-lived instance. */
function pruneRateMap(now: number) {
    for (const [key, entry] of rateLimitMap) if (now - entry.lastReset > WINDOW) rateLimitMap.delete(key);
    if (rateLimitMap.size > MAX_TRACKED) rateLimitMap.clear();
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    pruneRateMap(now);
    const clientLimit = rateLimitMap.get(ip);
    
    if (!clientLimit) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return false;
    }
    
    if (now - clientLimit.lastReset > WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return false;
    }
    
    if (clientLimit.count >= LIMIT) {
        return true;
    }
    
    clientLimit.count += 1;
    return false;
}

export async function POST(request: Request) {
    try {
        // Browsers label cross-site requests themselves; anything so labelled is not this site's chat.
        const fetchSite = request.headers.get("sec-fetch-site");
        if (!isAllowedOrigin(request.headers.get("origin")) || fetchSite === "cross-site") {
            return reply({ error: "Forbidden" }, 403);
        }
        if (!request.headers.get("content-type")?.includes("application/json")) {
            return reply({ error: "Unsupported content type" }, 415);
        }
        const text = await request.text();
        if (text.length > MAX_BODY_BYTES) {
            return reply({ error: "Message too long" }, 413);
        }
        // Counted only for requests from this site, so junk from elsewhere can't use up a visitor's allowance.
        if (isRateLimited(clientIp(request))) {
            return reply({ error: `Too many inquiries sent. Please wait an hour or email ${siteConfig.emails.inbound} directly.` }, 429);
        }
        let body: Record<string, unknown>;
        try {
            body = JSON.parse(text);
        } catch {
            return reply({ error: "Invalid request" }, 400);
        }
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return reply({ error: "Invalid request" }, 400);
        }

        // 1. Honeypot Check (Silently drop bot spam)
        if (body.botField) {
            console.warn("[contact] Honeypot triggered; dropped silently.");
            return reply({ success: true, message: "Message sent successfully" }, 200);
        }

        // 2. Schema Validation using Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Invalid form data";
            return reply({ error: firstError }, 400);
        }

        // The chat already strips card, ID and password details; repeat it here for requests that skip the chat.
        const scrub = (v: string) => redactSensitive(v).text;
        const raw = { ...result.data, name: scrub(result.data.name), projectType: scrub(result.data.projectType), details: scrub(result.data.details) };

        // 3. Delivery is through Resend; without a key the chat offers the email hand-off instead.
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("[contact] RESEND_API_KEY is not set.");
            return reply({ error: `Inquiry system currently offline. Please email ${siteConfig.emails.inbound} directly.`, code: "email_not_configured" }, 503);
        }
        // The sender must be on a domain verified in Resend. Only the studio sees it: visitors get no copy.
        const from = process.env.MAIL_FROM || "StackWise <onboarding@resend.dev>";

        const enquiry = { name: raw.name, email: raw.email, phone: raw.phone, projectType: raw.projectType, timeline: raw.timeline, budget: raw.budget, details: raw.details };
        const send = (to: string, replyTo: string, message: EmailMessage) =>
            fetch(RESEND_API, {
                method: "POST",
                headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: message.subject, html: message.html, text: message.text }),
                // A short timeout: if Resend is slow the visitor gets the email hand-off instead of a hung request.
                signal: AbortSignal.timeout(10_000),
            });

        // The studio's copy is the one that counts; the visitor's confirmation is sent alongside, best effort.
        const [toStudio, toVisitor] = await Promise.allSettled([
            send(siteConfig.emails.inbound, raw.email, enquiryNotification(enquiry)),
            send(raw.email, siteConfig.emails.inbound, enquiryConfirmation(enquiry)),
        ]);
        if (toStudio.status !== "fulfilled" || !toStudio.value.ok) {
            // Resend's own message can name the account or domain; log the status only.
            console.error("[contact] Resend rejected the enquiry:", toStudio.status === "fulfilled" ? toStudio.value.status : "no response");
            return reply({ error: "Failed to send message. Please try again." }, 502);
        }
        if (toVisitor.status !== "fulfilled" || !toVisitor.value.ok) console.warn("[contact] Confirmation to the visitor was not sent.");

        // No personal details in logs.
        console.log("[contact] Enquiry sent.");

        return reply({ success: true, message: "Message sent successfully" }, 200);
    } catch (error) {
        console.error("[contact] Failed to send:", error instanceof Error ? error.message : "unknown error");
        return reply({ error: "Failed to send message. Please try again." }, 500);
    }
}
