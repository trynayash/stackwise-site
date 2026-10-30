"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import type { Faq } from "@/lib/faqs";
import { cn } from "@/lib/utils";

/** Accessible accordion. Pages also publish the same questions as FAQ structured data. */
export function FaqList({ faqs, defaultOpen = 0 }: { faqs: Faq[]; defaultOpen?: number | null }) {
    const [open, setOpen] = useState<number | null>(defaultOpen);
    const baseId = useId();

    return (
        <ul className="space-y-3">
            {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                return (
                    <li key={faq.q} className={cn("rounded-2xl transition-colors", isOpen ? "bg-surface-2" : "bg-surface hover:bg-surface-2")}>
                        <h3>
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left cursor-pointer md:px-7 md:py-6"
                            >
                                <span className={cn("text-base font-medium transition-colors md:text-lg", isOpen ? "text-white" : "text-white/80 group-hover:text-white")}>
                                    {faq.q}
                                </span>
                                <span
                                    className={cn(
                                        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                        isOpen ? "rotate-45 bg-accent text-black" : "bg-white/[0.06] text-white/70 group-hover:bg-white/[0.12]"
                                    )}
                                >
                                    <Icon icon={Add01Icon} size={16} />
                                </span>
                            </button>
                        </h3>
                        {/* Every answer is in the page's HTML, collapsed rather than removed, so search engines and
                            AI answer engines can read all of them. Closed panels are inert and hidden from assistive tech. */}
                        <motion.div
                            id={panelId}
                            role="region"
                            initial={false}
                            animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden={!isOpen}
                            inert={!isOpen}
                            className="overflow-hidden"
                        >
                            <p className="max-w-2xl px-6 pb-6 pr-14 text-[15px] leading-relaxed text-white/65 md:px-7">{faq.a}</p>
                        </motion.div>
                    </li>
                );
            })}
        </ul>
    );
}
