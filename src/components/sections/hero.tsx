"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CustomerSupportIcon, FileSecurityIcon, Key01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { HeroVisual } from "@/components/three/hero-visual";
import { WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useSectionNav } from "@/hooks/use-section-nav";

const trustPoints = [
    { icon: SourceCodeIcon, title: "Senior engineering", text: "Work directly with the engineer building it" },
    { icon: Key01Icon, title: "100% code & IP", text: "Full repository handover, no lock-in" },
    { icon: CustomerSupportIcon, title: "Support after launch", text: "1–3 months included in every plan" },
    { icon: FileSecurityIcon, title: "NDA on request", text: "Signed before any sensitive discovery" },
];

export function Hero() {
    const { openInquiry } = useInquiry();
    const goToSection = useSectionNav();
    const heroRef = useRef<HTMLElement>(null);
    // As the hero scrolls away, the copy drifts up and fades a little: a quiet hand-off to the next section.
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

    return (
        <section ref={heroRef} id="hero" className="relative overflow-hidden pt-28 pb-8 md:pt-32" aria-label="Introduction">
            <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />

            <div className="container relative mx-auto px-5 sm:px-6">
                <div className="grid min-h-[calc(100svh-9rem)] grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
                    {/* Copy */}
                    <motion.div style={{ y: copyY, opacity: copyOpacity }} className="flex flex-col items-start lg:col-span-7">
                        <Enter className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-white/70">
                            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                            Booking new projects
                        </Enter>

                        <h1 className="mb-6 text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-[5.25rem] font-semibold tracking-[-0.045em] text-white text-balance">
                            <WordReveal text="Give your custom software" immediate />{" "}
                            <WordReveal text="the codebase it deserves." immediate delay={0.15} className="text-white/45" />
                        </h1>

                        <Enter as="p" delay={0.3} className="mb-10 max-w-xl text-lg leading-relaxed text-white/65 text-pretty">
                            StackWise is a Mumbai software studio by Yash Suthar. We design and build SaaS products, custom software and AI features —
                            clean, typed code that you fully own.
                        </Enter>

                        <Enter delay={0.4} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Button size="lg" arrow="right" onClick={openInquiry}>
                                Get a free quote
                            </Button>
                            <ButtonLink href="/#portfolio" onClick={goToSection("portfolio")} variant="secondary" size="lg">
                                See our work
                            </ButtonLink>
                        </Enter>

                        <Enter as="p" delay={0.5} className="mt-5 text-sm text-white/55">
                            Free consultation · We reply within 24–48 hours
                        </Enter>
                    </motion.div>

                    {/* 3D model */}
                    <Enter delay={0.15} className="relative -mx-5 h-[320px] sm:mx-0 sm:h-[420px] lg:col-span-5 lg:h-[580px]">
                        <HeroVisual className="absolute inset-0" />
                        <FloatingTag className="left-[2%] top-[16%]" label="Frontend" sub="Next.js · React" />
                        <FloatingTag className="right-[0%] top-[44%]" label="API & data" sub="Node · Go · Postgres" />
                        <FloatingTag className="left-[8%] bottom-[12%]" label="AI layer" sub="LLMs · RAG · Agents" />
                    </Enter>
                </div>

                {/* Trust strip */}
                <Enter
                    as="ul"
                    delay={0.55}
                    className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
                >
                    {trustPoints.map((t) => (
                        <li key={t.title} className="flex items-start gap-4 bg-canvas p-6">
                            <Icon icon={t.icon} size={22} className="mt-0.5 text-white" />
                            <div>
                                <p className="text-[15px] font-semibold text-white">{t.title}</p>
                                <p className="mt-1 text-sm text-white/50">{t.text}</p>
                            </div>
                        </li>
                    ))}
                </Enter>

            </div>
        </section>
    );
}

function FloatingTag({ className, label, sub }: { className: string; label: string; sub: string }) {
    return (
        <div className={`pointer-events-none absolute z-10 hidden sm:block ${className}`}>
            <div className="rounded-xl border border-line-strong bg-surface px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
                    <span className="text-xs font-semibold text-white">{label}</span>
                </div>
                <span className="mt-0.5 block pl-3.5 text-[11px] font-mono text-white/55">{sub}</span>
            </div>
        </div>
    );
}
