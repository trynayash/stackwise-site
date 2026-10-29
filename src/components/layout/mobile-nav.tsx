"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Add01Icon, Cancel01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useInquiry } from "@/components/providers/inquiry-context";
import { useNavLink } from "@/hooks/use-section-nav";
import { servicePages, solutionPages, technologyPages } from "@/lib/marketing-pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const { openInquiry } = useInquiry();
    const navLink = useNavLink();

    useEffect(() => {
        if (!isOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu"
                    data-lenis-prevent
                >
                    <div className="flex h-[72px] flex-shrink-0 items-center justify-between border-b border-line px-5">
                        <Link href="/" onClick={onClose} aria-label="StackWise home">
                            <Logo size="md" />
                        </Link>
                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white"
                            aria-label="Close menu"
                        >
                            <Icon icon={Cancel01Icon} size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile navigation">
                        <ul className="divide-y divide-line">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setServicesOpen((v) => !v)}
                                    aria-expanded={servicesOpen}
                                    className="flex w-full items-center justify-between py-5 text-left text-2xl font-semibold tracking-tight text-white"
                                >
                                    Services
                                    <Icon icon={Add01Icon} size={22} className={cn("text-white/50 transition-transform duration-200", servicesOpen && "rotate-45")} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {servicesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            {[
                                                { label: "Services", href: "/services", pages: servicePages },
                                                { label: "Solutions", href: "/solutions", pages: solutionPages },
                                                { label: "Technologies", href: "/technologies", pages: technologyPages },
                                            ].map((group) => (
                                                <div key={group.label} className="pb-5">
                                                    <Link href={group.href} onClick={onClose} className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                                                        {group.label}
                                                    </Link>
                                                    <ul>
                                                        {group.pages.map((p) => (
                                                            <li key={p.path}>
                                                                <Link href={p.path} onClick={onClose} className="flex items-center gap-3 py-2.5 text-base text-white/80">
                                                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-2">
                                                                        <Icon icon={p.icon} size={16} />
                                                                    </span>
                                                                    {p.navLabel}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                            {[...siteConfig.navItems, { title: "Contact", id: "contact" }].map((item) => (
                                <li key={item.title}>
                                    <Link
                                        {...navLink(item, onClose)}
                                        className="block py-5 text-2xl font-semibold tracking-tight text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex-shrink-0 space-y-3 border-t border-line px-5 py-5" style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
                        <Button
                            size="lg"
                            arrow="right"
                            className="w-full"
                            onClick={() => {
                                onClose();
                                openInquiry();
                            }}
                        >
                            Get a free quote
                        </Button>
                        <a href={`mailto:${siteConfig.emails.inbound}`} className="flex items-center justify-center gap-2 py-2 text-sm text-white/55">
                            <Icon icon={Mail01Icon} size={16} />
                            {siteConfig.emails.inbound}
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
