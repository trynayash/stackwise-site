import { siteConfig } from "@/config/site";
import { marketingPageList, servicePages, solutionPages, technologyPages, type MarketingPageData } from "@/lib/marketing-pages";
import { allWork } from "@/lib/more-work";
import { faqs } from "@/lib/faqs";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants and AI search (llmstxt.org).
 * Generated from the same content files as the pages, so it never drifts from what the site says.
 */
export function GET() {
    const url = siteConfig.url;
    const link = (p: MarketingPageData) => `- [${p.navLabel}](${url}${p.path}): ${p.summary}`;
    const price = (p: MarketingPageData) => p.facts.find((f) => f.label === "Starting at")?.value;

    const body = [
        `# ${siteConfig.name}`,
        "",
        `> ${siteConfig.description}`,
        "",
        `${siteConfig.name} is run by ${siteConfig.author}, founder and lead engineer, based in ${siteConfig.location.city}, ${siteConfig.location.country}. ` +
            "Every project is quoted in writing before work starts, includes support after launch, and ends with a full handover of the code and IP.",
        "",
        "## Services",
        ...servicePages.map(link),
        "",
        "## Solutions",
        ...solutionPages.map(link),
        "",
        "## Technologies",
        ...technologyPages.map(link),
        "",
        "## Pricing",
        ...siteConfig.pricing.map((p) => `- ${p.title}: ${p.price} — ${p.description}`),
        ...marketingPageList.filter((p) => price(p)).map((p) => `- ${p.navLabel}: starting at ${price(p)}`),
        "",
        "## Case studies",
        ...allWork.map((w) => `- [${w.name}](${url}/work/${w.slug}) (${w.kind}, ${w.status}): ${w.tagline}`),
        "",
        "## FAQ",
        ...faqs.map((f) => `- ${f.q} ${f.a}`),
        "",
        "## Contact",
        `- Email: ${siteConfig.emails.inbound}`,
        `- Website: ${url}`,
        `- Founder: ${siteConfig.links.portfolio}`,
        "",
    ].join("\n");

    return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
