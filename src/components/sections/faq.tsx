"use client";

import React from "react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FaqList } from "@/components/ui/faq-list";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { useInquiry } from "@/components/providers/inquiry-context";
import { faqs } from "@/lib/faqs";
import { siteConfig } from "@/config/site";

export function FAQ() {
    const { openInquiry } = useInquiry();

    return (
        <section id="faq" className="relative py-20 md:py-28" aria-label="Frequently asked questions">
            <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <SectionHeader eyebrow="FAQ" title="Common questions." className="mb-6 md:mb-6 lg:block" />
                        <Reveal delay={0.1}>
                            <p className="text-base leading-relaxed text-white/60 md:text-lg">Can&apos;t find your answer? Ask in the chat or send an email.</p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Button onClick={() => openInquiry({ topic: "a question" })} arrow="right">
                                    Ask a question
                                </Button>
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.12]"
                                >
                                    <Icon icon={Mail01Icon} size={18} />
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
