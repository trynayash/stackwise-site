"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { cn } from "@/lib/utils";

const rows = [
    ["SaaS products", "AI features", "Websites", "Mobile apps", "Dashboards"],
    ["Custom software", "MVPs", "Automation", "APIs", "Internal tools"],
];

/** Wraps v into [min, max) so the strip loops seamlessly. */
const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

/** One line of words that drifts on its own and speeds up (or reverses) with the visitor's scrolling. */
function Row({ words, baseVelocity, outlined }: { words: string[]; baseVelocity: number; outlined?: boolean }) {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    // Only animate while the band is on screen, so it costs nothing elsewhere on the page.
    const visible = useInView(ref, { margin: "100px" });
    const base = useMotionValue(0);
    const { scrollY } = useScroll();
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
    const direction = useRef(1);
    // The strip holds four copies of the words; moving it by one copy (25%) looks identical, so it loops.
    const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (reduced || !visible) return;
        let move = direction.current * baseVelocity * (delta / 1000);
        const b = boost.get();
        if (b < 0) direction.current = -1;
        else if (b > 0) direction.current = 1;
        // b is signed, so scrolling either way speeds the strip up in the direction it now moves.
        move += direction.current * move * b;
        base.set(base.get() + move);
    });

    return (
        <div ref={ref} className="flex overflow-hidden whitespace-nowrap">
            <motion.div style={{ x }} className="flex flex-nowrap">
                {Array.from({ length: 4 }).map((_, copy) => (
                    <span key={copy} className="flex flex-shrink-0 items-center">
                        {words.map((w) => (
                            <span key={w} className="flex items-center">
                                <span
                                    className={cn(
                                        "px-4 text-[2.75rem] font-semibold leading-none tracking-[-0.04em] sm:text-6xl md:px-6 md:text-8xl",
                                        outlined ? "text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.55)]" : "text-white"
                                    )}
                                >
                                    {w}
                                </span>
                                <span className="text-[2.75rem] font-semibold leading-none text-accent sm:text-6xl md:text-8xl">/</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/** Big kinetic band of what we build, between the hero and the work. */
export function Marquee() {
    return (
        <section aria-label="What we build" className="relative overflow-hidden py-10 md:py-16">
            <p className="sr-only">We build SaaS products, AI features, websites, mobile apps, dashboards, custom software, MVPs, automation, APIs and internal tools.</p>
            <div aria-hidden className="space-y-3 md:space-y-5">
                <Row words={rows[0]} baseVelocity={-2.2} />
                <Row words={rows[1]} baseVelocity={2.2} outlined />
            </div>
        </section>
    );
}
