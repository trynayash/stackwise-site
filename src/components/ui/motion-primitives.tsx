"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
}

const staggerParent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={staggerChild}>
            {children}
        </motion.div>
    );
}

/** Splits text into words that rise in one after another. Keeps the full string for screen readers. */
export function WordReveal({
    text,
    className,
    wordClassName,
    delay = 0,
    immediate = false,
}: {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    immediate?: boolean;
}) {
    const words = text.split(" ");

    // On-load headlines animate in CSS so they paint before JavaScript runs (keeps LCP fast).
    if (immediate) {
        return (
            <span className={cn("inline", className)} aria-label={text} role="text">
                {words.map((word, i) => (
                    <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                        <span
                            className={cn("enter-word", wordClassName)}
                            style={{ ["--d" as string]: `${Math.round((delay + i * 0.05) * 1000)}ms` } as React.CSSProperties}
                        >
                            {word}
                            {i < words.length - 1 ? "\u00A0" : ""}
                        </span>
                    </span>
                ))}
            </span>
        );
    }

    // The in-view trigger lives on the outer span: each word starts clipped by its mask,
    // so observing the words themselves would never report them as visible.
    const trigger = { whileInView: "show", viewport: { once: true, margin: "-40px" } };

    return (
        <motion.span
            className={cn("inline", className)}
            aria-label={text}
            role="text"
            initial="hidden"
            {...trigger}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
        >
            {words.map((word, i) => (
                <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                        className={cn("inline-block will-change-transform", wordClassName)}
                        variants={{
                            hidden: { y: "105%" },
                            show: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? " " : ""}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

/** Small label above a section heading, e.g. "01 — Services". */
export function Eyebrow({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/50", className)}>
            {index && <span className="font-mono text-accent">{index}</span>}
            {index && <span className="h-px w-6 bg-white/20" aria-hidden />}
            {children}
        </span>
    );
}

/** Section eyebrow + heading (+ optional description or action) used across the site. */
export function SectionHeader({
    eyebrow,
    index,
    title,
    muted,
    description,
    action,
    align = "left",
    className,
}: {
    eyebrow: string;
    index?: string;
    title: string;
    muted?: string;
    description?: string;
    action?: React.ReactNode;
    align?: "left" | "center";
    className?: string;
}) {
    const centered = align === "center";
    return (
        <div
            className={cn(
                "mb-12 md:mb-16 flex flex-col gap-6",
                centered ? "items-center text-center mx-auto max-w-3xl" : "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
                className
            )}
        >
            <div className={cn("max-w-3xl", centered && "mx-auto")}>
                <Reveal y={12}>
                    <Eyebrow index={index}>{eyebrow}</Eyebrow>
                </Reveal>
                <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-[2.75rem] md:text-[3.25rem] font-semibold tracking-[-0.035em] text-white text-balance">
                    <WordReveal text={title} />
                    {muted && (
                        <>
                            {" "}
                            <WordReveal text={muted} className="text-white/40" delay={0.1} />
                        </>
                    )}
                </h2>
            </div>
            {(description || action) && (
                <Reveal delay={0.15} className={cn("max-w-md flex flex-col gap-6", centered ? "mx-auto items-center" : "lg:items-start")}>
                    {description && <p className="text-white/55 text-base md:text-[17px] leading-relaxed text-pretty">{description}</p>}
                    {action}
                </Reveal>
            )}
        </div>
    );
}
