import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { redactSensitive } from "@/lib/assistant";

const MAX_BODY_BYTES = 20_000;

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

// Simple in-memory rate limiter map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5; // 5 inquiries per hour
const WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
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
        // Read client IP for rate limiting
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
                   request.headers.get("x-real-ip") || 
                   "127.0.0.1";

        if (!isAllowedOrigin(request.headers.get("origin"))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        if (!request.headers.get("content-type")?.includes("application/json")) {
            return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
        }
        const text = await request.text();
        if (text.length > MAX_BODY_BYTES) {
            return NextResponse.json({ error: "Message too long" }, { status: 413 });
        }
        // Counted only for requests from this site, so junk from elsewhere can't use up a visitor's allowance.
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: `Too many inquiries sent. Please wait an hour or email ${siteConfig.emails.inbound} directly.` },
                { status: 429 }
            );
        }
        let body: Record<string, unknown>;
        try {
            body = JSON.parse(text);
        } catch {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // 1. Honeypot Check (Silently drop bot spam)
        if (body.botField) {
            console.warn("[contact] Honeypot triggered; dropped silently.");
            return NextResponse.json(
                { success: true, message: "Message sent successfully" },
                { status: 200 }
            );
        }

        // 2. Schema Validation using Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Invalid form data";
            return NextResponse.json(
                { error: firstError },
                { status: 400 }
            );
        }

        // The chat already strips card, ID and password details; repeat it here for requests that skip the chat.
        const scrub = (v: string) => redactSensitive(v).text;
        const raw = { ...result.data, name: scrub(result.data.name), projectType: scrub(result.data.projectType), details: scrub(result.data.details) };
        const [name, email, projectType, timeline, budget, details] = [raw.name, raw.email, raw.projectType, raw.timeline, raw.budget, raw.details].map(escapeHtml);
        const phone = raw.phone ? escapeHtml(raw.phone) : undefined;

        // 3. SMTP Production Credentials Check
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error("❌ STACKWISE SMTP SERVICE: Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.");
            return NextResponse.json(
                { error: `Inquiry system currently offline. Please email ${siteConfig.emails.inbound} directly.` },
                { status: 503 }
            );
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

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
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

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("[contact] Failed to send:", error instanceof Error ? error.message : "unknown error");
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}
