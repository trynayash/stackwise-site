import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, ArrowUpRight01Icon, Github01Icon, Globe02Icon, Location01Icon, Mail01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { CountUp, ScrollLitText } from "@/components/ui/scroll-effects";
import { Tilt } from "@/components/ui/interactive";
import { proofPoints } from "@/lib/proof";
import { siteConfig } from "@/config/site";

/** Things a visitor can check for themselves, each with a link. */
export function ProofGrid() {
    return (
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {proofPoints.map((p) => {
                const external = p.link.href.startsWith("http");
                const inner = (
                    <>
                        <span className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-white md:text-[2.75rem]">
                            <CountUp value={p.value} />
                        </span>
                        <span className="mt-3 block text-[15px] font-semibold text-accent">{p.label}</span>
                        <span className="mt-2 block text-[15px] leading-relaxed text-white/60">{p.text}</span>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-white">
                            {p.link.label}
                            <Icon icon={external ? ArrowUpRight01Icon : ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </>
                );
                const cls = "group flex h-full flex-col rounded-3xl bg-surface p-7 transition-colors hover:bg-surface-2";
                return (
                    <StaggerItem key={p.label} className="h-full">
                        <Tilt className="h-full" max={6}>
                            {external ? (
                                <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                                    {inner}
                                </a>
                            ) : (
                                <Link href={p.link.href} className={cls}>
                                    {inner}
                                </Link>
                            )}
                        </Tilt>
                    </StaggerItem>
                );
            })}
        </Stagger>
    );
}

const links = [
    { label: "Portfolio", href: siteConfig.links.portfolio, icon: Globe02Icon },
    { label: "GitHub", href: siteConfig.links.github, icon: Github01Icon },
    { label: "X", href: siteConfig.links.twitter, icon: NewTwitterIcon },
];

/** Who the client works with, plus the proof behind the claims. */
export function About() {
    return (
        <section id="founder" className="relative py-20 md:py-28" aria-label="About StackWise">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="Who you'll work with"
                    title="You talk to the engineer, not a salesperson."
                    description="StackWise is a small studio on purpose. The person who scopes your project is the person who builds it."
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <div className="flex h-full flex-col rounded-3xl bg-accent p-8 text-black md:p-10">
                            <span aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-bold text-accent">
                                YS
                            </span>
                            <p className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{siteConfig.author}</p>
                            <p className="mt-1 text-[15px] font-medium text-black/70">Founder and lead engineer</p>
                            <p className="mt-1 flex items-center gap-1.5 text-[15px] text-black/70">
                                <Icon icon={Location01Icon} size={16} />
                                {siteConfig.location.city}, {siteConfig.location.country}
                            </p>
                            <ScrollLitText
                                className="mt-7 text-xl font-medium leading-relaxed text-black md:text-2xl"
                                text="“I started StackWise to build fast, well-made web products. I work on each project myself, from the architecture plan to the final performance check.”"
                            />
                            <div className="mt-auto flex flex-wrap gap-2 pt-9">
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-6 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
                                >
                                    <Icon icon={Mail01Icon} size={18} />
                                    Email Yash
                                </a>
                                {links.map((l) => (
                                    <a
                                        key={l.label}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={l.label}
                                        title={l.label}
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20"
                                    >
                                        <Icon icon={l.icon} size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <div className="lg:col-span-7">
                        <ProofGrid />
                    </div>
                </div>
            </div>
        </section>
    );
}
