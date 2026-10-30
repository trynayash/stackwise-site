"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Tilt } from "@/components/ui/interactive";
import type { WorkSummary } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/** A product screenshot in a thin browser frame: the site's address above, nothing else. */
function Frame({ study, sizes, className }: { study: WorkSummary; sizes: string; className?: string }) {
    return (
        <div className={cn("overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-ink/10", className)}>
            <p className="truncate px-2.5 pb-1.5 pt-1 font-mono text-xs text-ink/70">{study.domain}</p>
            <Image
                src={study.preview}
                alt={`${study.name}: ${study.tagline}`}
                width={1600}
                height={1000}
                sizes={sizes}
                className="aspect-[16/10] w-full rounded-xl object-cover object-top"
            />
        </div>
    );
}

/**
 * Hero visual: two real products, one framed in front and one layered behind, with a caption that links
 * to the case study. On phones the frames stack in normal flow; from md up they sit in a fixed box.
 */
export function HeroStage({ projects, className }: { projects: WorkSummary[]; className?: string }) {
    const [front, back] = projects;
    if (!front) return null;

    return (
        <div className={cn("relative pt-14 md:aspect-[6/5] md:pt-0", className)}>
            {back && (
                <div className="enter-fade absolute right-0 top-0 w-[72%] rotate-[3deg] md:w-[76%]" style={{ ["--d" as string]: "350ms" } as React.CSSProperties}>
                    <Frame study={back} sizes="(min-width: 1024px) 520px, 70vw" className="opacity-90" />
                </div>
            )}

            <div className="enter-fade relative w-[90%] md:absolute md:bottom-[8%] md:left-0 md:w-[84%]" style={{ ["--d" as string]: "200ms" } as React.CSSProperties}>
                <Tilt max={4}>
                    {/* Same destination as the caption card, which is the link keyboards and screen readers use. */}
                    <Link href={`/work/${front.slug}`} tabIndex={-1} aria-hidden className="block">
                        <Frame study={front} sizes="(min-width: 1024px) 580px, 90vw" />
                    </Link>
                </Tilt>
            </div>

            <Link
                href={`/work/${front.slug}`}
                className="enter-fade group relative mt-4 flex items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.35)] ring-1 ring-ink/10 md:absolute md:-bottom-3 md:right-0 md:mt-0 md:w-[46%]"
                style={{ ["--d" as string]: "500ms" } as React.CSSProperties}
            >
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-ink">{front.name}</span>
                    <span className="block truncate text-[13px] text-ink/60">
                        {front.kind}, {front.status.toLowerCase()}
                    </span>
                </span>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-accent group-hover:text-ink">
                    <Icon icon={ArrowUpRight01Icon} size={18} />
                </span>
            </Link>
        </div>
    );
}
