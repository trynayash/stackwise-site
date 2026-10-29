import React from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only fade-up for content visible on load. Unlike <Reveal>, it needs no JavaScript,
 * so it never delays the page's largest paint. Use <Reveal> for content further down.
 */
export function Enter({
    children,
    delay = 0,
    className,
    as: Tag = "div",
}: {
    children: React.ReactNode;
    /** Delay in seconds. */
    delay?: number;
    className?: string;
    as?: "div" | "p" | "ul" | "span";
}) {
    return (
        <Tag className={cn("enter-fade", className)} style={{ ["--d" as string]: `${Math.round(delay * 1000)}ms` } as React.CSSProperties}>
            {children}
        </Tag>
    );
}
