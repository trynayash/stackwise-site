"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll";

/**
 * Smooth wheel scrolling. Touch scrolling stays native (phones feel like phones), and anyone who asked
 * their system for less motion gets the browser's plain scroll instead.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });
        registerLenis(lenis);

        return () => {
            registerLenis(null);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
