"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { caseStudies, displayDomain, type CaseStudy } from "@/lib/case-studies";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { CountUp, WipeReveal } from "@/components/ui/scroll-effects";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
    const live = status.toLowerCase() === "live";
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-white/70">
            <span className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-accent" : "border border-white/60")} aria-hidden />
            {status}
        </span>
    );
}

export function Screenshot({ study, className, priority = false }: { study: CaseStudy; className?: string; priority?: boolean }) {
    return (
        <div className={cn("overflow-hidden rounded-xl border border-line bg-canvas", className)}>
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="ml-2 truncate font-mono text-[10px] text-white/35">{displayDomain(study)}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={study.preview}
                    alt={`${study.name} — ${study.tagline}`}
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading={priority ? "eager" : "lazy"}
                />
            </div>
        </div>
    );
}

/** Compact project card linking to its case study (used on service pages). */
export function ProjectCard({ study }: { study: CaseStudy }) {
    return (
        <Link href={`/work/${study.slug}`} className="block h-full">
            <Card interactive className="flex h-full flex-col gap-6 p-5 md:p-6">
                <Screenshot study={study} />
                <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs uppercase tracking-[0.16em] text-white/40">{study.kind}</span>
                        <StatusBadge status={study.status} />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">{study.name}</h3>
                    <p className="mt-1 text-[15px] text-white/55">{study.tagline}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                        {study.stack.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">{t}</span>
                        ))}
                    </div>
                </div>
            </Card>
        </Link>
    );
}

/** One full-width case study panel (horizontal track on desktop, stacked on phones). */
export function ShowcasePanel({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
    return (
        <article className="group grid h-full grid-cols-1 gap-8 rounded-3xl border border-line bg-surface p-5 md:p-7 lg:grid-cols-12 lg:gap-10">
            <WipeReveal className="rounded-xl lg:col-span-7">
                <Link href={`/work/${study.slug}`} aria-label={`${study.name} case study`} className="block">
                    <Screenshot study={study} />
                </Link>
            </WipeReveal>
            <div className="flex flex-col lg:col-span-5 lg:py-2">
                <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-white/40">
                        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <StatusBadge status={study.status} />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/40">{study.kind}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{study.name}</h3>
                <p className="mt-2 text-lg text-white/55">{study.tagline}</p>

                <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                    {study.metrics.map((m) => (
                        <div key={m.label} className="bg-canvas p-3.5">
                            <dt className="text-[11px] uppercase tracking-[0.12em] text-white/40">{m.label}</dt>
                            <dd className="mt-1.5 text-[15px] font-semibold leading-snug text-white">
                                <CountUp value={m.value} />
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-1.5">
                    {study.stack.slice(0, 6).map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">{t}</span>
                    ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <ButtonLink href={`/work/${study.slug}`} arrow="right">
                        Read case study
                    </ButtonLink>
                    {study.liveUrl && (
                        <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-1.5 px-2 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                        >
                            {study.status.toLowerCase() === "live" ? "Visit live site" : "See the waitlist"}
                            <Icon icon={ArrowUpRight01Icon} size={16} />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

/** Desktop: the section pins while vertical scroll slides the case studies sideways. */
function HorizontalShowcase({ studies, offsetRef }: { studies: CaseStudy[]; offsetRef: React.RefObject<HTMLDivElement | null> }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);
    const [inset, setInset] = useState(24);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const measure = () => {
            setInset(offsetRef.current?.getBoundingClientRect().left ?? 24);
            if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [offsetRef]);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
    const x = useTransform(smooth, [0, 1], [0, -distance]);
    useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(studies.length - 1, Math.round(v * (studies.length - 1)))));

    const panelWidth = `min(1120px, calc(100vw - ${inset * 2}px))`;

    return (
        <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
                <motion.div ref={trackRef} style={{ x, paddingLeft: inset, paddingRight: inset }} className="flex w-max gap-6">
                    {studies.map((s, i) => (
                        <div key={s.slug} style={{ width: panelWidth }}>
                            <ShowcasePanel study={s} index={i} total={studies.length} />
                        </div>
                    ))}
                </motion.div>

                {/* Progress */}
                <div className="mt-8 flex items-center gap-6" style={{ paddingLeft: inset, paddingRight: inset }}>
                    <div className="relative h-px flex-1 bg-line">
                        <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-accent" style={{ scaleX: smooth }} />
                    </div>
                    <span className="font-mono text-xs text-white/50" aria-live="polite">
                        {String(active + 1).padStart(2, "0")} / {String(studies.length).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export function Portfolio() {
    const headerRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const [wide, setWide] = useState(false);

    useEffect(() => {
        // Pinning needs room: wide and tall enough to show a whole panel.
        const mq = window.matchMedia("(min-width: 1024px) and (min-height: 700px)");
        const update = () => setWide(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const horizontal = wide && !reduced;

    return (
        <section id="portfolio" className="relative py-20 md:py-28" aria-label="Selected work">
            <div className="container mx-auto px-5 sm:px-6">
                <div ref={headerRef}>
                    <SectionHeader
                        index="02"
                        eyebrow="Selected work"
                        title="Products we've designed"
                        muted="and engineered."
                        description="Real products, live or in development — each with a write-up of the problem, the architecture and the trade-offs, so you can judge the engineering, not just the screenshots."
                        action={
                            <ButtonLink href="/work" variant="secondary" arrow="right">
                                All case studies
                            </ButtonLink>
                        }
                        className="mb-0 md:mb-0"
                    />
                </div>
            </div>

            {horizontal ? (
                <HorizontalShowcase studies={caseStudies} offsetRef={headerRef} />
            ) : (
                <div className="container mx-auto mt-12 px-5 sm:px-6">
                    <Stagger className="space-y-5">
                        {caseStudies.map((s, i) => (
                            <StaggerItem key={s.slug}>
                                <ShowcasePanel study={s} index={i} total={caseStudies.length} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            )}
        </section>
    );
}
