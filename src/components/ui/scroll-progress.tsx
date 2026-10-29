"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden
            className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-[#9EFF00] via-[#C8FF00] to-[#eaff99] shadow-[0_0_12px_rgba(200,255,0,0.6)]"
            style={{ scaleX }}
        />
    );
}
