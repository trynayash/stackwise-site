import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
    "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
    primary: "bg-accent text-black hover:bg-accent-hover",
    secondary: "border border-line-strong text-white hover:bg-white/[0.06] hover:border-white/30",
    ghost: "text-white/70 hover:text-white",
    dark: "bg-black text-white hover:bg-neutral-800",
};

const sizes: Record<Size, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
};

type Arrow = "right" | "up-right" | false;

function ArrowMark({ arrow }: { arrow: Arrow }) {
    if (!arrow) return null;
    return (
        <Icon
            icon={arrow === "up-right" ? ArrowUpRight01Icon : ArrowRight01Icon}
            size={18}
            className={cn(
                "transition-transform duration-200",
                arrow === "up-right" ? "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" : "group-hover/btn:translate-x-0.5"
            )}
        />
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
            {children}
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
                {children}
                <ArrowMark arrow={arrow} />
            </a>
        );
    }
    return (
        <Link href={href} className={buttonClasses({ variant, size, className })} {...props}>
            {children}
            <ArrowMark arrow={arrow} />
        </Link>
    );
}
