"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site";
import { Card } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export function Testimonials() {
    const row1 = siteConfig.engineeringPrinciples.slice(0, 3);
    const row2 = siteConfig.engineeringPrinciples.slice(3, 6);

    return (
        <section id="testimonials" className="py-20 md:py-32 relative z-10 overflow-hidden" aria-label="Engineering principles">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C8FF00]/3 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-5 sm:px-6 relative z-10">
                <SectionHeader
                    align="center"
                    eyebrow="Our creed"
                    title="Engineering"
                    muted="principles."
                    description="How we architect, code and deploy the software we hand over to you."
                />
            </div>

            <div className="relative z-10">
                <div className="flex mb-8 relative">
                    <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity }}>
                        {[...row1, ...row1, ...row1].map((p, i) => (<PrincipleCard key={`${p.title}-${i}`} principle={p} />))}
                    </motion.div>
                </div>
                <div className="flex relative">
                    <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
                        {[...row2, ...row2, ...row2].map((p, i) => (<PrincipleCard key={`${p.title}-${i}`} principle={p} />))}
                    </motion.div>
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#060606] via-[#060606]/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#060606] via-[#060606]/80 to-transparent z-20 pointer-events-none" />
            </div>
        </section>
    );
}

function PrincipleCard({ principle }: { principle: typeof siteConfig.engineeringPrinciples[0] }) {
    return (
        <Card variant="glass" className="w-[85vw] sm:w-[400px] md:w-[460px] p-6 sm:p-8 flex-shrink-0 whitespace-normal bg-white/[0.02] border-white/[0.06] hover:border-[#C8FF00]/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center">
                    <Cpu size={18} className="text-[#C8FF00]" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-base sm:text-lg">{principle.title}</h4>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#C8FF00] text-[10px] font-mono uppercase tracking-wider mt-1 inline-block">
                        {principle.metric}
                    </span>
                </div>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">{principle.description}</p>
        </Card>
    );
}
