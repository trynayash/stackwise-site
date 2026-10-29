import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight01Icon, ArrowUpRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Card, IconTile } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { Eyebrow, Reveal, SectionHeader, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/sections/portfolio";
import { QuoteButton } from "@/components/marketing/quote-button";
import { marketingPages, marketingProcess, type MarketingPageData } from "@/lib/marketing-pages";
import { workBySlug } from "@/lib/more-work";
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

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/45">
                {items.map((item, i) => (
                    <li key={item.name} className="flex items-center gap-2">
                        {i > 0 && <Icon icon={ArrowRight01Icon} size={14} className="text-white/25" />}
                        {item.href ? (
                            <Link href={item.href} className="transition-colors hover:text-white">{item.name}</Link>
                        ) : (
                            <span className="text-white/75" aria-current="page">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function MarketingPage({ page }: { page: MarketingPageData }) {
    const related = page.related.map((path) => Object.values(marketingPages).find((p) => p.path === path)).filter(Boolean) as MarketingPageData[];
    const work = page.work.map((slug) => workBySlug[slug]).filter(Boolean);
    const hubPath = `/${page.kind.toLowerCase()}`;

    return (
        <div className="relative">
            <JsonLd
                data={[
                    serviceSchema({ name: page.seo.title, description: page.seo.description, path: page.path, serviceType: page.serviceType }),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: page.kind, path: hubPath },
                        { name: page.navLabel, path: page.path },
                    ]),
                    faqSchema(page.faqs),
                ]}
            />

            {/* ─── Hero ─── */}
            <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.kind, href: hubPath }, { name: page.navLabel }]} />

                    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7">
                            <Reveal y={12} className="flex items-center gap-3">
                                <IconTile size="sm">
                                    <Icon icon={page.icon} size={18} />
                                </IconTile>
                                <Eyebrow>{page.badge}</Eyebrow>
                            </Reveal>
                            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                                <WordReveal text={page.titleTop} immediate />{" "}
                                <WordReveal text={page.titleAccent} immediate delay={0.15} className="text-white/40" />
                            </h1>
                            <Reveal delay={0.25}>
                                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">{page.intro}</p>
                            </Reveal>
                            <Reveal delay={0.35} className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <QuoteButton />
                                <ButtonLink href="/#pricing" variant="secondary" size="lg">
                                    See pricing
                                </ButtonLink>
                            </Reveal>
                        </div>

                        {/* At a glance */}
                        <Reveal delay={0.3} className="lg:col-span-5">
                            <div className="rounded-2xl border border-line bg-surface">
                                <p className="border-b border-line px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white/45">At a glance</p>
                                <dl className="divide-y divide-line">
                                    {page.facts.map((f) => (
                                        <div key={f.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                                            <dt className="text-sm text-white/50">{f.label}</dt>
                                            <dd className="text-right text-[15px] font-medium text-white">{f.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <p className="border-t border-line px-6 py-4 text-sm text-white/45">Free consultation · We reply within 24–48 hours</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ─── What's included ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="included">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader index="01" eyebrow="What's included" title="Everything you need," muted="built properly." />
                    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                        {page.features.map((feat) => (
                            <StaggerItem key={feat.title} className="bg-canvas">
                                <div className="h-full p-7 md:p-8">
                                    <Icon icon={feat.icon} size={24} className="text-white" />
                                    <h3 className="mt-8 text-lg font-semibold text-white">{feat.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/55">{feat.description}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── Fit + deliverables ─── */}
            <section className="relative py-16 md:py-24" aria-label="Who it's for and what you get">
                <div className="container mx-auto grid grid-cols-1 gap-5 px-5 sm:px-6 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <Card className="h-full p-7 md:p-9">
                            <Eyebrow index="02">A great fit if you are</Eyebrow>
                            <ul className="mt-8 space-y-5">
                                {page.idealFor.map((item) => (
                                    <li key={item} className="flex items-start gap-4 text-lg leading-snug text-white">
                                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-black">
                                            <Icon icon={Tick02Icon} size={14} strokeWidth={2} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-7">
                        <Card className="h-full p-7 md:p-9">
                            <Eyebrow index="03">What you get</Eyebrow>
                            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                {page.deliverables.map((d) => (
                                    <li key={d} className="flex items-start gap-3 text-[15px] text-white/75">
                                        <Icon icon={Tick02Icon} size={18} className="flex-shrink-0 text-accent" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 border-t border-line pt-6">
                                <p className="text-sm text-white/45">Typical stack</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {page.stack.map((s) => (
                                        <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-white/60">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Reveal>
                </div>
            </section>

            {/* ─── Relevant work ─── */}
            {work.length > 0 && (
                <section className="relative py-16 md:py-24" aria-labelledby="relevant-work">
                    <div className="container mx-auto px-5 sm:px-6">
                        <SectionHeader
                            index="04"
                            eyebrow="Relevant work"
                            title="See how we've built"
                            muted="similar products."
                            action={
                                <ButtonLink href="/#portfolio" variant="secondary" arrow="right">
                                    All work
                                </ButtonLink>
                            }
                        />
                        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                            {work.map((study) => (
                                <StaggerItem key={study.slug}>
                                    <ProjectCard study={study} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            {/* ─── Process ─── */}
            <section className="relative py-16 md:py-24" aria-label="How it works">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader index="05" eyebrow="How it works" title="Four steps." muted="Zero guesswork." />
                    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
                        {marketingProcess.map((s) => (
                            <StaggerItem key={s.step} className="bg-canvas">
                                <div className="h-full p-7">
                                    <span className="font-mono text-sm text-accent">{s.step}</span>
                                    <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-16 md:py-24" aria-label="Frequently asked questions">
                <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <Eyebrow index="06">FAQ</Eyebrow>
                        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Common questions</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/55">
                            Something else on your mind?{" "}
                            <Link href="/#contact" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent">
                                Ask us directly
                            </Link>
                            .
                        </p>
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-8">
                        <FaqList faqs={page.faqs} />
                    </Reveal>
                </div>
            </section>

            {/* ─── Related ─── */}
            <section className="relative py-16 md:py-20" aria-label="Related services">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-8 flex items-end justify-between gap-6">
                        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Related services</h2>
                    </Reveal>
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {related.map((r) => (
                            <StaggerItem key={r.path}>
                                <Link href={r.path} className="block h-full">
                                    <Card interactive className="flex h-full flex-col p-6">
                                        <div className="flex items-start justify-between">
                                            <IconTile>
                                                <Icon icon={r.icon} size={20} />
                                            </IconTile>
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                                <Icon icon={ArrowUpRight01Icon} size={18} />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-semibold text-white">{r.navLabel}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-white/55">{r.summary}</p>
                                    </Card>
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
