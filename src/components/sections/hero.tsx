"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Location01Icon, Mail01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { ProjectDeck } from "@/components/sections/project-deck";
import { Enter } from "@/components/ui/enter";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CircularBadge, Magnetic } from "@/components/ui/interactive";
import { allWork } from "@/lib/more-work";
import { siteConfig } from "@/config/site";

const things = ["SaaS product.", "website.", "AI assistant.", "MVP.", "internal tool.", "mobile app."];

const promises = ["Reply within 24–48 hours", "Written quote before we start", "You own 100% of the code"];

/** The last line of the headline: cycles through what we build. */
function RotatingWord() {
    const [i, setI] = useState(0);
    const reduced = useReducedMotion();

    useEffect(() => {
        if (reduced) return;
        const t = setInterval(() => setI((v) => (v + 1) % things.length), 2400);
        return () => clearInterval(t);
    }, [reduced]);

    return (
        <span className="relative inline-flex overflow-hidden pb-[0.1em] align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={things[i]}
                    initial={{ y: "100%", rotate: 4 }}
                    animate={{ y: "0%", rotate: 0 }}
                    exit={{ y: "-100%", rotate: -4 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block whitespace-nowrap text-accent"
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

export function Hero() {
    const { openInquiry } = useInquiry();
    const ref = useRef<HTMLElement>(null);
    // As the hero scrolls away, the deck drifts up and tilts back while the copy sinks a little.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const deckY = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const deckRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);

    return (
        <section ref={ref} id="hero" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" aria-label="Introduction">
            <div className="container mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
                    <motion.div style={{ y: copyY }} className="flex flex-col items-start lg:col-span-6">
                        <Enter className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-[13px] font-medium text-white/80">
                            <Icon icon={Location01Icon} size={15} className="text-accent" />
                            Software studio in {siteConfig.location.city}
                        </Enter>

                        <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl xl:text-[5.4rem]">
                            <span className="sr-only">Let&apos;s build your SaaS product, website, AI assistant, MVP, internal tool or mobile app.</span>
                            <span aria-hidden className="block">
                                <Rise delay={0}>Let&apos;s</Rise> <Rise delay={70}>build</Rise> <Rise delay={140}>your</Rise>
                            </span>
                            <span aria-hidden className="block">
                                <Rise delay={240}>
                                    <RotatingWord />
                                </Rise>
                            </span>
                        </h1>

                        <Enter as="p" delay={0.25} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 text-pretty">
                            StackWise designs and builds SaaS products, AI features, custom software and websites for startups and growing businesses. You
                            work directly with the engineer, get a written quote up front, and own every line of code.
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

                        <Enter as="ul" delay={0.45} className="mt-8 flex flex-col gap-x-6 gap-y-2.5 text-sm text-white/65 sm:flex-row sm:flex-wrap">
                            {promises.map((p) => (
                                <li key={p} className="flex items-center gap-2">
                                    <Icon icon={Tick02Icon} size={16} strokeWidth={2} className="text-accent" />
                                    {p}
                                </li>
                            ))}
                        </Enter>
                    </motion.div>

                    <motion.div style={{ y: deckY, rotate: deckRotate }} className="relative lg:col-span-6">
                        <ProjectDeck projects={allWork} />
                        <CircularBadge text="Get a free quote" onClick={() => openInquiry()} className="absolute -left-6 top-[4%] z-20 hidden lg:flex" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
