"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Maximum rotation in degrees. */
    maxTilt?: number;
    /** Show the lime spotlight that follows the cursor. */
    spotlight?: boolean;
    /** Show an animated gradient border that lights up near the cursor. */
    glowBorder?: boolean;
    children: React.ReactNode;
};

/**
 * Card that tilts in 3D towards the cursor and lights up under it.
 * Writes CSS variables directly instead of React state so mouse moves don't re-render.
 * Touch devices and users who prefer reduced motion get a flat card.
 */
export function TiltCard({
    maxTilt = 8,
    spotlight = true,
    glowBorder = true,
    className,
    children,
    ...props
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const frame = useRef<number | null>(null);

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.setProperty("--mx", `${px * 100}%`);
            el.style.setProperty("--my", `${py * 100}%`);
            el.style.setProperty("--rx", `${(0.5 - py) * maxTilt}deg`);
            el.style.setProperty("--ry", `${(px - 0.5) * maxTilt}deg`);
            el.style.setProperty("--spot", "1");
        });
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        if (frame.current) cancelAnimationFrame(frame.current);
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--spot", "0");
    };

    return (
        <div className="tilt-perspective h-full">
            <div
                ref={ref}
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
                className={cn(
                    "tilt-card group relative h-full rounded-2xl border border-white/[0.07] bg-[#0c0c0c]/80 backdrop-blur-md overflow-hidden",
                    className
                )}
                {...props}
            >
                {glowBorder && <div aria-hidden className="tilt-card__border" />}
                {spotlight && <div aria-hidden className="tilt-card__spot" />}
                <div className="relative z-10 h-full">{children}</div>
            </div>
        </div>
    );
}
