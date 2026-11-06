/**
 * How long StackWise takes next to the timelines agencies typically quote, in weeks. The agency ranges are the
 * middle of what published web and software agency timeline guides commonly give (2025–2026), not the slow end;
 * ours must match the "Typical timeline" facts on the service pages and the timeline FAQ.
 */
export type TimelineBenchmark = {
    project: string;
    /** Page that sells this kind of project. */
    href: string;
    agency: [number, number];
    ours: [number, number];
};

export const timelineBenchmarks: TimelineBenchmark[] = [
    { project: "Business website", href: "/services/web-development", agency: [6, 12], ours: [2, 3] },
    { project: "Online store", href: "/industries/ecommerce", agency: [8, 16], ours: [4, 6] },
    { project: "MVP", href: "/solutions/mvp-development", agency: [8, 16], ours: [4, 8] },
    { project: "SaaS product", href: "/services/saas-development", agency: [12, 24], ours: [8, 12] },
];

/** The scale every bar is drawn against, in weeks. */
export const timelineScaleWeeks = 24;

export const timelineNote =
    "Typical agency ranges are the timelines commonly quoted in published web and software agency guides (2025–2026). Ours run from an agreed scope to launch, and your quote states your exact timeline.";

/** "2–3 weeks" */
export const weeks = ([from, to]: [number, number]) => `${from}–${to} weeks`;
