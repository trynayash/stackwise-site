"use client";

import React from "react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Reveal } from "@/components/ui/motion-primitives";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import type { QuotePreset } from "@/lib/quote";

const nextSteps = [
    { title: "Tell us about the project", text: "A few quick questions in the chat, or an email." },
    { title: "Reply within 24–48 hours", text: "With questions, a rough scope and a starting price." },
    { title: "Free call, then a written quote", text: "No commitment until you're happy with it." },
];

export function CtaBand({
    title = "Have a project in mind?",
    subtitle = "Tell us what you're building. We'll suggest the simplest way to ship it, and tell you honestly if we're not the right fit.",
    preset,
}: {
    title?: string;
    subtitle?: string;
    /** Pre-filled chat answer for the page this band sits on. */
    preset?: QuotePreset;
}) {
    const { openInquiry } = useInquiry();

    return (
        <section className="relative py-16 md:py-24" aria-label="Start a project">
            <div className="container mx-auto px-5 sm:px-6">
                <Reveal>
                    <div className="grid grid-cols-1 gap-10 rounded-[2rem] bg-accent p-8 text-black sm:p-10 md:rounded-[2.5rem] md:p-14 lg:grid-cols-12 lg:gap-14">
                        <div className="lg:col-span-7">
                            <p className="text-sm font-semibold text-black/60">Free consultation</p>
                            <h2 className="mt-3 text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl md:text-6xl text-balance">{title}</h2>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">{subtitle}</p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button variant="dark" size="lg" arrow="right" onClick={() => openInquiry(preset)}>
                                    Get a free quote
                                </Button>
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black/10 px-7 text-base font-semibold transition-colors hover:bg-black/15"
                                >
                                    <Icon icon={Mail01Icon} size={18} />
                                    Email us
                                </a>
                            </div>
                        </div>

                        <ol className="space-y-2 self-end lg:col-span-5">
                            {nextSteps.map((s, i) => (
                                <li key={s.title} className="flex gap-4 rounded-2xl bg-black/[0.07] p-5">
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-accent">{i + 1}</span>
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
