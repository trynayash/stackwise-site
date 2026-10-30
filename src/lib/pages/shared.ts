import type { IconSvgElement } from "@/components/ui/icon";
import type { Faq } from "@/lib/faqs";

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
