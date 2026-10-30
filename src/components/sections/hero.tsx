"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown01Icon, ArrowUpRight01Icon, CodeIcon, Invoice01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { HeroMockup } from "@/components/sections/hero-mockup";
import { Enter } from "@/components/ui/enter";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/interactive";
import { siteConfig } from "@/config/site";

const [starter, product] = siteConfig.pricing;

const trust = [
    { icon: CodeIcon, text: "100% code ownership" },
    { icon: Invoice01Icon, text: "Fixed quote up front" },
    { icon: UserIcon, text: "Direct with the engineer" },
];

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Go", "PostgreSQL"];

/** One headline word that rises into place; see .rise-word in globals.css. */
function Rise({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
    return (
        <span className={`rise-word ${className ?? ""}`} style={{ ["--d" as string]: `${delay}ms` } as React.CSSProperties}>
            {children}
        </span>
    );
}

/**
 * Light opening panel: the studio's one-line promise with the key phrase marked in the accent, a product
 * mockup on the right, and the facts a buyer wants first. `data-nav-light` tells the navbar to use dark text
 * while it sits over this section.
 */
export function Hero() {
    const { openInquiry } = useInquiry();
    const ref = useRef<HTMLElement>(null);
    // As the hero scrolls away the mockup drifts up a little faster than the copy.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const visualY = useTransform(scrollYProgress, [0, 1], [0, -70]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

    return (
        <section ref={ref} id="hero" data-nav-light className="relative overflow-hidden bg-paper pt-28 text-ink md:pt-32" aria-label="Introduction">
            <div className="container mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    <motion.div style={{ y: copyY }} className="flex flex-col items-start lg:col-span-6 lg:pt-8">
                        <Enter as="p" className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
                            <span aria-hidden className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5c8a00]/60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5c8a00]" />
                            </span>
                            Independent software studio · {siteConfig.location.city}
                        </Enter>

                        <h1 className="mt-7 text-[clamp(2.25rem,9.4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[clamp(3.25rem,6.6vw,4.75rem)] md:mt-8 lg:text-[4rem] xl:text-[4.5rem]">
                            <span className="sr-only">Your next product, built right from day one.</span>
                            <span aria-hidden className="block">
                                <Rise delay={0}>Your</Rise> <Rise delay={60}>next</Rise> <Rise delay={120}>product.</Rise>
                            </span>
                            <span aria-hidden className="block">
                                <Rise delay={220}>
                                    <span className="rounded-[0.22em] bg-accent px-[0.12em] -mx-[0.12em] [box-decoration-break:clone]">Built right,</span>
                                </Rise>
                            </span>
                            <span aria-hidden className="block">
                                <Rise delay={300}>from</Rise> <Rise delay={340}>day</Rise> <Rise delay={380}>one.</Rise>
                            </span>
                        </h1>

                        <Enter as="p" delay={0.25} className="mt-7 max-w-md text-lg leading-relaxed text-ink/70 text-pretty md:text-xl">
                            SaaS products, AI features and websites, built directly with the engineer who ships them. Clear pricing, full code ownership, no agency
                            runaround.
                        </Enter>

                        <Enter delay={0.35} className="mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
                            <Magnetic className="w-full sm:w-auto">
                                <Button variant="dark" size="lg" arrow="up-right" onClick={openInquiry} className="w-full sm:w-auto">
                                    Get a free quote
                                </Button>
                            </Magnetic>
                            <Link
                                href="/work"
                                className="link-draw inline-flex min-h-11 items-center gap-1.5 self-center text-base font-semibold text-ink"
                            >
                                Explore our work
                                <Icon icon={ArrowUpRight01Icon} size={18} />
                            </Link>
                        </Enter>

                        <Enter as="ul" delay={0.45} className="mt-12 grid w-full grid-cols-3 divide-x divide-ink/15">
                            {trust.map((t) => (
                                <li key={t.text} className="flex items-center gap-3 pr-3 first:pl-0 [&:not(:first-child)]:pl-4">
                                    <Icon icon={t.icon} size={24} className="hidden flex-shrink-0 text-ink sm:block" />
                                    <span className="text-[13px] leading-snug text-ink/80 md:text-[15px]">{t.text}</span>
                                </li>
                            ))}
                        </Enter>
                    </motion.div>

                    <motion.div style={{ y: visualY }} className="lg:col-span-6">
                        <HeroMockup className="mx-auto max-w-[720px]" />
                    </motion.div>
                </div>

                {/* Bottom strip */}
                <Enter delay={0.5} className="mt-12 flex flex-col gap-3 border-t border-ink/15 py-5 font-mono text-xs uppercase tracking-[0.14em] text-ink/60 sm:flex-row sm:items-center sm:justify-between md:mt-16">
                    <span className="flex items-center gap-3">
                        <Icon icon={ArrowDown01Icon} size={14} className="hidden md:block" />
                        Websites from {starter.price.replace("+", "")} · SaaS from {product.price.replace("+", "")}
                    </span>
                    <span className="hidden md:block">{stack.join(" · ")}</span>
                </Enter>
            </div>
        </section>
    );
}
