"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CloudUploadIcon, CodeIcon, PenTool03Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const steps = [
    {
        week: "Week 1",
        title: "Discovery & architecture",
        description: "We dig into your business, users and goals. You leave the week with a technical architecture, sitemap and roadmap — no ambiguity.",
        deliverables: ["Requirements document", "Architecture diagram", "Timeline & milestones", "Stack recommendation"],
        icon: Search01Icon,
    },
    {
        week: "Week 2",
        title: "UI/UX & prototype",
        description: "Clickable Figma prototypes, so you see exactly what you're getting before a single line of code is written.",
        deliverables: ["Wireframes for all screens", "High-fidelity designs", "Clickable prototype", "Design system"],
        icon: PenTool03Icon,
    },
    {
        week: "Week 3",
        title: "Frontend & backend build",
        description: "Production-grade code — Next.js frontend, backend APIs, database and integrations — with regular progress updates.",
        deliverables: ["Next.js / React frontend", "API & database", "Auth & payment flows", "Staging URL & updates"],
        icon: CodeIcon,
    },
    {
        week: "Week 4",
        title: "QA, optimization & launch",
        description: "Testing across devices, performance tuning, a final review with you and a zero-downtime deployment to production.",
        deliverables: ["Cross-device testing", "Performance optimization", "Security review", "Deployment & handoff docs"],
        icon: CloudUploadIcon,
    },
];

/** Desktop: the heading stays pinned while each week's card slides up and stacks over the last. */
export function ProcessTimeline() {
    const { openInquiry } = useInquiry();
    const listRef = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section id="process" className="relative py-20 md:py-28" aria-label="Our process">
            <div className="container mx-auto grid grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-28">
                        <SectionHeader
                            index="04"
                            eyebrow="Process"
                            title="From idea to launch"
                            muted="in four clear weeks."
                            className="mb-6 md:mb-6 lg:block"
                        />
                        <Reveal delay={0.1}>
                            <p className="max-w-md text-base leading-relaxed text-white/55 md:text-[17px]">
                                A week-by-week process with no surprises. You always know what&apos;s happening, when, and what you get at the end of each step.
                            </p>
                            {/* Scroll progress through the four weeks */}
                            <div className="mt-8 hidden max-w-md items-center gap-4 lg:flex">
                                <div className="relative h-px flex-1 bg-line">
                                    <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-accent" style={{ scaleX: progress }} />
                                </div>
                                <span className="font-mono text-xs text-white/55">4 weeks</span>
                            </div>
                            <div className="mt-10 rounded-2xl border border-line p-6">
                                <p className="text-base font-semibold text-white">Bigger product? Same steps.</p>
                                <p className="mt-1 text-sm text-white/55">Larger builds follow the same process, with a weekly call and a staging URL throughout.</p>
                                <Button onClick={openInquiry} variant="secondary" arrow="right" className="mt-5">
                                    Book a discovery call
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <ol ref={listRef} className="space-y-5 lg:col-span-7 lg:space-y-8">
                    {steps.map((step, i) => (
                        <li key={step.week} className="lg:sticky" style={{ top: `calc(7rem + ${i * 1.5}rem)` }}>
                            <Card className="bg-surface p-7 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.9)] md:p-9">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-canvas text-white">
                                            <Icon icon={step.icon} size={22} />
                                        </span>
                                        <span className="font-mono text-xs text-white/55">
                                            {String(i + 1).padStart(2, "0")} · {step.week}
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">{step.title}</h3>
                                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">{step.description}</p>
                                    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
                                        {step.deliverables.map((d) => (
                                            <li key={d} className="flex items-start gap-2.5 text-sm text-white/70">
                                                <Icon icon={Tick02Icon} size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                            </Card>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
