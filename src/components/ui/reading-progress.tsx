"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline of the accent along the top of the viewport that fills as a long page is read. It sits above
 * the navbar, stays flat (no glow), and with reduced motion follows the scroll position without easing.
 */
export function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const reduced = useReducedMotion();
    const eased = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.3 });
    return (
        <motion.div
            aria-hidden
            style={{ scaleX: reduced ? scrollYProgress : eased }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        />
    );
}
