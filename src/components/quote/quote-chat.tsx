"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp02Icon, Cancel01Icon, CheckmarkCircle02Icon, Mail01Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import {
    budgetBelowStart,
    estimateFor,
    quoteBudgets,
    quoteMailto,
    quoteServices,
    quoteStages,
    quoteTimelines,
    type QuoteAnswers,
    type QuotePreset,
} from "@/lib/quote";
import { cn } from "@/lib/utils";
import { STEPS, type AnswerKey, type QuoteChatController, type Step } from "./use-quote-chat";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,19}$/;

const choices: Partial<Record<Step, string[]>> = {
    service: quoteServices.map((s) => s.label),
    stage: quoteStages,
    timeline: quoteTimelines,
    budget: quoteBudgets.map((b) => b.label),
};

/** Steps the visitor can skip; the others need an answer. */
const optional: Partial<Record<Step, string>> = { details: "Skip for now", phone: "No thanks" };

function firstName(name?: string) {
    return name?.trim().split(/\s+/)[0] ?? "";
}

function question(step: Step, a: QuoteAnswers): string {
    switch (step) {
        case "service":
            return "What would you like to build?";
        case "stage":
            return "Where are you with it right now?";
        case "timeline":
            return "When would you like it live?";
        case "budget":
            return "What budget do you have in mind? A rough range is fine.";
        case "details":
            return "Tell me a bit about it. What should it do, and who is it for?";
        case "name":
            return "Thanks! What's your name?";
        case "email":
            return `Nice to meet you, ${firstName(a.name)}. Which email should I send the quote to?`;
        case "phone":
            return "Want a reply on WhatsApp or a quick call too? Add your number, or skip this.";
        case "review":
            return "Here's your summary. Send it over and I'll reply within 24–48 hours on working days.";
    }
}

function greeting(preset?: QuotePreset): string {
    if (preset?.plan) return `Hi, I'm Yash from StackWise. Good pick on the ${preset.plan} plan. A few quick questions and I'll put your quote together.`;
    if (preset?.topic) return `Hi, I'm Yash from StackWise. Happy to help with ${preset.topic}. A few quick questions and I'll put your quote together.`;
    return "Hi, I'm Yash from StackWise. Answer a few quick questions and I'll put a quote together for you.";
}

/** What Yash says after certain answers, so the chat gives something back (a price, a reassurance). */
function followUp(step: Step, a: QuoteAnswers): React.ReactNode {
    if (step === "service") {
        const est = estimateFor(a.service);
        if (!est) return "No problem. You can describe it in a moment and I'll suggest the simplest way to build it.";
        return (
            <div>
                <p>Here&apos;s where {a.service?.toLowerCase()} projects usually start:</p>
                <div className="mt-3 rounded-xl bg-canvas px-4 py-3.5">
                    <p className="text-2xl font-semibold tracking-tight text-accent">{est.price}</p>
                    <p className="mt-1 text-[13px] text-white/60">
                        {est.timeline ? `Typically ${est.timeline.toLowerCase()} · ` : ""}Written quote before any work starts
                    </p>
                </div>
            </div>
        );
    }
    if (step === "budget") {
        if (a.budget === "Not sure yet") return "That's fine. I'll suggest a sensible range once I know a bit more.";
        if (budgetBelowStart(a.service, a.budget)) return "Thanks. That's under our usual starting price for this, but a smaller first version might fit. I'll suggest options.";
    }
    if (step === "details" && a.details) return "Got it, that helps a lot.";
    return null;
}

function Avatar({ className }: { className?: string }) {
    return (
        <span aria-hidden className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-black", className)}>
            YS
        </span>
    );
}

function BotBubble({ children, avatar = true }: { children: React.ReactNode; avatar?: boolean }) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-end gap-2.5">
            {avatar ? <Avatar /> : <span className="w-8 flex-shrink-0" />}
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface-3 px-4 py-3 text-[15px] leading-relaxed text-white/90">{children}</div>
        </motion.div>
    );
}

function UserBubble({ children, onEdit, muted }: { children: React.ReactNode; onEdit?: () => void; muted?: boolean }) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex justify-end">
            <button
                type="button"
                onClick={onEdit}
                title="Change this answer"
                className={cn(
                    "group max-w-[85%] cursor-pointer whitespace-pre-line rounded-2xl rounded-br-md px-4 py-3 text-left text-[15px] leading-relaxed transition-opacity hover:opacity-85",
                    muted ? "bg-surface-3 text-white/55" : "bg-accent font-medium text-black"
                )}
            >
                {children}
                <span className="sr-only"> (change answer)</span>
            </button>
        </motion.div>
    );
}

function Typing() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5" aria-hidden>
            <Avatar />
            <span className="animate-pulse rounded-2xl rounded-bl-md bg-surface-3 px-4 py-3 text-sm text-white/55">Yash is typing…</span>
        </motion.div>
    );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer rounded-full bg-surface-3 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent hover:text-black active:scale-[0.97]"
        >
            {children}
        </button>
    );
}

