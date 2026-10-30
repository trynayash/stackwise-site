"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answer, isQuestion, maskAbuse, matchOption, redactSensitive, screen, type AssistantAction } from "@/lib/assistant";
import { budgetBelowStart, estimateFor, summarise, type QuoteAnswers, type QuotePreset } from "@/lib/quote";
import { siteConfig } from "@/config/site";

export const STEPS = ["service", "stage", "timeline", "budget", "details", "name", "email", "phone", "review"] as const;
export type Step = (typeof STEPS)[number];
export type AnswerKey = Exclude<Step, "review">;
const CHOICE_STEPS = ["service", "stage", "timeline", "budget"] as const;
type ChoiceStep = (typeof CHOICE_STEPS)[number];

export type ChatStatus = "chatting" | "sending" | "sent" | "failed";

export type BotMessage = {
    id: number;
    from: "bot";
    text: string;
    /** The quote question this message asks, so an answer can be edited later. */
    asks?: AnswerKey;
    /** Rich content shown under the text. */
    card?: { kind: "estimate"; service: string } | { kind: "summary" };
    actions?: AssistantAction[];
};

export type UserMessage = { id: number; from: "user"; text: string; answers?: AnswerKey; skipped?: boolean };

export type ChatMessage = BotMessage | UserMessage;

