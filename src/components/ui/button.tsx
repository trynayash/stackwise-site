import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

/*
 * Hover: a second colour slides up from the bottom (the ::before layer, kept behind the label by `isolate`),
 * the label rolls to an identical copy and the arrow swaps out and back in. Pressing shrinks it slightly.
 */
const base =
    "btn-roll group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold transition-[color,transform] duration-300 ease-out cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:translate-y-0";

const variants: Record<Variant, string> = {
    primary: "bg-accent text-black before:bg-white",
    secondary: "bg-white/[0.08] text-white before:bg-accent hover:text-black",
    ghost: "text-white/70 hover:text-white before:hidden",
    dark: "bg-black text-white before:bg-white hover:text-black",
};

const sizes: Record<Size, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
};

type Arrow = "right" | "up-right" | false;

/** The arrow leaves on hover while an identical one slides in behind it. */
function ArrowMark({ arrow }: { arrow: Arrow }) {
    if (!arrow) return null;
    const icon = arrow === "up-right" ? ArrowUpRight01Icon : ArrowRight01Icon;
    const out = arrow === "up-right" ? "group-hover/btn:translate-x-full group-hover/btn:-translate-y-full" : "group-hover/btn:translate-x-full";
    const back = arrow === "up-right" ? "-translate-x-full translate-y-full" : "-translate-x-full";
    const ease = "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";
    return (
        <span aria-hidden className="relative inline-flex h-[18px] w-[18px] overflow-hidden">
            <Icon icon={icon} size={18} className={cn("absolute inset-0", ease, out)} />
            <Icon icon={icon} size={18} className={cn("absolute inset-0 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0", ease, back)} />
        </span>
    );
}

/** Wraps plain-text labels so they roll on hover; other content renders unchanged. */
function Label({ children }: { children: React.ReactNode }) {
    if (typeof children !== "string") return <>{children}</>;
    return (
        <span className="roll">
            <span className="roll-inner">
                <span>{children}</span>
                <span aria-hidden>{children}</span>
            </span>
        </span>
    );
}

type CommonProps = { variant?: Variant; size?: Size; arrow?: Arrow; className?: string; children: React.ReactNode };

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
    return cn(base, variants[variant], sizes[size], className);
}

export function Button({
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    type = "button",
    ...props
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
    return (
        <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
            <Label>{children}</Label>
            <ArrowMark arrow={arrow} />
        </button>
    );
}

export function ButtonLink({
    href,
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    ...props
}: CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
        return (
            <a href={href} className={buttonClasses({ variant, size, className })} {...props}>
                <Label>{children}</Label>
                <ArrowMark arrow={arrow} />
            </a>
        );
    }
    return (
        <Link href={href} className={buttonClasses({ variant, size, className })} {...props}>
            <Label>{children}</Label>
            <ArrowMark arrow={arrow} />
        </Link>
    );
}
