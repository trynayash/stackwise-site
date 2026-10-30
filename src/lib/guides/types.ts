import type { Faq } from "@/lib/faqs";

/**
 * A block of guide content. Text may contain internal links written as [label](/path) and **bold**;
 * the guide page renders those, everything else is plain text.
 */
export type GuideBlock =
    | { type: "p"; text: string }
    | { type: "list"; items: string[]; ordered?: boolean }
    | { type: "table"; caption?: string; head: string[]; rows: string[][] }
    | { type: "callout"; title: string; text: string };

export type GuideSection = {
    /** Anchor id for the table of contents, kebab-case. */
    id: string;
    heading: string;
    blocks: GuideBlock[];
};

export type Guide = {
    slug: string;
    /** Always `/guides/${slug}`. */
    path: string;
    category: "Pricing" | "Planning" | "Engineering" | "Hiring";
    /** The H1, phrased the way people search for it. */
    title: string;
    /** `title` is at most 50 characters (the site appends " | StackWise"); `description` is 140–155 characters. */
    seo: { title: string; description: string };
    /** One line for cards and lists, at most 110 characters. */
    summary: string;
    /** The direct answer, 40–70 words, readable on its own. Shown first and quoted by answer engines. */
    answer: string;
    /** Three to five short takeaways. */
    takeaways: string[];
    sections: GuideSection[];
    faqs: Faq[];
    /** Search queries this guide answers. Not rendered; feeds the keyword map and llms.txt. */
    keywords: string[];
    /** Two to four internal paths to link at the end. */
    related: string[];
    /** ISO dates, e.g. "2026-10-30". */
    published: string;
    updated: string;
};
