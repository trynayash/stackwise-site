"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInquiry } from "@/components/providers/inquiry-context";
import { QuoteChat } from "./quote-chat";
import { useQuoteChat } from "./use-quote-chat";

/**
 * The quote chat as a side drawer (full screen on phones). Every "Get a quote" button opens it.
 * The conversation state lives here, outside the animated panel, so closing and reopening keeps progress.
 */
export function QuoteDrawer() {
    const { isOpen, preset, closeInquiry } = useInquiry();
    const chat = useQuoteChat(preset);
    const panelRef = useRef<HTMLDivElement>(null);
    const restoreFocus = useRef<HTMLElement | null>(null);

    // Each time it opens, a fresh or finished chat takes the preset of the button that was clicked.
    const [seenOpen, setSeenOpen] = useState(false);
    if (isOpen !== seenOpen) {
        setSeenOpen(isOpen);
        if (isOpen) chat.prepare(preset);
    }

    useEffect(() => {
        if (!isOpen) return;
        restoreFocus.current = document.activeElement as HTMLElement | null;
        const panel = panelRef.current;
        const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("button, [href], input, textarea, [tabindex]:not([tabindex='-1'])") ?? []);
        const first = focusables().find((el) => el.matches("input, textarea")) ?? focusables()[0];
        first?.focus({ preventScroll: true });

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeInquiry();
            if (e.key !== "Tab") return;
            const items = focusables();
            if (!items.length) return;
            const [head, tail] = [items[0], items[items.length - 1]];
            if (e.shiftKey && document.activeElement === head) {
                e.preventDefault();
                tail.focus();
            } else if (!e.shiftKey && document.activeElement === tail) {
                e.preventDefault();
                head.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            restoreFocus.current?.focus({ preventScroll: true });
        };
    }, [isOpen, closeInquiry]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Get a quote from StackWise">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={closeInquiry}
                    />
                    <motion.div
                        ref={panelRef}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 36 }}
                        className="absolute inset-0 flex h-[100dvh] flex-col overflow-hidden bg-[#0d0d0d] sm:inset-y-3 sm:left-auto sm:right-3 sm:h-auto sm:w-[460px] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
                    >
                        <QuoteChat chat={chat} onClose={closeInquiry} className="h-full" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
