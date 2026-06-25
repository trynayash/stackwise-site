"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            {/* Progress bar */}
            <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden mb-6">
                <motion.div
                    className="h-full bg-[#C8FF00]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                />
            </div>

            {/* Step labels */}
            <div className="hidden sm:flex items-center justify-between">
                {labels.map((label, idx) => {
                    const isActive = idx === currentStep;
                    const isCompleted = idx < currentStep;
                    return (
                        <div key={label} className="flex items-center gap-2">
                            <span
                                className={`
                                    w-6 h-6 rounded-full text-[10px] font-mono flex items-center justify-center transition-all duration-400
                                    ${isActive
                                        ? "bg-[#C8FF00]/15 text-[#C8FF00] border border-[#C8FF00]/30"
                                        : isCompleted
                                            ? "bg-[#C8FF00]/10 text-[#C8FF00]/60 border border-[#C8FF00]/10"
                                            : "bg-white/[0.03] text-white/20 border border-white/[0.06]"
                                    }
                                `}
                            >
                                {isCompleted ? "✓" : `0${idx + 1}`}
                            </span>
                            <span
                                className={`text-[11px] font-medium tracking-wide transition-colors duration-400 ${
                                    isActive ? "text-white" : isCompleted ? "text-white/40" : "text-white/20"
                                }`}
                            >
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile: show current step only */}
            <div className="sm:hidden flex items-center justify-between">
                <span className="text-white/40 text-xs font-mono">
                    Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-white text-xs font-medium">{labels[currentStep]}</span>
            </div>
        </div>
    );
}
