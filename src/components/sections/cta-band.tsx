"use client";

import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Magnetic, Reveal, WordReveal } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site";

const marqueeItems = ["SaaS Products", "AI Features", "MVPs", "Internal Tools", "Dashboards", "APIs", "Web Platforms", "Automation"];

export function CtaBand({
    title = "Have a project in mind?",
    subtitle = "Tell us what you're building. We reply within 24–48 hours with questions, a rough scope and next steps.",
}: {
    title?: string;
    subtitle?: string;
}) {
    const { openInquiry } = useInquiry();

    return (
        <section className="relative z-10 py-20 md:py-28 overflow-hidden" aria-label="Start a project">
            {/* Scrolling words behind the card */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none opacity-[0.06]">
                <div className="marquee" style={{ ["--marquee-duration" as string]: "40s" } as React.CSSProperties}>
                    {[...marqueeItems, ...marqueeItems].map((m, i) => (
                        <span key={i} className="mx-6 whitespace-nowrap text-[18vw] md:text-[10vw] font-bold leading-none tracking-tighter text-white">
                            {m} <span className="text-[#C8FF00]">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-5 sm:px-6">
                <Reveal>
                    <div className="conic-border relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#0a0a0a]/90 backdrop-blur-xl px-6 py-14 sm:px-12 md:py-20 text-center">
                        <div className="aurora opacity-70" />
                        <div className="absolute inset-0 grid-backdrop opacity-60" />

                        <div className="relative">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8FF00]/25 bg-[#C8FF00]/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8FF00] mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
                                Free project consultation
                            </span>
                            <h2 className="mx-auto max-w-3xl text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance mb-5">
                                <WordReveal text={title} />
                            </h2>
                            <p className="mx-auto max-w-xl text-white/55 text-base md:text-lg font-light leading-relaxed mb-10">{subtitle}</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Magnetic>
                                    <button
                                        onClick={openInquiry}
                                        className="btn-shine group inline-flex items-center gap-2 rounded-full bg-[#C8FF00] px-9 h-14 text-base font-bold text-black shadow-[0_0_50px_-8px_rgba(200,255,0,0.6)] hover:bg-[#d4ff33] transition-colors cursor-pointer"
                                    >
                                        Get your free quote
                                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </button>
                                </Magnetic>
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
                                >
                                    <Mail size={16} />
                                    {siteConfig.emails.inbound}
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
