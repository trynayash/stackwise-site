import React from "react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Lift slightly and brighten the border on hover. */
    interactive?: boolean;
};

/** Flat filled surface: the base for every card on the site. */
export function Card({ interactive = false, className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "group relative rounded-3xl bg-surface",
                interactive && "transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-surface-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Round arrow in a card's corner that fills with the accent when the card (a `group`) is hovered: the one
 * cue that a card is a link, shared by every card type on the site.
 */
export function ArrowBubble({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
    return (
        <span
            aria-hidden
            className={cn(
                "flex flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-black",
                size === "sm" ? "h-9 w-9" : "h-11 w-11",
                className
            )}
        >
            <Icon icon={ArrowUpRight01Icon} size={size === "sm" ? 18 : 20} />
        </span>
    );
}

/** Square tile that holds an icon. */
export function IconTile({ children, className, size = "md" }: { children: React.ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
    const sizes = { sm: "h-9 w-9 rounded-lg", md: "h-11 w-11 rounded-xl", lg: "h-14 w-14 rounded-2xl" };
    return (
        <div className={cn("flex flex-shrink-0 items-center justify-center bg-accent text-black", sizes[size], className)}>
            {children}
        </div>
    );
}
