import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, ChevronRight, Plus } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { QuoteButton } from "@/components/marketing/quote-button";
import { marketingPages, marketingProcess, type MarketingPageData } from "@/lib/marketing-pages";
import { constructMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export function marketingMetadata(page: MarketingPageData): Metadata {
    return constructMetadata({
        title: page.seo.title,
        description: page.seo.description,
        canonical: page.path,
        ogKicker: page.badge,
    });
}

/** Rings of the page's feature icons orbiting a glowing core — pure CSS, so it renders on the server. */
function OrbitVisual({ page }: { page: MarketingPageData }) {
    const CoreIcon = page.icon;
    const rings = [
        { size: 56, duration: "26s", items: page.features.slice(0, 3) },
        { size: 88, duration: "38s", items: page.features.slice(3, 6) },
    ];

    return (
        <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
            <div className="absolute inset-[18%] rounded-full bg-[#C8FF00]/15 blur-[70px]" />
            <div className="orbit-scene absolute inset-0" style={{ transform: "perspective(900px) rotateX(58deg)" }}>
                {rings.map((ring, r) => (
                    <div
                        key={r}
                        className="orbit-ring absolute left-1/2 top-1/2 rounded-full border border-dashed border-[#C8FF00]/25"
                        style={{
                            width: `${ring.size}%`,
                            height: `${ring.size}%`,
                            marginLeft: `-${ring.size / 2}%`,
                            marginTop: `-${ring.size / 2}%`,
                            ["--orbit-duration" as string]: ring.duration,
                        } as React.CSSProperties}
                    >
                        {ring.items.map((item, i) => {
                            const angle = (i / ring.items.length) * Math.PI * 2;
                            return (
                                <div
                                    key={item.title}
                                    className="orbit-item absolute h-12 w-12 -ml-6 -mt-6"
                                    style={{ left: `${50 + Math.cos(angle) * 50}%`, top: `${50 + Math.sin(angle) * 50}%`, ["--orbit-duration" as string]: ring.duration } as React.CSSProperties}
                                >
                                    <div style={{ transform: "rotateX(-58deg)" }} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0c0c0c]/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur">
                                        <item.icon size={20} className="text-[#C8FF00]" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-[#C8FF00]/50 bg-gradient-to-br from-[#C8FF00] to-[#9EFF00] shadow-[0_0_80px_rgba(200,255,0,0.45)]" style={{ animation: "floatY 5s ease-in-out infinite" }}>
                <CoreIcon size={40} className="text-black" strokeWidth={1.8} />
            </div>
        </div>
    );
}

export function MarketingPage({ page }: { page: MarketingPageData }) {
    const related = page.related.map((path) => Object.values(marketingPages).find((p) => p.path === path)).filter(Boolean) as MarketingPageData[];

    return (
        <div className="relative overflow-hidden">
            <JsonLd
                data={[
                    serviceSchema({ name: page.seo.title, description: page.seo.description, path: page.path, serviceType: page.serviceType }),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: page.kind, path: `/${page.kind.toLowerCase()}` },
                        { name: page.navLabel, path: page.path },
                    ]),
                    faqSchema(page.faqs),
                ]}
            />

            {/* ─── Hero ─── */}
            <section className="relative pt-28 md:pt-36 pb-16 md:pb-24">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="aurora" />
                    <div className="absolute inset-0 grid-backdrop" />
                </div>

                <div className="container relative mx-auto px-5 sm:px-6">
                    <nav aria-label="Breadcrumb" className="mb-10">
                        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-white/35">
                            <li><Link href="/" className="hover:text-[#C8FF00] transition-colors">Home</Link></li>
                            <li aria-hidden><ChevronRight size={12} /></li>
                            <li><Link href={`/${page.kind.toLowerCase()}`} className="hover:text-[#C8FF00] transition-colors">{page.kind}</Link></li>
                            <li aria-hidden><ChevronRight size={12} /></li>
                            <li className="text-white/60" aria-current="page">{page.navLabel}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <Reveal>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8FF00]/25 bg-[#C8FF00]/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[#C8FF00]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
                                    {page.badge}
                                </span>
                            </Reveal>
                            <h1 className="mt-6 mb-7 text-[2.5rem] leading-[1.03] sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white text-balance">
                                <WordReveal text={page.titleTop} immediate />{" "}
                                <WordReveal
                                    text={page.titleAccent}
                                    immediate
                                    delay={0.2}
                                    wordClassName="bg-gradient-to-r from-[#C8FF00] via-[#dfff6b] to-[#9EFF00] bg-clip-text text-transparent"
                                />
                            </h1>
                            <Reveal delay={0.3}>
                                <p className="max-w-2xl text-base md:text-lg text-white/55 font-light leading-relaxed mb-9">{page.intro}</p>
                            </Reveal>
                            <Reveal delay={0.4} className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                <QuoteButton className="w-full sm:w-auto" />
                                <Link
                                    href="/#pricing"
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-8 text-base font-semibold text-white/80 hover:text-white hover:border-white/25 transition-colors"
                                >
                                    See pricing
                                </Link>
                            </Reveal>
                        </div>
                        <div className="lg:col-span-5">
                            <OrbitVisual page={page} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Features ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="features-heading">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-12 max-w-2xl">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00]">What&apos;s included</span>
                        <h2 id="features-heading" className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
                            Everything you need, <span className="text-white/30">built properly.</span>
                        </h2>
                    </Reveal>
                    <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {page.features.map((feat, i) => (
                            <StaggerItem key={feat.title}>
                                <TiltCard className="p-7">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C8FF00]/20 bg-gradient-to-br from-[#C8FF00]/20 to-[#C8FF00]/5 group-hover:shadow-[0_0_30px_-5px_rgba(200,255,0,0.5)] transition-shadow">
                                            <feat.icon size={20} className="text-[#C8FF00]" />
                                        </div>
                                        <span className="text-4xl font-bold text-white/[0.05] group-hover:text-[#C8FF00]/15 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C8FF00] transition-colors">{feat.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{feat.description}</p>
                                </TiltCard>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── Ideal for + Deliverables ─── */}
            <section className="relative py-16 md:py-24">
                <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Reveal>
                        <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 md:p-10">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/35">A great fit if you are</span>
                            <ul className="mt-7 space-y-5">
                                {page.idealFor.map((item) => (
                                    <li key={item} className="flex items-start gap-4 text-lg text-white/80 leading-snug">
                                        <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#C8FF00] text-black">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="conic-border h-full rounded-3xl bg-gradient-to-br from-[#C8FF00]/[0.07] to-transparent p-7 md:p-10">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00]">What you get</span>
                            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                {page.deliverables.map((d) => (
                                    <li key={d} className="flex items-start gap-3 text-sm text-white/70">
                                        <Check size={16} className="mt-0.5 flex-shrink-0 text-[#C8FF00]" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 border-t border-white/[0.07] pt-6">
                                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">Typical stack</span>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {page.stack.map((s) => (
                                        <span key={s} className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/60">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── Process ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="process-heading">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-12 max-w-2xl">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00]">How it works</span>
                        <h2 id="process-heading" className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
                            Four steps. <span className="text-white/30">Zero guesswork.</span>
                        </h2>
                    </Reveal>
                    <Stagger className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div aria-hidden className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-[#C8FF00]/40 to-transparent md:block" />
                        {marketingProcess.map((s) => (
                            <StaggerItem key={s.step}>
                                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-[#0b0b0b] p-6">
                                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#C8FF00]/40 bg-[#0b0b0b] text-xs font-mono font-bold text-[#C8FF00] shadow-[0_0_20px_-4px_rgba(200,255,0,0.5)]">
                                        {s.step}
                                    </span>
                                    <h3 className="mt-5 mb-2 text-lg font-bold text-white">{s.title}</h3>
                                    <p className="text-sm text-white/45 leading-relaxed">{s.text}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="faq-heading">
                <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <Reveal className="lg:col-span-4">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00]">FAQ</span>
                        <h2 id="faq-heading" className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">Common questions</h2>
                        <p className="mt-4 text-sm text-white/45 leading-relaxed">
                            Something else on your mind? <Link href="/#contact" className="text-[#C8FF00] underline underline-offset-4 decoration-[#C8FF00]/30">Ask us directly</Link>.
                        </p>
                    </Reveal>
                    <div className="lg:col-span-8 space-y-3">
                        {page.faqs.map((f, i) => (
                            <Reveal key={f.q} delay={i * 0.06}>
                                <details className="faq-item group rounded-2xl border border-white/[0.07] bg-white/[0.02] open:border-[#C8FF00]/20 open:bg-[#C8FF00]/[0.03] transition-colors">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 text-left font-medium text-white/85 hover:text-white">
                                        {f.q}
                                        <span className="faq-chevron flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300">
                                            <Plus size={16} />
                                        </span>
                                    </summary>
                                    <p className="px-5 md:px-6 pb-6 text-sm text-white/55 leading-[1.8]">{f.a}</p>
                                </details>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Related ─── */}
            <section className="relative py-16 md:py-20" aria-labelledby="related-heading">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-8">
                        <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-white">Related services</h2>
                    </Reveal>
                    <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {related.map((r) => (
                            <StaggerItem key={r.path}>
                                <Link href={r.path} className="block h-full">
                                    <TiltCard className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{r.kind}</span>
                                                <h3 className="mt-2 text-lg font-bold text-white group-hover:text-[#C8FF00] transition-colors">{r.navLabel}</h3>
                                                <p className="mt-2 text-sm text-white/45 leading-relaxed line-clamp-2">{r.seo.description}</p>
                                            </div>
                                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 group-hover:bg-[#C8FF00] group-hover:text-black group-hover:border-[#C8FF00] group-hover:rotate-45 transition-all">
                                                <ArrowUpRight size={16} />
                                            </span>
                                        </div>
                                    </TiltCard>
                                </Link>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <CtaBand title={page.cta.title} subtitle={page.cta.text} />
        </div>
    );
}
