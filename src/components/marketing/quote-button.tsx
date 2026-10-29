"use client";

import React from "react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Button } from "@/components/ui/button";
import type { QuotePreset } from "@/lib/quote";

/** "Get a quote" button that opens the quote chat, optionally with an answer pre-filled. Usable from server components. */
export function QuoteButton({
    label = "Get a free quote",
    preset,
    className,
    size = "lg",
    variant = "primary",
}: {
    label?: string;
    preset?: QuotePreset;
    className?: string;
    size?: "md" | "lg";
    variant?: "primary" | "secondary";
}) {
    const { openInquiry } = useInquiry();
    return (
        <Button size={size} variant={variant} arrow="right" onClick={() => openInquiry(preset)} className={className}>
            {label}
        </Button>
    );
}
