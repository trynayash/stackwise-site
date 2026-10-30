import { siteConfig } from "@/config/site";
import { allPageList } from "@/lib/all-pages";
import type { MarketingPageData } from "@/lib/marketing-pages";
import { guides, type Guide } from "@/lib/guides";
import { plainText } from "@/lib/guides/text";
import { allWork } from "@/lib/more-work";
import { faqs } from "@/lib/faqs";
import { approxUsd, pricingFaqs } from "@/lib/pricing";

/*
 * Plain-Markdown views of the site for AI assistants and answer engines (llmstxt.org): /llms.txt is the map,
 * /llms-full.txt carries the full text. Both are generated from the same content files as the pages.
 */

const url = siteConfig.url;
const kinds: MarketingPageData["kind"][] = ["Services", "Solutions", "Technologies", "Industries", "Locations"];
const price = (p: MarketingPageData) => p.facts.find((f) => f.label === "Starting at")?.value;

function intro() {
    return [
        `# ${siteConfig.name}`,
        "",
        `> ${siteConfig.description}`,
        "",
        `${siteConfig.name} is a software studio in ${siteConfig.location.city}, ${siteConfig.location.country}, run by ${siteConfig.author}, founder and lead engineer. ` +
            "Clients in India and abroad work directly with the engineer who builds their product. Every project is quoted in writing before work starts, " +
            "includes support after launch, and ends with a full handover of the code and IP.",
        "",
        "## Pricing",
        ...siteConfig.pricing.map((p) => `- ${p.title}: ${p.price === "Custom" ? "custom quote" : `from ${p.price.replace("+", "")} (${approxUsd(p.price)})`}. ${p.description}`),
        `- Full pricing and plan comparison: ${url}/pricing`,
        "",
    ];
}

export function llmsIndex() {
    const link = (p: MarketingPageData) => `- [${p.navLabel}](${url}${p.path}): ${p.summary}${price(p) && price(p) !== "Custom quote" ? ` From ${price(p)}.` : ""}`;
    return [
        ...intro(),
        ...kinds.flatMap((k) => [`## ${k}`, ...allPageList.filter((p) => p.kind === k).map(link), ""]),
        "## Guides",
        ...guides.map((g) => `- [${g.title}](${url}${g.path}): ${plainText(g.answer)}`),
        "",
        "## Case studies",
        ...allWork.map((w) => `- [${w.name}](${url}/work/${w.slug}) (${w.kind}, ${w.status}): ${w.tagline}`),
        "",
        "## FAQ",
        ...[...faqs, ...pricingFaqs].map((f) => `- ${f.q} ${f.a}`),
        "",
        "## More",
        `- Full text of every page and guide: ${url}/llms-full.txt`,
        "",
        "## Contact",
        `- Email: ${siteConfig.emails.inbound}`,
        `- Website: ${url}`,
        `- Founder: ${siteConfig.links.portfolio}`,
        "",
    ].join("\n");
}

function pageText(p: MarketingPageData) {
    return [
        `## ${p.seo.title}`,
        `URL: ${url}${p.path}`,
        "",
        `${p.titleTop} ${p.titleAccent} ${p.intro}`,
        "",
        ...p.facts.map((f) => `- ${f.label}: ${f.value}`),
        "",
        "What's included:",
        ...p.features.map((f) => `- ${f.title}: ${f.description}`),
        "",
        `A good fit for: ${p.idealFor.join("; ")}.`,
        `Deliverables: ${p.deliverables.join("; ")}.`,
        `Typical stack: ${p.stack.join(", ")}.`,
        "",
        ...p.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
        "",
    ];
}

function guideText(g: Guide) {
    const lines = [`## ${g.title}`, `URL: ${url}${g.path}`, `Updated: ${g.updated}`, "", `Short answer: ${plainText(g.answer)}`, "", ...g.takeaways.map((t) => `- ${plainText(t)}`), ""];
    for (const s of g.sections) {
        lines.push(`### ${s.heading}`);
        for (const b of s.blocks) {
            if (b.type === "p") lines.push(plainText(b.text), "");
            else if (b.type === "list") lines.push(...b.items.map((t, i) => `${b.ordered ? `${i + 1}.` : "-"} ${plainText(t)}`), "");
            else if (b.type === "table") lines.push(`| ${b.head.join(" | ")} |`, `| ${b.head.map(() => "---").join(" | ")} |`, ...b.rows.map((r) => `| ${r.map(plainText).join(" | ")} |`), "");
            else lines.push(`${b.title}: ${plainText(b.text)}`, "");
        }
    }
    lines.push(...g.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${plainText(f.a)}`]), "");
    return lines;
}

export function llmsFull() {
    return [
        ...intro(),
        "## Pricing questions",
        ...pricingFaqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
        "",
        "# Pages",
        "",
        ...allPageList.flatMap(pageText),
        "# Guides",
        "",
        ...guides.flatMap(guideText),
        "# Case studies",
        ...allWork.map((w) => `- ${w.name} (${url}/work/${w.slug}), ${w.kind}, ${w.status}: ${w.tagline}`),
        "",
        "# General FAQ",
        ...faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
        "",
    ].join("\n");
}
