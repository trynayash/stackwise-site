"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import type { WorkSummary } from "@/lib/case-studies";

// Where each card sits by its distance from the front of the deck.
const STACK = [
    { x: "0%", y: "0%", scale: 1, rotate: 0, opacity: 1 },
    { x: "6%", y: "-15%", scale: 0.92, rotate: 4, opacity: 0.85 },
    { x: "11%", y: "-28%", scale: 0.84, rotate: 8, opacity: 0.5 },
];
const LEAVING = { x: "-16%", y: "14%", scale: 0.94, rotate: -6, opacity: 0 };
const HIDDEN = { x: "15%", y: "-38%", scale: 0.76, rotate: 11, opacity: 0 };

/**
 * Hero visual: a deck of real project screenshots that tilts toward the mouse and deals the next card every few seconds.
 * The front card links to its case study.
 */
export function ProjectDeck({ projects }: { projects: WorkSummary[] }) {
    const n = projects.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduced = useReducedMotion();

    const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
    const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

    useEffect(() => {
        if (paused || reduced) return;
        const t = setInterval(() => setActive((a) => (a + 1) % n), 4200);
        return () => clearInterval(t);
    }, [paused, reduced, n]);

    const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };

    const go = (step: number) => setActive((a) => (a + step + n) % n);
    const current = projects[active];

    return (
        <div
            className="relative"
            aria-roledescription="carousel"
            aria-label="Recent projects"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => {
                setPaused(false);
                rx.set(0);
                ry.set(0);
            }}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="relative aspect-[100/78] [perspective:1400px]" onPointerMove={tilt}>
                <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX: rx, rotateY: ry }}>
                    {projects.map((p, i) => {
                        const offset = (i - active + n) % n;
                        const target = offset === n - 1 ? LEAVING : (STACK[offset] ?? HIDDEN);
                        const front = offset === 0;
                        const card = (
                            <div className="overflow-hidden rounded-2xl bg-surface-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 md:rounded-3xl">
                                <Image
                                    src={p.preview}
                                    alt={front ? `${p.name}: ${p.tagline}` : ""}
                                    width={1600}
                                    height={1000}
                                    sizes="(min-width: 1024px) 560px, 90vw"
                                    preload={i === 0}
                                    className="aspect-[16/10] w-full object-cover object-top"
                                />
                            </div>
                        );
                        return (
                            <motion.div
                                key={p.slug}
                                initial={false}
                                animate={target}
                                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 24 }}
                                style={{ zIndex: n - offset }}
                                className="absolute inset-x-0 top-[24%] mx-auto w-[86%]"
                                aria-hidden={!front}
                            >
                                {/* Same element for every position: swapping it would re-mount the image on each shuffle. */}
                                <Link
                                    href={`/work/${p.slug}`}
                                    aria-label={`${p.name} case study`}
                                    tabIndex={front ? undefined : -1}
                                    onClick={(e) => {
                                        if (front) return;
                                        e.preventDefault();
                                        setActive(i);
                                    }}
                                    className="block"
                                >
                                    {card}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Caption + controls */}
            <div className="mx-auto mt-6 flex w-full items-center justify-between gap-4 sm:w-[86%]">
                {/* Room for a wrapped second line on small phones, so the controls don't jump as projects change. */}
                <div className="min-h-[3.75rem] min-w-0 sm:min-h-0" aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={current.slug} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                            <Link href={`/work/${current.slug}`} className="text-base font-semibold text-white hover:underline underline-offset-4">
                                {current.name}
                            </Link>
                            <p className="text-sm leading-snug text-white/55">
                                {current.kind} · {current.status}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous project"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
                    >
                        <Icon icon={ArrowLeft01Icon} size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next project"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-hover"
                    >
                        <Icon icon={ArrowRight01Icon} size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
