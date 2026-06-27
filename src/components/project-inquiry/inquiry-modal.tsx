"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { InquiryForm } from "./inquiry-form";

const STORAGE_KEY = "stackwise_inquiry_draft";

export function InquiryModal() {
    const { isOpen, closeInquiry } = useInquiry();
    const modalRef = useRef<HTMLDivElement>(null);
    const [showCloseWarning, setShowCloseWarning] = useState(false);

    // Check if form has data
    const hasFormData = useCallback((): boolean => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;
            const data = JSON.parse(saved);
            return (
                (data.projectTypes?.length > 0) ||
                data.description?.trim() ||
                data.name?.trim() ||
                data.email?.trim()
            );
        } catch {
            return false;
        }
    }, []);

    const handleAttemptClose = useCallback(() => {
        if (hasFormData()) {
            setShowCloseWarning(true);
        } else {
            closeInquiry();
        }
    }, [hasFormData, closeInquiry]);

    const confirmClose = useCallback(() => {
        setShowCloseWarning(false);
        closeInquiry();
    }, [closeInquiry]);

    const cancelClose = useCallback(() => {
        setShowCloseWarning(false);
    }, []);

    // ESC key handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleAttemptClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleAttemptClose]);

    // Focus trap
    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const modal = modalRef.current;
        const focusableElements = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        modal.addEventListener("keydown", handleTab);
        return () => modal.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project Inquiry Form"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={handleAttemptClose}
                    />

                    {/* Modal panel */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                        className="
                            relative z-10 w-full
                            md:max-w-[900px] md:h-[80vh] md:max-h-[80vh] md:rounded-2xl
                            max-md:h-[100dvh] max-md:max-h-[100dvh]
                            bg-[#0a0a0a]/95 backdrop-blur-2xl
                            border border-white/[0.06]
                            shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]
                            flex flex-col overflow-hidden
                        "
                    >
                        {/* Background accents */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#C8FF00]/[0.02] to-transparent blur-[100px] pointer-events-none rounded-full" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#C8FF00]/[0.01] to-transparent blur-[80px] pointer-events-none rounded-full" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06]">
                            <div>
                                <h2 className="text-white font-bold text-base sm:text-lg">Start Your Project</h2>
                                <p className="text-white/30 text-xs font-mono tracking-wider uppercase mt-0.5">
                                    Project Discovery
                                </p>
                            </div>
                            <button
                                onClick={handleAttemptClose}
                                className="p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                                aria-label="Close inquiry form"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form content */}
                        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                            <InquiryForm onClose={closeInquiry} />
                        </div>
                    </motion.div>

                    {/* Close Warning Overlay */}
                    <AnimatePresence>
                        {showCloseWarning && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-[#111] border border-white/[0.08] rounded-xl p-6 max-w-sm mx-4 shadow-2xl"
                                >
                                    <h3 className="text-white font-semibold text-base mb-2">Discard progress?</h3>
                                    <p className="text-white/40 text-sm mb-6 font-light leading-relaxed">
                                        You have unsaved information in the form. Your draft will be saved for when you return.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={cancelClose}
                                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border border-white/[0.08] text-white/60 hover:text-white hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                                        >
                                            Continue editing
                                        </button>
                                        <button
                                            onClick={confirmClose}
                                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all duration-300 cursor-pointer"
                                        >
                                            Close anyway
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
