import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allWork } from "@/lib/more-work";
import { allPageList } from "@/lib/all-pages";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteConfig.url;
    // When page content last changed. A fixed date, not the build time: a sitemap that claims every page changed on
    // every deploy teaches search engines to ignore its dates. Bump it when you change page copy.
    const lastModified = new Date(`${siteConfig.contentUpdated}T00:00:00Z`);

    const entry = (
        path: string,
        priority: number,
        changeFrequency: "weekly" | "monthly" | "yearly" = "weekly",
        images?: string[],
        modified: Date = lastModified
    ) => ({
        url: `${siteUrl}${path}`,
        lastModified: modified,
        changeFrequency,
        priority,
        ...(images ? { images: images.map((src) => `${siteUrl}${src}`) } : {}),
    });

    return [
        entry("", 1.0, "weekly", allWork.map((w) => w.preview)),
        entry("/pricing", 0.95),
        ...["/about", "/contact"].map((p) => entry(p, 0.7, "monthly")),
        ...["/services", "/solutions", "/technologies", "/industries", "/locations", "/guides"].map((p) => entry(p, 0.9)),
        entry("/work", 0.9, "weekly", allWork.map((w) => w.preview)),
        // Every service, solution, technology, industry and location page
        ...allPageList.map((p) => entry(p.path, p.kind === "Services" ? 0.85 : 0.8)),
        // Guides carry their own updated date
        ...guides.map((g) => entry(g.path, 0.8, "monthly", undefined, new Date(`${g.updated}T00:00:00Z`))),
        // Case studies, each with its product screenshot for image search
        ...allWork.map((s) => entry(`/work/${s.slug}`, 0.7, "monthly", [s.preview])),
        ...["/privacy", "/terms"].map((p) => entry(p, 0.3, "yearly")),
    ];
}