function Summary({ a, preset }: { a: QuoteAnswers; preset?: QuotePreset }) {
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
        <dl className="mt-3 space-y-2 rounded-xl bg-canvas p-4 text-sm">
            {rows
                .filter(([, v]) => v)
                .map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                        <dt className="w-20 flex-shrink-0 text-white/50">{k}</dt>
                        <dd className="min-w-0 break-words text-white">{v}</dd>
                    </div>
                ))}
            {a.details && (
                <div className="pt-1">
                    <dt className="text-white/50">About</dt>
                    <dd className="mt-1 line-clamp-4 whitespace-pre-line text-white/80">{a.details}</dd>
                </div>
            )}
        </dl>
    );
}

/** Text input for the free-form steps (details, name, email, phone). */
function Composer({ step, onSubmit, onSkip }: { step: Step; onSubmit: (value: string) => void; onSkip?: () => void }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const multiline = step === "details";

    useEffect(() => {
        ref.current?.focus({ preventScroll: true });
    }, []);

    const submit = () => {
        const v = value.trim();
        if (step === "details" && v.length < 10) return setError("A sentence or two helps me quote accurately.");
        if (step === "name" && !v) return setError("Please add your name.");
        if (step === "email" && !EMAIL_RE.test(v)) return setError("That email doesn't look right.");
        if (step === "phone" && !PHONE_RE.test(v)) return setError("Add a number with country code, e.g. +91 98765 43210.");
        onSubmit(v);
    };

    const props = {
        ref,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(e.target.value);
            setError(null);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !(multiline && e.shiftKey)) {
                e.preventDefault();
                submit();
            }
        },
        "aria-label": { details: "About your project", name: "Your name", email: "Your email", phone: "Your phone or WhatsApp number" }[
            step as "details" | "name" | "email" | "phone"
        ],
        "aria-invalid": error ? true : undefined,
        className: "min-w-0 flex-1 resize-none bg-transparent py-2 text-[15px] text-white placeholder:text-white/40 focus:outline-none",
    };

    const placeholder = { details: "e.g. A booking app for clinics, with payments and reminders", name: "Your name", email: "you@company.com", phone: "+91 98765 43210" }[
        step as "details" | "name" | "email" | "phone"
    ];

    return (
        <div>
            <div className={cn("flex items-end gap-2 rounded-2xl bg-surface-3 py-1.5 pl-4 pr-1.5 transition-shadow focus-within:ring-2 focus-within:ring-accent/60", error && "ring-2 ring-red-400/60")}>
                {multiline ? (
                    <textarea {...props} rows={3} placeholder={placeholder} />
                ) : (
                    <input
                        {...props}
                        placeholder={placeholder}
                        type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                        autoComplete={step === "email" ? "email" : step === "phone" ? "tel" : "name"}
                        inputMode={step === "phone" ? "tel" : undefined}
                    />
                )}
                <button
                    type="button"
                    onClick={submit}
                    aria-label="Send"
                    className="mb-0.5 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent text-black transition-transform hover:scale-105 active:scale-95"
                >
                    <Icon icon={ArrowUp02Icon} size={18} strokeWidth={2} />
                </button>
            </div>
            <div className="mt-2 flex min-h-5 items-center justify-between gap-3 px-1 text-xs">
                <span role="alert" className="text-red-300">
                    {error}
                </span>
                {onSkip && (
                    <button type="button" onClick={onSkip} className="cursor-pointer text-white/55 underline-offset-4 hover:text-white hover:underline">
                        {optional[step]}
                    </button>
                )}
            </div>
        </div>
    );
}

/**
 * Conversational quote form: one question at a time, tap-to-answer where possible,
 * with the starting price shown as soon as the visitor says what they need.
 * Falls back to a pre-filled email whenever the form can't be sent.
 */
