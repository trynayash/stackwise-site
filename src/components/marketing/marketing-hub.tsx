import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
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
        <div className="relative overflow-hidden">
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

            <section className="relative pt-28 md:pt-36 pb-12 md:pb-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="aurora" />
                    <div className="absolute inset-0 grid-backdrop" />
                </div>
                <div className="container relative mx-auto px-5 sm:px-6">
                    <nav aria-label="Breadcrumb" className="mb-10">
                        <ol className="flex items-center gap-1.5 text-xs font-mono text-white/35">
                            <li><Link href="/" className="hover:text-[#C8FF00] transition-colors">Home</Link></li>
                            <li aria-hidden><ChevronRight size={12} /></li>
                            <li className="text-white/60" aria-current="page">{kind}</li>
                        </ol>
                    </nav>
                    <h1 className="max-w-4xl text-[2.5rem] leading-[1.03] sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white text-balance mb-7">
                        <WordReveal text={title} immediate />{" "}
                        <WordReveal text={accent} immediate delay={0.2} wordClassName="bg-gradient-to-r from-[#C8FF00] to-[#9EFF00] bg-clip-text text-transparent" />
                    </h1>
                    <Reveal delay={0.3}>
                        <p className="max-w-2xl text-base md:text-lg text-white/55 font-light leading-relaxed">{intro}</p>
                    </Reveal>
                </div>
            </section>

            <section className="relative pb-16 md:pb-24">
                <div className="container mx-auto px-5 sm:px-6">
                    <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {pages.map((p) => (
                            <StaggerItem key={p.path}>
                                <Link href={p.path} className="block h-full">
                                    <TiltCard className="p-7 md:p-9">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8FF00] to-[#9EFF00] shadow-[0_0_40px_-8px_rgba(200,255,0,0.6)]">
                                                <p.icon size={24} className="text-black" />
                                            </div>
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 group-hover:bg-[#C8FF00] group-hover:text-black group-hover:border-[#C8FF00] group-hover:rotate-45 transition-all">
                                                <ArrowUpRight size={18} />
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8FF00]/70">{p.badge}</span>
                                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white group-hover:text-[#C8FF00] transition-colors">{p.navLabel}</h2>
                                        <p className="mt-3 text-sm md:text-base text-white/50 leading-relaxed">{p.seo.description}</p>
                                        <div className="mt-6 flex flex-wrap gap-1.5">
                                            {p.features.slice(0, 4).map((f) => (
                                                <span key={f.title} className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/45">{f.title}</span>
                                            ))}
                                        </div>
                                    </TiltCard>
                                </Link>
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <Reveal className="mt-16">
                        <h2 className="text-xl font-bold text-white mb-5">{kind === "Services" ? "Solutions by goal" : "Services by type"}</h2>
                        <div className="flex flex-wrap gap-2">
                            {others.map((p) => (
                                <Link key={p.path} href={p.path} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/65 hover:border-[#C8FF00]/40 hover:text-[#C8FF00] transition-colors">
                                    {p.navLabel}
                                    <ArrowUpRight size={14} />
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
