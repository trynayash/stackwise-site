import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { IconTile } from "@/components/ui/card";
import { Eyebrow, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { marketingPageList, type MarketingPageData } from "@/lib/marketing-pages";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

/** Index page listing every service or solution page. */
export function MarketingHub({ kind, title, accent, intro }: { kind: MarketingPageData["kind"]; title: string; accent: string; intro: string }) {
    const pages = marketingPageList.filter((p) => p.kind === kind);
    const others = marketingPageList.filter((p) => p.kind !== kind);
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
                <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: kind }]} />
                    <Reveal y={12}>
                        <Eyebrow>{kind}</Eyebrow>
                    </Reveal>
                    <h1 className="mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text={title} immediate /> <WordReveal text={accent} immediate delay={0.15} className="text-white/40" />
                    </h1>
                    <Reveal delay={0.25} className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-2xl text-lg leading-relaxed text-white/60">{intro}</p>
                        <QuoteButton />
                    </Reveal>
                </div>
            </section>

            <section className="relative pb-16 md:pb-24" aria-label={`All ${kind.toLowerCase()}`}>
                <div className="container mx-auto px-5 sm:px-6">
                    <Stagger className="border-t border-line">
                        {pages.map((p, i) => (
                            <StaggerItem key={p.path}>
                                <Link href={p.path} className="group grid grid-cols-1 gap-6 border-b border-line py-8 transition-colors md:grid-cols-12 md:items-center md:py-10">
                                    <div className="flex items-center gap-5 md:col-span-5">
                                        <span className="w-8 font-mono text-sm text-white/35">{String(i + 1).padStart(2, "0")}</span>
                                        <IconTile className="transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                            <Icon icon={p.icon} size={20} />
                                        </IconTile>
                                        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{p.navLabel}</h2>
                                    </div>
                                    <div className="md:col-span-6">
                                        <p className="text-[15px] leading-relaxed text-white/60">{p.seo.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {p.features.slice(0, 4).map((f) => (
                                                <span key={f.title} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">{f.title}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden justify-end md:col-span-1 md:flex">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white/60 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                            <Icon icon={ArrowUpRight01Icon} size={20} />
                                        </span>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <Reveal className="mt-14">
                        <p className="mb-4 text-sm text-white/45">{kind === "Services" ? "Or start from your goal" : "Or browse by service"}</p>
                        <div className="flex flex-wrap gap-2">
                            {others.map((p) => (
                                <Link
                                    key={p.path}
                                    href={p.path}
                                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-line-strong hover:text-white"
                                >
                                    <Icon icon={p.icon} size={16} />
                                    {p.navLabel}
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <CtaBand />
        </div>
    );
}
