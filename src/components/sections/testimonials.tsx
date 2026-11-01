import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { publishedTestimonials as testimonials } from "@/lib/testimonials";

const initials = (name: string) =>
    name
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

/** Client quotes. Renders nothing until src/lib/testimonials.ts has real entries. */
export function Testimonials() {
    if (testimonials.length === 0) return null;

    return (
        <section className="relative py-20 md:py-28" aria-label="What clients say">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader eyebrow="Clients" title="In their words." />
                <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <StaggerItem key={t.name} className="h-full">
                            <figure className={i === 0 ? "flex h-full flex-col rounded-3xl bg-accent p-7 text-black md:p-8" : "flex h-full flex-col rounded-3xl bg-surface p-7 md:p-8"}>
                                <blockquote className={i === 0 ? "text-lg font-medium leading-relaxed" : "text-lg leading-relaxed text-white/85"}>
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                                    <span
                                        aria-hidden
                                        className={i === 0 ? "flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-bold text-accent" : "flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-sm font-bold text-white"}
                                    >
                                        {initials(t.name)}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold">{t.name}</span>
                                        <span className={i === 0 ? "block text-sm text-black/65" : "block text-sm text-white/55"}>
                                            {t.role}
                                            {t.company ? `, ${t.company}` : ""}
                                        </span>
                                    </span>
                                    {t.link && (
                                        <a
                                            href={t.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${t.name} profile`}
                                            className={i === 0 ? "flex h-10 w-10 items-center justify-center rounded-full bg-black/10 hover:bg-black/20" : "flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] hover:bg-accent hover:text-black"}
                                        >
                                            <Icon icon={ArrowUpRight01Icon} size={18} />
                                        </a>
                                    )}
                                </figcaption>
                                {t.work && (
                                    <Link href={`/work/${t.work}`} className={i === 0 ? "mt-4 text-sm font-semibold underline underline-offset-4" : "mt-4 text-sm font-semibold text-white underline decoration-accent/60 underline-offset-4"}>
                                        See the project
                                    </Link>
                                )}
                            </figure>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
