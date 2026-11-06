import Link from "next/link";
import { timelineBenchmarks, timelineNote, timelineScaleWeeks, weeks } from "@/lib/timelines";
import { cn } from "@/lib/utils";

/** Agency quotes in a neutral grey, StackWise in the brand accent: the pair checked for colour-blind separation. */
const AGENCY = "bg-[#6e6e6e]";
const OURS = "bg-accent";
const AXIS = [0, 8, 16, 24];

/** Left edge and width of a range on the shared scale, as percentages of the track. */
const span = ([from, to]: [number, number]) => ({
    left: `${(from / timelineScaleWeeks) * 100}%`,
    width: `${((to - from) / timelineScaleWeeks) * 100}%`,
});

/** Two columns from md up: the project and its numbers, then the track. The axis uses the same grid, so ticks line up. */
const layout = "md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10";

/** Typical agency quotes next to StackWise, in weeks, on one shared scale. The numbers are text; the bars are decoration. */
export function SpeedComparison({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-3xl bg-surface px-5 py-5 md:px-8 md:py-7", className)}>
            <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] text-white/55">Weeks from start to launch</p>
                <ul className="flex shrink-0 items-center gap-5 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                        <span aria-hidden className={cn("h-2 w-5 rounded-full", AGENCY)} />
                        Typical agency
                    </li>
                    <li className="flex items-center gap-2">
                        <span aria-hidden className={cn("h-2 w-5 rounded-full", OURS)} />
                        StackWise
                    </li>
                </ul>
            </div>

            <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
                {timelineBenchmarks.map((b) => (
                    <li key={b.project} className={cn("py-5 md:items-center", layout)}>
                        <div>
                            <Link href={b.href} className="text-[15px] font-medium text-white transition-colors hover:text-accent">
                                {b.project}
                            </Link>
                            <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-white/45">
                                <span>
                                    Agency <span className="tabular-nums text-white/65">{weeks(b.agency)}</span>
                                </span>
                                <span>
                                    StackWise <span className="font-semibold tabular-nums text-white">{weeks(b.ours)}</span>
                                </span>
                            </p>
                        </div>
                        <div aria-hidden className="relative mt-4 h-[18px] md:mt-0">
                            <span className={cn("absolute top-0 h-[7px] rounded-full", AGENCY)} style={span(b.agency)} />
                            <span className={cn("absolute bottom-0 h-[7px] rounded-full", OURS)} style={span(b.ours)} />
                        </div>
                    </li>
                ))}
            </ul>

            <div className={cn("border-t border-white/[0.08] pt-3", layout)}>
                <span className="hidden text-xs text-white/40 md:block">Weeks</span>
                <div aria-hidden className="relative h-4 text-xs tabular-nums text-white/40">
                    {AXIS.map((t) => (
                        <span
                            key={t}
                            className={cn(
                                "absolute top-0 -translate-x-1/2",
                                t === 0 && "translate-x-0",
                                t === timelineScaleWeeks && "-translate-x-full"
                            )}
                            style={{ left: `${(t / timelineScaleWeeks) * 100}%` }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-white/40">{timelineNote}</p>
        </div>
    );
}
