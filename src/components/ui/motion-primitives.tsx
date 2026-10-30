"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useReached } from "@/components/ui/use-reached";
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
    const [ref, reached] = useReached<HTMLDivElement>();
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={reached ? { opacity: 1, y: 0 } : undefined}
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
    const [ref, reached] = useReached<HTMLDivElement>();
    return (
        <motion.div ref={ref} className={className} variants={staggerParent} initial="hidden" animate={reached ? "show" : "hidden"}>
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
    const [ref, reached] = useReached<HTMLSpanElement>(40);

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

    // The trigger lives on the outer span: each word starts clipped by its mask,
    // so measuring the words themselves would never report them as visible.
    return (
        <motion.span
            ref={ref}
            className={cn("inline", className)}
            aria-label={text}
            role="text"
            initial="hidden"
            animate={reached ? "show" : "hidden"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
        >
            {words.map((word, i) => (
                <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                        className={cn("inline-block will-change-transform", wordClassName)}
                        variants={{
                            hidden: { y: "110%", rotate: 6 },
                            show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
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

/** Small accent label above a section heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cn("inline-block text-sm font-medium text-accent md:text-[15px]", className)}>{children}</span>;
}

/** Section eyebrow + heading (+ optional description or action) used across the site. */
export function SectionHeader({
    eyebrow,
    title,
    muted,
    description,
    action,
    align = "left",
    className,
}: {
    eyebrow: string;
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
                    <Eyebrow>{eyebrow}</Eyebrow>
                </Reveal>
                <h2 className="mt-4 text-[2.125rem] leading-[1.06] sm:text-[2.75rem] md:text-[3.5rem] font-semibold tracking-[-0.04em] text-white text-balance">
                    <WordReveal text={title} />
                    {muted && (
                        <>
                            {" "}
                            <WordReveal text={muted} delay={0.1} />
                        </>
                    )}
                </h2>
            </div>
            {(description || action) && (
                <Reveal delay={0.15} className={cn("max-w-md flex flex-col gap-6", centered ? "mx-auto items-center" : "lg:items-start")}>
                    {description && <p className="text-white/60 text-base md:text-lg leading-relaxed text-pretty">{description}</p>}
                    {action}
                </Reveal>
            )}
        </div>
    );
}
