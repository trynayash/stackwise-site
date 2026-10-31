import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight01Icon, CloudUploadIcon, CodeIcon, Mail01Icon, PenTool03Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Card, IconTile } from "@/components/ui/card";
import { RelatedCard } from "@/components/ui/related-card";
import { Tilt } from "@/components/ui/interactive";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { Reveal, SectionHeader, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { CtaBand } from "@/components/sections/cta-band";
import { WorkCard } from "@/components/work/work-card";
import { QuoteButton } from "@/components/marketing/quote-button";
import { BookCallLink } from "@/components/ui/book-call";
import { marketingProcess, type MarketingPageData } from "@/lib/marketing-pages";
import { resolveLink, type SiteLink } from "@/lib/site-links";
import { workBySlug } from "@/lib/more-work";
import { toWorkSummary } from "@/lib/case-studies";
import { constructMetadata } from "@/lib/seo";
import { presetForPage } from "@/lib/quote";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbSchema, faqSchema, rupees, serviceSchema } from "@/lib/schema";

export function marketingMetadata(page: MarketingPageData): Metadata {
    return constructMetadata({
        title: page.seo.title,
        description: page.seo.description,
        canonical: page.path,
        ogKicker: page.badge,
    });
}

// One icon per step of marketingProcess, the same four the home page uses.
const processIcons = [Search01Icon, PenTool03Icon, CodeIcon, CloudUploadIcon];

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-white/55">
                {items.map((item, i) => (
                    <li key={item.name} className="flex items-center gap-2">
                        {i > 0 && <Icon icon={ArrowRight01Icon} size={14} className="text-white/50" />}
                        {item.href ? (
                            <Link href={item.href} className="-mx-1.5 inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 transition-colors hover:text-white">{item.name}</Link>
                        ) : (
                            <span className="py-3 text-white/75" aria-current="page">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function MarketingPage({ page }: { page: MarketingPageData }) {
    const related = page.related.map(resolveLink).filter((l): l is SiteLink => Boolean(l));
    const work = page.work.map((slug) => workBySlug[slug]).filter(Boolean);
    const hubPath = `/${page.kind.toLowerCase()}`;
    const preset = presetForPage(page.slug, page.navLabel);
    const price = page.facts.find((f) => f.label === "Starting at")?.value;
    // "₹34,999 (about US$400)" shows the rupee price large and the conversion underneath.
    const [priceMain, priceNote] = price?.match(/^(.*?)\s*\((.*)\)$/)?.slice(1) ?? [price, undefined];

    return (
        <div className="relative">
            <JsonLd
                data={[
                    serviceSchema({
                        name: page.seo.title,
                        description: page.seo.description,
                        path: page.path,
                        serviceType: page.serviceType,
                        startingPrice: rupees(page.facts.find((f) => f.label === "Starting at")?.value),
                        areaServed: page.areaServed,
                    }),
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
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.kind, href: hubPath }, { name: page.navLabel }]} />

                    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7">
                            <Enter className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-[13px] font-medium text-white/80">
                                <Icon icon={page.icon} size={16} className="text-accent" />
                                {page.badge}
                            </Enter>
                            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                                <WordReveal text={page.titleTop} immediate />{" "}
                                <WordReveal text={page.titleAccent} immediate delay={0.15} className="text-accent" />
                            </h1>
                            <Enter delay={0.25}>
                                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">{page.intro}</p>
                            </Enter>
                            <Enter delay={0.35} className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <QuoteButton preset={preset} />
                                <BookCallLink source="page-hero" />
                            </Enter>
                        </div>

                        {/* At a glance */}
                        <Enter delay={0.3} className="lg:col-span-5">
                            <div className="rounded-3xl bg-surface p-7 md:p-8">
                                {price && (
                                    <div className="mb-6 rounded-2xl bg-accent p-5 text-black">
                                        <p className="text-sm font-medium text-black/65">Starting at</p>
                                        <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">{priceMain}</p>
                                        {priceNote && <p className="mt-1 text-sm font-medium text-black/65">{priceNote}</p>}
                                    </div>
                                )}
                                <dl className="space-y-4">
                                    {page.facts
                                        .filter((f) => f.label !== "Starting at")
                                        .map((f) => (
                                            <div key={f.label} className="flex items-baseline justify-between gap-6">
                                                <dt className="text-sm text-white/55">{f.label}</dt>
                                                <dd className="text-right text-[15px] font-medium text-white">{f.value}</dd>
                                            </div>
                                        ))}
                                </dl>
                                <p className="mt-6 text-sm text-white/55">
                                    Prefer email?{" "}
                                    <a href={`mailto:${siteConfig.emails.inbound}`} className="inline-flex items-center gap-1 font-medium text-white hover:text-accent">
                                        <Icon icon={Mail01Icon} size={14} />
                                        {siteConfig.emails.inbound}
                                    </a>
                                    . We reply within 24–48 hours.
                                </p>
                            </div>
                        </Enter>
                    </div>
                </div>
            </section>

            {/* ─── What's included ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="included">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="What's included" title="Everything you need, built properly." />
                    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {page.features.map((feat) => (
                            <StaggerItem key={feat.title} className="h-full">
                                <Tilt max={5} className="h-full">
                                    <Card interactive className="h-full p-7 md:p-8">
                                        <IconTile size="lg">
                                            <Icon icon={feat.icon} size={24} />
                                        </IconTile>
                                        <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">{feat.title}</h3>
                                        <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{feat.description}</p>
                                    </Card>
                                </Tilt>
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
                            <h2 className="text-2xl font-semibold tracking-tight text-white">A great fit if you are</h2>
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
                            <h2 className="text-2xl font-semibold tracking-tight text-white">What you get</h2>
                            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                {page.deliverables.map((d) => (
                                    <li key={d} className="flex items-start gap-3 text-[15px] text-white/75">
                                        <Icon icon={Tick02Icon} size={18} className="flex-shrink-0 text-accent" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-9">
                                <p className="text-sm text-white/55">Typical stack</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {page.stack.map((s) => (
                                        <span key={s} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/75">{s}</span>
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
                            eyebrow="Relevant work"
                            title="Similar products we've built."
                            action={
                                <ButtonLink href="/work" variant="secondary" arrow="right">
                                    All work
                                </ButtonLink>
                            }
                        />
                        <Stagger className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
                            {work.map((study) => (
                                <StaggerItem key={study.slug}>
                                    <WorkCard study={toWorkSummary(study)} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            {/* ─── Process ─── */}
            <section className="relative py-16 md:py-24" aria-label="How it works">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="How it works" title="Four clear steps, from first call to launch." />
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {marketingProcess.map((s, i) => (
                            <StaggerItem key={s.step} className="h-full">
                                <Tilt max={6} className="h-full">
                                    <Card interactive className="h-full p-7">
                                        <div className="flex items-center justify-between">
                                            <IconTile size="md">
                                                <Icon icon={processIcons[i] ?? Search01Icon} size={22} />
                                            </IconTile>
                                            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/70">Step {i + 1}</span>
                                        </div>
                                        <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">{s.title}</h3>
                                        <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{s.text}</p>
                                    </Card>
                                </Tilt>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-16 md:py-24" aria-label="Frequently asked questions">
                <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Common questions</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/60">Something else on your mind? Ask in the chat, it only takes a minute.</p>
                        <QuoteButton label="Ask a question" preset={preset} size="md" variant="secondary" className="mt-6" />
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-8">
                        <FaqList faqs={page.faqs} />
                    </Reveal>
                </div>
            </section>

            {/* ─── Related ─── */}
            <section className="relative py-16 md:py-20" aria-label="Related pages">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-8 flex items-end justify-between gap-6">
                        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Related</h2>
                    </Reveal>
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {related.map((r) => (
                            <StaggerItem key={r.path} className="h-full">
                                <RelatedCard link={r} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <CtaBand title={page.cta.title} subtitle={page.cta.text} preset={preset} />
        </div>
    );
}
