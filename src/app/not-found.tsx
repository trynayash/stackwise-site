"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-[#C8FF00]/30">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#C8FF00]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px]" />

                {/* Scanline Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                        backgroundSize: '32px 32px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">

                {/* Massive Glitch Number */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[25vw] sm:text-[20rem] leading-[0.8] font-bold text-white/5 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm"
                    style={{ fontFamily: "'Oughter', sans-serif" }}
                >
                    404
                </motion.h1>

                {/* Foreground Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative bg-black/20 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <span className="inline-block px-3 py-1 rounded-full bg-[#ff003c]/10 text-[#ff003c] text-[10px] font-mono tracking-[0.2em] uppercase mb-6 border border-[#ff003c]/20">
                        System Error
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Signal Lost.
                    </h2>

                    <p className="text-white/40 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
                        The coordinates you entered have drifted into the digital void.
                        This sector maintains no data.
                    </p>

                    <Link href="/">
                        <Button variant="primary" className="gap-3 shadow-[0_0_40px_-10px_rgba(200,255,0,0.4)]">
                            <ArrowLeft size={18} />
                            Return to Base
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[10px] text-white/10 font-mono tracking-[0.3em] uppercase">Stackwise // Error Protocol 404</p>
            </div>
        </main>
    )
}
