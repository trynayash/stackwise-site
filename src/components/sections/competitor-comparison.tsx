import React from "react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { competitorColumns, competitorRows } from "@/lib/competitors";
import { cn } from "@/lib/utils";

/**
 * StackWise next to a freelancer, a typical agency and a large IT firm. One table: from md up it is a normal grid
 * with the StackWise column highlighted; on phones each row becomes a card (cells labelled with data-label) so
 * nothing scrolls sideways.
 */
export function CompetitorComparison({ className }: { className?: string }) {
    const cell = "max-md:flex max-md:justify-between max-md:gap-4 max-md:py-1.5 max-md:before:shrink-0 max-md:before:text-white/45 max-md:before:content-[attr(data-label)] md:px-5 md:py-4";
    return (
        <div className={cn("rounded-3xl bg-surface p-4 md:p-3", className)}>
            <table className="w-full border-collapse text-left max-md:block">
                <caption className="sr-only">StackWise compared with a freelancer, a typical agency and a large IT firm</caption>
                <thead className="max-md:hidden">
                    <tr className="text-sm text-white/55">
                        <th scope="col" className="px-5 py-4 font-medium">
                            <span className="sr-only">What you get</span>
                        </th>
                        {competitorColumns.map((c) => (
                            <th key={c} scope="col" className="px-5 py-4 font-medium">
                                {c}
                            </th>
                        ))}
                        <th scope="col" className="rounded-t-2xl bg-accent px-5 py-4 font-semibold text-black">
                            StackWise
                        </th>
                    </tr>
                </thead>
                <tbody className="max-md:block max-md:space-y-3">
                    {competitorRows.map((r, i) => (
                        <tr key={r.label} className="max-md:block max-md:rounded-2xl max-md:bg-surface-2 max-md:p-4 md:border-t md:border-line">
                            <th scope="row" className="text-[15px] font-semibold text-white max-md:block max-md:pb-2 md:px-5 md:py-4">
                                {r.label}
                            </th>
                            {r.others.map((v, j) => (
                                <td key={competitorColumns[j]} data-label={competitorColumns[j]} className={cn(cell, "text-[15px] text-white/60 max-md:text-right")}>
                                    {v}
                                </td>
                            ))}
                            <td
                                data-label="StackWise"
                                className={cn(
                                    cell,
                                    "font-semibold text-black max-md:mt-2 max-md:rounded-xl max-md:bg-accent max-md:px-3 max-md:py-2.5 max-md:text-right max-md:before:text-black/60 md:bg-accent",
                                    i === competitorRows.length - 1 && "md:rounded-b-2xl"
                                )}
                            >
                                <span className="inline-flex items-start gap-2 max-md:justify-end">
                                    <Icon icon={Tick02Icon} size={17} strokeWidth={2.2} className="mt-0.5 flex-shrink-0 max-md:hidden" />
                                    {r.stackwise}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="px-1 pt-4 text-[13px] leading-relaxed text-white/45 md:px-5">
                Typical patterns in the Indian market, not quotes from any particular company. Your StackWise quote states the exact price,
                scope and dates.
            </p>
        </div>
    );
}
