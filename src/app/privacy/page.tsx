"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-white/40 text-sm font-mono mb-16">
                        LAST UPDATED: FEBRUARY 15, 2026
                    </p>

                    <div className="prose prose-invert prose-lg max-w-none text-white/70">
                        <p className="leading-relaxed mb-8">
                            At Stackwise (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting the personal data we hold about you. This policy explains how we collect, use, and share your information when you visit our website or use our services.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">1. Information We Collect</h2>
                        <p className="mb-6">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-8 marker:text-[#C8FF00]">
                            <li>Fill out a contact form or request a quote.</li>
                            <li>Subscribe to our newsletter.</li>
                            <li>Interact with our services or customer support.</li>
                        </ul>
                        <p className="mb-8">
                            This information usually includes your name, email address, phone number, and any other details you choose to provide.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">2. How We Use Your Information</h2>
                        <p className="mb-8">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-8 marker:text-[#C8FF00]">
                            <li>Provide, operate, and maintain our website and services.</li>
                            <li>Communicate with you voluntarily regarding your inquiries.</li>
                            <li>Send you updates, marketing communications, and promotional materials (only if you opted in).</li>
                            <li>Improve our website functionality and user experience.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">3. Data Security</h2>
                        <p className="mb-8">
                            We implement appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse. However, please note that no method of transmission over the Internet is 100% secure.
                        </p>

                        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">4. Contact Us</h2>
                        <p className="mb-8">
                            If you have any questions about this Privacy Policy, please contact us at:
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
