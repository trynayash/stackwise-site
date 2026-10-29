"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useLoading } from "@/components/providers/loading-context";

/** Pure-CSS isometric stack. Shown while three.js loads, and instead of it when WebGL or motion is unavailable. */
export function StackFallback({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)} aria-hidden="true">
            <div className="absolute w-2/3 aspect-square rounded-full bg-[#C8FF00]/10 blur-[80px]" />
            <div className="relative" style={{ perspective: "1200px" }}>
                <div style={{ transform: "rotateX(58deg) rotateZ(-38deg)", transformStyle: "preserve-3d" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "absolute left-1/2 top-1/2 w-[220px] h-[150px] sm:w-[260px] sm:h-[180px] rounded-2xl border",
                                i === 4 ? "bg-[#C8FF00] border-[#e4ff80] shadow-[0_0_60px_rgba(200,255,0,0.45)]" : "bg-[#121410] border-[#C8FF00]/40"
                            )}
                            style={{
                                transform: `translate(-50%, -50%) translateZ(${i * 34}px)`,
                                animation: `floatY ${4 + i * 0.4}s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        >
                            <div className="p-4 space-y-2">
                                {[70, 45, 58].map((w, j) => (
                                    <div key={j} className={cn("h-1.5 rounded-full", i === 4 ? "bg-black/40" : "bg-[#C8FF00]/40")} style={{ width: `${w - i * 3}%` }} />
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
    loading: () => <StackFallback className="w-full h-full" />,
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
    const { isLoading } = useLoading();

    useEffect(() => {
        // Wait for the intro animation so the WebGL scene doesn't compete with it for the main thread.
        if (isLoading) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lowPower = (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined
            && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 2;
        // Deciding after mount keeps the server HTML identical for every visitor.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMode(!reduced && !lowPower && supportsWebGL() ? "3d" : "fallback");
    }, [isLoading]);

    return (
        <div className={cn("relative", className)}>
            {mode === "3d" ? <StackScene className="absolute inset-0" /> : <StackFallback className="absolute inset-0" />}
        </div>
    );
}
