"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader } from "@/components/ui/motion-primitives";
import { Search, PenTool, Code2, Rocket, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
    {
        week: "Week 1",
        title: "Discovery & Architecture Blueprint",
        description: "We dive deep into your business, audience, and goals. By the end of the week, you have a detailed technical architecture, sitemap, and project roadmap — no ambiguity.",
        deliverables: ["Stakeholder interviews & requirements doc", "Technical architecture diagram", "Detailed project timeline & milestones", "Technology stack recommendation"],
        icon: Search,
        color: "#C8FF00",
    },
    {
        week: "Week 2",
        title: "UI/UX & High-Fidelity Prototyping",
        description: "Our design team creates pixel-perfect Figma prototypes that you can click through. You see exactly what you're getting before a single line of code is written.",
        deliverables: ["Wireframes for all screens", "High-fidelity Figma designs", "Interactive clickable prototype", "Design system & component library"],
        icon: PenTool,
        color: "#00FFC8",
    },
    {
        week: "Week 3",
        title: "Frontend & Backend Development",
        description: "We build your application with production-grade code — Next.js frontend, robust backend APIs, database setup, and third-party integrations. Daily progress updates.",
        deliverables: ["Next.js/React frontend build", "API & database integration", "Authentication & payment flows", "Daily Loom updates + staging URL"],
        icon: Code2,
        color: "#C8FF00",
    },
    {
        week: "Week 4",
        title: "QA, Optimization & Launch",
        description: "Rigorous testing across devices, Lighthouse performance optimization to hit 90+ scores, final client review, and a zero-downtime deployment to production.",
        deliverables: ["Cross-browser & device testing", "Lighthouse performance optimization", "Security audit & penetration testing", "Production deployment & handoff docs"],
        icon: Rocket,
        color: "#FFD700",
    },
];

export function ProcessTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 60%"] });
    const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section id="process" className="py-20 md:py-32 relative z-10" aria-label="Our process" ref={sectionRef}>
            <div className="container mx-auto px-5 sm:px-6">

                <SectionHeader
                    eyebrow="Our process"
                    title="From idea to launch."
                    muted="In four clear weeks."
                    description="A week-by-week process with no surprises. You always know what is happening, when, and what you get at the end of each step."
                />

                {/* Timeline */}
                <div className="relative" ref={timelineRef}>
                    {/* Vertical connector line — fills as you scroll (desktop only) */}
                    <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />
                    <motion.div
                        className="absolute left-[26px] top-0 bottom-0 w-[3px] rounded-full origin-top bg-gradient-to-b from-[#C8FF00] via-[#C8FF00] to-[#9EFF00] shadow-[0_0_14px_rgba(200,255,0,0.6)] hidden md:block"
                        style={{ scaleY: lineScale }}
                    />

                    <div className="space-y-8 md:space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.week}
                                className="relative"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                            >
                                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                    {/* Step indicator */}
                                    <div className="flex items-center md:items-start gap-4 md:flex-col md:w-14 flex-shrink-0">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                                            style={{
                                                background: `radial-gradient(circle at 30% 30%, ${step.color}22, ${step.color}0a), #0b0b0b`,
                                                border: `1px solid ${step.color}30`,
                                                boxShadow: `0 0 20px ${step.color}15`,
                                            }}
                                        >
                                            <step.icon size={22} style={{ color: step.color }} />
                                        </div>
                                        <span className="text-[#C8FF00] text-xs font-mono font-bold tracking-wider md:mt-3 md:text-center md:w-full">
                                            {step.week}
                                        </span>
                                    </div>

                                    {/* Content card */}
                                    <div className="flex-1">
                                    <TiltCard maxTilt={3} className="p-6 md:p-8">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#C8FF00] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/35 text-sm leading-relaxed mb-6">
                                            {step.description}
                                        </p>

                                        {/* Deliverables */}
                                        <div className="space-y-2.5">
                                            <span className="text-white/20 text-[10px] font-mono uppercase tracking-wider">Deliverables</span>
                                            {step.deliverables.map((d, i) => (
                                                <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
                                                    <CheckCircle2 size={14} style={{ color: step.color }} className="flex-shrink-0 opacity-60" />
                                                    {d}
                                                </div>
                                            ))}
                                        </div>
                                    </TiltCard>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-white/20 text-sm mb-5">Ready to see our process in action?</p>
                    <button
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.08] hover:text-white hover:border-[#C8FF00]/20 transition-all duration-300 group"
                    >
                        Book a Discovery Call
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
