"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, Shield, HelpCircle } from "lucide-react";

const faqs = [
    {
        q: "Who owns the code when it's done?",
        a: "You do. 100%. Every line of code, every design file, every asset we create belongs to you. We transfer full ownership upon project completion — no licensing fees, no strings attached. You get the complete source code, design files, and documentation.",
    },
    {
        q: "What if I don't like the design?",
        a: "We build in revision rounds at every stage. During Week 2, we present high-fidelity Figma prototypes before writing any code. You get 3 rounds of design revisions included in every package. If after all revisions you're still not satisfied, we'll redesign from scratch — that's our guarantee.",
    },
    {
        q: "Do you guys disappear after launch?",
        a: "Never. Every project includes 1-3 months of post-launch support (depending on your plan). After that, we offer monthly maintenance retainers starting at $199/month. We also provide detailed handoff documentation so your internal team can maintain the codebase independently if preferred.",
    },
    {
        q: "What's the typical project timeline?",
        a: "Most projects take 4-8 weeks from kickoff to launch. Simple websites: 2-3 weeks. E-commerce stores: 4-6 weeks. Complex web apps and SaaS: 8-12 weeks. We provide a detailed timeline during our free consultation call.",
    },
    {
        q: "How do you communicate during the project?",
        a: "You talk directly with the developer on Slack, Discord or email. You get regular progress updates, a weekly call, and a staging URL where you can see the work as it is built.",
    },
    {
        q: "What if the project scope changes mid-way?",
        a: "Scope changes happen — we get it. Minor additions (under 10% of project scope) are absorbed at no extra cost. For larger changes, we provide a transparent quote and timeline adjustment within 24 hours. No surprises, no hidden fees.",
    },
    {
        q: "Do you sign NDAs and confidentiality agreements?",
        a: "Absolutely. We sign NDAs before any discovery call where sensitive information is shared. Your business ideas, data, and proprietary information are protected by legally binding agreements. We take client confidentiality extremely seriously.",
    },
    {
        q: "Can I see real case studies before committing?",
        a: "Yes. The portfolio section has write-ups of products we have built, with what each one does and how it is built. We can walk through any of them on a call.",
    },
];

export function FAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="faq" className="py-20 md:py-32 relative z-10" aria-label="Frequently Asked Questions" ref={sectionRef}>
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <span className="text-[#C8FF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block">
                        <HelpCircle size={12} className="inline mr-1.5 -mt-0.5" />
                        FAQ
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-4">
                        Questions?<br />
                        <span className="text-white/25">We&apos;ve Got Answers.</span>
                    </h2>
                    <p className="text-white/30 text-sm">
                        Everything you need to know before working with us. No fluff, just straight answers.
                    </p>
                </motion.div>

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
