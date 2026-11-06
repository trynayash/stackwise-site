import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

/**
 * The STACKWISE wordmark. On hover the two halves swap colours. A parent can retheme it for light backgrounds
 * with --logo-hover (STACK on hover), --logo-accent (WISE) and --logo-accent-hover (WISE on hover).
 */
export function Logo({ className, size = "md" }: LogoProps) {
    const sizeClasses = {
        sm: "text-base md:text-lg",
        md: "text-lg md:text-2xl",
        lg: "text-2xl md:text-4xl",
        xl: "text-5xl md:text-7xl",
    };

    return (
        <span
            className={cn(
                "tracking-tight group-hover:text-[var(--logo-hover,#C8FF00)] transition-colors duration-300 select-none",
                sizeClasses[size],
                className
            )}
            style={{ fontFamily: "var(--font-oughter), sans-serif" }}
        >
            STACK
            <span className="text-[var(--logo-accent,#C8FF00)] group-hover:text-[var(--logo-accent-hover,#fff)] transition-colors duration-300">
                WISE
            </span>
        </span>
    );
}

export default Logo;
