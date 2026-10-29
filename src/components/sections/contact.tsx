"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert02Icon, Clock01Icon, Location01Icon, Mail01Icon, CheckmarkCircle02Icon, Shield01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site";

type FormErrors = Partial<Record<"name" | "email" | "projectType" | "timeline" | "budget" | "details", string>>;

const budgetOptions = [
    "Starter Build (₹49,999 - ₹1,49,999)",
    "Product Build (₹1,49,999 - ₹3,00,000)",
    "Scale / Custom (₹3,00,000+)",
    "Custom Quote / Enterprise",
];

const projectTypes = ["SaaS Development", "AI Development", "Custom Software", "Web Development", "MVP Development"];

const timelines = ["Rapid (< 1 Month)", "Standard (1-3 Months)", "Enterprise (3+ Months)"];

const emptyForm = { name: "", email: "", phone: "", projectType: "", timeline: "", budget: "", details: "", botField: "" };

const promises = [
    { icon: Clock01Icon, title: "Reply within 24 hours", text: "On working days, from the engineer who'd build it." },
    { icon: Shield01Icon, title: "Confidential", text: "Happy to sign an NDA before you share details. No spam, ever." },
    { icon: Location01Icon, title: `Based in ${siteConfig.location.city}`, text: "Working remotely with clients in India and abroad." },
];

export function Contact() {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const update = (key: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((f) => ({ ...f, [key]: e.target.value }));
        if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const validate = (): boolean => {
        const next: FormErrors = {};
        if (!formData.name.trim()) next.name = "Please enter your name";
        if (!formData.email.trim()) next.email = "Please enter your email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Please enter a valid email";
        if (!formData.projectType) next.projectType = "Choose a project type";
        if (!formData.timeline) next.timeline = "Choose a timeline";
        if (!formData.budget) next.budget = "Choose a budget range";
        // Matches the API's minimum so visitors never hit a server-side rejection.
        if (formData.details.trim().length < 10) next.details = "Tell us a little more (at least 10 characters)";
        setErrors(next);
        return Object.keys(next).length === 0;
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
                body: JSON.stringify({ ...formData, phone: formData.phone || undefined }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Failed to send");
            }
            setSubmittedEmail(formData.email);
            setFormData(emptyForm);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(`${message}. You can also email us directly at ${siteConfig.emails.inbound}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-20 md:py-28" aria-label="Contact">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader index="11" eyebrow="Contact" title="Let's build something" muted="worth owning." />

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
                    {/* Left: direct contact */}
                    <Reveal className="lg:col-span-4">
                        <p className="text-base leading-relaxed text-white/60">
                            Tell us about your project and we&apos;ll get back with questions, a rough scope and next steps. Prefer email? Write to us directly.
                        </p>
                        <a
                            href={`mailto:${siteConfig.emails.inbound}`}
                            className="group mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-black">
                                <Icon icon={Mail01Icon} size={20} />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-xs uppercase tracking-[0.16em] text-white/40">Email</span>
                                <span className="block truncate text-[15px] font-medium text-white group-hover:underline underline-offset-4">{siteConfig.emails.inbound}</span>
                            </span>
                        </a>
                        <ul className="mt-8 space-y-6">
                            {promises.map((p) => (
                                <li key={p.title} className="flex gap-4">
                                    <Icon icon={p.icon} size={22} className="mt-0.5 flex-shrink-0 text-white" />
                                    <div>
                                        <p className="font-medium text-white">{p.title}</p>
                                        <p className="mt-1 text-sm text-white/50">{p.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* Right: form */}
                    <Reveal delay={0.1} className="lg:col-span-8">
                        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                {!submittedEmail ? (
                                    <motion.form key="form" onSubmit={handleSubmit} noValidate className="space-y-5" exit={{ opacity: 0 }}>
                                        {/* Honeypot */}
                                        <div className="hidden" aria-hidden="true">
                                            <input type="text" name="website_url" value={formData.botField} onChange={update("botField")} tabIndex={-1} autoComplete="off" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <Field id="contact-name" label="Your name" error={errors.name}>
                                                <Input id="contact-name" autoComplete="name" placeholder="Rahul Sharma" value={formData.name} onChange={update("name")} invalid={!!errors.name} />
                                            </Field>
                                            <Field id="contact-email" label="Email" error={errors.email}>
                                                <Input id="contact-email" type="email" autoComplete="email" placeholder="rahul@company.com" value={formData.email} onChange={update("email")} invalid={!!errors.email} />
                                            </Field>
                                            <Field id="contact-phone" label="Phone / WhatsApp" optional>
                                                <Input id="contact-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={update("phone")} />
                                            </Field>
                                            <Field id="contact-project-type" label="Project type" error={errors.projectType}>
                                                <Select id="contact-project-type" placeholder="Select project type" value={formData.projectType} onChange={update("projectType")} invalid={!!errors.projectType}>
                                                    {projectTypes.map((t) => <option key={t} value={t} className="bg-surface text-white">{t}</option>)}
                                                </Select>
                                            </Field>
                                            <Field id="contact-timeline" label="Timeline" error={errors.timeline}>
                                                <Select id="contact-timeline" placeholder="Select timeline" value={formData.timeline} onChange={update("timeline")} invalid={!!errors.timeline}>
                                                    {timelines.map((t) => <option key={t} value={t} className="bg-surface text-white">{t}</option>)}
                                                </Select>
                                            </Field>
                                            <Field id="contact-budget" label="Budget" error={errors.budget}>
                                                <Select id="contact-budget" placeholder="Select budget range" value={formData.budget} onChange={update("budget")} invalid={!!errors.budget}>
                                                    {budgetOptions.map((b) => <option key={b} value={b} className="bg-surface text-white">{b}</option>)}
                                                </Select>
                                            </Field>
                                        </div>

                                        <Field id="contact-details" label="About the project" error={errors.details}>
                                            <Textarea
                                                id="contact-details"
                                                placeholder="What are you building, who is it for, and what should it do?"
                                                value={formData.details}
                                                onChange={update("details")}
                                                invalid={!!errors.details}
                                            />
                                        </Field>

                                        {error && (
                                            <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-300">
                                                <Icon icon={Alert02Icon} size={18} className="mt-0.5 flex-shrink-0" />
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-sm text-white/40">Free consultation · No commitment</p>
                                            <Button type="submit" size="lg" arrow={isSubmitting ? false : "right"} disabled={isSubmitting} className="w-full sm:w-auto">
                                                {isSubmitting ? "Sending…" : "Send project details"}
                                            </Button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        role="status"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="py-10 text-center"
                                    >
                                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-black">
                                            <Icon icon={CheckmarkCircle02Icon} size={28} />
                                        </span>
                                        <h3 className="mt-6 text-2xl font-semibold text-white">Thanks — we&apos;ve got your message.</h3>
                                        <p className="mx-auto mt-3 max-w-md text-white/60">
                                            We&apos;ll review your project and reply to <span className="text-white">{submittedEmail}</span> within 24 hours on working days.
                                        </p>
                                        <Button variant="secondary" className="mt-8" onClick={() => setSubmittedEmail(null)}>
                                            Send another message
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
