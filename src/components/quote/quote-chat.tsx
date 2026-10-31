"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight01Icon, ArrowUpRight01Icon, ArrowUp02Icon, Cancel01Icon, CheckmarkCircle02Icon, Mail01Icon, PencilEdit02Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { quoteBudgets, quoteMailto, quoteServices, quoteStages, quoteTimelines, type QuoteAnswers, type QuotePreset } from "@/lib/quote";
import { estimateFor } from "@/lib/quote-estimate";
import type { AssistantAction } from "@/lib/assistant";
import { cn } from "@/lib/utils";
import { STEPS, optionalSteps, type AnswerKey, type BotMessage, type ChatState, type QuoteChatController, type Step } from "./use-quote-chat";

const options: Partial<Record<Step, string[]>> = {
    service: quoteServices.map((s) => s.label),
    stage: quoteStages,
    timeline: quoteTimelines,
    budget: quoteBudgets.map((b) => b.label),
};

const suggestions = ["How long does a project take?", "Do I own the code?", "Can I see your work?"];

const placeholders: Partial<Record<Step, string>> = {
    details: "Describe your project…",
    name: "Your name",
    email: "you@company.com",
    phone: "+91 98765 43210",
};

function mailto(subject?: string, body?: string) {
    const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join("&");
    return `mailto:${siteConfig.emails.inbound}${q ? `?${q}` : ""}`;
}

function Mark({ className }: { className?: string }) {
    return (
        <span
            aria-hidden
            className={cn("flex flex-shrink-0 items-center justify-center rounded-full bg-accent text-black", className)}
            style={{ fontFamily: "var(--font-oughter), sans-serif" }}
        >
            S
        </span>
    );
}

function Actions({ actions, answers, preset, onNavigate }: { actions: AssistantAction[]; answers: QuoteAnswers; preset?: QuotePreset; onNavigate?: () => void }) {
    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((a) =>
                a.kind === "email" ? (
                    <a
                        key={a.label ?? "email"}
                        href={a.subject === "quote" ? quoteMailto(answers, preset) : mailto(a.subject, a.body)}
                        className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
                    >
                        <Icon icon={Mail01Icon} size={16} />
                        {a.label ?? "Email us"}
                    </a>
                ) : (
                    <Link
                        key={a.href}
                        href={a.href}
                        onClick={a.href.startsWith("http") ? undefined : onNavigate}
                        target={a.href.startsWith("http") ? "_blank" : undefined}
                        rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
                    >
                        {a.label}
                        <Icon icon={a.href.startsWith("http") ? ArrowUpRight01Icon : ArrowRight01Icon} size={15} />
                    </Link>
                )
            )}
        </div>
    );
}

function EstimateCard({ service }: { service: string }) {
    const est = estimateFor(service);
    if (!est) return null;
    return (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
            <p className="text-2xl font-semibold tracking-tight text-accent">{est.price}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">
                {est.timeline ? `Typically ${est.timeline.toLowerCase()} · ` : ""}Written quote before any work starts
            </p>
        </div>
    );
}

function SummaryCard({ state, onSend, onNavigate }: { state: ChatState; onSend: () => void; onNavigate?: () => void }) {
    const { answers: a, preset, status } = state;
    const rows: [string, string | undefined][] = [
        ["Plan", preset?.plan],
        ["Building", a.service ?? preset?.topic],
        ["Stage", a.stage],
        ["Launch", a.timeline],
        ["Budget", a.budget],
        ["Name", a.name],
        ["Email", a.email],
        ["Phone", a.phone],
    ];
    return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <dl className="space-y-2 p-4 text-sm">
                {rows
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                        <div key={k} className="flex gap-3">
                            <dt className="w-20 flex-shrink-0 text-white/50">{k}</dt>
                            <dd className="min-w-0 break-words text-white">{v}</dd>
                        </div>
                    ))}
                {a.details && (
                    <div className="flex gap-3">
                        <dt className="w-20 flex-shrink-0 text-white/50">About</dt>
                        <dd className="line-clamp-3 min-w-0 whitespace-pre-line break-words text-white/85">{a.details}</dd>
                    </div>
                )}
            </dl>
            <div className="flex flex-col gap-2 border-t border-white/10 p-3 sm:flex-row">
                <button
                    type="button"
                    onClick={onSend}
                    disabled={status === "sending" || status === "sent"}
                    className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-black transition-colors hover:bg-accent-hover disabled:cursor-default disabled:opacity-70"
                >
                    {status === "sent" ? (
                        <>
                            <Icon icon={CheckmarkCircle02Icon} size={17} />
                            Sent
                        </>
                    ) : status === "sending" ? (
                        "Sending…"
                    ) : (
                        "Send to Yash"
                    )}
                </button>
                <a
                    href={quoteMailto(a, preset)}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-white/30"
                >
                    <Icon icon={Mail01Icon} size={16} />
                    Send by email instead
                </a>
            </div>
            <p className="px-4 pb-3 text-xs text-white/50">
                By sending, you agree to our{" "}
                <Link href="/privacy" onClick={onNavigate} className="underline underline-offset-2 hover:text-white">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}

