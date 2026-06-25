"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Gauge } from "lucide-react";

import { technologies } from "@/lib/data";

const coreStack = [
    {
        name: "Next.js",
        tagline: "React framework for production",
        logo: "/logos/nextjs.svg",
    },
    {
        name: "TypeScript",
        tagline: "Type-safe JavaScript",
        logo: "/logos/typescript.svg",
    },
    {
        name: "React",
        tagline: "Component architecture",
        logo: "/logos/react.svg",
    },
    {
        name: "TailwindCSS",
        tagline: "Utility-first CSS",
        logo: "/logos/tailwindcss.svg",
    },
    {
        name: "Node.js",
        tagline: "Server-side runtime",
        logo: "/logos/nodejs.svg",
    },
    {
        name: "PostgreSQL",
        tagline: "Scalable SQL database",
        logo: "/logos/postgresql.svg",
    },
    {
        name: "AWS",
        tagline: "Cloud infrastructure",
        logo: "/logos/aws.svg",
    },
];

const techStack = [
    ...coreStack,
    ...technologies.map((tech) => ({
        name: tech.name,
        tagline: tech.description,
        logo: tech.icon,
    })),
];


const lighthouseScores = [
    { label: "Performance", score: 100, color: "#0CCE6B" },
    { label: "Accessibility", score: 100, color: "#0CCE6B" },
    { label: "Best Practices", score: 100, color: "#0CCE6B" },
    { label: "SEO", score: 100, color: "#0CCE6B" },
];

export function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="tech-stack" className="py-20 md:py-32 relative z-10" aria-label="Our technology stack" ref={sectionRef}>
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="max-w-3xl">
                        <span className="text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block">
                            <Zap size={12} className="inline mr-1.5 -mt-0.5" />
                            Technology
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                            The Tech<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">We Wield.</span>
                        </h2>
                    </div>
                    <p className="text-white/30 text-sm max-w-sm mt-6 md:mt-0 leading-relaxed">
                        No WordPress templates. No drag-and-drop builders. We write elite, hand-crafted code with a hyper-modern stack.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Tech Grid */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    className="group p-4 rounded-xl bg-[#0d0d0d]/80 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 text-center hover:bg-[#111] cursor-default"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.05 + index * 0.03 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={tech.logo}
                                            alt={tech.name}
                                            className="w-10 h-10 object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-0.5 group-hover:text-[#C8FF00] transition-colors duration-300">
                                        {tech.name}
                                    </h4>
                                    <p className="text-white/20 text-[10px] font-mono">{tech.tagline}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Lighthouse Scores */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="p-6 md:p-8 rounded-2xl bg-[#0d0d0d] border border-white/[0.06] relative overflow-hidden">
                            {/* Subtle glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#0CCE6B]/10 blur-[60px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Gauge size={20} className="text-[#0CCE6B]" />
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Lighthouse Scores</h3>
                                        <p className="text-white/30 text-xs font-mono">Google PageSpeed Insights</p>
                                    </div>
                                </div>

                                {/* Score Circles */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {lighthouseScores.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            className="text-center"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: "spring" }}
                                        >
                                            <div className="relative w-20 h-20 mx-auto mb-3">
                                                {/* Background circle */}
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                                    <motion.circle
                                                        cx="40" cy="40" r="34" fill="none"
                                                        stroke={item.color}
                                                        strokeWidth="6"
                                                        strokeLinecap="round"
                                                        strokeDasharray={`${2 * Math.PI * 34}`}
                                                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                                                        animate={isInView ? { strokeDashoffset: 0 } : {}}
                                                        transition={{ duration: 1.5, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                                                        style={{ filter: `drop-shadow(0 0 6px ${item.color}40)` }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xl font-bold text-white">{item.score}</span>
                                                </div>
                                            </div>
                                            <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Proof banner */}
                                <div className="p-4 rounded-xl bg-[#0CCE6B]/5 border border-[#0CCE6B]/10 text-center">
                                    <p className="text-[#0CCE6B]/80 text-xs font-mono tracking-wider">
                                        100 / 100 / 100 / 100 — EVERY. SINGLE. PROJECT.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
