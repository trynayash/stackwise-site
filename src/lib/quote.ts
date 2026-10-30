import { siteConfig } from "@/config/site";

/**
 * Everything the quote chat asks, and how answers map to prices and email text.
 * Prices and timelines come from the service pages, so the chat never quotes something the site doesn't.
 */

export type QuoteService = {
    label: string;
    /** Service page the price and timeline come from. */
    slug?: string;
};

export const quoteServices: QuoteService[] = [
    { label: "SaaS product", slug: "saas-development" },
    { label: "Website", slug: "web-development" },
    { label: "AI feature or agent", slug: "ai-development" },
    { label: "Custom software", slug: "custom-software" },
    { label: "MVP for a startup", slug: "mvp-development" },
    { label: "Mobile app", slug: "mobile-app-development" },
    { label: "Something else" },
];

export const quoteStages = ["Just an idea", "I have designs", "It's live, needs work", "Rebuilding something old"];

export const quoteTimelines = ["As soon as possible", "In 1–3 months", "In 3+ months", "Flexible"];

export const quoteBudgets = [
    { label: "Under ₹50k", max: 50000 },
    { label: "₹50k – ₹1.5L", max: 150000 },
    { label: "₹1.5L – ₹3L", max: 300000 },
    { label: "₹3L – ₹10L", max: 1000000 },
    { label: "₹10L+", max: Infinity },
    { label: "Not sure yet", max: Infinity },
];

/** Service pages whose quote buttons pre-select a chat answer. Other pages pass their name as the topic. */
const serviceBySlug: Record<string, string> = {
    "saas-development": "SaaS product",
    "web-development": "Website",
    "ai-development": "AI feature or agent",
    "custom-software": "Custom software",
    "business-automation": "Custom software",
    "mvp-development": "MVP for a startup",
    startups: "MVP for a startup",
    "mobile-app-development": "Mobile app",
    nextjs: "Website",
};

export type QuotePreset = {
    service?: string;
    /** Pricing plan the visitor clicked, e.g. "Product Build". */
    plan?: string;
    /** Page the visitor came from when it doesn't map to a service, e.g. "UI/UX Design". */
    topic?: string;
};

export function presetForPage(slug: string, navLabel: string): QuotePreset {
    const service = serviceBySlug[slug];
    return service ? { service } : { topic: navLabel };
}

export type QuoteAnswers = {
    service?: string;
    stage?: string;
    timeline?: string;
    budget?: string;
    details?: string;
    name?: string;
    email?: string;
    phone?: string;
    /** Anything the visitor typed that didn't fit a question, e.g. "a marketplace for tutors". */
    notes?: string;
};

/** Plain-text summary used in the email fallback and the API's details field. */
export function summarise(a: QuoteAnswers, preset?: QuotePreset): string {
    return [
        preset?.plan && `Plan: ${preset.plan}`,
        preset?.topic && `Asked from: ${preset.topic}`,
        `What: ${a.service ?? "Not given"}`,
        `Stage: ${a.stage ?? "Not given"}`,
        `Launch: ${a.timeline ?? "Not given"}`,
        `Budget: ${a.budget ?? "Not given"}`,
        "",
        "About the project:",
        a.details?.trim() || "No description yet.",
        ...(a.notes ? ["", `Notes: ${a.notes}`] : []),
    ]
        .filter((line): line is string => typeof line === "string")
        .join("\n");
}

export function quoteMailto(a: QuoteAnswers, preset?: QuotePreset): string {
    const subject = `Project quote: ${a.service ?? preset?.topic ?? "new project"}`;
    const body = [
        "Hi Yash,",
        "",
        "I'd like a quote for a project.",
        "",
        summarise(a, preset),
        "",
        a.name && `Name: ${a.name}`,
        a.phone && `Phone / WhatsApp: ${a.phone}`,
    ]
        .filter((line): line is string => typeof line === "string")
        .join("\n");
    return `mailto:${siteConfig.emails.inbound}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
