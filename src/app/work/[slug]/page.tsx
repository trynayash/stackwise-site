import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { projects } from "@/lib/data";
import { constructMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Eyebrow, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { Screenshot, splitTitle } from "@/components/sections/portfolio";
import { siteConfig } from "@/config/site";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const caseStudies = projects.filter((p) => p.caseStudy);

export async function generateStaticParams() {
    return caseStudies.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = caseStudies.find((p) => p.id === slug);
    if (!project) return {};

    const { name } = splitTitle(project.title);
    return constructMetadata({
        title: `${name} — Case Study`,
        description: project.summary,
        canonical: `/work/${project.id}`,
        ogKicker: "Case study",
    });
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const index = caseStudies.findIndex((p) => p.id === slug);
    const project = caseStudies[index];
    if (!project || !project.caseStudy) notFound();

    const cs = project.caseStudy;
    const { name, tagline } = splitTitle(project.title);
    const next = caseStudies[(index + 1) % caseStudies.length];
    const nextTitle = splitTitle(next.title);

    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Work", path: "/#portfolio" },
                        { name, path: `/work/${project.id}` },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        name: project.title,
                        description: project.summary,
                        image: `${siteConfig.url}${project.image}`,
                        url: `${siteConfig.url}/work/${project.id}`,
                        creator: { "@id": `${siteConfig.url}/#organization` },
                        keywords: project.tech.join(", "),
                    },
                ]}
            />

            {/* Header */}
            <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/#portfolio" }, { name }]} />
                    <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <Reveal y={12}>
                                <Eyebrow>Case study · {project.category}</Eyebrow>
                            </Reveal>
                            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                                <WordReveal text={name} immediate />
                                {tagline && (
                                    <>
                                        {" "}
                                        <WordReveal text={tagline} immediate delay={0.1} className="text-white/40" />
                                    </>
                                )}
                            </h1>
                            <Reveal delay={0.2}>
                                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">{project.summary}</p>
                            </Reveal>
                        </div>
                        <Reveal delay={0.25} className="lg:col-span-4">
                            <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
                                {project.metrics.map((m) => (
                                    <div key={m.label} className="flex items-baseline justify-between gap-4 px-5 py-4">
                                        <dt className="text-sm text-white/50">{m.label}</dt>
                                        <dd className="text-[15px] font-medium text-white">{m.value}</dd>
                                    </div>
                                ))}
                                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                                    <dt className="text-sm text-white/50">Category</dt>
                                    <dd className="text-[15px] font-medium text-white">{project.category}</dd>
                                </div>
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Screenshot */}
            <section className="pb-16 md:pb-24" aria-label="Product screenshot">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal>
                        <Screenshot project={project} className="mx-auto max-w-6xl" />
                    </Reveal>
                </div>
            </section>

            {/* Problem & approach */}
            <section className="py-12 md:py-16" aria-label="Problem and approach">
                <div className="container mx-auto grid grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2">
                    <Reveal>
                        <Card className="h-full p-7 md:p-9">
                            <Eyebrow index="01">The problem</Eyebrow>
                            <p className="mt-6 text-lg leading-relaxed text-white/75">{cs.problem}</p>
                        </Card>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <Card className="h-full p-7 md:p-9">
                            <Eyebrow index="02">The approach</Eyebrow>
                            <p className="mt-6 text-lg leading-relaxed text-white/75">{cs.strategy}</p>
                        </Card>
                    </Reveal>
                </div>
            </section>

            {/* What was built */}
            <section className="py-12 md:py-16" aria-label="What was built">
                <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <Eyebrow index="03">What was built</Eyebrow>
                        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">The blueprint</h2>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/60">{t}</span>
                            ))}
                        </div>
                    </Reveal>
                    <Stagger className="border-t border-line lg:col-span-8">
                        {cs.blueprint.map((step, i) => (
                            <StaggerItem key={step}>
                                <div className="flex gap-6 border-b border-line py-6">
                                    <span className="w-8 flex-shrink-0 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                                    <p className="text-base leading-relaxed text-white/75">{step}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Inside the product */}
            <section className="py-12 md:py-16" aria-label="Inside the product">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-8">
                        <Eyebrow index="04">Inside the product</Eyebrow>
                    </Reveal>
                    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {cs.results.map((r) => (
                            <StaggerItem key={r.metric} className="bg-canvas">
                                <div className="h-full p-7">
                                    <p className="text-sm text-white/45">{r.metric}</p>
                                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{r.value}</p>
                                    <p className="mt-3 text-sm leading-relaxed text-white/55">{r.description}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                    <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                        <div>
                            <p className="text-base font-semibold text-white">Building something similar?</p>
                            <p className="mt-1 text-sm text-white/55">We can walk you through how this was built on a free call.</p>
                        </div>
                        <QuoteButton label="Start a similar project" size="md" />
                    </Reveal>
                </div>
            </section>

            {/* Next project */}
            <section className="py-12 md:py-16" aria-label="Next case study">
                <div className="container mx-auto px-5 sm:px-6">
                    <Link href={`/work/${next.id}`} className="group block">
                        <Card interactive className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                            <div>
                                <p className="text-sm text-white/45">Next case study</p>
                                <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                                    {nextTitle.name} <span className="text-white/40">{nextTitle.tagline}</span>
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
