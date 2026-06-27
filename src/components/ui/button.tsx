"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonProps = HTMLMotionProps<"button"> & {
    variant?: "primary" | "secondary" | "tertiary" | "outline";
    children: React.ReactNode;
    icon?: boolean;
};

export function Button({
    className,
    variant = "primary",
    children,
    icon = false,
    whileTap = { scale: 0.97 },
    transition = {
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring" as const,
            stiffness: 10,
            damping: 5,
            mass: 0.1,
        },
    },
    ...props
}: ButtonProps) {
    const baseStyles =
        "relative inline-flex items-center justify-center font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden";

    const variants = {
        primary: cn(
            "rounded-full px-8 py-4 text-black font-bold",
            "bg-[#C8FF00]",
            "shadow-[0_0_30px_-5px_rgba(200,255,0,0.3)]",
            "hover:shadow-[0_0_50px_-5px_rgba(200,255,0,0.5)]",
            "hover:bg-[#D4FF33]"
        ),
        secondary: cn(
            "rounded-full px-8 py-4 text-white",
            "bg-white/5 backdrop-blur-md border border-white/10",
            "hover:bg-white/10 hover:border-[#C8FF00]/30"
        ),
        tertiary: cn(
            "rounded-lg px-4 py-2 text-[#C8FF00]",
            "hover:text-[#D4FF33] bg-transparent"
        ),
        outline: cn(
            "rounded-full px-8 py-4 border-2 bg-transparent",
            "border-white/20 text-white",
            "hover:border-[#C8FF00] hover:text-[#C8FF00] transition-colors"
        ),
    };

    // Shine color per variant
    const shineColor =
        variant === "primary"
            ? "rgba(0,0,0,0.5)"
            : "rgba(200,255,0,0.5)";

    return (
        <motion.button
            whileTap={whileTap}
            transition={transition}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {/* Text with mask-reveal sweep */}
            <motion.span
                className="relative z-10 flex items-center gap-2 tracking-wide"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
                    maskImage:
                        "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
                } as React.CSSProperties}
                initial={{ "--mask-x": "100%" } as Record<string, string>}
                animate={{ "--mask-x": "-100%" } as Record<string, string>}
                transition={{ repeat: Infinity, duration: 1, ease: "linear", repeatDelay: 1 }}
            >
                {children}
                {(variant === "tertiary" || icon) && (
                    <ArrowRight className="w-4 h-4" />
                )}
            </motion.span>

            {/* Shiny border sweep */}
            <motion.span
                className="block absolute inset-0 rounded-[inherit] p-px"
                style={{
                    background: `linear-gradient(-75deg, transparent 30%, ${shineColor} 50%, transparent 70%)`,
                    backgroundSize: "200% 100%",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                } as React.CSSProperties}
                initial={{ backgroundPosition: "100% 0", opacity: 0 }}
                animate={{
                    backgroundPosition: ["100% 0", "0% 0"],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                }}
            />
        </motion.button>
    );
}
