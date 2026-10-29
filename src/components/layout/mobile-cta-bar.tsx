"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
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
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]">
                        <a
                            href={`mailto:${siteConfig.emails.inbound}`}
                            aria-label="Email StackWise"
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/70 active:scale-95 transition-transform"
                        >
                            <Mail size={18} />
                        </a>
                        <button
                            onClick={openInquiry}
                            className="btn-shine flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#C8FF00] text-[15px] font-bold text-black active:scale-[0.98] transition-transform"
                        >
                            Get a free quote
                            <ArrowUpRight size={17} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
