import type { IconSvgElement } from "@/components/ui/icon";
import { toWorkSummary, type WorkSummary } from "@/lib/case-studies";
import { marketingPages, servicePages, solutionPages } from "@/lib/marketing-pages";
import { workBySlug } from "@/lib/more-work";
import { presetForPage, type QuotePreset } from "@/lib/quote";

/** What the home page's Services panel shows for each main service. */
export type ServiceCard = {
    slug: string;
    path: string;
    navLabel: string;
    summary: string;
    intro: string;
    icon: IconSvgElement;
    deliverables: string[];
    price?: string;
    timeline?: string;
    preset: QuotePreset;
    study?: WorkSummary;
};

export type ServiceLink = { path: string; navLabel: string; icon: IconSvgElement };

const coreSlugs = ["saas-development", "ai-development", "custom-software", "web-development"];

/**
 * The Services section's data, built on the server so the browser only receives these fields rather than
 * every page's full content. `shown` lists case studies already on screen (the hero's); each service shows
 * its first other study, so the same screenshot doesn't repeat down the page.
 */
export function homeServices(shown: string[] = []): { core: ServiceCard[]; others: ServiceLink[] } {
    const core = coreSlugs.map((slug) => {
        const p = marketingPages[slug];
        const fact = (label: string) => p.facts.find((f) => f.label === label)?.value;
        const study = workBySlug[p.work.find((w) => !shown.includes(w)) ?? p.work[0]];
        return {
            slug,
            path: p.path,
            navLabel: p.navLabel,
            summary: p.summary,
            intro: p.intro,
            icon: p.icon,
            deliverables: p.deliverables.slice(0, 6),
            price: fact("Starting at"),
            timeline: fact("Typical timeline"),
            preset: presetForPage(slug, p.navLabel),
            ...(study ? { study: toWorkSummary(study) } : {}),
        };
    });
    const others = [...servicePages.filter((p) => !coreSlugs.includes(p.slug)), ...solutionPages].map((p) => ({ path: p.path, navLabel: p.navLabel, icon: p.icon }));
    return { core, others };
}
