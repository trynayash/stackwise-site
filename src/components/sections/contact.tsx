"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, MessageSquare, Mail, Phone, Clock, Shield } from "lucide-react";

type FormErrors = {
    name?: string;
    email?: string;
    projectType?: string;
    timeline?: string;
    budget?: string;
    details?: string;
};

const budgetOptions = [
    "Starter Build (₹49,999 - ₹1,49,999)",
    "Product Build (₹1,49,999 - ₹3,00,000)",
    "Scale / Custom (₹3,00,000+)",
    "Custom Quote / Enterprise",
];

const projectTypes = [
    "SaaS Development",
    "AI Development",
    "Custom Software",
    "Web Development",
    "MVP Development",
];

const timelines = [
    "Rapid (< 1 Month)",
    "Standard (1-3 Months)",
    "Enterprise (3+ Months)",
];

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        timeline: "",
        budget: "",
        details: "",
        botField: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
        if (!formData.projectType) newErrors.projectType = "Project type is required";
        if (!formData.timeline) newErrors.timeline = "Timeline is required";
        if (!formData.budget) newErrors.budget = "Budget qualification is required";
        if (!formData.details.trim()) newErrors.details = "Tell us about your project";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    projectType: formData.projectType,
                    timeline: formData.timeline,
                    budget: formData.budget,
                    details: formData.details,
                    botField: formData.botField,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Failed to send");
            }
            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                projectType: "",
                timeline: "",
                budget: "",
                details: "",
                botField: "",
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message + ". You can also email us directly at hello@stackwise.agency");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 relative overflow-hidden"
            aria-label="Contact us"
            style={{ backgroundColor: "#050a05" }}
        >
            {/* Background Effects */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: "50%", left: "50%", width: "140%", height: "600px",
                    background: "radial-gradient(ellipse at center, rgba(182, 255, 0, 0.15) 0%, transparent 70%)",
                    transform: "translate(-20%, -50%) rotate(-15deg)", filter: "blur(100px)", zIndex: 0
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    top: "40%", right: "-10%", width: "120%", height: "300px",
                    background: "linear-gradient(120deg, transparent 0%, rgba(182, 255, 0, 0.4) 40%, rgba(182, 255, 0, 0.6) 50%, rgba(182, 255, 0, 0.3) 60%, transparent 100%)",
                    transform: "rotate(-10deg)", filter: "blur(60px)", opacity: 0.5, zIndex: 0
                }}
            />
            <div className="absolute bottom-0 left-0 pointer-events-none opacity-5 z-0">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                    <circle cx="0" cy="400" r="100" stroke="#b6ff00" strokeWidth="1" />
                    <circle cx="0" cy="400" r="200" stroke="#b6ff00" strokeWidth="1" />
                    <circle cx="0" cy="400" r="300" stroke="#b6ff00" strokeWidth="1" />
                </svg>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Side: Headline + Trust Signals */}
                    <div className="lg:col-span-5 relative mt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-[48px] md:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-8">
                                Let&apos;s Build<br />
                                Something
                                <span className="inline-block align-top ml-3 mt-2 bg-[#0e140e] p-2.5 rounded-full border border-[#b6ff00]/30 relative overflow-hidden shadow-[0_0_15px_rgba(182,255,0,0.2)]">
                                    <MessageSquare size={28} className="text-[#b6ff00] relative z-10" fill="currentColor" />
                                </span>
                                <br />
                                <span className="text-[#b6ff00]">Great.</span>
                            </h2>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            className="space-y-4 mt-6"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <Clock size={16} className="text-[#b6ff00]/60 flex-shrink-0" />
                                <span>We respond within <strong className="text-white/60">24 hours</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <Shield size={16} className="text-[#b6ff00]/60 flex-shrink-0" />
                                <span>Your data stays confidential — <strong className="text-white/60">no spam, ever</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <Mail size={16} className="text-[#b6ff00]/60 flex-shrink-0" />
                                <span>Or email directly: <a href="mailto:yashrsuthar90@gmail.com" className="text-[#b6ff00]/70 hover:text-[#b6ff00] transition-colors">yashrsuthar90@gmail.com</a></span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <Phone size={16} className="text-[#b6ff00]/60 flex-shrink-0" />
                                <span>WhatsApp: <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-[#b6ff00]/70 hover:text-[#b6ff00] transition-colors">+91 99999 99999</a></span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#050a05]/80 backdrop-blur-sm rounded-[20px] p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-[#1c2a1c]"
                        >
                            <div className="p-8 md:p-10">
                                <AnimatePresence mode="wait">
                                    {!submitted ? (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {/* Honeypot hidden input */}
                                            <div style={{ display: "none" }} aria-hidden="true">
                                                <input
                                                    type="text"
                                                    name="website_url"
                                                    value={formData.botField}
                                                    onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                />
                                            </div>

                                            {/* Name + Email Row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-name" className="text-sm font-medium text-[#888] pl-1">Your Name *</label>
                                                    <Input
                                                        id="contact-name"
                                                        placeholder="Rahul Sharma"
                                                        value={formData.name}
                                                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                                                        style={{ backgroundColor: "#0e140e", borderColor: errors.name ? "#ef4444" : "#1c2a1c", color: "#ddd" }}
                                                        className="h-13 border rounded-lg px-4 focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all placeholder:text-[#444]"
                                                    />
                                                    {errors.name && <p className="text-red-400 text-xs pl-1">{errors.name}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-email" className="text-sm font-medium text-[#888] pl-1">Email Address *</label>
                                                    <Input
                                                        id="contact-email"
                                                        type="email"
                                                        placeholder="rahul@company.com"
                                                        value={formData.email}
                                                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                                                        style={{ backgroundColor: "#0e140e", borderColor: errors.email ? "#ef4444" : "#1c2a1c", color: "#ddd" }}
                                                        className="h-13 border rounded-lg px-4 focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all placeholder:text-[#444]"
                                                    />
                                                    {errors.email && <p className="text-red-400 text-xs pl-1">{errors.email}</p>}
                                                </div>
                                            </div>

                                            {/* Phone + Project Type Row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-phone" className="text-sm font-medium text-[#888] pl-1">Phone / WhatsApp <span className="text-white/20">(optional)</span></label>
                                                    <Input
                                                        id="contact-phone"
                                                        placeholder="+91 98765 43210"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        style={{ backgroundColor: "#0e140e", borderColor: "#1c2a1c", color: "#ddd" }}
                                                        className="h-13 border rounded-lg px-4 focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all placeholder:text-[#444]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-project-type" className="text-sm font-medium text-[#888] pl-1">Project Type *</label>
                                                    <select
                                                        id="contact-project-type"
                                                        value={formData.projectType}
                                                        onChange={(e) => { setFormData({ ...formData, projectType: e.target.value }); setErrors({ ...errors, projectType: undefined }); }}
                                                        className="w-full h-13 border rounded-lg px-4 text-sm focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all appearance-none cursor-pointer"
                                                        style={{ backgroundColor: "#0e140e", borderColor: errors.projectType ? "#ef4444" : "#1c2a1c", color: formData.projectType ? "#ddd" : "#444" }}
                                                    >
                                                        <option value="" disabled>Select project type</option>
                                                        {projectTypes.map(type => (
                                                            <option key={type} value={type} style={{ backgroundColor: "#0e140e", color: "#ddd" }}>{type}</option>
                                                        ))}
                                                    </select>
                                                    {errors.projectType && <p className="text-red-400 text-xs pl-1">{errors.projectType}</p>}
                                                </div>
                                            </div>

                                            {/* Timeline + Budget Row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-timeline" className="text-sm font-medium text-[#888] pl-1">Expected Timeline *</label>
                                                    <select
                                                        id="contact-timeline"
                                                        value={formData.timeline}
                                                        onChange={(e) => { setFormData({ ...formData, timeline: e.target.value }); setErrors({ ...errors, timeline: undefined }); }}
                                                        className="w-full h-13 border rounded-lg px-4 text-sm focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all appearance-none cursor-pointer"
                                                        style={{ backgroundColor: "#0e140e", borderColor: errors.timeline ? "#ef4444" : "#1c2a1c", color: formData.timeline ? "#ddd" : "#444" }}
                                                    >
                                                        <option value="" disabled>Select timeline</option>
                                                        {timelines.map(time => (
                                                            <option key={time} value={time} style={{ backgroundColor: "#0e140e", color: "#ddd" }}>{time}</option>
                                                        ))}
                                                    </select>
                                                    {errors.timeline && <p className="text-red-400 text-xs pl-1">{errors.timeline}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="contact-budget" className="text-sm font-medium text-[#888] pl-1">Budget Range *</label>
                                                    <select
                                                        id="contact-budget"
                                                        value={formData.budget}
                                                        onChange={(e) => { setFormData({ ...formData, budget: e.target.value }); setErrors({ ...errors, budget: undefined }); }}
                                                        className="w-full h-13 border rounded-lg px-4 text-sm focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all appearance-none cursor-pointer"
                                                        style={{ backgroundColor: "#0e140e", borderColor: errors.budget ? "#ef4444" : "#1c2a1c", color: formData.budget ? "#ddd" : "#444" }}
                                                    >
                                                        <option value="" disabled>Select budget range</option>
                                                        {budgetOptions.map(opt => (
                                                            <option key={opt} value={opt} style={{ backgroundColor: "#0e140e", color: "#ddd" }}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    {errors.budget && <p className="text-red-400 text-xs pl-1">{errors.budget}</p>}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-2">
                                                <label htmlFor="contact-details" className="text-sm font-medium text-[#888] pl-1">Tell us about your project *</label>
                                                <Textarea
                                                    id="contact-details"
                                                    placeholder="Provide requirements, objectives, integration details, or any custom specifications..."
                                                    value={formData.details}
                                                    onChange={(e) => { setFormData({ ...formData, details: e.target.value }); setErrors({ ...errors, details: undefined }); }}
                                                    style={{ backgroundColor: "#0e140e", borderColor: errors.details ? "#ef4444" : "#1c2a1c", color: "#ddd" }}
                                                    className="min-h-[140px] border rounded-lg px-4 py-4 focus:ring-1 focus:ring-[#b6ff00] focus:border-[#b6ff00] focus:shadow-[0_0_10px_rgba(182,255,0,0.1)] transition-all resize-none placeholder:text-[#444]"
                                                />
                                                {errors.details && <p className="text-red-400 text-xs pl-1">{errors.details}</p>}
                                            </div>

                                            {error && (
                                                <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                                                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                                    <span>{error}</span>
                                                </div>
                                            )}

                                            <div className="pt-3">
                                                <Button
                                                    type="submit"
                                                    className="w-full h-14 text-base font-bold rounded-lg border-none transition-all hover:brightness-105 hover:shadow-[0_0_20px_rgba(182,255,0,0.3)]"
                                                    style={{ backgroundColor: "#b6ff00", color: "#000000" }}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center gap-2">
                                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending...
                                                        </span>
                                                    ) : "Get Free Consultation"}
                                                </Button>
                                                <p className="text-center text-white/15 text-[11px] mt-3 font-mono">No commitment required • Free project estimate</p>
                                            </div>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            className="py-16 text-center"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <div className="w-20 h-20 rounded-full bg-[#b6ff00]/10 text-[#b6ff00] border border-[#b6ff00]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(182,255,0,0.15)]">
                                                <CheckCircle size={36} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">We&apos;ve Got Your Message! 🎉</h3>
                                            <p className="text-white/50 mb-3 max-w-md mx-auto">
                                                Our team will review your project and get back to you within <strong className="text-white/70">24 hours</strong> with a free consultation and estimate.
                                            </p>
                                            <p className="text-white/30 text-sm mb-8">
                                                Check your inbox at <span className="text-[#b6ff00]/60">{formData.email || "your email"}</span> for updates.
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="border-[#1c2a1c] text-[#ddd] hover:bg-[#0e140e] hover:text-white hover:border-[#b6ff00]/50 transition-colors"
                                                onClick={() => setSubmitted(false)}
                                            >
                                                Send Another Message
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
