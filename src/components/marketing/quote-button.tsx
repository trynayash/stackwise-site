"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";
import { Magnetic } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

/** Primary "get a quote" CTA that opens the project inquiry modal. Usable from server components. */
export function QuoteButton({ label = "Get a free quote", className }: { label?: string; className?: string }) {
    const { openInquiry } = useInquiry();
    return (
        <Magnetic>
            <button
                onClick={openInquiry}
                className={cn(
                    "btn-shine group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#C8FF00] px-8 text-base font-bold text-black shadow-[0_0_40px_-6px_rgba(200,255,0,0.55)] hover:bg-[#d4ff33] transition-colors cursor-pointer",
                    className
                )}
            >
                {label}
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
        </Magnetic>
    );
}
