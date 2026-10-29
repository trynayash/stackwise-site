"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    as?: "div" | "section" | "li" | "span";
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
    const Component = motion[as];
    return (
        <Component
            className={className}
            initial={{ opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        >
            {children}
        </Component>
    );
}

const staggerParent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
        >
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
    // The in-view trigger lives on the outer span: each word starts clipped by its mask,
    // so observing the words themselves would never report them as visible.
    const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-40px" } };

    return (
        <motion.span
            className={cn("inline", className)}
            aria-label={text}
            role="text"
            initial="hidden"
            {...trigger}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
        >
            {words.map((word, i) => (
                <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                        className={cn("inline-block will-change-transform", wordClassName)}
                        variants={{
                            hidden: { y: "110%", opacity: 0 },
                            show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
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

/** Pulls its child slightly towards the cursor. No effect on touch devices. */
export function Magnetic({ children, strength = 0.25, className }: { children: React.ReactNode; strength?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div ref={ref} className={cn("inline-block", className)} style={{ x: springX, y: springY }} onPointerMove={onMove} onPointerLeave={reset}>
            {children}
        </motion.div>
    );
}

/** Section eyebrow + heading pair used across the home page. */
export function SectionHeader({
    eyebrow,
    title,
    muted,
    description,
    align = "left",
    className,
}: {
    eyebrow: string;
    title: string;
    muted?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}) {
    const centered = align === "center";
    return (
        <div
            className={cn(
                "mb-14 md:mb-20 flex flex-col gap-6",
                centered ? "items-center text-center mx-auto max-w-3xl" : "lg:flex-row lg:items-end lg:justify-between",
                className
            )}
        >
            <div className={cn("max-w-3xl", centered && "mx-auto")}>
                <Reveal>
                    <span className="inline-flex items-center gap-2 text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00] shadow-[0_0_10px_#C8FF00] animate-pulse" />
                        {eyebrow}
                    </span>
                </Reveal>
                <h2 className="text-[2rem] leading-[1.05] sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance">
                    <WordReveal text={title} />
                    {muted && (
                        <>
                            <br />
                            <WordReveal text={muted} className="text-white/25" delay={0.15} />
                        </>
                    )}
                </h2>
            </div>
            {description && (
                <Reveal delay={0.2} className={cn("max-w-md", centered && "mx-auto")}>
                    <p className="text-white/45 text-base leading-relaxed font-light">{description}</p>
                </Reveal>
            )}
        </div>
    );
}
