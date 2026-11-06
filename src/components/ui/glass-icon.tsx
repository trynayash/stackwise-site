import React, { useId } from "react";
import { glassIcons, type GlassDef, type GlassName, type GlassPart } from "@/lib/glass-icons";
import { cn } from "@/lib/utils";

function Back({ parts }: { parts: GlassPart[] }) {
    return (
        <>
            {parts.map((p, i) =>
                typeof p === "string" ? (
                    <path key={i} d={p} fill="currentColor" />
                ) : (
                    <path key={i} d={p.d} stroke="currentColor" strokeWidth={p.w} strokeLinecap="round" strokeLinejoin="round" />
                )
            )}
        </>
    );
}

/**
 * One icon from StackWise's frosted-glass set (src/lib/glass-icons.ts). The back layer takes the text colour (the brand
 * accent by default); inside the glass shape it is hidden and redrawn blurred, under a white frost, so it reads as
 * seen through frosted glass. Each instance gets its own ids for the mask, clip and blur.
 */
export function GlassIcon({ name, size = 48, className }: { name: GlassName; size?: number; className?: string }) {
    const def: GlassDef = glassIcons[name];
    const id = `gi${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    return (
        <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true" className={cn("flex-shrink-0 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5", className)}>
            <defs>
                <clipPath id={`${id}c`}>
                    <path d={def.front} />
                </clipPath>
                <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64">
                    <rect x="-8" y="-8" width="64" height="64" fill="#fff" />
                    <path d={def.front} fill="#000" />
                </mask>
                <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" />
                </filter>
                <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0.22" />
                </linearGradient>
            </defs>
            <g mask={`url(#${id}m)`}>
                <Back parts={def.back} />
            </g>
            <g clipPath={`url(#${id}c)`}>
                <g filter={`url(#${id}b)`}>
                    <Back parts={def.back} />
                </g>
            </g>
            <path d={def.front} fill={`url(#${id}g)`} />
            {def.marks && <path d={def.marks} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />}
            {def.dots && <path d={def.dots} fill="#fff" />}
        </svg>
    );
}
