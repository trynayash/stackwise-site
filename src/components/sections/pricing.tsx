"use client";

import React from "react";
import { ArrowRight01Icon, Compass01Icon, Key01Icon, PackageIcon, Tick02Icon, Wrench01Icon } from "@hugeicons/core-free-icons";
import { siteConfig } from "@/config/site";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/** How a client can engage, beyond the build plans above. */
const engagementModels = [
    {
        icon: PackageIcon,
        title: "Project build",
        text: "A defined scope, timeline and written quote. Best for new products, MVPs and websites.",
    },
    {
        icon: Wrench01Icon,
        title: "Ongoing partnership",
        text: "A monthly retainer after launch for fixes, security updates and new features.",
    },
    {
        icon: Compass01Icon,
        title: "Technical consulting",
        text: "Architecture reviews, stack selection and scaling advice before big decisions.",
    },
];

export function Pricing() {
    const { openInquiry } = useInquiry();

    return (
        <section id="pricing" className="relative py-20 md:py-28" aria-label="Pricing">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="06"
                    eyebrow="Pricing"
                    title="Transparent pricing."
                    muted="No surprises."
                    description="Starting prices for each type of project. Every project gets a written quote, so you know the cost before work begins."
                />

                <Stagger className="grid grid-cols-1 items-stretch gap-4 md:gap-5 lg:grid-cols-3">
                    {siteConfig.pricing.map((plan) => (
                        <StaggerItem key={plan.title} className="h-full">
                            <div
                                className={cn(
                                    "relative flex h-full flex-col rounded-2xl border p-7 md:p-8",
                                    plan.highlight ? "border-accent bg-surface-2" : "border-line bg-surface"
                                )}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                                    {plan.highlight && (
                                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">Recommended</span>
                                    )}
                                </div>
                                <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-white/55">{plan.description}</p>

                                <div className="mt-6 flex items-baseline gap-2">
                                    {plan.price !== "Custom" && <span className="text-sm text-white/55">from</span>}
                                    <span className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{plan.price}</span>
                                </div>

                                <Button
                                    onClick={openInquiry}
                                    variant={plan.highlight ? "primary" : "secondary"}
                                    arrow="right"
                                    className="mt-7 w-full"
                                >
                                    {plan.price === "Custom" ? "Talk to us" : "Get a quote"}
                                </Button>

                                <ul className="mt-8 space-y-3.5 border-t border-line pt-7">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm leading-normal text-white/70">
                                            <Icon icon={Tick02Icon} size={18} className={cn("flex-shrink-0", plan.highlight ? "text-accent" : "text-white/60")} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>

                {/* Ways to work together */}
                <div className="mt-16">
                    <Reveal>
                        <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Ways to work together</h3>
                    </Reveal>
                    <Stagger className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
                        {engagementModels.map((m) => (
                            <StaggerItem key={m.title} className="bg-canvas">
                                <button
                                    type="button"
                                    onClick={openInquiry}
                                    className="group flex h-full w-full flex-col items-start p-7 text-left transition-colors hover:bg-surface cursor-pointer"
                                >
                                    <Icon icon={m.icon} size={24} className="text-white" />
                                    <span className="mt-6 text-lg font-semibold text-white">{m.title}</span>
                                    <span className="mt-2 text-sm leading-relaxed text-white/55">{m.text}</span>
                                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 group-hover:text-white">
                                        <span className="link-draw">Discuss this</span>
                                        <Icon icon={ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </button>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>

                <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-line p-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-3 text-white/60">
                        <Icon icon={Key01Icon} size={20} className="text-white" />
                        Every plan includes full code and IP transfer on final delivery.
                    </span>
                    <button onClick={openInquiry} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent cursor-pointer">
                        Not sure which fits? Get a custom estimate
                    </button>
                </Reveal>
            </div>
        </section>
    );
}
export default Pricing;
