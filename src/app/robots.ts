import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Only the form endpoint is off-limits. /_next must stay crawlable:
            // search engines need its JavaScript, CSS and images to render pages.
            disallow: ["/api/"],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
