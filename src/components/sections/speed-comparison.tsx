import React from "react";
import Link from "next/link";
import { timelineBenchmarks, timelineNote, timelineScaleWeeks, weeks } from "@/lib/timelines";
import { cn } from "@/lib/utils";

/** Grey for the typical agency range; the brand accent marks ours. Validated for colour-blind separation on the surface. */
const AGENCY = "#6e6e6e";
const ticks = [0, 4, 8, 12, 16, 20, 24];

const pct = (w: number) => `${(w / timelineScaleWeeks) * 100}%`;

function RangeBar({ range, color, label }: { range: [number, number]; color: string; label: string }) {
    return (
        <span
            title={`${label}: ${weeks(range)}`}
            className="absolute inset-y-0 rounded-[4px]"
            style={{ left: pct(range[0]), width: pct(range[1] - range[0]), background: color }}
        />
    );
}

/**
 * Typical agency timelines next to ours, one row per kind of project. A real table, so the numbers are text that
 * screen readers and search engines read; the range bars are decoration on a shared 0–24 week scale.
 */
export function SpeedComparison({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-3xl bg-surface p-6 md:p-8", className)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-lg font-semibold text-white md:text-xl">Live in about half the time a typical agency quotes.</p>
                    <p className="mt-1 text-[15px] text-white/60">Same scope, same quality checks, fewer hand-offs and waiting weeks.</p>
                </div>
                <ul className="flex flex-shrink-0 items-center gap-5 text-sm text-white/70" aria-label="Legend">
                    <li className="flex items-center gap-2">
                        <span aria-hidden className="h-2.5 w-5 rounded-[3px]" style={{ background: AGENCY }} />
                        Typical agency
                    </li>
                    <li className="flex items-center gap-2">
                        <span aria-hidden className="h-2.5 w-5 rounded-[3px] bg-accent" />
                        StackWise
                    </li>
                </ul>
            </div>

            <table className="mt-7 w-full border-collapse text-left">
                <caption className="sr-only">Typical agency timelines compared with StackWise timelines, in weeks</caption>
                <thead>
                    <tr className="text-xs uppercase tracking-[0.12em] text-white/45">
                        <th scope="col" className="pb-3 font-medium">Project</th>
                        <th scope="col" className="hidden pb-3 font-medium md:table-cell">
                            <span className="sr-only">Timeline in weeks</span>
                            <span aria-hidden className="relative block h-4">
                                {ticks.map((t) => (
                                    <span key={t} className="absolute -translate-x-1/2 tabular-nums normal-case tracking-normal" style={{ left: pct(t) }}>
                                        {t}
                                        {t === timelineScaleWeeks && <span className="ml-0.5">wk</span>}
                                    </span>
                                ))}
                            </span>
                        </th>
                        <th scope="col" className="pb-3 text-right font-medium">Typical agency</th>
                        <th scope="col" className="pb-3 pl-4 text-right font-medium">StackWise</th>
                    </tr>
                </thead>
                <tbody>
                    {timelineBenchmarks.map((b) => (
                        <React.Fragment key={b.project}>
                            <tr className="border-t border-line">
                                <th scope="row" className="py-4 pr-4 align-middle font-medium">
                                    <Link href={b.href} className="text-[15px] text-white hover:text-accent">
                                        {b.project}
                                    </Link>
                                </th>
                                <td aria-hidden className="hidden w-[46%] py-4 align-middle md:table-cell">
                                    <span className="relative block h-[18px]">
                                        {ticks.map((t) => (
                                            <span key={t} className="absolute inset-y-[-6px] w-px bg-white/[0.06]" style={{ left: pct(t) }} />
                                        ))}
                                        <span className="absolute inset-x-0 top-0 h-2"><RangeBar range={b.agency} color={AGENCY} label="Typical agency" /></span>
                                        <span className="absolute inset-x-0 bottom-0 h-2"><RangeBar range={b.ours} color="var(--color-accent)" label="StackWise" /></span>
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-4 text-right align-middle text-[15px] tabular-nums text-white/55">{weeks(b.agency)}</td>
                                <td className="whitespace-nowrap py-4 pl-4 text-right align-middle text-[15px] font-semibold tabular-nums text-white">{weeks(b.ours)}</td>
                            </tr>
                            {/* Phones: the bars get a full-width line of their own under the numbers. */}
                            <tr aria-hidden className="md:hidden">
                                <td colSpan={4} className="pb-4">
                                    <span className="relative block h-[18px]">
                                        <span className="absolute inset-x-0 top-0 h-2"><RangeBar range={b.agency} color={AGENCY} label="Typical agency" /></span>
                                        <span className="absolute inset-x-0 bottom-0 h-2"><RangeBar range={b.ours} color="var(--color-accent)" label="StackWise" /></span>
                                    </span>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <p className="mt-5 text-[13px] leading-relaxed text-white/45">{timelineNote}</p>
        </div>
    );
}
