import type { IconSvgElement } from "@/components/ui/icon";
import type { Faq } from "@/lib/faqs";
import { approxUsd } from "@/lib/pricing";

export type MarketingPageData = {
    slug: string;
    path: string;
    kind: "Services" | "Solutions" | "Technologies" | "Industries" | "Locations";
    serviceType: string;
    seo: { title: string; description: string };
    badge: string;
    navLabel: string;
    /** One line for menus and cards. */
    summary: string;
    titleTop: string;
    titleAccent: string;
    intro: string;
    icon: IconSvgElement;
    facts: { label: string; value: string }[];
    features: { icon: IconSvgElement; title: string; description: string }[];
    idealFor: string[];
    deliverables: string[];
    stack: string[];
    /** Case study slugs from src/lib/case-studies.ts that show this kind of work. */
    work: string[];
    faqs: Faq[];
    cta: { title: string; text: string };
    related: string[];
    /** Search queries the page is written to answer. Not rendered; feeds the keyword map and llms.txt. */
    keywords?: string[];
    /** Countries or regions the page is about, for structured data (location pages). */
    areaServed?: string[];
};

export const ownershipFaq: Faq = {
    q: "Do I own the code?",
    a: "Yes, 100%. At handover you get the full repository, design files, documentation and access to every account and service the product runs on. There are no licensing fees or lock-ins.",
};

export const quoteFact = { label: "Pricing", value: "Written quote before work starts" };
export const ownershipFact = { label: "Ownership", value: "100% code & IP" };

/** "SaaS development" stays as is; "Offshore software development" → "offshore software development" mid-sentence. */
function inSentence(phrase: string) {
    const first = phrase.split(" ")[0];
    const keep = /[A-Z].*[A-Z]|\./.test(first) || ["React", "Go"].includes(first);
    return keep ? phrase : phrase.charAt(0).toLowerCase() + phrase.slice(1);
}

/**
 * A page's own FAQs, then cost, timeline and comparison answers built from its facts, each skipped when the page
 * already asks it. These are the questions buyers search before hiring, so every service page answers them.
 */
export function pageFaqs(page: MarketingPageData): Faq[] {
    const fact = (label: string) => page.facts.find((f) => f.label === label)?.value;
    const asks = (re: RegExp) => page.faqs.some((f) => re.test(f.q));
    const subject = inSentence(page.serviceType);
    const extra: Faq[] = [];

    const price = fact("Starting at");
    if (price && !asks(/\b(cost|costs|price|prices|charge|how much)\b/i)) {
        const usd = approxUsd(price);
        extra.push({
            q: `How much does ${subject} cost?`,
            a:
                price === "Custom quote"
                    ? "It depends on scope, so it is priced after a free discovery call. You get a fixed, written quote and timeline before any work starts, with no hourly billing. For reference, StackWise websites start at ₹19,999 and SaaS products at ₹59,999."
                    : `At StackWise it starts at ${price}${usd ? ` (${usd})` : ""}, with a fixed, written quote for your exact scope before any work starts and no hourly billing. Agencies commonly quote several times that for comparable work.`,
        });
    }

    const time = fact("Typical timeline");
    if (time && !asks(/\b(how long|timeline|how many weeks|how fast)\b/i)) {
        extra.push({
            q: `How long does ${subject} take?`,
            a: /weeks/.test(time)
                ? `Typically ${time} from an agreed scope to launch, written into your quote with milestone dates. Agencies commonly quote far longer for comparable work: often 8–16 weeks for an MVP and 3–6 months for a SaaS product.`
                : "The timeline is set after a free discovery call and written into your quote with milestone dates. As a guide, websites take 2–3 weeks, MVPs 4–8 weeks and SaaS products 8–12 weeks, about half what agencies typically quote.",
        });
    }

    if (!asks(/freelancer|agenc|compare/i)) {
        extra.push({
            q: "How does StackWise compare with freelancers and agencies?",
            a: "You get prices close to a freelancer's with the reliability of a team: a fixed price and timeline in writing, people who cover for each other, 1–3 months of support included and 100% code ownership. Projects typically launch in about half the time agencies quote.",
        });
    }
    return [...page.faqs, ...extra];
}
