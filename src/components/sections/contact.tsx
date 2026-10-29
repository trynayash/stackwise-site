"use client";

import React, { useState } from "react";
import { Copy01Icon, Mail01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Reveal } from "@/components/ui/motion-primitives";
import { QuoteChat } from "@/components/quote/quote-chat";
import { useQuoteChat } from "@/components/quote/use-quote-chat";
import { siteConfig } from "@/config/site";

const nextSteps = [
    { title: "Tell us about the project", text: "In the chat or by email. It takes about two minutes." },
    { title: "Get a reply within 24–48 hours", text: "With questions, a rough scope and a starting price." },
    { title: "Free call, then a written quote", text: "You decide with all the details in front of you." },
];

function EmailCard() {
    const [copied, setCopied] = useState(false);
    const email = siteConfig.emails.inbound;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <div className="rounded-3xl bg-surface p-6 md:p-7">
            <p className="text-sm font-medium text-white/55">Prefer email?</p>
            <a href={`mailto:${email}`} className="mt-2 block break-all text-xl font-semibold text-white hover:underline underline-offset-4 md:text-2xl">
                {email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
                <a
                    href={`mailto:${email}?subject=${encodeURIComponent("New project enquiry")}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
                >
                    <Icon icon={Mail01Icon} size={17} />
                    Write an email
                </a>
                <button
                    type="button"
                    onClick={copy}
                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                >
                    <Icon icon={copied ? Tick02Icon : Copy01Icon} size={17} />
                    <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
                </button>
            </div>
        </div>
    );
}

/** Closing section: the quote chat inline, with email as an equal alternative. */
export function Contact() {
    const chat = useQuoteChat();

    return (
        <section id="contact" className="relative py-20 md:py-28" aria-label="Contact">
            <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-5">
                    <Eyebrow>Get a quote</Eyebrow>
                    <h2 className="mt-4 text-[2.125rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[2.75rem] md:text-[3.5rem] text-balance">
                        Tell us what you&apos;re building.
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
                        Answer a few quick questions in the chat and you&apos;ll see a starting price straight away. Free, and no commitment.
                    </p>

                    <ol className="mt-9 space-y-5">
                        {nextSteps.map((s, i) => (
                            <li key={s.title} className="flex gap-4">
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-sm font-semibold text-accent">{i + 1}</span>
                                <div>
                                    <p className="font-semibold text-white">{s.title}</p>
                                    <p className="mt-0.5 text-[15px] text-white/55">{s.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-9">
                        <EmailCard />
                    </div>
                </Reveal>

                <Reveal delay={0.1} className="lg:col-span-7">
                    <div className="flex h-[640px] flex-col overflow-hidden rounded-3xl bg-surface md:h-[700px]">
                        <QuoteChat chat={chat} className="h-full" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
