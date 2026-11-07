"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { HeroStage } from "@/components/sections/hero-stage";
import type { WorkSummary } from "@/lib/case-studies";
import { Enter } from "@/components/ui/enter";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const [starter, product] = siteConfig.pricing;

/** The facts a buyer looks for first, in the same words the pricing section and FAQ use. */
const facts = [
    { label: "Websites from", value: starter.price.replace("+", "") },
    { label: "SaaS from", value: product.price.replace("+", "") },
    { label: "Price and timeline", value: "Fixed, in writing" },
    { label: "Code and IP", value: "100% yours" },
];

/**
 * Hairlines between the facts: a 2 x 2 grid up to lg, one row from there. The first cell in each row
 * sits flush with the container edge so its text lines up with the headline above.
 */
const factCell = [
    "",
    "border-l pl-5 sm:pl-8",
    "border-t lg:border-t-0 lg:border-l lg:pl-8",
    "border-t border-l pl-5 sm:pl-8 lg:border-t-0",
];

/** One headline word that rises into place; see .rise-word in globals.css. */
function Rise({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <span className="rise-word" style={{ ["--d" as string]: `${delay}ms` } as React.CSSProperties}>
            {children}
        </span>
    );
}

/**
 * Light opening panel. One row of copy (headline on the left; supporting line and actions on the right from xl up),
 * then two real products side by side, then a row of plain facts. Nothing overlaps: every block keeps its own space
 * at every width. `data-nav-light` tells the navbar to use dark text while it sits over this section.
 *
 * `projects` arrive from the server as summaries; the first two are shown.
 */
export function Hero({ projects }: { projects: WorkSummary[] }) {
    const { openInquiry } = useInquiry();

    return (
        <section id="hero" data-nav-light className="relative overflow-hidden bg-paper pt-28 text-ink sm:pt-32 lg:pt-36" aria-label="Introduction">
            <div className="container mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-1 xl:grid-cols-12 xl:items-end xl:gap-x-8">
                    <div className="xl:col-span-7">
                        {/* The page's H1 carries the search phrase; the big headline below is the visual hook. */}
                        <Enter as="h1" className="text-sm font-medium text-ink/60 md:text-[15px]">
                            Affordable software development company in {siteConfig.location.city}
                        </Enter>

                        <p className="mt-5 text-[length:clamp(1.75rem,calc((100vw_-_3rem)/8.6),4rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:mt-6 md:text-[4.5rem] lg:text-[5rem] 2xl:text-[6rem]">
                            <span className="block">
                                <Rise delay={0}>Your</Rise> <Rise delay={60}>next</Rise> <Rise delay={120}>product.</Rise>
                            </span>
                            {/* The promise is set in a lighter tone, so the headline reads as one statement and its answer. */}
                            <span className="block text-ink/45">
                                <Rise delay={220}>Built</Rise> <Rise delay={270}>right,</Rise>
                            </span>
                            <span className="block text-ink/45">
                                <Rise delay={320}>from</Rise> <Rise delay={360}>day</Rise> <Rise delay={400}>one.</Rise>
                            </span>
                        </p>
                    </div>

                    <div className="mt-7 md:mt-8 xl:col-span-5 xl:mt-0">
                        <Enter as="p" delay={0.25} className="max-w-[30rem] text-[17px] leading-[1.6] text-ink/65 text-balance md:text-lg">
                            SaaS products, web apps, AI features and websites at fixed prices, live in about half the usual agency time. Built by a team
                            you work with directly, and you own the code.
                        </Enter>

                        <Enter delay={0.35} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <Button variant="dark" size="lg" arrow="up-right" onClick={openInquiry} className="w-full shrink-0 sm:w-auto">
                                Get a free quote
                            </Button>
                            <Link
                                href="/work"
                                className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-[background-color,box-shadow] duration-300 hover:bg-ink/[0.04] hover:ring-ink/30 sm:w-auto"
                            >
                                Explore our work
                                <Icon icon={ArrowUpRight01Icon} size={18} />
                            </Link>
                        </Enter>
                    </div>
                </div>

                <HeroStage projects={projects} className="mt-14 md:mt-16 lg:mt-20" />

                <Enter delay={0.5}>
                    <dl className="mt-14 grid grid-cols-2 border-t border-ink/10 md:mt-20 lg:grid-cols-4">
                        {facts.map((f, i) => (
                            <div key={f.label} className={cn("min-w-0 border-ink/10 py-6 md:py-8", factCell[i])}>
                                <dt className="text-[13px] text-ink/55 md:text-sm">{f.label}</dt>
                                <dd className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-ink md:mt-2 md:text-2xl lg:text-xl xl:text-2xl">{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Enter>
            </div>
        </section>
    );
}
