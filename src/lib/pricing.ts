import type { Faq } from "@/lib/faqs";

/**
 * Rupees per US dollar used for the "about US$" figures next to prices. They are reference conversions for
 * visitors abroad, not separate USD prices; update this when the rate moves a lot.
 */
export const INR_PER_USD = 93;

/** "₹1,49,999" or 149999 → "about US$1,600" (rounded to the nearest 50). Undefined when there's no rupee amount. */
export function approxUsd(value: string | number): string | undefined {
    const inr = typeof value === "number" ? value : Number(value.match(/₹\s*([\d,]+)/)?.[1]?.replace(/,/g, ""));
    if (!inr) return undefined;
    const usd = Math.round(inr / INR_PER_USD / 50) * 50;
    return `about US$${usd.toLocaleString("en-US")}`;
}

/** What each plan includes, side by side. "yes" renders a tick, "no" a dash; anything else is shown as text. */
export const planComparison: { feature: string; values: [string, string, string] }[] = [
    { feature: "Best for", values: ["Business websites and landing pages", "SaaS products, web apps and dashboards", "AI systems and larger platforms"] },
    { feature: "Typical timeline", values: ["2–3 weeks", "4–12 weeks", "Planned after discovery"] },
    { feature: "Custom design in Figma first", values: ["yes", "yes", "yes"] },
    { feature: "Fast, responsive on every device", values: ["yes", "yes", "yes"] },
    { feature: "SEO and speed tuning", values: ["yes", "yes", "yes"] },
    { feature: "Sign-up, login and user dashboards", values: ["no", "yes", "yes"] },
    { feature: "Stripe or Razorpay payments and subscriptions", values: ["no", "yes", "yes"] },
    { feature: "AI workflows and LLM integrations", values: ["no", "Add-on, quoted", "yes"] },
    { feature: "Cloud setup and DevOps on AWS", values: ["no", "Staging and production", "yes"] },
    { feature: "Security", values: ["Secure defaults", "Secure defaults and role-based access", "Full review and hardening"] },
    { feature: "Support after launch", values: ["1 month", "3 months", "Long-term options"] },
    { feature: "Written quote before work starts", values: ["yes", "yes", "yes"] },
    { feature: "100% code and IP ownership", values: ["yes", "yes", "yes"] },
    { feature: "NDA on request", values: ["yes", "yes", "yes"] },
];

/** Why the prices sit below typical agency quotes, stated plainly. */
export const priceReasons = [
    { title: "No sales layer", text: "You talk to the engineer who scopes and builds your project. There are no account managers or hand-offs to pay for." },
    { title: "A small studio on purpose", text: "Low overheads and no bench of idle staff, so the quote covers the work on your project and little else." },
    { title: "A proven stack", text: "Next.js, TypeScript, Node.js and PostgreSQL, the same stack behind our own live products, so nothing is learned on your budget." },
    { title: "Fixed, written quotes", text: "No hourly billing. You agree a price for a defined scope before any work starts, so there are no surprise invoices." },
];

/** What moves a quote up or down. */
export const priceFactors = [
    { title: "Scope", text: "The number of screens, user roles and workflows. A focused first version costs far less than everything at once." },
    { title: "Integrations", text: "Payments, CRMs, ERPs, maps, messaging or AI providers each add setup, testing and error handling." },
    { title: "Design depth", text: "A clean design from a brand guide is quicker than a full design system with custom illustrations and motion." },
    { title: "Data and compliance", text: "Sensitive data (health, finance, children) needs stricter access control, audit logs and review." },
    { title: "Timeline", text: "A hard deadline can mean reordering scope. We'll tell you what fits rather than promise everything." },
    { title: "Content", text: "Copywriting, product photos and moving content from an old site are added to the quote only if you need them." },
];

export const pricingFaqs: Faq[] = [
    {
        q: "How much does StackWise charge?",
        a: "Business websites start at ₹49,999 (about US$550), SaaS products and web apps at ₹1,49,999 (about US$1,600), and AI systems and larger platforms are quoted after a discovery call. Every project gets a written quote for its exact scope before work starts.",
    },
    {
        q: "Are your prices fixed or hourly?",
        a: "Fixed. You get a written quote for an agreed scope before any work starts, with no hourly billing. Small additions under 10% of the scope are absorbed; bigger changes get a separate quote and timeline within 24 hours, before anything is built.",
    },
    {
        q: "Why are your prices lower than most agencies?",
        a: "You work directly with the engineer, with no sales team or account managers in between, and we build on a stack we already run in our own products. That keeps overheads low without cutting corners on code quality, testing or security.",
    },
    {
        q: "What isn't included in the price?",
        a: "Hosting, domains and third-party services (email, maps, AI providers, payment gateway fees) run on your own accounts, so you pay those providers directly and keep full control. Copywriting, photography and content migration are added to the quote only if you need them.",
    },
    {
        q: "Do you work with clients outside India?",
        a: "Yes. Prices are listed in rupees, and the US$ figures are approximate conversions for reference. Clients abroad work with us remotely, with calls scheduled inside the time-zone overlap and the same written quote, NDA and full code ownership.",
    },
    {
        q: "What happens after the included support ends?",
        a: "Support is included for 1 to 3 months depending on the plan. After that you can move to a monthly maintenance retainer quoted to fit your product, or take over yourself: you get the full code, documentation and access to every account.",
    },
];
