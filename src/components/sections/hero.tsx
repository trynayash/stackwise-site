"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { ProjectDeck } from "@/components/sections/project-deck";
import { Enter } from "@/components/ui/enter";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CircularBadge, Magnetic } from "@/components/ui/interactive";
import type { WorkSummary } from "@/lib/case-studies";
import { siteConfig } from "@/config/site";

const things = ["SaaS product.", "MVP.", "AI assistant.", "website."];

// Starting prices up front: the clearest reason to get in touch, read from the pricing config so they never drift.
const [starter, product] = siteConfig.pricing;
const facts = [
    { label: "Websites", value: `from ${starter.price.replace("+", "")}` },
    { label: "SaaS & web apps", value: `from ${product.price.replace("+", "")}` },
    { label: "Reply time", value: "24–48 hours" },
    { label: "Ownership", value: "100% of the code" },
];

/**
 * The last line of the headline: cycles through what we build. Current and outgoing words share one grid
 * cell, so the outgoing word slides up inside the clipped box and can never draw over the line above.
 */
function RotatingWord() {
    const [i, setI] = useState(0);
    const reduced = useReducedMotion();

    useEffect(() => {
        if (reduced) return;
        const t = setInterval(() => setI((v) => (v + 1) % things.length), 2600);
        return () => clearInterval(t);
    }, [reduced]);

    return (
        <span className="inline-grid overflow-hidden pb-[0.08em] align-bottom [grid-template-areas:'w']">
            <AnimatePresence initial={false}>
                <motion.span
                    key={things[i]}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="whitespace-nowrap text-accent [grid-area:w]"
                >
                    {things[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/** One headline word that rises into place; see .rise-word in globals.css. */
function Rise({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <span className="rise-word" style={{ ["--d" as string]: `${delay}ms` } as React.CSSProperties}>
            {children}
        </span>
    );
}

/** Local time in Mumbai, updated each minute. Rendered after mount so server and client markup match. */
function MumbaiTime() {
    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }));
        tick();
        const t = setInterval(tick, 30_000);
        return () => clearInterval(t);
    }, []);
    return <span className="tabular-nums">{time ? `${time} IST` : siteConfig.location.country}</span>;
}

/** `projects` come from the server as summaries, so the case-study write-ups never ship to the browser. */
export function Hero({ projects }: { projects: WorkSummary[] }) {
    const { openInquiry } = useInquiry();
    const ref = useRef<HTMLElement>(null);
    // As the hero scrolls away, the deck drifts up and tilts back while the copy sinks a little.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const deckY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const deckRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section ref={ref} id="hero" className="relative overflow-hidden pt-24 md:pt-28" aria-label="Introduction">
            <div className="container mx-auto px-5 sm:px-6">
                {/* Meta row: who, where, and that we're taking work */}
                <Enter className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[13px] text-white/55 md:text-sm">
                    <span className="flex items-center gap-2.5">
                        <span aria-hidden className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                        Taking on new projects
                    </span>
                    <span className="hidden sm:inline">Software studio</span>
                    <span>
                        {siteConfig.location.city} · <MumbaiTime />
                    </span>
                </Enter>

                {/* Headline: full width, as big as the screen allows */}
                <motion.h1
                    style={{ y: copyY }}
                    className="mt-10 text-[clamp(2.75rem,12.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[clamp(4rem,9.5vw,8rem)] md:mt-14"
                >
                    <span className="sr-only">Let&apos;s build your SaaS product, MVP, AI assistant or website.</span>
                    <span aria-hidden className="block">
                        <Rise delay={0}>Let&apos;s</Rise> <Rise delay={70}>build</Rise> <Rise delay={140}>your</Rise>
                    </span>
                    <span aria-hidden className="block">
                        <Rise delay={240}>
                            <RotatingWord />
                        </Rise>
                    </span>
                </motion.h1>

                {/* Copy and actions on the left, the work on the right */}
                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
                    <motion.div style={{ y: copyY }} className="flex flex-col items-start lg:col-span-5 lg:pt-4">
                        <Enter as="p" delay={0.25} className="max-w-md text-lg leading-relaxed text-white/65 text-pretty md:text-xl">
                            SaaS products, MVPs, AI features and fast websites for startups and growing businesses. You work directly with the engineer who
                            builds it, get a fixed written quote up front, and own every line of code.
                        </Enter>

                        <Enter delay={0.35} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Magnetic className="w-full sm:w-auto">
                                <Button size="lg" arrow="right" onClick={openInquiry} className="w-full sm:w-auto">
                                    Get a free quote
                                </Button>
                            </Magnetic>
                            <Magnetic className="w-full sm:w-auto">
                                <ButtonLink href={`mailto:${siteConfig.emails.inbound}`} variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <Icon icon={Mail01Icon} size={18} />
                                    Email us
                                </ButtonLink>
                            </Magnetic>
                        </Enter>

                        <Enter delay={0.45} className="mt-12 hidden items-center gap-2 text-sm text-white/45 lg:flex">
                            <Icon icon={ArrowDown01Icon} size={16} />
                            Scroll to see the work
                        </Enter>
                    </motion.div>

                    <motion.div style={{ y: deckY, rotate: deckRotate }} className="relative lg:col-span-7">
                        <ProjectDeck projects={projects} />
                        <CircularBadge text="Get a free quote" onClick={() => openInquiry()} className="absolute -left-4 top-[2%] z-20 hidden lg:flex" />
                    </motion.div>
                </div>

                {/* Facts strip: the four things a buyer wants to know first */}
                <Enter as="ul" delay={0.5} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 md:mt-20 md:grid-cols-4 md:pt-7">
                    {facts.map((f) => (
                        <li key={f.label}>
                            <p className="text-[13px] text-white/50">{f.label}</p>
                            <p className="mt-1 text-base font-semibold text-white md:text-lg">{f.value}</p>
                        </li>
                    ))}
                </Enter>
            </div>
        </section>
    );
}
