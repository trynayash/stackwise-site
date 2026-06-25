"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface SuccessStateProps {
    onClose: () => void;
}

export function SuccessState({ onClose }: SuccessStateProps) {
    const milestones = [
        "Requirements received",
        "Technical review started",
        "Response within 24–48 hours",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="flex flex-col items-center justify-center text-center py-12 px-6 min-h-[60vh]"
        >
            {/* Success icon */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="w-16 h-16 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-center mb-8"
            >
                <CheckCircle size={28} className="text-[#C8FF00]" />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
            >
                Project Request Received.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-white/40 text-sm sm:text-base leading-relaxed max-w-md mb-10 font-light"
            >
                Thanks for sharing your vision. We&apos;ll review your requirements and get back with the best technical approach.
            </motion.p>

            {/* Milestones */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="space-y-3 mb-12"
            >
                {milestones.map((item, idx) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.3 }}
                        className="flex items-center gap-3"
                    >
                        <span className="text-[#C8FF00] text-xs">✓</span>
                        <span className="text-white/60 text-sm font-light">{item}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Close CTA */}
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                onClick={onClose}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm font-medium hover:bg-white/[0.06] hover:text-white hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                Back to StackWise
            </motion.button>
        </motion.div>
    );
}
