"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Check, Shield, Sparkles } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

export function Pricing() {
    const { openInquiry } = useInquiry();

    return (
        <section id="pricing" className="py-20 md:py-32 relative z-10" aria-label="Pricing plans">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] bg-[#C8FF00]/[0.04] blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-5 sm:px-6 relative z-10">
                <SectionHeader
                    align="center"
                    eyebrow="Pricing"
                    title="Transparent pricing."
                    muted="No surprises."
                    description="Starting prices for each type of project. Every project gets a written quote, so you know the cost before work begins."
                />

                <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
                    {siteConfig.pricing.map((plan) => (
                        <StaggerItem key={plan.title} className={cn("h-full", plan.highlight && "md:-my-4 z-10")}>
                            <TiltCard
                                maxTilt={4}
                                className={cn(
                                    "p-7 md:p-8",
                                    plan.highlight
                                        ? "conic-border border-transparent bg-gradient-to-b from-[#C8FF00]/[0.09] to-[#0c0c0c] shadow-[0_0_60px_-15px_rgba(200,255,0,0.3)]"
                                        : "bg-white/[0.02]"
                                )}
                            >
                                <div className="flex h-full flex-col">
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                                            {plan.highlight && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#C8FF00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                                                    <Sparkles size={11} />
                                                    Recommended
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            {plan.price !== "Custom" && <span className="text-white/40 text-sm">from</span>}
                                            <span className={cn("text-4xl md:text-5xl font-bold tracking-tight", plan.highlight ? "text-[#C8FF00]" : "text-white")}>{plan.price}</span>
                                        </div>
                                        <p className="text-white/50 text-sm mt-4 leading-relaxed">{plan.description}</p>
                                    </div>

                                    <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                    <ul className="space-y-3.5 mb-8 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-white/70 leading-normal">
                                                <span
                                                    className={cn(
                                                        "flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 mt-0.5",
                                                        plan.highlight ? "bg-[#C8FF00] text-black" : "bg-white/10 text-white/60"
                                                    )}
                                                >
                                                    <Check size={12} strokeWidth={3} />
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={openInquiry}
                                        className={cn(
                                            "group/btn mt-auto inline-flex h-13 w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition-all cursor-pointer",
                                            plan.highlight
                                                ? "btn-shine bg-[#C8FF00] text-black hover:bg-[#d4ff33] shadow-[0_0_40px_-8px_rgba(200,255,0,0.6)]"
                                                : "border border-white/15 text-white hover:border-[#C8FF00] hover:text-[#C8FF00]"
                                        )}
                                    >
                                        {plan.price === "Custom" ? "Talk to us" : "Get a quote"}
                                        <ArrowUpRight size={17} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </button>
                                </div>
                            </TiltCard>
                        </StaggerItem>
                    ))}
                </Stagger>

                <Reveal className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/40 text-sm text-center">
                    <span className="inline-flex items-center gap-2">
                        <Shield size={16} className="text-[#C8FF00]/70" />
                        Full IP transfer on final delivery
                    </span>
                    <span className="hidden sm:block h-4 w-px bg-white/10" />
                    <span>
                        Not sure which fits?{" "}
                        <button onClick={openInquiry} className="text-[#C8FF00] underline underline-offset-4 decoration-[#C8FF00]/30 hover:decoration-[#C8FF00] cursor-pointer">
                            Get a custom estimate
                        </button>
                    </span>
                </Reveal>
            </div>
        </section>
    );
}
export default Pricing;
