"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloudUploadIcon, CodeIcon, PenTool03Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Tilt } from "@/components/ui/interactive";
import { useReached } from "@/components/ui/use-reached";

const steps = [
    {
        week: "Week 1",
        title: "Plan",
        description: "We learn your business, users and goals, then agree on scope, a technical plan and a timeline.",
        deliverables: ["Requirements and scope", "Technical plan", "Timeline and milestones"],
        icon: Search01Icon,
    },
    {
        week: "Week 2",
        title: "Design",
        description: "Clickable Figma designs, so you see exactly what you're getting before any code is written.",
        deliverables: ["Wireframes for every screen", "Final visual design", "Clickable prototype"],
        icon: PenTool03Icon,
    },
    {
        week: "Week 3",
        title: "Build",
        description: "We build the front end, back end, database and integrations, and you follow along on a live staging link.",
        deliverables: ["Front end and APIs", "Login and payments", "Staging link and updates"],
        icon: CodeIcon,
    },
    {
        week: "Week 4",
        title: "Launch",
        description: "Testing on every device, a speed and security pass, a final review with you, and launch.",
        deliverables: ["Device and browser testing", "Speed and security check", "Launch and handover"],
        icon: CloudUploadIcon,
    },
];

/** The step's icon pops in with a little spring when its card is reached. */
function StepIcon({ icon }: { icon: (typeof steps)[number]["icon"] }) {
    const [ref, reached] = useReached<HTMLSpanElement>(40);
    return (
        <motion.span
            ref={ref}
            initial={{ scale: 0.5, rotate: -20 }}
            animate={reached ? { scale: 1, rotate: 0 } : undefined}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-black"
        >
            <Icon icon={icon} size={22} />
        </motion.span>
    );
}

export function ProcessTimeline() {
    const { openInquiry } = useInquiry();

    return (
        <section id="process" className="relative py-20 md:py-28" aria-label="How we work">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="How it works"
                    title="From first call to launch in four weeks."
                    description="A simple website takes about four weeks. Bigger products follow the same steps over a longer timeline, with a weekly call and a staging link throughout."
                />

                <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <StaggerItem key={step.week} className="h-full">
                            <Tilt className="h-full" max={6}>
                                <div className="flex h-full flex-col rounded-3xl bg-surface p-7 transition-colors duration-300 hover:bg-surface-2">
                                    <div className="flex items-center justify-between">
                                        <StepIcon icon={step.icon} />
                                        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/70">{step.week}</span>
                                    </div>
                                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{step.title}</h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-white/60">{step.description}</p>
                                    <ul className="mt-auto space-y-2.5 pt-7">
                                        {step.deliverables.map((d) => (
                                            <li key={d} className="flex items-start gap-2.5 text-sm text-white/75">
                                                <Icon icon={Tick02Icon} size={16} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-accent" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Tilt>
                        </StaggerItem>
                    ))}
                </Stagger>

                <Reveal className="mt-6 flex flex-col gap-5 rounded-3xl bg-surface p-7 sm:flex-row sm:items-center sm:justify-between md:px-9">
                    <div>
                        <p className="text-lg font-semibold text-white">Not sure how long yours will take?</p>
                        <p className="mt-1 text-[15px] text-white/60">Tell us what you need and you&apos;ll get a timeline with your quote.</p>
                    </div>
                    <Button onClick={openInquiry} arrow="right" className="flex-shrink-0">
                        Get a timeline
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
