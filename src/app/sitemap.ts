import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allWork } from "@/lib/more-work";
import { marketingPageList } from "@/lib/marketing-pages";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteConfig.url;
    const lastModified = new Date();

    const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "weekly", images?: string[]) => ({
        url: `${siteUrl}${path}`,
        lastModified,
        changeFrequency,
        priority,
        ...(images ? { images: images.map((src) => `${siteUrl}${src}`) } : {}),
    });

    return [
        entry("", 1.0, "weekly", allWork.map((w) => w.preview)),
        ...["/services", "/solutions", "/technologies"].map((p) => entry(p, 0.9)),
        entry("/work", 0.9, "weekly", allWork.map((w) => w.preview)),
        // Every service, solution and technology page
        ...marketingPageList.map((p) => entry(p.path, 0.8)),
        // Case studies, each with its product screenshot for image search
        ...allWork.map((s) => entry(`/work/${s.slug}`, 0.7, "monthly", [s.preview])),
        ...["/privacy", "/terms"].map((p) => entry(p, 0.3, "yearly")),
    ];
}
