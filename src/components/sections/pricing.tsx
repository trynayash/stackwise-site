"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Check, Shield } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { cn } from "@/lib/utils";

export function Pricing() {
    const { openInquiry } = useInquiry();

    return (
        <section id="pricing" className="py-20 md:py-24 relative z-10" aria-label="Pricing plans">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] bg-[#C8FF00]/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block">Pricing</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-4">Invest in<br /><span className="text-white/25">Excellence.</span></h2>
                    <p className="text-white/30 text-sm">Transparent pricing for world-class engineering solutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {siteConfig.pricing.map((plan, index) => (
                        <motion.div key={plan.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={cn("h-full", plan.highlight ? "md:-mt-4 md:-mb-4 z-10" : "")}>
                            <Card variant={plan.highlight ? "neon" : "glass"} className={cn("h-full p-8 flex flex-col relative", plan.highlight ? "bg-black/60 border-[#C8FF00]/30 shadow-[0_0_40px_-10px_rgba(200,255,0,0.15)]" : "bg-white/[0.03]")}>
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-[#C8FF00] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">RECOMMENDED</span>
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-medium text-white mb-2">{plan.title}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                        {plan.price !== "Custom" && <span className="text-white/40 text-sm">/build</span>}
                                    </div>
                                    <p className="text-white/50 text-sm mt-4 min-h-[40px]">{plan.description}</p>
                                </div>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-white/70 leading-normal">
                                            <div className={cn("flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 mt-0.5", plan.highlight ? "bg-[#C8FF00]/20 text-[#C8FF00]" : "bg-white/10 text-white/50")}>
                                                <Check size={12} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={plan.highlight ? "primary" : "outline"}
                                    onClick={openInquiry}
                                    className="w-full h-14 mt-auto text-base font-bold"
                                >
                                    {plan.title === "Scale" ? "Let's Talk" : "Get Started"}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div className="mt-16 text-center flex items-center justify-center gap-2 text-white/30 text-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <Shield size={16} className="text-[#C8FF00]/60" />
                    <span>All projects backed by full intellectual property transfer upon final delivery</span>
                </motion.div>

            </div>
        </section>
    );
}
export default Pricing;
