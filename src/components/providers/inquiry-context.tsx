"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import type { QuotePreset } from "@/lib/quote";
import { lockScroll, unlockScroll } from "@/lib/scroll";

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
    // Whether this provider currently holds the page's scroll lock, so repeat opens never lock twice.
    const locked = useRef(false);

    const openInquiry = useCallback((value?: QuotePreset | React.SyntheticEvent) => {
        setPreset(value && !("nativeEvent" in value) ? value : undefined);
        setIsOpen(true);
        if (!locked.current) {
            locked.current = true;
            lockScroll();
        }
    }, []);

    const closeInquiry = useCallback(() => {
        setIsOpen(false);
        if (locked.current) {
            locked.current = false;
            unlockScroll();
        }
    }, []);

    return <InquiryContext.Provider value={{ isOpen, preset, openInquiry, closeInquiry }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
    return useContext(InquiryContext);
}
