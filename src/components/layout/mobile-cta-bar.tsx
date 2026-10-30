"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { useInquiry } from "@/components/providers/inquiry-context";
import { siteConfig } from "@/config/site";

/**
 * Quote shortcut that appears after the first screen: a full-width bar on phones and a chat bubble
 * on larger screens. Hidden over the footer (which has its own call to action) and while the chat is open.
 */
export function MobileCtaBar({ hidden }: { hidden: boolean }) {
    const { openInquiry, isOpen } = useInquiry();
    const [pastFold, setPastFold] = React.useState(false);
    const [overContact, setOverContact] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.8);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        // The home page's contact section already shows the chat; don't cover it.
        const contact = document.getElementById("contact");
        const observer = new IntersectionObserver(([e]) => setOverContact(e.isIntersecting), { threshold: 0.15 });
        if (contact) observer.observe(contact);
        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
            setOverContact(false);
        };
    }, [pathname]);

    const show = pastFold && !hidden && !isOpen && !overContact;

    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        key="bar"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-x-3 z-50 md:hidden"
                        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
                    >
                        <div className="flex items-center gap-2 rounded-2xl bg-surface-2 p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
                            <a
                                href={`mailto:${siteConfig.emails.inbound}`}
                                aria-label="Email StackWise"
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white transition-transform active:scale-95"
                            >
                                <Icon icon={Mail01Icon} size={20} />
                            </a>
                            <button
                                onClick={openInquiry}
                                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-black transition-transform active:scale-[0.98]"
                            >
                                Get a free quote
                                <Icon icon={ArrowRight01Icon} size={18} />
                            </button>
                        </div>
                    </motion.div>

                    <motion.button
                        key="bubble"
                        type="button"
                        onClick={openInquiry}
                        initial={{ y: 24, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 24, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="group fixed bottom-6 right-6 z-50 hidden cursor-pointer items-center gap-3 rounded-full bg-surface-2 py-2 pl-2 pr-6 text-left shadow-[0_20px_40px_-12px_rgba(0,0,0,0.85)] transition-colors hover:bg-surface-3 md:flex"
                    >
                        <span
                            aria-hidden
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg text-black"
                            style={{ fontFamily: "var(--font-oughter), sans-serif" }}
                        >
                            S
                        </span>
                        <span>
                            <span className="block text-[15px] font-semibold text-white">Get a quote</span>
                            <span className="block text-xs text-white/55">Ask anything · instant answers</span>
                        </span>
                    </motion.button>
                </>
            )}
        </AnimatePresence>
    );
}
