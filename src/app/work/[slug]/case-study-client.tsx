"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Target, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseStudyClientProps {
    project: {
        id: string;
        title: string;
        category: string;
        summary: string;
        image: string;
        coverImage?: string;
        tech: string[];
        metrics: { label: string; value: string }[];
        caseStudy?: {
            problem: string;
            strategy: string;
            blueprint: string[];
            results: { metric: string; value: string; description: string }[];
        };
    };
}

export function CaseStudyClient({ project }: CaseStudyClientProps) {
    const cs = project.caseStudy;

    if (!cs) return null;

    return (
        <main className="min-h-screen bg-[#060606] pt-24 pb-20">
            {/* Hero Banner */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/80 to-[#060606] z-10"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.coverImage || project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 py-20 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/#portfolio"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-[#C8FF00] text-sm font-mono mb-8 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-[11px] font-mono uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[11px] font-mono uppercase tracking-wider inline-flex items-center gap-1">
                                <Sparkles size={10} /> Case Study
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6 max-w-4xl">
                            {project.title}
                        </h1>

                        <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
                            {project.summary}
                        </p>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 text-xs font-mono">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Metrics Bar */}
            <section className="container mx-auto px-6 -mt-4 mb-20">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {cs.results.map((r, i) => (
                        <div key={r.metric} className="bg-[#0a0a0a] px-6 py-8 text-center group hover:bg-[#0f0f0f] transition-colors duration-500">
                            <motion.p
                                className="text-2xl md:text-3xl font-bold text-[#C8FF00] mb-1"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: "spring" }}
                            >
                                {r.value}
                            </motion.p>
                            <p className="text-white/20 text-[10px] md:text-xs font-mono tracking-wider uppercase">{r.metric}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Case Study Content */}
            <div className="container mx-auto px-6 max-w-5xl">

                {/* The Problem */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <Target size={18} className="text-red-400" />
                        </div>
                        <span className="text-red-400/80 text-[11px] font-mono tracking-[0.2em] uppercase">The Problem</span>
                    </div>
                    <div className="relative pl-6 border-l-2 border-red-500/20">
                        <p className="text-white/60 text-lg leading-[1.8] font-light">
                            {cs.problem}
                        </p>
                    </div>
                </motion.section>

                {/* The Strategy */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center">
                            <Lightbulb size={18} className="text-[#C8FF00]" />
                        </div>
                        <span className="text-[#C8FF00]/80 text-[11px] font-mono tracking-[0.2em] uppercase">The Strategy</span>
                    </div>
                    <div className="relative pl-6 border-l-2 border-[#C8FF00]/20">
                        <p className="text-white/60 text-lg leading-[1.8] font-light">
                            {cs.strategy}
                        </p>
                    </div>
                </motion.section>

                {/* The Blueprint */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Wrench size={18} className="text-blue-400" />
                        </div>
                        <span className="text-blue-400/80 text-[11px] font-mono tracking-[0.2em] uppercase">The Blueprint</span>
                    </div>
                    <div className="space-y-4">
                        {cs.blueprint.map((step, i) => (
                            <motion.div
                                key={i}
                                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle2 size={14} className="text-blue-400" />
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* The Results */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <TrendingUp size={18} className="text-emerald-400" />
                        </div>
                        <span className="text-emerald-400/80 text-[11px] font-mono tracking-[0.2em] uppercase">What It Includes</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {cs.results.map((r, i) => (
                            <motion.div
                                key={r.metric}
                                className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p className="text-3xl md:text-4xl font-bold text-[#C8FF00] mb-2">{r.value}</p>
                                <p className="text-white font-medium text-sm mb-2">{r.metric}</p>
                                <p className="text-white/30 text-sm leading-relaxed">{r.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center py-16 border-t border-white/[0.06]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Have a project in mind?
                    </h3>
                    <p className="text-white/30 text-sm mb-8 max-w-md mx-auto">
                        Tell me what you want to build and I will reply with next steps.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 text-sm rounded-full">
                                Start Your Project
                                <ArrowUpRight size={16} className="ml-1" />
                            </Button>
                        </Link>
                        <Link href="/#portfolio">
                            <Button variant="secondary" className="h-12 px-8 text-sm rounded-full">
                                View More Work
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
