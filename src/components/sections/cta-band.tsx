"use client";

import React from "react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Reveal } from "@/components/ui/motion-primitives";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";

const nextSteps = [
    { title: "Tell us about the project", text: "A few questions about goals, scope and timeline." },
    { title: "We reply within 24–48 hours", text: "With questions, a rough scope and next steps." },
    { title: "Free discovery call", text: "Then a written quote — no commitment needed." },
];

export function CtaBand({
    title = "Have a project in mind?",
    subtitle = "Tell us what you're building. We'll help you find the simplest way to ship it — and tell you honestly if we're not the right fit.",
}: {
    title?: string;
    subtitle?: string;
}) {
    const { openInquiry } = useInquiry();

    return (
        <section className="relative py-16 md:py-24" aria-label="Start a project">
            <div className="container mx-auto px-5 sm:px-6">
                <Reveal>
                    <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-accent p-8 text-black sm:p-10 md:p-14 lg:grid-cols-12 lg:gap-14">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Free project consultation</p>
                            <h2 className="mt-4 text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl md:text-6xl text-balance">{title}</h2>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">{subtitle}</p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button variant="dark" size="lg" arrow="right" onClick={openInquiry}>
                                    Get your free quote
                                </Button>
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/20 px-7 text-base font-semibold transition-colors hover:bg-black/5"
                                >
                                    <Icon icon={Mail01Icon} size={18} />
                                    Email us
                                </a>
                            </div>
                        </div>

                        <ol className="space-y-px self-end overflow-hidden rounded-2xl border border-black/10 bg-black/10 lg:col-span-5">
                            {nextSteps.map((s, i) => (
                                <li key={s.title} className="flex gap-4 bg-accent p-5">
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-black/20 font-mono text-xs font-semibold">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-semibold">{s.title}</p>
                                        <p className="mt-0.5 text-sm text-black/65">{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
