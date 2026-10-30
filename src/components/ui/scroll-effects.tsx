"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReached } from "@/components/ui/use-reached";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Counts the number in a value up from zero when it scrolls into view, keeping any prefix and suffix.
 * "3,400+" → 0…3,400 then "+"; "₹1,49,999" counts in Indian grouping; values without a number render as-is.
 */
export function CountUp({ value, className, duration = 1.4 }: { value: string; className?: string; duration?: number }) {
    const [ref, inView] = useReached<HTMLSpanElement>(40);
    const reduced = useReducedMotion();
    const match = value.match(/^(\D*?)(\d[\d,]*)(.*)$/);
    const target = match ? Number(match[2].replace(/,/g, "")) : null;
    const locale = match && /\d,\d{2},\d{3}/.test(match[2]) ? "en-IN" : "en-US";
    const [display, setDisplay] = useState(match ? "0" : value);

    useEffect(() => {
        if (target === null || !inView) return;
        if (reduced) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDisplay(target.toLocaleString(locale));
            return;
        }
        const controls = animate(0, target, {
            duration,
            ease: EASE_OUT,
            onUpdate: (v) => setDisplay(Math.round(v).toLocaleString(locale)),
        });
        return () => controls.stop();
    }, [inView, target, reduced, duration, locale]);

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            <span className="sr-only">{value}</span>
            <span aria-hidden>
                {match ? match[1] : ""}
                {display}
                {match ? match[3] : ""}
            </span>
        </span>
    );
}

function LitWord({ word, progress, range, still }: { word: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
    // A function transform runs on every scroll update. The range form can be handed to a native scroll
    // timeline, which lets words that were already passed fall back to dim once their slice of the range ends.
    const opacity = useTransform(progress, (p) => 0.3 + 0.7 * Math.min(1, Math.max(0, (p - range[0]) / (range[1] - range[0]))));
    return <motion.span style={{ opacity: still ? 1 : opacity }}>{word} </motion.span>;
}

/**
 * Text whose words light up one by one as it scrolls through the viewport. The full sentence is always
 * in the DOM for search engines and screen readers. With reduced motion the words stay fully lit; the
 * markup is the same either way, so server and client render match.
 */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const still = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
    const words = text.split(" ");
    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => (
                <LitWord key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still} />
            ))}
        </p>
    );
}
