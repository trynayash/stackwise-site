"use client";

import React from "react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { useInquiry } from "@/components/providers/inquiry-context";
import { CountUp } from "@/components/ui/scroll-effects";
import { Tilt } from "@/components/ui/interactive";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const included = ["Written quote before work starts", "100% code and IP ownership", "Support after launch", "NDA on request"];

export function Pricing() {
    const { openInquiry } = useInquiry();

    return (
        <section id="pricing" className="relative py-20 md:py-28" aria-label="Pricing">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="Pricing"
                    title="Clear starting prices."
                    description="Pick the closest fit and we'll send a written quote for your exact project. No hourly billing, no surprise invoices."
                />

                <Stagger className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
                    {siteConfig.pricing.map((plan) => {
                        const hi = plan.highlight;
                        return (
                            <StaggerItem key={plan.title} className="h-full">
                                <Tilt className="h-full" max={5}>
                                    <div
                                        className={cn(
                                            "flex h-full flex-col rounded-3xl p-6 min-[400px]:p-8 md:p-9",
                                            hi ? "bg-accent text-black" : "bg-surface text-white"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="text-xl font-semibold">{plan.title}</h3>
                                            {hi && <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-black px-3 py-1 text-xs font-semibold text-accent">Most popular</span>}
                                        </div>
                                        <p className={cn("mt-3 text-[15px] leading-relaxed", hi ? "text-black/70" : "text-white/60")}>{plan.description}</p>

                                        <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                                            {plan.price !== "Custom" && <span className={cn("text-sm", hi ? "text-black/60" : "text-white/55")}>from</span>}
                                            <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em] min-[400px]:text-[2.75rem] md:text-5xl lg:text-[2.6rem] xl:text-5xl">
                                                {plan.price === "Custom" ? "Custom" : <CountUp value={plan.price.replace("+", "")} duration={1.6} />}
                                            </span>
                                        </p>

                                        <ul className="mt-8 space-y-3.5">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className={cn("flex items-start gap-3 text-[15px]", hi ? "text-black/80" : "text-white/75")}>
                                                    <Icon icon={Tick02Icon} size={18} strokeWidth={2} className={cn("mt-0.5 flex-shrink-0", hi ? "text-black" : "text-accent")} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            onClick={() => openInquiry({ plan: plan.title })}
                                            variant={hi ? "dark" : "secondary"}
                                            size="lg"
                                            arrow="right"
                                            className="mt-10 w-full"
                                        >
                                            {plan.price === "Custom" ? "Talk to us" : "Get a quote"}
                                        </Button>
                                    </div>
                                </Tilt>
                            </StaggerItem>
                        );
                    })}
                </Stagger>

                <Reveal className="mt-8">
                    <p className="text-[15px] font-semibold text-white">Every plan includes</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {included.map((item) => (
                            <li key={item} className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm text-white/80">
                                <Icon icon={Tick02Icon} size={16} strokeWidth={2} className="text-accent" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-[15px] text-white/60">
                        Need a monthly retainer or a technical review instead?{" "}
                        <button
                            type="button"
                            onClick={() => openInquiry({ topic: "a monthly retainer or a technical review" })}
                            className="cursor-pointer font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent"
                        >
                            Ask us about it
                        </button>
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
