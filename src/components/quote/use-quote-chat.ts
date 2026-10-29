"use client";

import { useCallback, useState } from "react";
import { summarise, type QuoteAnswers, type QuotePreset } from "@/lib/quote";
import { siteConfig } from "@/config/site";

export const STEPS = ["service", "stage", "timeline", "budget", "details", "name", "email", "phone", "review"] as const;
export type Step = (typeof STEPS)[number];
export type AnswerKey = Exclude<Step, "review">;

export type ChatStatus = "chatting" | "sending" | "sent" | "failed";

export type ChatState = {
    answers: QuoteAnswers;
    /** Index into STEPS of the question being asked. */
    step: number;
    preset?: QuotePreset;
    status: ChatStatus;
    error?: string;
};

function initialState(preset?: QuotePreset): ChatState {
    const answers: QuoteAnswers = preset?.service ? { service: preset.service } : {};
    return { answers, step: preset?.service ? 1 : 0, preset, status: "chatting" };
}

/** Conversation state for the quote chat. Lives in the component that owns it, so closing the drawer keeps progress. */
export function useQuoteChat(preset?: QuotePreset) {
    const [state, setState] = useState<ChatState>(() => initialState(preset));

    const answer = useCallback((key: AnswerKey, value: string | undefined) => {
        setState((s) => ({ ...s, answers: { ...s.answers, [key]: value }, step: Math.min(STEPS.indexOf(key) + 1, STEPS.length - 1) }));
    }, []);

    /** Go back to a question; later answers are cleared so the conversation reads in order. */
    const edit = useCallback((key: AnswerKey) => {
        setState((s) => {
            const index = STEPS.indexOf(key);
            const answers: QuoteAnswers = {};
            STEPS.slice(0, index).forEach((k) => {
                if (k !== "review") answers[k] = s.answers[k];
            });
            return { ...s, answers, step: index, status: "chatting", error: undefined };
        });
    }, []);

    const reset = useCallback((next?: QuotePreset) => setState(initialState(next)), []);

    /** Called when the drawer opens: a fresh or finished chat picks up the new preset, one in progress is kept. */
    const prepare = useCallback((next?: QuotePreset) => {
        setState((s) => {
            const untouched = Object.keys(s.answers).every((k) => k === "service" && s.answers.service === s.preset?.service);
            return untouched || s.status === "sent" ? initialState(next) : s;
        });
    }, []);

    const send = useCallback(async () => {
        const { answers, preset: p } = state;
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
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "The message didn't go through");
            }
            setState((s) => ({ ...s, status: "sent" }));
        } catch (err) {
            setState((s) => ({ ...s, status: "failed", error: err instanceof Error ? err.message : "The message didn't go through" }));
        }
    }, [state]);

    return { state, answer, edit, reset, prepare, send };
}

export type QuoteChatController = ReturnType<typeof useQuoteChat>;
