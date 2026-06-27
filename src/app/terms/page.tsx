"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-white/40 hover:text-[#C8FF00] transition-colors mb-12 group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 tracking-tight" style={{ fontFamily: "'Oughter', sans-serif" }}>
                        Terms of Service
                    </h1>
                    <p className="text-white/40 text-sm font-mono mb-16">
                        LAST UPDATED: FEBRUARY 15, 2026
                    </p>

                    <div className="prose prose-invert prose-lg max-w-none text-white/70">
                        <p className="leading-relaxed mb-8">
                            Welcome to Stackwise. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">1. Services</h2>
                        <p className="mb-8">
                            Stackwise provides digital engineering, design, and development services. The specific deliverables and scope of work will be defined in a separate agreement or Statement of Work (SOW) signed by both parties.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">2. Intellectual Property</h2>
                        <p className="mb-8">
                            All content on this website, including text, graphics, logos, and code, is the property of Stackwise or its licensors and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">3. Limitation of Liability</h2>
                        <p className="mb-8">
                            To the fullest extent permitted by law, Stackwise shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services or inability to use the website.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">4. Changes to Terms</h2>
                        <p className="mb-8">
                            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by updating the &quot;Last Updated&quot; date at the top of this page. Your continued use of the services confirms your acceptance of these changes.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">5. Governing Law</h2>
                        <p className="mb-8">
                            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">6. Contact</h2>
                        <p className="mb-8">
                            For any legal inquiries, please contact us at:
                        </p>
                        <p className="text-white text-lg">
                            <a href="mailto:hello@stackwise.agency" className="text-[#C8FF00] hover:underline underline-offset-4">hello@stackwise.agency</a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
