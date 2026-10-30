import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** AI search and assistant crawlers, named so it's explicit that they may read the site (answer-engine visibility). */
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Amazonbot", "DuckAssistBot", "MistralAI-User", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
    // Only the form endpoint is off-limits. /_next must stay crawlable:
    // search engines need its JavaScript, CSS and images to render pages.
    const disallow = ["/api/"];
    return {
        rules: [
            { userAgent: "*", allow: "/", disallow },
            { userAgent: aiCrawlers, allow: "/", disallow },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
