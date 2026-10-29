import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { CountUp } from "@/components/ui/scroll-effects";
import { proofPoints } from "@/lib/proof";

/** Verifiable trust signals: each card links to where a visitor can check it. */
export function Proof({ index }: { index?: string }) {
    return (
        <section className="relative py-20 md:py-28" aria-label="Proof">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index={index}
                    eyebrow="Proof"
                    title="Proof, not"
                    muted="promises."
                    description="No inflated client counts or borrowed logos — just work you can open, test and read for yourself."
                />
                <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {proofPoints.map((p) => {
                        const external = p.link.href.startsWith("http");
                        const linkClass = "group mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-white/80 transition-colors hover:text-white";
                        const content = (
                            <>
                                <span className="link-draw">{p.link.label}</span>
                                <Icon
                                    icon={external ? ArrowUpRight01Icon : ArrowRight01Icon}
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </>
                        );
                        return (
                            <StaggerItem key={p.label} className="bg-canvas">
                                <div className="flex h-full flex-col p-7">
                                    <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                        <CountUp value={p.value} />
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-accent">{p.label}</p>
                                    <p className="mt-4 text-sm leading-relaxed text-white/55">{p.text}</p>
                                    {external ? (
                                        <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            {content}
                                        </a>
                                    ) : (
                                        <Link href={p.link.href} className={linkClass}>
                                            {content}
                                        </Link>
                                    )}
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
