"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Logo } from "@/components/ui/logo";
import { useInquiry } from "@/components/providers/inquiry-context";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const { openInquiry } = useInquiry();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleStartProject = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        openInquiry();
    }, [openInquiry]);

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                    isScrolled
                        ? "bg-black/80 backdrop-blur-2xl border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                        : "bg-transparent border-transparent py-6"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">
                    {/* Reusable Logo */}
                    <Link href="/" className="z-50 group py-2" aria-label="StackWise Home">
                        <Logo size="md" />
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Start Project CTA */}
                        <LiquidMetalButton
                            size="sm"
                            borderWidth={3}
                            icon={<ArrowRight className="w-4 h-4" />}
                            metalConfig={{
                                colorBack: "#3d6600",
                                colorTint: "#C8FF00",
                                distortion: 0.15,
                                speed: 0.4,
                            }}
                            onClick={handleStartProject}
                        >
                            Start Project
                        </LiquidMetalButton>

                        {/* Mobile Menu Toggle (Hidden on Desktop, Visible on Mobile) */}
                        <button
                            onClick={() => setIsMobileNavOpen(true)}
                            className="md:hidden p-2 text-white hover:text-[#C8FF00] transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        </>
    );
}
