"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { QuotePreset } from "@/lib/quote";

interface InquiryContextType {
    isOpen: boolean;
    /** Answers to pre-fill in the quote chat, set by the button that opened it. */
    preset: QuotePreset | undefined;
    /** Opens the quote chat. Safe to pass straight to onClick: event objects are ignored. */
    openInquiry: (preset?: QuotePreset | React.SyntheticEvent) => void;
    closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType>({
    isOpen: false,
    preset: undefined,
    openInquiry: () => {},
    closeInquiry: () => {},
});

export function InquiryProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [preset, setPreset] = useState<QuotePreset | undefined>(undefined);

    const openInquiry = useCallback((value?: QuotePreset | React.SyntheticEvent) => {
        setPreset(value && !("nativeEvent" in value) ? value : undefined);
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }, []);

    const closeInquiry = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = "";
    }, []);

    return <InquiryContext.Provider value={{ isOpen, preset, openInquiry, closeInquiry }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
    return useContext(InquiryContext);
}
