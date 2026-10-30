import { marketingPages, servicePages, solutionPages, technologyPages } from "@/lib/marketing-pages";
import type { IconSvgElement } from "@/components/ui/icon";
import { industryPages } from "@/lib/pages/industries";
import { locationPages } from "@/lib/pages/locations";
import type { MarketingPageData } from "@/lib/pages/shared";
import { guides } from "@/lib/guides";

/** Every landing page on the site. Server-only: import this from pages, routes and metadata, never from client components. */
export const allPages: Record<string, MarketingPageData> = { ...marketingPages, ...industryPages, ...locationPages };
export const allPageList = Object.values(allPages);
export const industryPageList = Object.values(industryPages);
export const locationPageList = Object.values(locationPages);

export type NavLink = { path: string; label: string };
/** A menu entry with its one-line summary and icon, for the services, solutions and technologies menus. */
export type PageLink = { path: string; navLabel: string; summary: string; icon: IconSvgElement };

const pageLink = (p: MarketingPageData): PageLink => ({ path: p.path, navLabel: p.navLabel, summary: p.summary, icon: p.icon });

/** The links the client-side navigation and footer need, without the page content behind them. */
export function navLinks() {
    return {
        services: servicePages.map(pageLink),
        solutions: solutionPages.map(pageLink),
        technologies: technologyPages.map(pageLink),
        industries: industryPageList.map((p) => ({ path: p.path, label: p.navLabel })),
        locations: locationPageList.map((p) => ({ path: p.path, label: p.navLabel })),
        guides: guides.map((g) => ({ path: g.path, label: g.seo.title })),
    };
}

export type NavLinks = ReturnType<typeof navLinks>;
