"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/motion-primitives";
import { ChevronDown, Shield } from "lucide-react";
import { faqs } from "@/lib/faqs";

export function FAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="faq" className="py-20 md:py-32 relative z-10" aria-label="Frequently Asked Questions" ref={sectionRef}>
            <div className="container mx-auto px-5 sm:px-6">

                <SectionHeader
                    align="center"
                    eyebrow="FAQ"
                    title="Questions?"
                    muted="We've got answers."
                    description="Everything you need to know before working with us. No fluff, just straight answers."
                />

                {/* FAQ Cards */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                            className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#0d0d0d]/50 hover:bg-[#0d0d0d] transition-colors duration-300"
                        >
                            <button
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                aria-expanded={openFaq === i}
                            >
                                <span className="text-white/80 group-hover:text-white font-medium text-sm md:text-base transition-colors pr-4">
                                    {faq.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? "bg-[#C8FF00]/10 border-[#C8FF00]/20" : "bg-white/5 border-white/10"} border`}>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-all duration-300 ${openFaq === i ? "rotate-180 text-[#C8FF00]" : "text-white/30"}`}
                                    />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-6 pt-0">
                                            <div className="border-t border-white/[0.06] pt-4">
                                                <p className="text-white/50 text-sm leading-[1.8]">{faq.a}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Note */}
                <motion.div
                    className="mt-12 text-center flex items-center justify-center gap-2 text-white/20 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Shield size={16} className="text-[#C8FF00]/40" />
                    <span>Still have questions? <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-[#C8FF00]/60 hover:text-[#C8FF00] transition-colors underline underline-offset-4 decoration-[#C8FF00]/20">Let&apos;s talk.</button></span>
                </motion.div>
            </div>
        </section>
    );
}
