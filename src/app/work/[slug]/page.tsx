import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { caseStudies, caseStudyBySlug, displayDomain } from "@/lib/case-studies";
import { constructMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Eyebrow, Reveal, WordReveal } from "@/components/ui/motion-primitives";
import { CountUp, WipeReveal } from "@/components/ui/scroll-effects";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { Screenshot, StatusBadge } from "@/components/sections/portfolio";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { CaseStudyToc } from "@/components/work/case-study-toc";
import { siteConfig } from "@/config/site";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const study = caseStudyBySlug[slug];
    if (!study) return {};
    return constructMetadata({
        title: `${study.name} — Case Study`,
        description: study.metaDescription,
        canonical: `/work/${study.slug}`,
        ogKicker: "Case study",
    });
}

const paragraphs = (body: string) => body.split("\n\n");

/** "https://www.startupdeck.in/docs/" → "startupdeck.in/docs" */
const shortUrl = (href: string) => {
    const u = new URL(href);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`;
};

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const study = caseStudyBySlug[slug];
    if (!study) notFound();

    const index = caseStudies.findIndex((s) => s.slug === slug);
    const next = caseStudies[(index + 1) % caseStudies.length];

    const sections = [
        { id: "overview", ...study.overview },
        { id: "problem", ...study.problem },
        { id: "constraints", ...study.constraints },
        { id: "architecture", ...study.architecture },
        { id: "tradeoffs", ...study.tradeoffs },
        { id: "lessons", ...study.lessons },
    ];

    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Work", path: "/work" },
                        { name: study.name, path: `/work/${study.slug}` },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        name: study.name,
                        headline: `${study.name} — ${study.tagline}`,
                        description: study.metaDescription,
                        image: `${siteConfig.url}${study.preview}`,
                        url: `${siteConfig.url}/work/${study.slug}`,
                        creator: { "@type": "Person", name: siteConfig.author },
                        keywords: study.stack.join(", "),
                        ...(study.liveUrl ? { sameAs: study.liveUrl } : {}),
                    },
                ]}
            />

            {/* Header */}
            <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: study.name }]} />
                    <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <Reveal y={12} className="flex flex-wrap items-center gap-3">
                                <Eyebrow>Case study · {study.kind}</Eyebrow>
                                <StatusBadge status={study.status} />
                            </Reveal>
                            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                                <WordReveal text={study.name} immediate /> <WordReveal text={study.tagline} immediate delay={0.1} className="text-white/40" />
                            </h1>
                        </div>
                        <Reveal delay={0.2} className="lg:col-span-4">
                            <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
                                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                                    <dt className="text-sm text-white/50">Status</dt>
                                    <dd className="text-[15px] font-medium text-white">{study.status}</dd>
                                </div>
                                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                                    <dt className="text-sm text-white/50">Built with</dt>
                                    <dd className="text-right text-[15px] font-medium text-white">{study.stack.slice(0, 3).join(", ")}</dd>
                                </div>
                                {study.extraLinks.map((l) => (
                                    <a
                                        key={l.href}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                                    >
                                        <span className="text-sm text-white/50">{l.label}</span>
                                        <span className="flex items-center gap-1.5 text-[15px] font-medium text-white">
                                            {shortUrl(l.href)}
                                            <Icon icon={ArrowUpRight01Icon} size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </span>
                                    </a>
                                ))}
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Screenshot */}
            <section className="pb-12 md:pb-16" aria-label={`${study.name} on ${displayDomain(study)}`}>
                <div className="container mx-auto px-5 sm:px-6">
                    <WipeReveal className="mx-auto max-w-6xl rounded-xl">
                        <Screenshot study={study} priority />
                    </WipeReveal>
                </div>
            </section>

            {/* Metrics */}
            <section className="pb-16 md:pb-24" aria-label="Key facts">
                <div className="container mx-auto px-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
                        {study.metrics.map((m) => (
                            <div key={m.label} className="bg-canvas p-7">
                                <dt className="text-sm text-white/45">{m.label}</dt>
                                <dd className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                    <CountUp value={m.value} />
                                </dd>
                                <dd className="mt-2 text-sm text-white/55">{m.note}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Write-up */}
            <section className="pb-16 md:pb-24" aria-label="Case study">
                <div className="container mx-auto grid grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <aside className="lg:col-span-3">
                        <CaseStudyToc items={sections.map((s) => ({ id: s.id, title: s.title }))} />
                    </aside>
                    <div className="space-y-16 lg:col-span-9">
                        {sections.map((s, i) => (
                            <Reveal key={s.id}>
                                <article id={s.id} className="scroll-mt-28">
                                    <Eyebrow index={String(i + 1).padStart(2, "0")}>{s.title}</Eyebrow>
                                    <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-white/75">
                                        {paragraphs(s.body).map((p) => (
                                            <p key={p.slice(0, 40)}>{p}</p>
                                        ))}
                                    </div>
                                    {s.id === "architecture" && (
                                        <div className="mt-10">
                                            <ArchitectureDiagram diagram={study.diagram} />
                                        </div>
                                    )}
                                </article>
                            </Reveal>
                        ))}

                        <Reveal>
                            <div className="flex flex-wrap gap-1.5 border-t border-line pt-8">
                                {study.stack.map((t) => (
                                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/60">{t}</span>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal className="flex flex-col items-start gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                            <div>
                                <p className="text-base font-semibold text-white">Building something similar?</p>
                                <p className="mt-1 text-sm text-white/55">We can walk you through how this was built on a free call.</p>
                            </div>
                            <QuoteButton label="Start a similar project" size="md" />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Next project */}
            <section className="pb-12 md:pb-16" aria-label="Next case study">
                <div className="container mx-auto px-5 sm:px-6">
                    <Link href={`/work/${next.slug}`} className="group block">
                        <Card interactive className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                            <div>
                                <p className="text-sm text-white/45">Next case study</p>
                                <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                                    {next.name} <span className="text-white/40">{next.tagline}</span>
                                </p>
                            </div>
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-line text-white/70 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                <Icon icon={ArrowRight01Icon} size={20} />
                            </span>
                        </Card>
                    </Link>
                </div>
            </section>

            <CtaBand />
        </div>
    );
}
