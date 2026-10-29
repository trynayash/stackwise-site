"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Code2, LifeBuoy, FileLock2 } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { HeroVisual } from "@/components/three/hero-visual";
import { Magnetic, WordReveal } from "@/components/ui/motion-primitives";

const trustPoints = [
    { icon: Code2, label: "100% code & IP ownership" },
    { icon: LifeBuoy, label: "Post-launch support included" },
    { icon: FileLock2, label: "NDA before discovery" },
    { icon: ShieldCheck, label: "Reply within 24–48 hours" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
    const { openInquiry } = useInquiry();
    const showcaseRef = useRef<HTMLDivElement>(null);

    // Product shot starts tilted back in 3D and straightens as it scrolls into view.
    const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start end", "center center"] });
    const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const showcaseOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="relative overflow-hidden pt-28 md:pt-32 pb-10" aria-label="Hero">
            {/* Backdrops */}
            <div className="absolute inset-0 -z-0 pointer-events-none">
                <div className="aurora" />
                <div className="absolute inset-0 grid-backdrop" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060606] to-transparent" />
            </div>

            <div className="container mx-auto px-5 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[calc(100svh-8rem)]">
                    {/* Copy */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.a
                            href="#portfolio"
                            onClick={scrollToSection("portfolio")}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="group mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-4 py-1.5 backdrop-blur-sm hover:border-[#C8FF00]/30 transition-colors"
                        >
                            <span className="rounded-full bg-[#C8FF00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">Open</span>
                            <span className="text-xs text-white/60">Taking new projects this quarter</span>
                            <ArrowRight size={12} className="text-[#C8FF00] transition-transform group-hover:translate-x-0.5" />
                        </motion.a>

                        <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-[5.4rem] font-bold tracking-[-0.045em] text-white text-balance mb-6">
                            <WordReveal text="Give your custom software" immediate />{" "}
                            <WordReveal
                                text="the codebase it deserves."
                                immediate
                                delay={0.25}
                                wordClassName="bg-gradient-to-r from-[#C8FF00] via-[#dfff6b] to-[#9EFF00] bg-clip-text text-transparent"
                            />
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                            className="text-base md:text-lg text-white/55 leading-relaxed font-light max-w-xl mb-9"
                        >
                            StackWise is a software studio by Yash Suthar. We design and build{" "}
                            <span className="text-white/85">SaaS products</span>, <span className="text-white/85">custom software</span> and{" "}
                            <span className="text-white/85">AI features</span> — clean, typed code you fully own.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10"
                        >
                            <Magnetic>
                                <button
                                    onClick={openInquiry}
                                    className="btn-shine group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C8FF00] px-8 h-14 text-base font-bold text-black shadow-[0_0_40px_-6px_rgba(200,255,0,0.55)] hover:shadow-[0_0_60px_-4px_rgba(200,255,0,0.7)] hover:bg-[#d4ff33] transition-all cursor-pointer"
                                >
                                    Get a free quote
                                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            </Magnetic>
                            <button
                                onClick={scrollToSection("services")}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-8 h-14 text-base font-semibold text-white/80 hover:text-white hover:bg-white/[0.07] hover:border-white/25 backdrop-blur-sm transition-all cursor-pointer"
                            >
                                Explore services
                            </button>
                        </motion.div>

                        <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
                            className="grid grid-cols-2 gap-x-5 gap-y-3 text-left max-w-xl"
                        >
                            {trustPoints.map(({ icon: Icon, label }) => (
                                <motion.li
                                    key={label}
                                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                    className="flex items-center gap-2 text-[13px] text-white/50"
                                >
                                    <Icon size={15} className="text-[#C8FF00] flex-shrink-0" />
                                    {label}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* 3D model */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                        className="lg:col-span-5 relative h-[340px] sm:h-[420px] lg:h-[600px] -mx-5 sm:mx-0"
                    >
                        <HeroVisual className="absolute inset-0" />
                        {/* Floating labels around the model */}
                        <FloatingTag className="left-[4%] top-[18%]" delay={1.1} label="Frontend" sub="Next.js · React" />
                        <FloatingTag className="right-[2%] top-[42%]" delay={1.3} label="API & Data" sub="Node · Go · Postgres" />
                        <FloatingTag className="left-[10%] bottom-[14%]" delay={1.5} label="AI layer" sub="LLMs · RAG · Agents" />
                    </motion.div>
                </div>

                {/* Product showcase with scroll-driven 3D tilt */}
                <div ref={showcaseRef} className="relative mt-6 md:mt-10" style={{ perspective: "1400px" }}>
                    <motion.div style={{ rotateX, scale, opacity: showcaseOpacity, transformOrigin: "center top" }} className="relative mx-auto max-w-5xl">
                        <div className="absolute -inset-x-10 -top-10 h-40 bg-[#C8FF00]/20 blur-[90px] rounded-full pointer-events-none" />
                        <div className="relative rounded-2xl border border-white/10 bg-black/50 p-1.5 sm:p-2 backdrop-blur-sm shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                            <div className="flex items-center gap-1.5 px-3 py-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#C8FF00]/70" />
                                <span className="ml-3 hidden sm:block text-[10px] font-mono text-white/30">app.your-product.com/dashboard</span>
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/hero-product.webp"
                                alt="Example SaaS dashboard interface designed and built by StackWise"
                                className="w-full h-auto rounded-xl border border-white/[0.05]"
                                width={1536}
                                height={1024}
                                fetchPriority="high"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FloatingTag({ className, label, sub, delay }: { className: string; label: string; sub: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay, ease: EASE }}
            className={`absolute z-10 hidden sm:block pointer-events-none ${className}`}
        >
            <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-2.5 shadow-xl" style={{ animation: `floatY 5s ease-in-out ${delay}s infinite` }}>
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
                    <span className="text-xs font-semibold text-white">{label}</span>
                </div>
                <span className="block mt-0.5 pl-3.5 text-[10px] font-mono text-white/40">{sub}</span>
            </div>
        </motion.div>
    );
}
