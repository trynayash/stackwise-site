"use client";

import React, { useId } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/* Pointer effects only respond to a mouse; touch and keyboard users get the plain element. */

/** Pulls its child gently toward the cursor while hovered, then springs back. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
    const reduced = useReducedMotion();
    const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
    const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

    return (
        <motion.div
            style={{ x, y }}
            className={cn("inline-block", className)}
            onPointerMove={(e) => {
                if (reduced || e.pointerType !== "mouse") return;
                const r = e.currentTarget.getBoundingClientRect();
                x.set((e.clientX - (r.left + r.width / 2)) * strength);
                y.set((e.clientY - (r.top + r.height / 2)) * strength);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}

/** Tilts a card in 3D toward the cursor. */
export function Tilt({ children, max = 7, className }: { children: React.ReactNode; max?: number; className?: string }) {
    const reduced = useReducedMotion();
    const rx = useSpring(0, { stiffness: 180, damping: 18 });
    const ry = useSpring(0, { stiffness: 180, damping: 18 });
    const scale = useSpring(1, { stiffness: 180, damping: 18 });

    return (
        <div className={cn("[perspective:900px]", className)}>
            <motion.div
                style={{ rotateX: rx, rotateY: ry, scale }}
                className="h-full [transform-style:preserve-3d]"
                onPointerMove={(e) => {
                    if (reduced || e.pointerType !== "mouse") return;
                    const r = e.currentTarget.getBoundingClientRect();
                    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
                    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
                    scale.set(1.02);
                }}
                onPointerLeave={() => {
                    rx.set(0);
                    ry.set(0);
                    scale.set(1);
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

/** Circumference of the badge's text circle (radius 56), less a hair so the last character doesn't touch the first. */
const RING = Math.round(2 * Math.PI * 56) - 6;

/**
 * Round "Get a free quote" badge: a ring of text that turns slowly and speeds up on hover, around an
 * arrow button. Pure CSS (see .badge-spin in globals.css): an always-on slow spin plus a faster one that
 * only runs while hovered, so speeding up never makes the ring jump.
 */
export function CircularBadge({ text, onClick, className }: { text: string; onClick: () => void; className?: string }) {
    // Stable on server and client (a random id would break hydration); stripped to characters safe in a URL fragment.
    const id = `ring-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={text}
            className={cn("group relative flex h-36 w-36 cursor-pointer items-center justify-center rounded-full", className)}
        >
            <span aria-hidden className="badge-spin absolute inset-0">
                <span className="badge-spin-fast absolute inset-0">
                    <svg viewBox="0 0 144 144" className="h-full w-full">
                        <defs>
                            <path id={id} d="M72,72 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
                        </defs>
                        <text className="fill-white text-[11px] font-semibold uppercase">
                            {/* textLength spreads the letters to exactly one lap of the circle, so the ends meet without overlapping. */}
                            <textPath href={`#${id}`} textLength={RING} lengthAdjust="spacing">{`${text} / ${text} / `}</textPath>
                        </text>
                    </svg>
                </span>
            </span>
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <Icon icon={ArrowUpRight01Icon} size={24} strokeWidth={2} className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
        </button>
    );
}
