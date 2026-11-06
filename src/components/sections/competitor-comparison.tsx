import { competitorColumns, competitorRows } from "@/lib/competitors";
import { cn } from "@/lib/utils";

/** The StackWise column is the only tinted one, and only from md up. */
const highlight = "md:bg-white/[0.04]";

/**
 * Below md each row stacks: the option name sits in a fixed label column, so every value starts at the same edge.
 * From md up it is a plain table with evenly sized columns.
 */
const stacked =
    "max-md:flex max-md:gap-4 max-md:px-0 max-md:py-2.5 max-md:before:w-[7rem] max-md:before:shrink-0 max-md:before:text-[14px] max-md:before:font-normal max-md:before:content-[attr(data-label)]";

/** StackWise next to a freelancer, a typical agency and a large IT firm. */
export function CompetitorComparison({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-3xl bg-surface px-5 py-2 md:px-8 md:py-4", className)}>
            <table className="w-full table-fixed border-collapse text-left max-md:block">
                <caption className="sr-only">StackWise compared with a freelancer, a typical agency and a large IT firm</caption>
                <colgroup>
                    <col className="md:w-[22%]" />
                    {competitorColumns.map((c) => (
                        <col key={c} className="md:w-[19%]" />
                    ))}
                    <col className="md:w-[21%]" />
                </colgroup>

                <thead className="max-md:hidden">
                    <tr className="border-b border-white/[0.08] text-sm">
                        <th scope="col" className="pb-4 pr-4 text-left font-normal text-white/40">
                            <span className="sr-only">Compared on</span>
                        </th>
                        {competitorColumns.map((c) => (
                            <th key={c} scope="col" className="px-4 pb-4 text-left font-normal text-white/50">
                                {c}
                            </th>
                        ))}
                        <th scope="col" className={cn("px-4 pb-4 text-left font-semibold text-accent", highlight)}>
                            StackWise
                        </th>
                    </tr>
                </thead>

                <tbody className="max-md:block">
                    {competitorRows.map((r, i) => (
                        <tr key={r.label} className={cn("max-md:block", i < competitorRows.length - 1 && "border-b border-white/[0.08]")}>
                            <th scope="row" className="py-4 pr-4 text-left text-[15px] font-medium text-white max-md:block max-md:pb-1 max-md:pt-3.5">
                                {r.label}
                            </th>
                            {r.others.map((v, j) => (
                                <td
                                    key={competitorColumns[j]}
                                    data-label={competitorColumns[j]}
                                    className={cn("px-4 py-4 text-[15px] leading-snug text-white/55 max-md:before:text-white/40", stacked)}
                                >
                                    <span className="min-w-0">{v}</span>
                                </td>
                            ))}
                            <td
                                data-label="StackWise"
                                className={cn(
                                    "px-4 py-4 text-[15px] font-semibold leading-snug text-white max-md:before:font-semibold max-md:before:text-accent",
                                    highlight,
                                    stacked
                                )}
                            >
                                <span className="min-w-0">{r.stackwise}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="mt-2 border-t border-white/[0.08] pt-4 text-[13px] leading-relaxed text-white/40 md:mt-1 md:pb-2">
                Typical patterns in the Indian market, not quotes from named companies. Your StackWise quote states the exact price, scope and dates.
            </p>
        </div>
    );
}
