"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import type { WorkSummary } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/**
 * One product in a thin browser frame (its address above, nothing else) with its name underneath. The whole card
 * links to the case study.
 *
 * The lead card's screenshot keeps its own 16:10 shape and so sets the row's height; the second card stretches to
 * that height and crops its screenshot from the top-left corner, which keeps the product's headline in view.
 */
function Shot({
    study,
    lead,
    sizes,
    delay,
    className,
}: {
    study: WorkSummary;
    lead: boolean;
    sizes: string;
    delay: number;
    className?: string;
}) {
    return (
        <Link
            href={`/work/${study.slug}`}
            aria-label={`${study.name}, ${study.kind.toLowerCase()}: read the case study`}
            className={cn("enter-fade group flex flex-col", className)}
            style={{ ["--d" as string]: `${delay}ms` } as React.CSSProperties}
        >
            <div className="flex flex-1 flex-col rounded-[18px] bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_60px_-30px_rgba(0,0,0,0.22)] ring-1 ring-ink/[0.08] transition-shadow duration-500 group-hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_70px_-30px_rgba(0,0,0,0.3)]">
                <p className="truncate px-2.5 pb-1.5 pt-1 font-mono text-xs text-ink/50">{study.domain}</p>
                <div className={cn("relative overflow-hidden rounded-xl bg-paper", lead ? "aspect-[16/10]" : "aspect-[16/10] md:aspect-auto md:flex-1")}>
                    <Image
                        src={study.preview}
                        alt={`${study.name}: ${study.tagline}`}
                        fill
                        sizes={sizes}
                        preload={lead}
                        className="object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-1">
                <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-ink">{study.name}</span>
                    <span className="mt-0.5 block truncate text-sm text-ink/55">{study.kind}</span>
                </span>
                <span
                    aria-hidden
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink ring-1 ring-inset ring-ink/15 transition-colors duration-300 group-hover:bg-ink group-hover:text-white group-hover:ring-ink"
                >
                    <Icon icon={ArrowUpRight01Icon} size={16} />
                </span>
            </div>
        </Link>
    );
}

/**
 * Hero visual: two real products side by side on a 12-column grid (7 + 5), the same grid and gutter as the copy above,
 * so from xl up the second card's left edge lines up with the supporting text. Phones show the lead product only.
 */
export function HeroStage({ projects, className }: { projects: WorkSummary[]; className?: string }) {
    const [lead, second] = projects;
    if (!lead) return null;

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-12 md:gap-x-6 lg:gap-x-8", className)}>
            <Shot study={lead} lead sizes="(min-width: 1536px) 860px, (min-width: 768px) 58vw, 100vw" delay={250} className="md:col-span-7" />
            {second && (
                <Shot
                    study={second}
                    lead={false}
                    sizes="(min-width: 1536px) 620px, (min-width: 768px) 42vw, 100vw"
                    delay={380}
                    className="hidden md:col-span-5 md:flex"
                />
            )}
        </div>
    );
}
