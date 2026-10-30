"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight01Icon, ArrowUpRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/motion-primitives";
import { useInquiry } from "@/components/providers/inquiry-context";
import type { ServiceCard, ServiceLink } from "@/lib/home-data";
import { cn } from "@/lib/utils";

/** Details for the selected service: a real project it produced, price, timeline and what's included. */
function ServicePanel({ page }: { page: ServiceCard }) {
    const { openInquiry } = useInquiry();
    const { study, price, timeline } = page;

    return (
        <div>
            {study && (
                <Link href={`/work/${study.slug}`} className="group relative block overflow-hidden rounded-3xl bg-ink">
                    <Image
                        src={study.preview}
                        alt={`${study.name}: ${study.tagline}`}
                        width={1600}
                        height={1000}
                        sizes="(min-width: 1024px) 640px, 100vw"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 text-[13px] font-medium text-white backdrop-blur">
                        Built by us: {study.name}
                        <Icon icon={ArrowUpRight01Icon} size={15} />
                    </span>
                </Link>
            )}

            <p className="mt-7 text-lg leading-relaxed text-ink/75">{page.intro}</p>

            <div className="mt-6 flex flex-wrap gap-2">
                {price && (
                    <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black">{price === "Custom quote" ? price : `From ${price}`}</span>
                )}
                {timeline && <span className="rounded-full bg-ink/[0.07] px-4 py-2 text-sm font-medium text-ink">{timeline}</span>}
            </div>

            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {page.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                        <Icon icon={Tick02Icon} size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-ink" />
                        {d}
                    </li>
                ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                    type="button"
                    onClick={() => openInquiry(page.preset)}
                    className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-8 text-base font-semibold text-white transition-colors hover:bg-black"
                >
                    Get a quote for this
                    <Icon icon={ArrowRight01Icon} size={18} />
                </button>
                <Link href={page.path} className="inline-flex h-14 items-center justify-center gap-1.5 px-4 text-base font-semibold text-ink/70 hover:text-ink">
                    More about {page.navLabel}
                    <Icon icon={ArrowRight01Icon} size={18} />
                </Link>
            </div>
        </div>
    );
}

/**
 * What we build, on a light panel: pick a service on the left, see a project it produced,
 * its starting price and what's included on the right (inline on phones).
 */
export function Services({ core, others }: { core: ServiceCard[]; others: ServiceLink[] }) {
    const [active, setActive] = useState(0);

    return (
        <section id="services" className="relative py-6 md:py-10" aria-label="Services">
            <div className="mx-2 rounded-[2rem] bg-paper py-16 text-ink sm:mx-3 md:rounded-[3rem] md:py-24">
                <div className="container mx-auto px-5 sm:px-6">
                    <Reveal className="mb-12 max-w-3xl md:mb-16">
                        <span className="text-sm font-semibold text-ink/70 md:text-[15px]">What we build</span>
                        <h2 className="mt-4 text-[2.125rem] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[2.75rem] md:text-[3.5rem] text-balance">
                            From first idea to a product people pay for.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            {core.map((page, i) => {
                                const selected = active === i;
                                return (
                                    <div key={page.slug} className="py-1">
                                        <button
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setActive(i)}
                                            onMouseEnter={() => setActive(i)}
                                            className={cn(
                                                "group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors md:py-6",
                                                selected ? "bg-white" : "hover:bg-white/50"
                                            )}
                                        >
                                            <span>
                                                <span
                                                    className={cn(
                                                        "block text-2xl font-semibold tracking-[-0.03em] transition-colors md:text-[2rem]",
                                                        selected ? "text-ink" : "text-ink/65 group-hover:text-ink/85"
                                                    )}
                                                >
                                                    {page.navLabel}
                                                </span>
                                                <span className={cn("mt-1 block text-[15px]", selected ? "text-ink/75" : "text-ink/70")}>{page.summary}</span>
                                            </span>
                                            <span
                                                className={cn(
                                                    "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                                                    selected ? "bg-accent text-black" : "bg-ink/[0.07] text-ink/70"
                                                )}
                                            >
                                                <Icon icon={page.icon} size={20} />
                                            </span>
                                        </button>

                                        {/* Phones: details open under the chosen service */}
                                        <AnimatePresence initial={false}>
                                            {selected && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden px-1 lg:hidden"
                                                >
                                                    <div className="pb-6 pt-4">
                                                        <ServicePanel page={page} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        <div aria-live="polite" className="hidden lg:col-span-7 lg:block">
                            <div className="sticky top-28">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={core[active].slug}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <ServicePanel page={core[active]} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <Reveal className="mt-16 md:mt-20">
                        <p className="text-[15px] font-semibold text-ink">We also do</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {others.map((p) => (
                                <li key={p.path}>
                                    <Link
                                        href={p.path}
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
                                    >
                                        <Icon icon={p.icon} size={16} />
                                        {p.navLabel}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
