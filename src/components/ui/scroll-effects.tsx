"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Counts the leading number in a value up from zero when it scrolls into view.
 * "3,400+" → 0…3,400 then "+"; values without a leading number ("Node.js") render as-is.
 */
export function CountUp({ value, className, duration = 1.4 }: { value: string; className?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduced = useReducedMotion();
    const match = value.match(/^(\d[\d,]*)(.*)$/);
    const target = match ? Number(match[1].replace(/,/g, "")) : null;
    const [display, setDisplay] = useState(match ? "0" : value);

    useEffect(() => {
        if (target === null || !inView) return;
        if (reduced) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDisplay(target.toLocaleString("en-US"));
            return;
        }
        const controls = animate(0, target, {
            duration,
            ease: EASE_OUT,
            onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-US")),
        });
        return () => controls.stop();
    }, [inView, target, reduced, duration]);

    return (
        <span ref={ref} className={cn("tabular-nums", className)} aria-label={value}>
            <span aria-hidden>
                {display}
                {match ? match[2] : ""}
            </span>
        </span>
    );
}

/** Wipes an image (or any block) into view from the bottom, with a slight zoom-out. */
export function WipeReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={cn("overflow-hidden", className)}
            initial={{ clipPath: "inset(18% 0% 18% 0% round 16px)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay, ease: EASE_OUT }}
        >
            <motion.div
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, delay, ease: EASE_OUT }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

function LitWord({ word, progress, range, still }: { word: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
    const opacity = useTransform(progress, range, [0.18, 1]);
    return (
        <motion.span style={{ opacity: still ? 1 : opacity }} className="inline">
            {word}{" "}
        </motion.span>
    );
}

/**
 * Paragraph whose words brighten one by one as it scrolls through the viewport.
 * The full sentence is always in the DOM, so it stays readable for search engines and screen readers.
 * Markup is identical with reduced motion (words just stay fully lit), so hydration always matches.
 */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const reduced = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
    const words = text.split(" ");

    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => (
                <LitWord key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduced} />
            ))}
        </p>
    );
}
