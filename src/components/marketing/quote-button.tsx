"use client";

import React from "react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Button } from "@/components/ui/button";

/** Primary "get a quote" CTA that opens the project inquiry modal. Usable from server components. */
export function QuoteButton({ label = "Get a free quote", className, size = "lg" }: { label?: string; className?: string; size?: "md" | "lg" }) {
    const { openInquiry } = useInquiry();
    return (
        <Button size={size} arrow="right" onClick={openInquiry} className={className}>
            {label}
        </Button>
    );
}
