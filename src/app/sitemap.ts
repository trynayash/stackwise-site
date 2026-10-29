import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allWork } from "@/lib/more-work";
import { marketingPageList } from "@/lib/marketing-pages";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteConfig.url;
    const lastModified = new Date();

    const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "weekly") => ({
        url: `${siteUrl}${path}`,
        lastModified,
        changeFrequency,
        priority,
    });

    return [
        entry("", 1.0),
        ...["/services", "/solutions", "/technologies", "/work"].map((p) => entry(p, 0.9)),
        // Every service, solution and technology page
        ...marketingPageList.map((p) => entry(p.path, 0.8)),
        ...allWork.map((s) => entry(`/work/${s.slug}`, 0.7, "monthly")),
        ...["/privacy", "/terms"].map((p) => entry(p, 0.3, "yearly")),
    ];
}
