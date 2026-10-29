"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ArrowRight,
} from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { useInquiry } from "@/components/providers/inquiry-context";

const navItems = [
    { title: "Home", href: "#hero", index: "01" },
    { title: "Services", href: "#services", index: "02" },
    { title: "Work", href: "#portfolio", index: "03" },
    { title: "Pricing", href: "#pricing", index: "04" },
    { title: "About", href: "#founder", index: "05" },
    { title: "Contact", href: "#contact", index: "06" },
];

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { openInquiry } = useInquiry();

    const handleNavClick = (href: string) => {
        onClose();
        if (pathname === "/") {
            const id = href.replace("#", "");
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 600);
        } else {
            router.push("/" + href);
        }
    };

    const handleStartProject = () => {
        onClose();
        setTimeout(() => {
            openInquiry();
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[60] bg-[#050505]/90 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background acccents */}
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#C8FF00]/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-4 text-white/50 hover:text-[#C8FF00] transition-colors z-50 rounded-full border border-white/5 bg-white/5 backdrop-blur-md"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>

                    <nav className="flex flex-col gap-6 w-full max-w-md px-8 relative z-10">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{
                                    delay: 0.1 + i * 0.05,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                            >
                                <button
                                    onClick={() => handleNavClick(item.href)}
                                    className="group flex items-end gap-6 w-full text-left"
                                >
                                    <span className="text-xs font-mono text-[#C8FF00] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                                        {item.index}
                                    </span>
                                    <span className="text-5xl font-bold tracking-tighter text-white/50 group-hover:text-white transition-colors duration-300">
                                        {item.title}
                                    </span>
                                </button>
                                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-4 opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-16 relative z-10"
                    >
                        <LiquidMetalButton
                            size="md"
                            borderWidth={3}
                            icon={<ArrowRight className="w-5 h-5" />}
                            metalConfig={{
                                colorBack: "#3d6600",
                                colorTint: "#C8FF00",
                                distortion: 0.2,
                                speed: 0.5,
                            }}
                            onClick={handleStartProject}
                        >
                            Start Project
                        </LiquidMetalButton>
                    </motion.div>

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white/20 text-[10px] tracking-[0.3em] font-mono uppercase">
                        StackWise Design System
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
