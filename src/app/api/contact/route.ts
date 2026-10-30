import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { redactSensitive } from "@/lib/assistant";

const MAX_BODY_BYTES = 20_000;

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

/** Visitor text is inserted into the notification email, so it must never be read as HTML. */
function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
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
        const [name, email, projectType, timeline, budget, details] = [raw.name, raw.email, raw.projectType, raw.timeline, raw.budget, raw.details].map(escapeHtml);
        const phone = raw.phone ? escapeHtml(raw.phone) : undefined;

        // 3. SMTP Production Credentials Check
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error("❌ STACKWISE SMTP SERVICE: Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.");
            return reply({ error: `Inquiry system currently offline. Please email ${siteConfig.emails.inbound} directly.`, code: "email_not_configured" }, 503);
        }

        // Build premium styled email HTML
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEW INQUIRY // STACKWISE</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #000000; padding: 40px 20px; box-sizing: border-box; }
        .container { max-width: 650px; margin: 0 auto; background-color: #000000; border: 1px solid #333333; }
        .header { padding: 30px 40px; border-bottom: 4px solid #C8FF00; background: #0a0a0a; text-align: left; }
        .logo { font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #ffffff; margin: 0 0 4px 0; text-transform: uppercase; }
        .logo span { color: #C8FF00; }
        .tagline { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 11px; color: #C8FF00; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
        .content { padding: 40px; }
        .row { margin-bottom: 30px; border-left: 2px solid #222222; padding-left: 16px; transition: border-left-color 0.2s ease; }
        .row:hover { border-left-color: #C8FF00; }
        .row:last-child { margin-bottom: 0; }
        .label { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 11px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
        .value { font-size: 16px; color: #ffffff; line-height: 1.6; font-weight: 400; }
        .value a { color: #C8FF00; text-decoration: none; border-bottom: 1px solid rgba(200,255,0,0.3); padding-bottom: 1px; }
        .value a:hover { border-bottom-color: #C8FF00; }
        .actions { padding: 0 40px 40px; }
        .btn { display: inline-block; padding: 16px 32px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; margin-right: 12px; margin-bottom: 12px; transition: all 0.2s; }
        .btn-primary { background-color: #C8FF00; color: #000000; border: 1px solid #C8FF00; }
        .btn-primary:hover { background-color: #a3d100; border-color: #a3d100; }
        .btn-secondary { background-color: transparent; color: #ffffff; border: 1px solid #444444; }
        .btn-secondary:hover { border-color: #ffffff; }
        .footer { padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #222222; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1px; }
        
        @media only screen and (max-width: 600px) {
            .wrapper { padding: 20px 0; }
            .container { border-left: none; border-right: none; }
            .header, .content, .actions, .footer { padding-left: 20px; padding-right: 20px; }
            .btn { display: block; margin: 0 0 12px 0; width: 100%; box-sizing: border-box; text-align: center; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1 class="logo">STACK<span>WISE</span></h1>
                <p class="tagline">INBOUND INQUIRY</p>
            </div>
            
            <div class="content">
                <div class="row">
                    <div class="label">CLIENT_NAME</div>
                    <div class="value">${name}</div>
                </div>
                
                <div class="row">
                    <div class="label">EMAIL_ADDRESS</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${phone ? `
                <div class="row">
                    <div class="label">PHONE_NUMBER</div>
                    <div class="value">${phone}</div>
                </div>
                ` : ''}

                <div class="row">
                    <div class="label">PROJECT_TYPE</div>
                    <div class="value">${projectType}</div>
                </div>

                <div class="row">
                    <div class="label">TIMELINE_EXPECTATION</div>
                    <div class="value">${timeline}</div>
                </div>
                
                <div class="row">
                    <div class="label">BUDGET_QUALIFICATION</div>
                    <div class="value">${budget}</div>
                </div>
                
                <div class="row">
                    <div class="label">PROJECT_SPECIFICATIONS</div>
                    <div class="value" style="white-space: pre-wrap;">${details}</div>
                </div>
            </div>
            
            <div class="actions">
                <a href="mailto:${email}" class="btn btn-primary">REPLY DIRECTLY</a>
                ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="btn btn-secondary">INITIATE WHATSAPP</a>` : ''}
            </div>

            <div class="footer">
                TRANSMISSION TIMESTAMP // ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'long' }).toUpperCase()}<br>
                SECURE LEAD SYSTEM
            </div>
        </div>
    </div>
</body>
</html>`;

        // Short timeouts: if Gmail is slow the visitor gets the email hand-off instead of a hung request.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            connectionTimeout: 8_000,
            greetingTimeout: 8_000,
            socketTimeout: 12_000,
        });

        // Send the email
        await transporter.sendMail({
            from: `"StackWise Leads" <${process.env.GMAIL_USER}>`,
            to: "yashrsuthar90@gmail.com",
            replyTo: raw.email,
            // Subject lines are plain text: use the raw values with line breaks removed.
            subject: `[INQUIRY] ${raw.name.toUpperCase()} — ${raw.projectType}`.replace(/[\r\n]+/g, " ").slice(0, 160),
            html: emailHtml,
        });

        // No personal details in logs.
        console.log("[contact] Enquiry sent.");

        return reply({ success: true, message: "Message sent successfully" }, 200);
    } catch (error) {
        console.error("[contact] Failed to send:", error instanceof Error ? error.message : "unknown error");
        return reply({ error: "Failed to send message. Please try again." }, 500);
    }
}
