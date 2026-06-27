"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Linkedin, Mail, Award, Briefcase, Clock } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "IP Transfer", label: "Full Code Ownership" },
    { icon: Clock, value: "TypeScript/Go", label: "Modern Architecture" },
    { icon: Award, value: "SLA Support", label: "Post Launch Support" },
];

export function Founder() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="founder" className="py-20 md:py-32 relative z-10" aria-label="Meet the Founder" ref={sectionRef}>
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <span className="text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block">
                        Faces Behind The Code
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                        Meet the Engineer<br />
                        <span className="text-white/25">Behind StackWise.</span>
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    {/* Left: Photo */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <div className="relative group">
                            {/* Glow behind image */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#C8FF00]/10 via-transparent to-[#C8FF00]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] group-hover:border-[#C8FF00]/20 transition-all duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/founder-portrait.webp"
                                    alt="Yash Suthar — Founder of StackWise"
                                    className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.02]"
                                    loading="lazy"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-60" />

                                {/* Name overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-1">Yash Suthar</h3>
                                    <p className="text-[#C8FF00]/80 text-sm font-mono">Founder & Lead Engineer</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center">
                                    <Code2 size={18} className="text-[#C8FF00]" />
                                </div>
                                <span className="text-white/40 text-xs font-mono tracking-wider uppercase">Philosophy</span>
                            </div>

                            <blockquote className="text-white/70 text-lg md:text-xl leading-[1.8] font-light border-l-2 border-[#C8FF00]/30 pl-6">
                                &quot;I believe every line of code should serve a clear business outcome — to make your systems faster, your users happier, and your operational efficiency higher. We design software architectures that function as highly scalable assets for our clients.&quot;
                            </blockquote>

                            <p className="text-white/40 text-sm leading-[1.8]">
                                I started StackWise with a simple obsession: build digital products so fast, so beautiful, and so technically superior that clients never have to worry about their tech again. Every project gets my personal attention — from the architecture blueprint to the final Lighthouse score.
                            </p>

                            <p className="text-white/40 text-sm leading-[1.8]">
                                My stack is hyper-modern by choice: Next.js, TypeScript, Tailwind, and cloud-native infrastructure. I don&apos;t use WordPress templates. I don&apos;t cut corners.
                                I engineer digital perfection — and my clients&apos; results speak louder than any pitch deck ever could.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-6 border-t border-white/[0.06]">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                                    >
                                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                                        <p className="text-white/20 text-[10px] font-mono tracking-wider uppercase">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex items-center gap-4 pt-4">
                                <a
                                    href="https://linkedin.com/in/yashsuthar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-sm hover:text-[#C8FF00] hover:border-[#C8FF00]/20 transition-all duration-300"
                                >
                                    <Linkedin size={16} />
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:yashrsuthar90@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 text-sm hover:text-[#C8FF00] hover:border-[#C8FF00]/20 transition-all duration-300"
                                >
                                    <Mail size={16} />
                                    Email Directly
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
