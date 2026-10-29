"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CloudUploadIcon, CodeIcon, PenTool03Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
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

export function ProcessTimeline() {
    const { openInquiry } = useInquiry();
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start 80%", "end 70%"] });
    const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section id="process" className="relative py-20 md:py-28" aria-label="Our process">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="04"
                    eyebrow="Process"
                    title="From idea to launch"
                    muted="in four clear weeks."
                    description="A week-by-week process with no surprises. You always know what's happening, when, and what you get at the end of each step."
                />

                <div ref={gridRef} className="relative">
                    {/* Progress line across the step icons (wide screens) */}
                    <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-line xl:block" />
                    <motion.div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-accent xl:block" style={{ scaleX: lineScale }} />

                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
                        {steps.map((step, i) => (
                            <StaggerItem key={step.week} className="flex h-full flex-col">
                                <div className="relative z-10 mb-5 flex items-center gap-3">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-canvas text-white">
                                        <Icon icon={step.icon} size={22} />
                                    </span>
                                    <span className="font-mono text-xs text-white/45">
                                        {String(i + 1).padStart(2, "0")} · {step.week}
                                    </span>
                                </div>
                                <Card className="flex-1 p-6">
                                    <h3 className="text-xl font-semibold tracking-tight text-white">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/55">{step.description}</p>
                                    <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                                        {step.deliverables.map((d) => (
                                            <li key={d} className="flex items-start gap-2.5 text-sm text-white/70">
                                                <Icon icon={Tick02Icon} size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>

                <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                    <div>
                        <p className="text-base font-semibold text-white">Bigger product? Same steps.</p>
                        <p className="mt-1 text-sm text-white/55">Larger builds follow the same process, with a weekly call and a staging URL throughout.</p>
                    </div>
                    <Button onClick={openInquiry} variant="secondary" arrow="right">
                        Book a discovery call
                    </Button>
                </div>
            </div>
        </section>
    );
}
