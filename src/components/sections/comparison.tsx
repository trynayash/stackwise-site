"use client";

import React from "react";
import { Check, Minus, X } from "lucide-react";
import { SectionHeader, Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

type Mark = "yes" | "partial" | "no";

const columns = ["StackWise", "Freelance marketplace", "Large agency"] as const;

const rows: { label: string; values: [string, string, string]; marks: [Mark, Mark, Mark] }[] = [
    {
        label: "Who builds it",
        values: ["The engineer you talk to", "Depends who you hire", "Often a rotating team"],
        marks: ["yes", "partial", "partial"],
    },
    {
        label: "Communication",
        values: ["Direct chat, weekly call, staging URL", "Varies by person", "Through account managers"],
        marks: ["yes", "partial", "partial"],
    },
    {
        label: "Code & IP ownership",
        values: ["100% yours, full repo handover", "Often unclear", "Sometimes licensed"],
        marks: ["yes", "partial", "partial"],
    },
    {
        label: "Architecture & handoff docs",
        values: ["Typed code + documentation", "Rarely included", "Usually included"],
        marks: ["yes", "no", "yes"],
    },
    {
        label: "Post-launch support",
        values: ["Included in every plan", "Usually extra", "Paid retainer"],
        marks: ["yes", "no", "partial"],
    },
    {
        label: "Pricing",
        values: ["Published starting prices", "Hourly, hard to predict", "High overhead"],
        marks: ["yes", "partial", "no"],
    },
];

function MarkIcon({ mark, highlight }: { mark: Mark; highlight?: boolean }) {
    if (mark === "yes")
        return (
            <span className={cn("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full", highlight ? "bg-[#C8FF00] text-black" : "bg-white/10 text-white/70")}>
                <Check size={12} strokeWidth={3} />
            </span>
        );
    if (mark === "partial")
        return (
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/40">
                <Minus size={12} strokeWidth={3} />
            </span>
        );
    return (
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white/25">
            <X size={12} strokeWidth={3} />
        </span>
    );
}

export function Comparison() {
    return (
        <section id="why-stackwise" className="py-20 md:py-32 relative z-10" aria-label="How StackWise compares">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    align="center"
                    eyebrow="Why StackWise"
                    title="The studio model,"
                    muted="without the overhead."
                    description="Senior engineering and direct communication, with the accountability of a studio."
                />

                {/* Desktop table */}
                <Reveal className="hidden md:block">
                    <div className="relative mx-auto max-w-5xl">
                        <div className="grid grid-cols-[1.1fr_1.3fr_1fr_1fr] text-sm">
                            <div />
                            {columns.map((c, i) => (
                                <div
                                    key={c}
                                    className={cn(
                                        "px-5 pt-6 pb-4 text-center font-semibold",
                                        i === 0 ? "conic-border rounded-t-2xl bg-[#C8FF00]/[0.06] text-[#C8FF00] text-base" : "text-white/40"
                                    )}
                                >
                                    {c}
                                </div>
                            ))}

                            {rows.map((row, r) => (
                                <React.Fragment key={row.label}>
                                    <div className="flex items-center border-t border-white/[0.06] px-2 py-5 text-white/70 font-medium">{row.label}</div>
                                    {row.values.map((v, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex items-center gap-3 border-t px-5 py-5",
                                                i === 0
                                                    ? cn("bg-[#C8FF00]/[0.06] border-[#C8FF00]/10 text-white", r === rows.length - 1 && "rounded-b-2xl")
                                                    : "border-white/[0.06] text-white/40"
                                            )}
                                        >
                                            <MarkIcon mark={row.marks[i]} highlight={i === 0} />
                                            <span className="leading-snug">{v}</span>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Mobile: StackWise card, then the alternatives */}
                <div className="md:hidden space-y-4">
                    {columns.map((c, i) => (
                        <Reveal key={c} delay={i * 0.08}>
                            <div className={cn("rounded-2xl border p-5", i === 0 ? "conic-border border-transparent bg-[#C8FF00]/[0.06]" : "border-white/[0.06] bg-white/[0.02]")}>
                                <h3 className={cn("mb-4 font-semibold", i === 0 ? "text-[#C8FF00] text-lg" : "text-white/50")}>{c}</h3>
                                <ul className="space-y-3">
                                    {rows.map((row) => (
                                        <li key={row.label} className="flex items-start gap-3">
                                            <MarkIcon mark={row.marks[i]} highlight={i === 0} />
                                            <div className="text-sm leading-snug">
                                                <span className="block text-[11px] font-mono uppercase tracking-wider text-white/30">{row.label}</span>
                                                <span className={i === 0 ? "text-white" : "text-white/45"}>{row.values[i]}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
