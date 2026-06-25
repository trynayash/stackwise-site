"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface InquiryContextType {
    isOpen: boolean;
    openInquiry: () => void;
    closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType>({
    isOpen: false,
    openInquiry: () => {},
    closeInquiry: () => {},
});

export function InquiryProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openInquiry = useCallback(() => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }, []);

    const closeInquiry = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = "";
    }, []);

    return (
        <InquiryContext.Provider value={{ isOpen, openInquiry, closeInquiry }}>
            {children}
        </InquiryContext.Provider>
    );
}

export function useInquiry() {
    return useContext(InquiryContext);
}
