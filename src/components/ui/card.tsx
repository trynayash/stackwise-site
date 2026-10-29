import React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Lift slightly and brighten the border on hover. */
    interactive?: boolean;
};

/** Flat surface with a hairline border — the base for every card on the site. */
export function Card({ interactive = false, className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "group relative rounded-2xl border border-line bg-surface",
                interactive && "transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/** Square tile that holds an icon. */
export function IconTile({ children, className, size = "md" }: { children: React.ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
    const sizes = { sm: "h-9 w-9 rounded-lg", md: "h-11 w-11 rounded-xl", lg: "h-14 w-14 rounded-2xl" };
    return (
        <div className={cn("flex flex-shrink-0 items-center justify-center border border-line bg-surface-2 text-white", sizes[size], className)}>
            {children}
        </div>
    );
}
