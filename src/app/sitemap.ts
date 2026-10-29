import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = siteConfig.url;

    // Core static routes
    const coreRoutes = ["", "/services", "/solutions", "/privacy", "/terms"].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : route === "/services" || route === "/solutions" ? 0.9 : 0.3,
    }));

    // Service landing pages
    const serviceRoutes = siteConfig.services.map((s) => ({
        url: `${siteUrl}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Solution landing pages
    const solutionRoutes = siteConfig.solutions.map((sol) => ({
        url: `${siteUrl}/solutions/${sol.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Case studies pages
    const caseStudyRoutes = caseStudies.map((s) => ({
            url: `${siteUrl}/work/${s.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

    return [...coreRoutes, ...serviceRoutes, ...solutionRoutes, ...caseStudyRoutes];
}
