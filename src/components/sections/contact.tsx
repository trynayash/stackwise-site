"use client";

import React, { useState } from "react";
import { Calendar03Icon, Copy01Icon, Mail01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Reveal } from "@/components/ui/motion-primitives";
import dynamic from "next/dynamic";
import { useReached } from "@/components/ui/use-reached";
import { siteConfig } from "@/config/site";
import { bookCallUrl } from "@/lib/booking";

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
            <p className="text-sm font-medium text-white/55">{bookCallUrl("contact") ? "Prefer email or a call?" : "Prefer email?"}</p>
            <a href={`mailto:${email}`} className="mt-1 block break-words py-2 text-xl font-semibold text-white hover:underline underline-offset-4 md:text-2xl">
                {/* On narrow screens the address breaks before the @, never mid-word. */}
                {email.split("@")[0]}
                <wbr />@{email.split("@")[1]}
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
                {bookCallUrl("contact") && (
                    <a
                        href={bookCallUrl("contact")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                    >
                        <Icon icon={Calendar03Icon} size={17} />
                        Book a call
                    </a>
                )}
            </div>
        </div>
    );
}

/** What the chat panel shows until the real chat loads: the same frame and greeting, so nothing shifts. */
function ChatPlaceholder() {
    return (
        <div className="flex h-full flex-col bg-[#0d0d0d]" aria-hidden>
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
                <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-base text-black"
                    style={{ fontFamily: "var(--font-oughter), sans-serif" }}
                >
                    S
                </span>
                <div>
                    <p className="text-[15px] font-semibold leading-tight text-white">StackWise assistant</p>
                    <p className="mt-0.5 text-[13px] text-white/55">Instant answers</p>
                </div>
            </div>
            <p className="px-4 py-6 text-[15px] leading-relaxed text-white/80 sm:px-6">
                Hi, I&apos;m the StackWise assistant. Ask me anything about our services, pricing or process, or answer a few quick questions to get a quote.
            </p>
            <div className="mt-auto p-3 sm:p-5">
                <div className="h-[98px] rounded-[22px] border border-white/[0.12] bg-[#161616]" />
            </div>
        </div>
    );
}

// The chat and its answer engine load when the visitor scrolls near this section, not with the first page load.
const InlineChat = dynamic(() => import("@/components/quote/inline-chat"), { ssr: false, loading: () => <ChatPlaceholder /> });

/** Closing section: the quote chat inline, with email as an equal alternative. */
export function Contact() {
    // Start loading the chat about a screen before it scrolls into view.
    const [chatRef, chatNear] = useReached<HTMLDivElement>(-800);

    return (
        <section id="contact" className="relative py-20 md:py-28" aria-label="Contact">
            <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-5">
                    <Eyebrow>Get a quote</Eyebrow>
                    <h2 className="mt-4 text-[2.125rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[2.75rem] md:text-[3.5rem] text-balance">
                        Tell us what you&apos;re building.
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
                        Ask anything, or answer a few quick questions and you&apos;ll see a starting price straight away. Free, and no commitment.
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
                    <div
                        ref={chatRef}
                        className="flex h-[min(680px,calc(100svh-6rem))] min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:h-[720px]"
                    >
                        {chatNear ? <InlineChat /> : <ChatPlaceholder />}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
