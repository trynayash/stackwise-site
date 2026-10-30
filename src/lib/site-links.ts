import { BookOpen01Icon, Briefcase01Icon, Invoice01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@/components/ui/icon";
import { guides } from "@/lib/guides";
import { allPageList } from "@/lib/all-pages";

export type SiteLink = { path: string; title: string; summary: string; icon: IconSvgElement; kind: string };

const staticLinks: SiteLink[] = [
    { path: "/pricing", title: "Pricing", summary: "Starting prices for websites, SaaS products and larger builds.", icon: Invoice01Icon, kind: "Pricing" },
    { path: "/work", title: "Our work", summary: "Products we've designed, built and shipped.", icon: Briefcase01Icon, kind: "Work" },
    { path: "/guides", title: "Guides", summary: "Plain answers on cost, timelines and hiring.", icon: BookOpen01Icon, kind: "Guides" },
];

/** Title, summary and icon for any internal page, so "related" lists can link to services, guides and more alike. */
export function resolveLink(path: string): SiteLink | undefined {
    const page = allPageList.find((p) => p.path === path);
    if (page) return { path, title: page.navLabel, summary: page.summary, icon: page.icon, kind: page.kind };
    const guide = guides.find((g) => g.path === path);
    if (guide) return { path, title: guide.title, summary: guide.summary, icon: BookOpen01Icon, kind: "Guide" };
    return staticLinks.find((l) => l.path === path);
}
