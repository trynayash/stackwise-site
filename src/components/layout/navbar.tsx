"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown01Icon, ArrowRight01Icon, Menu01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useInquiry } from "@/components/providers/inquiry-context";
import { useSectionNav } from "@/hooks/use-section-nav";
import { servicePages, solutionPages, type MarketingPageData } from "@/lib/marketing-pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function MenuLink({ page, onNavigate }: { page: MarketingPageData; onNavigate: () => void }) {
    return (
        <Link
            href={page.path}
            onClick={onNavigate}
            className="group flex items-start gap-3.5 rounded-xl p-3 -mx-3 transition-colors hover:bg-white/[0.04]"
        >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-white/80 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                <Icon icon={page.icon} size={18} />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{page.navLabel}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-white/50">{page.summary}</span>
            </span>
        </Link>
    );
}

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { openInquiry } = useInquiry();
    const goToSection = useSectionNav();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 16);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the menu on navigation, Escape and outside clicks.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        const onClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClick);
        };
    }, [menuOpen]);

    const openMenu = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMenuOpen(true);
    }, []);

    const scheduleClose = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setMenuOpen(false), 120);
    }, []);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const solid = isScrolled || menuOpen;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
                    solid ? "border-line bg-canvas/90 backdrop-blur-xl" : "border-transparent bg-transparent"
                )}
            >
                <div ref={menuRef} onMouseLeave={scheduleClose}>
                    <nav className="container mx-auto flex h-[72px] items-center justify-between gap-6 px-5 sm:px-6" aria-label="Main navigation">
                        <Link href="/" className="group py-2" aria-label="StackWise home">
                            <Logo size="md" />
                        </Link>

                        <ul className="hidden lg:flex items-center gap-1">
                            <li>
                                <button
                                    type="button"
                                    onMouseEnter={openMenu}
                                    onClick={() => setMenuOpen((v) => !v)}
                                    aria-expanded={menuOpen}
                                    aria-controls="services-menu"
                                    className={cn(
                                        "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors cursor-pointer",
                                        menuOpen ? "bg-white/[0.06] text-white" : "text-white/70 hover:text-white"
                                    )}
                                >
                                    Services
                                    <Icon icon={ArrowDown01Icon} size={16} className={cn("transition-transform duration-200", menuOpen && "rotate-180")} />
                                </button>
                            </li>
                            {siteConfig.navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/#${item.id}`}
                                        onClick={goToSection(item.id)}
                                        onMouseEnter={scheduleClose}
                                        className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2">
                            <Link
                                href="/#contact"
                                onClick={goToSection("contact")}
                                className="hidden lg:inline-flex h-10 items-center px-4 text-sm font-medium text-white/70 transition-colors hover:text-white"
                            >
                                Contact
                            </Link>
                            <Button size="sm" onClick={openInquiry} arrow="right" className="hidden sm:inline-flex">
                                Get a quote
                            </Button>
                            <button
                                onClick={() => setIsMobileNavOpen(true)}
                                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition-colors hover:bg-white/[0.06]"
                                aria-label="Open menu"
                            >
                                <Icon icon={Menu01Icon} size={20} />
                            </button>
                        </div>
                    </nav>

                    {/* Services mega menu (desktop) */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                id="services-menu"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                onMouseEnter={openMenu}
                                className="absolute inset-x-0 top-full hidden lg:block border-b border-line bg-canvas"
                            >
                                <div className="container mx-auto grid grid-cols-12 gap-10 px-6 py-10">
                                    <div className="col-span-5">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">Services</span>
                                            <Link href="/services" onClick={closeMenu} className="text-xs text-white/50 hover:text-white">
                                                All services
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                            {servicePages.map((p) => (
                                                <MenuLink key={p.path} page={p} onNavigate={closeMenu} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">Solutions</span>
                                            <Link href="/solutions" onClick={closeMenu} className="text-xs text-white/50 hover:text-white">
                                                All solutions
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                            {solutionPages.map((p) => (
                                                <MenuLink key={p.path} page={p} onNavigate={closeMenu} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6">
                                            <div>
                                                <p className="text-base font-semibold text-white">Not sure where to start?</p>
                                                <p className="mt-2 text-sm leading-relaxed text-white/55">
                                                    Tell us what you&apos;re trying to achieve. We&apos;ll suggest the simplest way to get there.
                                                </p>
                                            </div>
                                            <div className="mt-6 space-y-3">
                                                <Button
                                                    size="sm"
                                                    arrow="right"
                                                    className="w-full"
                                                    onClick={() => {
                                                        closeMenu();
                                                        openInquiry();
                                                    }}
                                                >
                                                    Free consultation
                                                </Button>
                                                <a
                                                    href={`mailto:${siteConfig.emails.inbound}`}
                                                    className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-white"
                                                >
                                                    <Icon icon={Mail01Icon} size={14} />
                                                    {siteConfig.emails.inbound}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-line">
                                    <div className="container mx-auto flex items-center justify-between px-6 py-4 text-sm">
                                        <span className="text-white/50">Written quote before work starts · 100% code ownership · Support after launch</span>
                                        <Link href="/#pricing" onClick={goToSection("pricing", closeMenu)} className="inline-flex items-center gap-1 text-white/70 hover:text-white">
                                            See pricing
                                            <Icon icon={ArrowRight01Icon} size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        </>
    );
}
