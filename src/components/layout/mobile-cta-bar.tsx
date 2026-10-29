"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { useInquiry } from "@/components/providers/inquiry-context";
import { siteConfig } from "@/config/site";

/** Sticky quote bar for phones. Appears after the first screen, hides over the footer and while the inquiry modal is open. */
export function MobileCtaBar({ hidden }: { hidden: boolean }) {
    const { openInquiry, isOpen } = useInquiry();
    const [pastFold, setPastFold] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.6);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const show = pastFold && !hidden && !isOpen;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-x-3 z-50 md:hidden"
                    style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
                >
                    <div className="flex items-center gap-2 rounded-2xl border border-line-strong bg-surface p-2">
                        <a
                            href={`mailto:${siteConfig.emails.inbound}`}
                            aria-label="Email StackWise"
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-line text-white/70 active:scale-95 transition-transform"
                        >
                            <Icon icon={Mail01Icon} size={20} />
                        </a>
                        <button
                            onClick={openInquiry}
                            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-black active:scale-[0.98] transition-transform"
                        >
                            Get a free quote
                            <Icon icon={ArrowRight01Icon} size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