export type ChatState = {
    messages: ChatMessage[];
    answers: QuoteAnswers;
    /** Index into STEPS of the quote question being asked. */
    step: number;
    preset?: QuotePreset;
    status: ChatStatus;
    typing: boolean;
    /** Inline validation message under the composer. */
    error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;
const SKIP_RE = /^(no|nope|nah|skip|no thanks|not now|none|n\/a|na)[.! ]*$/i;
const NAME_RE = /^[\p{L}][\p{L}\s.'-]{0,59}$/u;
/** At most this many messages in RATE_WINDOW ms; a simple brake on floods and scripted abuse. */
const RATE_LIMIT = 12;
const RATE_WINDOW = 30_000;

export const optionalSteps: Partial<Record<Step, string>> = { details: "Skip for now", phone: "No thanks" };

const firstName = (name?: string) => name?.trim().split(/\s+/)[0] ?? "";

export function questionFor(step: Step, a: QuoteAnswers): string {
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
            return `Nice to meet you, ${firstName(a.name)}. Which email should Yash send the quote to?`;
        case "phone":
            return "Would you like a reply on WhatsApp too? Add your number, or skip this.";
        case "review":
            return "Here's your summary. Send it over and Yash will reply within 24–48 hours on working days.";
    }
}

function greeting(preset?: QuotePreset): string {
    const base = "Hi, I'm the StackWise assistant. Ask me anything about our services, pricing or process, or answer a few quick questions to get a quote.";
    if (preset?.plan) return `${base} You picked the ${preset.plan} plan, good choice.`;
    if (preset?.topic) return `Hi, I'm the StackWise assistant. Happy to help with ${preset.topic}. Ask me anything, or answer a few quick questions to get a quote.`;
    return base;
}

/** What the assistant says after an answer: a price, a reassurance, or nothing. */
function followUp(step: AnswerKey, a: QuoteAnswers): Omit<BotMessage, "id" | "from"> | null {
    if (step === "service") {
        if (a.service && estimateFor(a.service)) return { text: `Here's where ${a.service.toLowerCase()} projects usually start:`, card: { kind: "estimate", service: a.service } };
        return { text: "No problem. Describe it in a moment and Yash will suggest the simplest way to build it." };
    }
    if (step === "budget") {
        if (a.budget === "Not sure yet") return { text: "That's fine. Yash will suggest a sensible range once he knows a bit more." };
        if (budgetBelowStart(a.service, a.budget)) return { text: "Thanks. That's under our usual starting price for this, but a smaller first version might fit. Yash will suggest options." };
    }
    return null;
}

let nextId = 1;
const bot = (m: Omit<BotMessage, "id" | "from">): BotMessage => ({ id: nextId++, from: "bot", ...m });
const user = (m: Omit<UserMessage, "id" | "from">): UserMessage => ({ id: nextId++, from: "user", ...m });
const ask = (step: number, a: QuoteAnswers): BotMessage => {
    const s = STEPS[step];
    return bot({ text: questionFor(s, a), asks: s === "review" ? undefined : s, card: s === "review" ? { kind: "summary" } : undefined });
};

function initialState(preset?: QuotePreset): ChatState {
    const answers: QuoteAnswers = preset?.service ? { service: preset.service } : {};
    const step = preset?.service ? 1 : 0;
    const messages: ChatMessage[] = [bot({ text: greeting(preset) })];
    if (preset?.service) {
        const note = followUp("service", answers);
        if (note) messages.push(bot(note));
    }
    messages.push(ask(step, answers));
    return { messages, answers, step, preset, status: "chatting", typing: false };
}

/**
 * Conversation state for the quote chat: a message log, the quote answers collected so far,
 * and the question being asked. Visitors can ask their own questions at any point; the
 * assistant answers from src/lib/assistant.ts and then picks the quote back up.
 */
export function useQuoteChat(preset?: QuotePreset) {
    const [state, setState] = useState<ChatState>(() => initialState(preset));
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sentAt = useRef<number[]>([]);
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    }, []);

    /** Shows "typing" briefly, then appends the assistant's messages. */
    const respond = useCallback((messages: BotMessage[], patch: Partial<ChatState> = {}) => {
        if (timer.current) clearTimeout(timer.current);
        const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setState((s) => ({ ...s, typing: true }));
        timer.current = setTimeout(() => {
            setState((s) => ({ ...s, ...patch, typing: false, messages: [...s.messages, ...messages] }));
        }, reduced ? 0 : 550 + Math.min(messages.reduce((n, m) => n + m.text.length, 0), 400));
    }, []);

    /** Records an answer to the current quote question and asks the next one. */
    const commit = useCallback(
        (key: AnswerKey, value: string | undefined, shown: string, extra: Partial<QuoteAnswers> = {}) => {
            const s = stateRef.current;
            const answers: QuoteAnswers = { ...s.answers, ...extra, [key]: value };
            const step = Math.min(STEPS.indexOf(key) + 1, STEPS.length - 1);
            setState((prev) => ({ ...prev, answers, step, error: undefined, messages: [...prev.messages, user({ text: shown, answers: key, skipped: value === undefined })] }));
            const note = followUp(key, answers);
            respond([...(note ? [bot(note)] : []), ask(step, answers)]);
        },
        [respond]
    );

    /** Answers a question the visitor asked, then (if a quote is in progress) returns to it. */
    const answerQuestion = useCallback(
        (text: string) => {
            const s = stateRef.current;
            setState((prev) => ({ ...prev, error: undefined, messages: [...prev.messages, user({ text })] }));
            const reply = answer(text);
            const out: BotMessage[] = [bot({ text: reply.text, actions: reply.actions })];
            const step = STEPS[s.step];
            if (s.status === "chatting" && step !== "review") out.push(bot({ text: `Back to your quote: ${questionFor(step, s.answers).replace(/^Thanks! /, "")}`, asks: step }));
            respond(out);
        },
        [respond]
    );

    /** Handles anything typed into the composer. */
    const submit = useCallback(
        (raw: string) => {
            const text = raw.trim().slice(0, 1000);
            if (!text) return;
            const s = stateRef.current;
            if (s.typing || s.status === "sending") return;
            const step = STEPS[s.step];

            const now = Date.now();
            sentAt.current = [...sentAt.current.filter((t) => now - t < RATE_WINDOW), now];
            if (sentAt.current.length > RATE_LIMIT) {
                setState((prev) => ({ ...prev, error: "You're sending messages quickly. Give it a few seconds." }));
                return;
            }

            // Guardrails first, whatever question is open: sensitive details are removed, then the message is screened.
            const { text: clean, removed } = redactSensitive(text);
            const previous = [...s.messages].reverse().find((m): m is UserMessage => m.from === "user")?.text;
            const check = screen(clean, previous);
            if (!check.ok || removed) {
                const shown = check.ok || !check.mask ? clean : maskAbuse(clean);
                setState((prev) => ({ ...prev, error: undefined, messages: [...prev.messages, user({ text: shown })] }));
                const notice = removed
                    ? [bot({ text: "For your safety I've removed what looked like a card number, ID number or password. Please don't share those here." })]
                    : [];
                respond([...notice, ...(check.ok ? [] : [bot({ text: check.reply.text, actions: check.reply.actions })])]);
                return;
            }

            if (s.status !== "chatting" || step === "review") return answerQuestion(text);

            if ((CHOICE_STEPS as readonly string[]).includes(step)) {
                const option = matchOption(step as ChoiceStep, text);
                if (option && !isQuestion(text)) return commit(step as AnswerKey, option, text);
                if (!option && !isQuestion(text) && step === "service") return commit("service", "Something else", text, { notes: text });
                if (!option && !isQuestion(text)) {
                    setState((prev) => ({ ...prev, error: "Pick one of the options above, or describe it in a few words." }));
                    return;
                }
                return answerQuestion(text);
            }

            if (step === "details") {
                if (isQuestion(text) && text.length < 120) return answerQuestion(text);
                if (text.length < 10) return setState((prev) => ({ ...prev, error: "A sentence or two helps Yash quote accurately." }));
                return commit("details", text, text);
            }
            if (step === "name") {
                if (isQuestion(text) || text.split(/\s+/).length > 5) return answerQuestion(text);
                const name = text.replace(/^(i'?m|i am|my name is|this is|it'?s)\s+/i, "");
                if (!NAME_RE.test(name)) return setState((prev) => ({ ...prev, error: "Please enter just your name." }));
                return commit("name", name, text);
            }
            if (step === "email") {
                if (EMAIL_RE.test(text)) return commit("email", text, text);
                if (isQuestion(text)) return answerQuestion(text);
                return setState((prev) => ({ ...prev, error: "That email doesn't look right. Try something like you@company.com." }));
            }
            if (step === "phone") {
                if (SKIP_RE.test(text)) return commit("phone", undefined, optionalSteps.phone!);
                if (PHONE_RE.test(text)) return commit("phone", text, text);
                if (isQuestion(text)) return answerQuestion(text);
                return setState((prev) => ({ ...prev, error: "Add a number with the country code, e.g. +91 98765 43210." }));
            }
        },
        [answerQuestion, commit, respond]
    );

    /** A tapped option chip. */
    const choose = useCallback(
        (option: string) => {
            const s = stateRef.current;
            if (s.typing) return;
            const step = STEPS[s.step];
            if (optionalSteps[step] === option) return commit(step as AnswerKey, undefined, option);
            if (s.status === "chatting" && step !== "review") return commit(step as AnswerKey, option, option);
            return answerQuestion(option);
        },
        [answerQuestion, commit]
    );

    /** Goes back to a quote question; the conversation after it is removed so it reads in order. */
    const edit = useCallback((key: AnswerKey) => {
        if (timer.current) clearTimeout(timer.current);
        setState((s) => {
            const index = STEPS.indexOf(key);
            const at = s.messages.findLastIndex((m) => m.from === "bot" && m.asks === key);
            if (at < 0) return s;
            const answers: QuoteAnswers = {};
            STEPS.slice(0, index).forEach((k) => {
                if (k !== "review") answers[k] = s.answers[k];
            });
            if (index > 0) answers.notes = s.answers.notes;
            return { ...s, answers, step: index, status: "chatting", typing: false, error: undefined, messages: [...s.messages.slice(0, at), ask(index, answers)] };
        });
    }, []);

    const reset = useCallback((next?: QuotePreset) => {
        if (timer.current) clearTimeout(timer.current);
        setState(initialState(next));
    }, []);

    /** Called when the drawer opens: a fresh or finished chat picks up the new preset, one in progress is kept. */
    const prepare = useCallback((next?: QuotePreset) => {
        setState((s) => {
            const fresh = !s.messages.some((m) => m.from === "user");
            return fresh || s.status === "sent" ? initialState(next) : s;
        });
    }, []);

    const send = useCallback(async () => {
        const { answers, preset: p } = stateRef.current;
        setState((s) => ({ ...s, status: "sending", error: undefined }));
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: answers.name,
                    email: answers.email,
                    phone: answers.phone || undefined,
                    projectType: answers.service ?? p?.topic ?? "Not sure yet",
                    timeline: answers.timeline ?? "Not given",
                    budget: answers.budget ?? "Not given",
                    details: `${summarise(answers, p)}\n\nSent from the quote chat on ${siteConfig.url}`,
                }),
            });
            if (!res.ok) throw new Error("not sent");
            respond([bot({ text: `Sent. Thanks, ${firstName(answers.name)}! Yash will reply to ${answers.email} within 24–48 hours on working days. Ask me anything else in the meantime.` })], { status: "sent" });
        } catch {
            respond(
                [
                    bot({
                        text: "Sorry, that didn't go through. Send the same details by email instead, it's all filled in for you.",
                        actions: [{ kind: "email", label: "Send by email", subject: "quote" }],
                    }),
                ],
                { status: "failed" }
            );
        }
    }, [respond]);

    return { state, submit, choose, edit, reset, prepare, send };
}

export type QuoteChatController = ReturnType<typeof useQuoteChat>;