function BotRow({ m, state, isLatestSummary, onSend, onNavigate }: { m: BotMessage; state: ChatState; isLatestSummary: boolean; onSend: () => void; onNavigate?: () => void }) {
    return (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex gap-3">
            <Mark className="mt-0.5 h-7 w-7 text-[13px]" />
            <div className="min-w-0 flex-1 text-[15px] leading-7 text-white/90">
                <p className="whitespace-pre-line">{m.text}</p>
                {m.card?.kind === "estimate" && <EstimateCard service={m.card.service} />}
                {m.card?.kind === "summary" && isLatestSummary && <SummaryCard state={state} onSend={onSend} onNavigate={onNavigate} />}
                {m.actions && <Actions actions={m.actions} answers={state.answers} preset={state.preset} onNavigate={onNavigate} />}
            </div>
        </motion.div>
    );
}

/**
 * The quote chat window: a header, the conversation, and a composer that accepts both
 * quote answers and free questions. Used inline on the home page and in the quote drawer.
 */
export function QuoteChat({ chat, onClose, className }: { chat: QuoteChatController; onClose?: () => void; className?: string }) {
    const { state, submit, choose, edit, reset, send } = chat;
    const { messages, typing, status, error } = state;
    const step = STEPS[state.step];
    const reduced = useReducedMotion();
    const logRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const interacted = useRef(false);
    const [value, setValue] = useState("");
    const inputId = useId();

    const quoteOpen = status === "chatting" && step !== "review";
    const chips = typing
        ? []
        : quoteOpen
          ? (options[step] ?? (optionalSteps[step] ? [optionalSteps[step]!] : []))
          : suggestions;

    // Keep the newest message in view: animated once the visitor has joined in, a plain jump while the
    // greeting arrives (on a short landscape phone the second line would otherwise sit under the fold).
    useEffect(() => {
        const el = logRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: interacted.current && !reduced ? "smooth" : "auto" });
    }, [messages.length, typing, reduced]);

    // Reopening the drawer mid-conversation starts at the latest message.
    useLayoutEffect(() => {
        const el = logRef.current;
        if (el && messages.some((m) => m.from === "user")) {
            el.scrollTop = el.scrollHeight;
            interacted.current = true;
        }
        // Only on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resize = () => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
    };

    const send_ = () => {
        if (!value.trim() || typing || status === "sending") return;
        interacted.current = true;
        submit(value);
        setValue("");
        requestAnimationFrame(resize);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
        // On phones the return key adds a new line in long answers; the send button sends.
        const touch = window.matchMedia("(pointer: coarse)").matches;
        if (touch && (step === "details" || !quoteOpen)) return;
        e.preventDefault();
        send_();
    };

    const latestSummary = messages.findLastIndex((m) => m.from === "bot" && m.card?.kind === "summary");
    const canSend = value.trim().length > 0 && !typing && status !== "sending";

    return (
        <div className={cn("flex min-h-0 flex-col bg-[#0d0d0d]", className)}>
            {/* Header */}
            <div className="flex flex-shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4 py-3 short:py-2 sm:gap-3 sm:px-5">
                <Mark className="h-9 w-9 text-base" />
                <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-tight text-white">StackWise assistant</p>
                    <p className="mt-0.5 truncate text-[13px] text-white/55">
                        Instant answers<span className="hidden sm:inline"> · Yash replies to every quote</span>
                    </p>
                </div>
                {/* Buttons sit flush against each other (each is a 40px target) so the title keeps its line. */}
                <div className="-mr-2 flex flex-shrink-0 items-center">
                    {/* The composer has its own "Email us" link, so the smallest phones drop this one. */}
                    <a
                        href={mailto("Hello from the website")}
                        aria-label="Email us"
                        title="Email us"
                        className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full min-[360px]:flex text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white"
                    >
                        <Icon icon={Mail01Icon} size={18} />
                    </a>
                    <button
                        type="button"
                        onClick={() => {
                            interacted.current = false;
                            setValue("");
                            reset(state.preset);
                        }}
                        aria-label="Start over"
                        title="Start over"
                        className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white"
                    >
                        <Icon icon={RefreshIcon} size={17} />
                    </button>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close chat"
                            className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white"
                        >
                            <Icon icon={Cancel01Icon} size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Conversation */}
            <div ref={logRef} data-lenis-prevent role="log" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="mx-auto w-full max-w-[720px] space-y-6 px-4 py-6 short:space-y-4 short:py-3 sm:px-6">
                    {messages.map((m, i) =>
                        m.from === "bot" ? (
                            <BotRow key={m.id} m={m} state={state} isLatestSummary={i === latestSummary} onSend={send} onNavigate={onClose} />
                        ) : (
                            <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="group flex items-center justify-end gap-2">
                                {m.answers && (
                                    <Icon icon={PencilEdit02Icon} size={15} className="text-white/0 transition-colors group-hover:text-white/45 group-focus-within:text-white/45 [@media(hover:none)]:text-white/40" />
                                )}
                                {m.answers ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            interacted.current = true;
                                            edit(m.answers as AnswerKey);
                                        }}
                                        title="Edit this answer"
                                        className={cn(
                                            "max-w-[85%] cursor-pointer whitespace-pre-wrap break-words rounded-[20px] px-4 py-2.5 text-left text-[15px] leading-6 transition-colors",
                                            m.skipped ? "bg-white/[0.05] text-white/55" : "bg-white/[0.09] text-white hover:bg-white/[0.12]"
                                        )}
                                    >
                                        {m.text}
                                        <span className="sr-only"> (edit answer)</span>
                                    </button>
                                ) : (
                                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-[20px] bg-white/[0.09] px-4 py-2.5 text-[15px] leading-6 text-white">{m.text}</p>
                                )}
                            </motion.div>
                        )
                    )}
                    {typing && (
                        <div className="flex items-center gap-3" aria-label="The assistant is typing">
                            <Mark className="h-7 w-7 text-[13px]" />
                            <span className="animate-pulse text-sm text-white/55">Typing…</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Composer */}
            <div className="flex-shrink-0 px-3 pb-3 pt-2 sm:px-5 sm:pb-4 short:pb-2">
                <div className="mx-auto w-full max-w-[720px]">
                    {chips.length > 0 && (
                        // One swipeable row on phones and short screens, so the options never crowd out the conversation.
                        <div data-lenis-prevent className="scrollbar-hide -mx-3 mb-3 flex gap-2 overflow-x-auto px-3 sm:tall:mx-0 sm:tall:flex-wrap sm:tall:overflow-visible sm:tall:px-0">
                            {chips.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => {
                                        interacted.current = true;
                                        choose(c);
                                    }}
                                    className="flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-white/[0.14] px-4 py-2.5 text-sm text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.05] hover:text-white active:scale-[0.98]"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    {error && (
                        <p role="alert" className="mb-2 px-1 text-sm text-red-300">
                            {error}
                        </p>
                    )}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            send_();
                        }}
                        onClick={() => inputRef.current?.focus()}
                        className="cursor-text rounded-[22px] border border-white/[0.12] bg-[#161616] transition-colors focus-within:border-white/30"
                    >
                        <label htmlFor={inputId} className="sr-only">
                            Message
                        </label>
                        <textarea
                            id={inputId}
                            ref={inputRef}
                            rows={1}
                            value={value}
                            maxLength={1000}
                            onChange={(e) => {
                                setValue(e.target.value);
                                resize();
                            }}
                            onKeyDown={onKeyDown}
                            placeholder={quoteOpen ? (placeholders[step] ?? "Ask a question or type your answer…") : "Ask anything about StackWise…"}
                            inputMode={quoteOpen && step === "email" ? "email" : quoteOpen && step === "phone" ? "tel" : "text"}
                            autoComplete={quoteOpen && step === "email" ? "email" : quoteOpen && step === "phone" ? "tel" : quoteOpen && step === "name" ? "name" : "off"}
                            enterKeyHint="send"
                            className="block max-h-[168px] w-full resize-none bg-transparent px-4 pb-1 pt-3.5 text-base leading-6 text-white placeholder:text-white/40 outline-none focus:outline-none focus-visible:outline-none"
                        />
                        <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
                            <a
                                href={mailto("Hello from the website")}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                            >
                                <Icon icon={Mail01Icon} size={16} />
                                Email us
                            </a>
                            <button
                                type="submit"
                                disabled={!canSend}
                                aria-label="Send message"
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-hover disabled:cursor-default disabled:bg-white/[0.08] disabled:text-white/35"
                            >
                                <Icon icon={ArrowUp02Icon} size={18} strokeWidth={2} />
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-xs leading-relaxed text-white/50">
                        Answers cover StackWise only. Don&apos;t share passwords or card details.{" "}
                        <Link href="/privacy" onClick={onClose} className="underline underline-offset-2 hover:text-white">
                            Privacy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
