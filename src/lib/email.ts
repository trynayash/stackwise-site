import { siteConfig } from "@/config/site";
import { bookCallUrl } from "@/lib/booking";

/**
 * The two emails an enquiry produces: the studio's copy with everything the visitor sent, and the visitor's
 * confirmation with what happens next. Both are plain and readable in any client: one column, system fonts,
 * the site's paper background and black buttons, no images to block.
 */

export type Enquiry = {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    timeline: string;
    budget: string;
    details: string;
};

export type EmailMessage = { subject: string; html: string; text: string };

/** Visitor text goes into HTML, so it must never be read as markup. */
export function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const site = siteConfig.url.replace(/^https?:\/\//, "");
const font = `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

const whenIst = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

/** One row of label and value in the details table. */
function row(label: string, value: string) {
    return `<tr>
  <td style="padding:10px 0;border-top:1px solid #e6e5df;font-size:13px;color:#6b6b66;vertical-align:top;width:120px;">${label}</td>
  <td style="padding:10px 0;border-top:1px solid #e6e5df;font-size:15px;color:#0b0b0b;vertical-align:top;">${value}</td>
</tr>`;
}

function button(href: string, label: string, kind: "dark" | "light" = "dark") {
    const style =
        kind === "dark"
            ? "background:#0b0b0b;color:#ffffff;"
            : "background:#ffffff;color:#0b0b0b;border:1px solid #d9d8d2;";
    return `<a href="${href}" style="display:inline-block;${style}text-decoration:none;font-weight:600;font-size:15px;line-height:48px;padding:0 24px;border-radius:999px;margin:0 8px 8px 0;">${label}</a>`;
}

/** Page frame shared by both emails. */
function layout({ title, intro, body, footer }: { title: string; intro: string; body: string; footer: string }) {
    return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f2f1ec;font-family:${font};-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="padding:0 8px 18px;font-size:18px;font-weight:800;letter-spacing:-0.5px;color:#0b0b0b;">STACKWISE</div>
    <div style="background:#ffffff;border-radius:20px;border-top:6px solid #c8ff00;padding:32px 28px;">
      <h1 style="margin:0;font-size:26px;line-height:1.15;letter-spacing:-0.5px;color:#0b0b0b;">${title}</h1>
      <p style="margin:14px 0 0;font-size:16px;line-height:1.6;color:#3d3d39;">${intro}</p>
      ${body}
    </div>
    <p style="margin:20px 8px 0;font-size:13px;line-height:1.6;color:#6b6b66;">${footer}</p>
  </div>
</body>
</html>`;
}

/** The studio's copy: everything the visitor sent, with the quickest ways to reply. */
export function enquiryNotification(e: Enquiry): EmailMessage {
    const h = {
        name: escapeHtml(e.name),
        email: escapeHtml(e.email),
        phone: e.phone ? escapeHtml(e.phone) : "",
        projectType: escapeHtml(e.projectType),
        timeline: escapeHtml(e.timeline),
        budget: escapeHtml(e.budget),
        details: escapeHtml(e.details),
    };
    const digits = e.phone?.replace(/[^0-9]/g, "") ?? "";
    const html = layout({
        title: `New enquiry from ${h.name}`,
        intro: `${h.projectType}. Reply within 24–48 hours to keep the promise on the site.`,
        body: `
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:22px;border-collapse:collapse;">
        ${row("Email", `<a href="mailto:${h.email}" style="color:#0b0b0b;">${h.email}</a>`)}
        ${h.phone ? row("Phone", h.phone) : ""}
        ${row("Timeline", h.timeline)}
        ${row("Budget", h.budget)}
      </table>
      <p style="margin:22px 0 6px;font-size:13px;color:#6b6b66;">What they wrote</p>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.65;color:#0b0b0b;background:#f7f6f2;border-radius:12px;padding:16px 18px;">${h.details}</div>
      <div style="margin-top:26px;">
        ${button(`mailto:${h.email}`, `Reply to ${escapeHtml(firstName(e.name))}`)}
        ${digits ? button(`https://wa.me/${digits}`, "WhatsApp", "light") : ""}
      </div>`,
        footer: `Sent from the quote chat on ${site} at ${whenIst()}.`,
    });
    const text = [
        `New enquiry from ${e.name}`,
        `Email: ${e.email}`,
        e.phone ? `Phone: ${e.phone}` : null,
        `Project: ${e.projectType}`,
        `Timeline: ${e.timeline}`,
        `Budget: ${e.budget}`,
        "",
        e.details,
        "",
        `Sent from the quote chat on ${site} at ${whenIst()}.`,
    ]
        .filter((line) => line !== null)
        .join("\n");
    return { subject: `[INQUIRY] ${e.name.toUpperCase()} — ${e.projectType}`.replace(/[\r\n]+/g, " ").slice(0, 160), html, text };
}

/** The visitor's confirmation: what they sent, what happens next, and the two fastest ways to continue. */
export function enquiryConfirmation(e: Enquiry): EmailMessage {
    const first = firstName(e.name);
    const h = { first: escapeHtml(first), projectType: escapeHtml(e.projectType), timeline: escapeHtml(e.timeline), budget: escapeHtml(e.budget), details: escapeHtml(e.details) };
    const book = bookCallUrl("email");
    const steps = [
        "Yash reads your message himself; there is no sales team in between.",
        "You get a reply within 24–48 hours on working days, with questions, a rough scope and a starting price.",
        "A free call if it helps, then a written quote. Nothing is binding until you sign.",
    ];
    const html = layout({
        title: `Thanks, ${h.first}. Yash will reply within 24–48 hours.`,
        intro: "Your message reached the StackWise inbox. Here is what happens next, and a copy of what you sent.",
        body: `
      <ol style="margin:22px 0 0;padding-left:22px;font-size:15px;line-height:1.65;color:#0b0b0b;">
        ${steps.map((s) => `<li style="margin-bottom:8px;">${s}</li>`).join("")}
      </ol>
      <p style="margin:26px 0 6px;font-size:13px;color:#6b6b66;">What you sent</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Project", h.projectType)}
        ${row("Timeline", h.timeline)}
        ${row("Budget", h.budget)}
      </table>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.65;color:#0b0b0b;background:#f7f6f2;border-radius:12px;padding:16px 18px;margin-top:12px;">${h.details}</div>
      <div style="margin-top:26px;">
        ${book ? button(book, "Book a call") : ""}
        ${button(`mailto:${siteConfig.emails.inbound}`, "Reply to Yash", book ? "light" : "dark")}
      </div>`,
        footer: `StackWise, a software studio in ${siteConfig.location.city}. <a href="${siteConfig.url}" style="color:#6b6b66;">${site}</a><br>You are receiving this because you sent an enquiry on our website. Replying to this email reaches Yash directly.`,
    });
    const text = [
        `Thanks, ${first}. Yash will reply within 24–48 hours.`,
        "",
        "What happens next:",
        ...steps.map((s, i) => `${i + 1}. ${s}`),
        "",
        "What you sent:",
        `Project: ${e.projectType}`,
        `Timeline: ${e.timeline}`,
        `Budget: ${e.budget}`,
        "",
        e.details,
        "",
        book ? `Book a call: ${book}` : null,
        `Reply to Yash: ${siteConfig.emails.inbound}`,
        "",
        `StackWise, ${siteConfig.location.city}. ${siteConfig.url}`,
        "You are receiving this because you sent an enquiry on our website.",
    ]
        .filter((line) => line !== null)
        .join("\n");
    return { subject: `Got it, ${first}: Yash will reply within 24–48 hours`, html, text };
}
