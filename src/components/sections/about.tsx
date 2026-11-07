import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, ArrowUpRight01Icon, CloudUploadIcon, CodeIcon, Location01Icon, Mail01Icon, PenTool03Icon, Search01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
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

/** What the team covers on every project, start to finish. */
const disciplines = [
    { label: "Strategy and scoping", icon: Search01Icon },
    { label: "UI/UX design", icon: PenTool03Icon },
    { label: "Engineering", icon: CodeIcon },
    { label: "Testing and launch", icon: CloudUploadIcon },
];

/** The team the client works with, plus the proof behind the claims. */
export function About() {
    return (
        <section id="about" className="relative py-16 md:py-28" aria-label="About StackWise">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="Who you'll work with"
                    title="You work with our team, not a salesperson."
                    description="StackWise is a small studio on purpose. The team that scopes your project is the team that designs, builds and launches it."
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <div className="flex h-full flex-col rounded-3xl bg-accent p-8 text-black md:p-10">
                            <span aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-accent">
                                <Icon icon={UserGroupIcon} size={34} />
                            </span>
                            <p className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">The {siteConfig.name} team</p>
                            <p className="mt-1 text-[15px] font-medium text-black/70">Strategy, design and engineering under one roof</p>
                            <p className="mt-1 flex items-center gap-1.5 text-[15px] text-black/70">
                                <Icon icon={Location01Icon} size={16} />
                                {siteConfig.location.city}, {siteConfig.location.country}
                            </p>
                            <ScrollLitText
                                className="mt-7 text-xl font-medium leading-relaxed text-black md:text-2xl"
                                text="“We started StackWise to build fast, well-made software. Our team stays on every project from the architecture plan to the final performance check, so nothing gets lost in a hand-off.”"
                            />
                            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3">
                                {disciplines.map((d) => (
                                    <li key={d.label} className="flex items-center gap-2 text-[15px] font-medium text-black/80">
                                        <Icon icon={d.icon} size={18} className="flex-shrink-0" />
                                        {d.label}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto flex flex-wrap gap-2 pt-9">
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-6 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
                                >
                                    <Icon icon={Mail01Icon} size={18} />
                                    Email the team
                                </a>
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
