"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

/** Pure-CSS isometric stack. Shown while three.js loads, and instead of it when WebGL or motion is unavailable. */
export function StackFallback({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)} aria-hidden="true">
            <div className="relative" style={{ perspective: "1200px" }}>
                <div style={{ transform: "rotateX(58deg) rotateZ(-38deg)", transformStyle: "preserve-3d" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "absolute left-1/2 top-1/2 h-[150px] w-[220px] rounded-2xl border sm:h-[180px] sm:w-[260px]",
                                i === 4 ? "border-accent bg-accent" : "border-white/15 bg-[#171717]"
                            )}
                            style={{ transform: `translate(-50%, -50%) translateZ(${i * 34}px)` }}
                        >
                            <div className="space-y-2 p-4">
                                {[70, 45, 58].map((w, j) => (
                                    <div key={j} className={cn("h-1.5 rounded-full", i === 4 ? "bg-black/30" : j === 0 ? "bg-accent/80" : "bg-white/15")} style={{ width: `${w - i * 3}%` }} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const StackScene = dynamic(() => import("./stack-scene"), {
    ssr: false,
    loading: () => <StackFallback className="h-full w-full" />,
});

function supportsWebGL() {
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
        return false;
    }
}

export function HeroVisual({ className }: { className?: string }) {
    const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const lowPower = memory !== undefined && memory < 2;
        // Deciding after mount keeps the server HTML identical for every visitor.
        // Load the WebGL scene once the browser is idle so it never competes with first paint.
        const decide = () => setMode(!reduced && !lowPower && supportsWebGL() ? "3d" : "fallback");
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(decide, { timeout: 1500 });
            return () => window.cancelIdleCallback(id);
        }
        const id = setTimeout(decide, 300);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className={cn("relative", className)}>
            {mode === "3d" ? <StackScene className="absolute inset-0" /> : <StackFallback className="absolute inset-0" />}
        </div>
    );
}
