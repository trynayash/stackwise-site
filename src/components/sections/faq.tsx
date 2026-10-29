"use client";

import React from "react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Eyebrow, Reveal, WordReveal } from "@/components/ui/motion-primitives";
import { FaqList } from "@/components/ui/faq-list";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { faqs } from "@/lib/faqs";
import { siteConfig } from "@/config/site";

export function FAQ() {
    const { openInquiry } = useInquiry();

    return (
        <section id="faq" className="relative py-20 md:py-28" aria-label="Frequently asked questions">
            <div className="container mx-auto grid grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <Reveal y={12}>
                            <Eyebrow index="10">FAQ</Eyebrow>
                        </Reveal>
                        <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.75rem]">
                            <WordReveal text="Questions," /> <WordReveal text="answered." className="text-white/40" delay={0.1} />
                        </h2>
                        <Reveal delay={0.15}>
                            <p className="mt-5 text-base leading-relaxed text-white/55">
                                Everything you need to know before working with us. Can&apos;t find your answer?
                            </p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Button onClick={openInquiry} arrow="right">
                                    Ask us anything
                                </Button>
                                <a href={`mailto:${siteConfig.emails.inbound}`} className="inline-flex h-12 items-center gap-2 px-1 text-sm text-white/60 hover:text-white">
                                    <Icon icon={Mail01Icon} size={16} />
                                    Email us
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
                <Reveal delay={0.1} className="lg:col-span-8">
                    <FaqList faqs={faqs} />
                </Reveal>
            </div>
        </section>
    );
}
