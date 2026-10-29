import React from "react";
import { Cancel01Icon, MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Mark = "yes" | "partial" | "no";

const columns = ["StackWise", "Freelance marketplace", "Large agency"] as const;

const rows: { label: string; values: [string, string, string]; marks: [Mark, Mark, Mark] }[] = [
    { label: "Who builds it", values: ["The engineer you talk to", "Depends who you hire", "Often a rotating team"], marks: ["yes", "partial", "partial"] },
    { label: "Communication", values: ["Direct chat, weekly call, staging URL", "Varies by person", "Through account managers"], marks: ["yes", "partial", "partial"] },
    { label: "Code & IP ownership", values: ["100% yours, full repo handover", "Often unclear", "Sometimes licensed"], marks: ["yes", "partial", "partial"] },
    { label: "Architecture & docs", values: ["Typed code + documentation", "Rarely included", "Usually included"], marks: ["yes", "no", "yes"] },
    { label: "Post-launch support", values: ["Included in every plan", "Usually extra", "Paid retainer"], marks: ["yes", "no", "partial"] },
    { label: "Pricing", values: ["Published starting prices", "Hourly, hard to predict", "High overhead"], marks: ["yes", "partial", "no"] },
];

function MarkIcon({ mark, highlight }: { mark: Mark; highlight?: boolean }) {
    const icon = mark === "yes" ? Tick02Icon : mark === "partial" ? MinusSignIcon : Cancel01Icon;
    return (
        <span
            className={cn(
                "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                mark === "yes" && highlight ? "bg-accent text-black" : mark === "yes" ? "bg-white/10 text-white" : "bg-white/[0.04] text-white/35"
            )}
        >
            <Icon icon={icon} size={14} strokeWidth={2} />
        </span>
    );
}

export function Comparison() {
    return (
        <section id="why-stackwise" className="relative py-20 md:py-28" aria-label="How StackWise compares">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="05"
                    eyebrow="Why StackWise"
                    title="The studio model,"
                    muted="without the overhead."
                    description="Senior engineering and direct communication, with the accountability of a studio."
                />

                {/* Desktop table */}
                <Reveal className="hidden md:block">
                    <div className="overflow-hidden rounded-2xl border border-line">
                        <table className="w-full border-collapse text-left text-sm">
                            <caption className="sr-only">StackWise compared with freelance marketplaces and large agencies</caption>
                            <thead>
                                <tr className="border-b border-line">
                                    <th scope="col" className="w-[22%] p-5 font-medium text-white/40" />
                                    {columns.map((c, i) => (
                                        <th
                                            key={c}
                                            scope="col"
                                            className={cn("p-5 text-base font-semibold", i === 0 ? "border-x border-line bg-surface-2 text-white" : "text-white/50")}
                                        >
                                            {i === 0 && <span className="mb-1.5 block h-1 w-8 rounded-full bg-accent" aria-hidden />}
                                            {c}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.label} className="border-b border-line last:border-b-0">
                                        <th scope="row" className="p-5 font-medium text-white/70">{row.label}</th>
                                        {row.values.map((v, i) => (
                                            <td key={i} className={cn("p-5", i === 0 ? "border-x border-line bg-surface-2 text-white" : "text-white/45")}>
                                                <span className="flex items-center gap-3">
                                                    <MarkIcon mark={row.marks[i]} highlight={i === 0} />
                                                    <span className="leading-snug">{v}</span>
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>

                {/* Mobile: one card per option */}
                <div className="space-y-4 md:hidden">
                    {columns.map((c, i) => (
                        <Reveal key={c} delay={i * 0.06}>
                            <div className={cn("rounded-2xl border p-5", i === 0 ? "border-line-strong bg-surface-2" : "border-line")}>
                                <h3 className={cn("mb-4 font-semibold", i === 0 ? "text-lg text-white" : "text-white/55")}>
                                    {i === 0 && <span className="mb-2 block h-1 w-8 rounded-full bg-accent" aria-hidden />}
                                    {c}
                                </h3>
                                <ul className="space-y-3.5">
                                    {rows.map((row) => (
                                        <li key={row.label} className="flex items-start gap-3">
                                            <MarkIcon mark={row.marks[i]} highlight={i === 0} />
                                            <div className="text-sm leading-snug">
                                                <span className="block text-xs text-white/40">{row.label}</span>
                                                <span className={i === 0 ? "text-white" : "text-white/50"}>{row.values[i]}</span>
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