export function QuoteChat({ chat, onClose, className }: { chat: QuoteChatController; onClose?: () => void; className?: string }) {
    const { state, answer, edit, reset, send } = chat;
    const { answers: a, step: stepIndex, preset, status } = state;
    const step = STEPS[stepIndex];
    const reduced = useReducedMotion();
    const logRef = useRef<HTMLDivElement>(null);
    const answered = useRef(false);

    // Yash "types" for a moment before each new question; the first one shows straight away.
    const key = `${stepIndex}-${status}`;
    const [shownKey, setShownKey] = useState(key);
    useEffect(() => {
        if (shownKey === key) return;
        const t = setTimeout(() => setShownKey(key), reduced || !answered.current ? 0 : 650);
        return () => clearTimeout(t);
    }, [key, shownKey, reduced]);
    const typing = shownKey !== key;

    // Keep the newest message in view without scrolling the page around the chat.
    useEffect(() => {
        const el = logRef.current;
        if (el && answered.current) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
    }, [key, typing, reduced]);

    const respond = (k: AnswerKey, value: string | undefined) => {
        answered.current = true;
        answer(k, value);
    };
    const change = (k: AnswerKey) => {
        answered.current = true;
        edit(k);
    };

    const history = STEPS.slice(0, stepIndex) as AnswerKey[];
    const mailto = quoteMailto(a, preset);

    return (
        <div className={cn("flex min-h-0 flex-col", className)}>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4">
                <Avatar className="h-10 w-10 text-sm" />
                <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-white">Yash Suthar</p>
                    <p className="truncate text-[13px] text-white/55">Replies within 24–48 hours</p>
                </div>
                <a
                    href={`mailto:${siteConfig.emails.inbound}`}
                    aria-label="Email instead"
                    title="Email instead"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                    <Icon icon={Mail01Icon} size={19} />
                </a>
                <button
                    type="button"
                    onClick={() => {
                        answered.current = false;
                        reset(preset);
                    }}
                    aria-label="Start over"
                    title="Start over"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                    <Icon icon={RefreshIcon} size={18} />
                </button>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close chat"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                        <Icon icon={Cancel01Icon} size={19} />
                    </button>
                )}
            </div>

            {/* Conversation */}
            <div ref={logRef} data-lenis-prevent role="log" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 pb-4 pt-1">
                <BotBubble>{greeting(preset)}</BotBubble>

                {history.map((k, i) => {
                    const value = a[k];
                    // The reply to the latest answer waits until Yash has finished "typing".
                    const note = typing && i === history.length - 1 ? null : followUp(k, a);
                    return (
                        <React.Fragment key={k}>
                            <BotBubble avatar={false}>{question(k, a)}</BotBubble>
                            <UserBubble onEdit={() => change(k)} muted={!value}>
                                {value ?? optional[k] ?? "Skipped"}
                            </UserBubble>
                            {note && <BotBubble>{note}</BotBubble>}
                        </React.Fragment>
                    );
                })}

                {typing ? (
                    <Typing />
                ) : status === "sent" ? (
                    <BotBubble>
                        <span className="flex items-center gap-2 font-semibold text-white">
                            <Icon icon={CheckmarkCircle02Icon} size={18} className="text-accent" />
                            Sent. Thanks, {firstName(a.name)}!
                        </span>
                        <span className="mt-1 block">
                            Your project details are with me. I&apos;ll reply to <span className="text-white">{a.email}</span> within 24–48 hours on working days.
                        </span>
                    </BotBubble>
                ) : status === "failed" ? (
                    <BotBubble>
                        Sorry, that didn&apos;t go through. Send the same details by email instead, it&apos;s all filled in for you.
                    </BotBubble>
                ) : (
                    <BotBubble avatar={stepIndex === 0}>
                        {question(step, a)}
                        {step === "review" && <Summary a={a} preset={preset} />}
                    </BotBubble>
                )}
            </div>

            {/* Answer area */}
            <div className="px-5 pb-5 pt-3">
                <AnimatePresence mode="wait" initial={false}>
                    {!typing && (
                        <motion.div key={key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            {status === "sent" ? (
                                <div className="flex flex-wrap gap-2">
                                    <Chip
                                        onClick={() => {
                                            answered.current = false;
                                            reset();
                                        }}
                                    >
                                        Start a new quote
                                    </Chip>
                                    {onClose && <Chip onClick={onClose}>Back to the site</Chip>}
                                </div>
                            ) : status === "failed" ? (
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <a href={mailto} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 text-[15px] font-semibold text-black hover:bg-accent-hover">
                                        <Icon icon={Mail01Icon} size={18} />
                                        Send by email
                                    </a>
                                    <button type="button" onClick={send} className="h-12 cursor-pointer rounded-full bg-surface-3 px-5 text-[15px] font-medium text-white hover:bg-white/10">
                                        Try again
                                    </button>
                                </div>
                            ) : step === "review" ? (
                                <div>
                                    <button
                                        type="button"
                                        onClick={send}
                                        disabled={status === "sending"}
                                        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
                                    >
                                        {status === "sending" ? "Sending…" : "Send to Yash"}
                                        {status !== "sending" && <Icon icon={ArrowUp02Icon} size={18} strokeWidth={2} />}
                                    </button>
                                    <a href={mailto} className="mt-3 block text-center text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
                                        Prefer email? Send it from your inbox instead
                                    </a>
                                </div>
                            ) : choices[step] ? (
                                <div className="flex flex-wrap gap-2">
                                    {choices[step]!.map((c) => (
                                        <Chip key={c} onClick={() => respond(step as AnswerKey, c)}>
                                            {c}
                                        </Chip>
                                    ))}
                                </div>
                            ) : (
                                <Composer
                                    key={step}
                                    step={step}
                                    onSubmit={(v) => respond(step as AnswerKey, v)}
                                    onSkip={optional[step] ? () => respond(step as AnswerKey, undefined) : undefined}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
