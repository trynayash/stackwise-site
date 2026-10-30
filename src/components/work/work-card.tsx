"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/motion-primitives";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/** Small text pill for a project's status ("Live", "Waitlist", "Open source"). */
export function StatusBadge({ status, className }: { status: string; className?: string }) {
    const live = status.toLowerCase() === "live";
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                live ? "bg-accent text-black" : "bg-black/70 text-white backdrop-blur",
                className
            )}
        >
            {status}
        </span>
    );
}

/** Product screenshot in a rounded frame. */
export function Screenshot({ study, className, priority = false, sizes }: { study: CaseStudy; className?: string; priority?: boolean; sizes?: string }) {
    return (
        <div className={cn("relative overflow-hidden rounded-3xl bg-surface-2", className)}>
            <Image
                src={study.preview}
                alt={`${study.name}: ${study.tagline}`}
                width={1600}
                height={1000}
                sizes={sizes ?? "(min-width: 1280px) 1100px, (min-width: 1024px) 60vw, 100vw"}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                preload={priority}
            />
        </div>
    );
}

/**
 * Screenshot that wipes open the first time it scrolls into view, then drifts inside its frame as the
 * page scrolls (a light parallax). A priority image skips the wipe so it paints straight away.
 */
function RevealImage({ study, className, sizes, priority = false }: { study: CaseStudy; className?: string; sizes: string; priority?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

    return (
        <motion.div
            ref={ref}
            initial={priority || reduced ? false : { clipPath: "inset(12% 12% 12% 12% round 24px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn("relative overflow-hidden rounded-3xl bg-surface-2", className)}
        >
            <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[7%] -top-[7%]">
                <Image
                    src={study.preview}
                    alt={`${study.name}: ${study.tagline}`}
                    fill
                    sizes={sizes}
                    preload={priority}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
            </motion.div>
        </motion.div>
    );
}

/** A round label that follows the mouse over its children (mouse only; touch and keyboard see the normal card). */
export function CursorFollow({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });
    const [active, setActive] = useState(false);

    const move = (e: React.PointerEvent) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        if (!active) setActive(true);
    };

    return (
        <div ref={ref} className={cn("relative", className)} onPointerMove={move} onPointerLeave={() => setActive(false)}>
            {children}
            <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block">
                <motion.span
                    initial={false}
                    animate={{ scale: active ? 1 : 0.2, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-[13px] font-semibold leading-tight text-black"
                >
                    {label}
                </motion.span>
            </motion.div>
        </div>
    );
}

/** Project card linking to its case study. `large` cards span the full row with a wider crop. */
export function WorkCard({ study, large = false, priority = false }: { study: CaseStudy; large?: boolean; priority?: boolean }) {
    return (
        <CursorFollow label="View case study">
            <Link href={`/work/${study.slug}`} className="group block">
                <div className="relative">
                    <RevealImage
                        study={study}
                        priority={priority}
                        className={large ? "aspect-[16/10] md:aspect-[2/1]" : "aspect-[16/10]"}
                        sizes={large ? "(min-width: 1280px) 1240px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    />
                    <StatusBadge status={study.status} className="absolute left-4 top-4 md:left-5 md:top-5" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                        <h3 className={cn("font-semibold tracking-[-0.03em] text-white", large ? "text-2xl md:text-4xl" : "text-xl md:text-2xl")}>{study.name}</h3>
                        <p className="mt-1.5 text-[15px] text-white/60 md:text-base">{study.tagline}</p>
                    </div>
                    <span className="flex flex-shrink-0 items-center gap-3">
                        <span className="hidden text-sm text-white/50 sm:inline">{study.kind}</span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white transition-colors group-hover:bg-accent group-hover:text-black">
                            <Icon icon={ArrowUpRight01Icon} size={18} />
                        </span>
                    </span>
                </div>
            </Link>
        </CursorFollow>
    );
}

/** Work grid: every third project runs full width, the rest sit in pairs. */
export function WorkGrid({ studies, priorityFirst = false }: { studies: CaseStudy[]; priorityFirst?: boolean }) {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-16">
            {studies.map((s, i) => {
                const large = i % 3 === 0;
                const card = <WorkCard study={s} large={large} priority={priorityFirst && i === 0} />;
                // A card that is on screen at load skips the scroll reveal so it paints straight away.
                if (priorityFirst && i === 0) {
                    return (
                        <div key={s.slug} className="md:col-span-2">
                            {card}
                        </div>
                    );
                }
                return (
                    <Reveal key={s.slug} delay={large ? 0 : (i % 3) * 0.08} className={large ? "md:col-span-2" : undefined}>
                        {card}
                    </Reveal>
                );
            })}
        </div>
    );
}
