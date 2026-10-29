"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
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
        <span ref={ref} className={cn("tabular-nums", className)}>
            <span className="sr-only">{value}</span>
            <span aria-hidden>
                {display}
                {match ? match[2] : ""}
            </span>
        </span>
    );
}
