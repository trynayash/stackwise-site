import React from "react";
import Link from "next/link";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ArrowBubble, IconTile } from "@/components/ui/card";
import { Tilt } from "@/components/ui/interactive";
import { Eyebrow, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import type { MarketingPageData } from "@/lib/marketing-pages";
import { allPageList } from "@/lib/all-pages";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

type Kind = MarketingPageData["kind"];

const kindLabels: Record<Kind, string> = {
    Services: "Browse by service",
    Solutions: "Or start from your goal",
    Technologies: "Browse by technology",
    Industries: "Browse by industry",
    Locations: "Where our clients are",
};

/** Index page listing every service, solution or technology page. */
export function MarketingHub({ kind, title, accent, intro }: { kind: Kind; title: string; accent: string; intro: string }) {
    const pages = allPageList.filter((p) => p.kind === kind);
    const otherKinds = (Object.keys(kindLabels) as Kind[]).filter((k) => k !== kind);
    const path = `/${kind.toLowerCase()}`;

    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: kind, path },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteConfig.url}${p.path}`, name: p.navLabel })),
                    },
                ]}
            />

            <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: kind }]} />
                    <Enter>
                        <Eyebrow>{kind}</Eyebrow>
                    </Enter>
                    <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text={title} immediate /> <WordReveal text={accent} immediate delay={0.15} className="text-accent" />
                    </h1>
                    <Enter delay={0.25} className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-2xl text-lg leading-relaxed text-white/60">{intro}</p>
                        <QuoteButton />
                    </Enter>
                </div>
            </section>

            <section className="relative pb-16 md:pb-24" aria-label={`All ${kind.toLowerCase()}`}>
                <div className="container mx-auto px-5 sm:px-6">
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {pages.map((p) => {
                            const fact = (label: string) => p.facts.find((f) => f.label === label)?.value;
                            // "₹34,999 (about US$400)" shows just the rupee figure here; the page itself has the conversion.
                            const price = fact("Starting at")?.replace(/\s*\(.*\)$/, "");
                            const timeline = fact("Typical timeline");
                            return (
                                <StaggerItem key={p.path} className="h-full">
                                    <Tilt max={4} className="h-full">
                                        <Link
                                            href={p.path}
                                            className="group flex h-full flex-col rounded-3xl bg-surface p-7 transition-colors duration-300 hover:bg-surface-2 md:p-8"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <IconTile size="lg">
                                                    <Icon icon={p.icon} size={24} />
                                                </IconTile>
                                                <ArrowBubble />
                                            </div>
                                            <h2 className="mt-7 text-2xl font-semibold tracking-tight text-white md:text-3xl">{p.navLabel}</h2>
                                            <p className="mt-3 text-[15px] leading-relaxed text-white/60">{p.seo.description}</p>
                                            <ul className="mt-6 mb-7 space-y-2.5">
                                                {p.features.slice(0, 3).map((f) => (
                                                    <li key={f.title} className="flex items-center gap-2.5 text-[15px] text-white/75">
                                                        <Icon icon={Tick02Icon} size={16} strokeWidth={2} className="flex-shrink-0 text-accent" />
                                                        {f.title}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 pt-5">
                                                <span className="text-base font-semibold text-white">{price === "Custom quote" || !price ? "Custom quote" : `From ${price}`}</span>
                                                {timeline && <span className="text-sm text-white/55">{timeline}</span>}
                                            </div>
                                        </Link>
                                    </Tilt>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>

                    {otherKinds.map((other) => (
                        <Reveal key={other} className="mt-12">
                            <p className="mb-4 text-sm text-white/55">{kindLabels[other]}</p>
                            <div className="flex flex-wrap gap-2">
                                {allPageList
                                    .filter((p) => p.kind === other)
                                    .map((p) => (
                                        <Link
                                            key={p.path}
                                            href={p.path}
                                            className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-accent hover:text-black"
                                        >
                                            <Icon icon={p.icon} size={16} />
                                            {p.navLabel}
                                        </Link>
                                    ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <CtaBand />
        </div>
    );
}
