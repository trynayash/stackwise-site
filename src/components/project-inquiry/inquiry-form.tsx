"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { StepIndicator } from "./step-indicator";
import { SuccessState } from "./success-state";

// ─── Form Types ─────────────────────────────────────────
interface FormData {
    // Step 1
    projectTypes: string[];
    // Step 2
    projectName: string;
    description: string;
    currentStage: string;
    features: string[];
    // Step 3
    company: string;
    industry: string;
    businessSize: string;
    timeline: string;
    budget: string;
    // Step 4
    name: string;
    email: string;
    phone: string;
    country: string;
    communication: string[];
    notes: string;
    // Honeypot
    botField: string;
}

const STORAGE_KEY = "stackwise_inquiry_draft";
const STEP_LABELS = ["Project", "Requirements", "Business", "Contact"];

// ─── Step 1 Data ────────────────────────────────────────
const projectTypeOptions = [
    { value: "SaaS Platform", description: "Build a subscription-based software product" },
    { value: "AI Software", description: "AI assistants, automation, intelligent systems" },
    { value: "Custom Business Software", description: "Internal tools, CRM, dashboards, automation" },
    { value: "Website / Web Platform", description: "High-performance business platforms" },
    { value: "Mobile Application", description: "iOS / Android product" },
    { value: "Existing Software Improvement", description: "Improve, rebuild, or scale current system" },
    { value: "Not Sure Yet", description: "Need technical guidance" },
];

// ─── Step 2 Data ────────────────────────────────────────
const stageOptions = [
    "Just an idea",
    "Have designs ready",
    "Existing product",
    "Need redesign/rebuild",
    "Scaling existing platform",
];

const featureOptions = [
    "Authentication",
    "Payments",
    "Dashboard",
    "Admin Panel",
    "AI Features",
    "Mobile App",
    "API Integrations",
    "Analytics",
    "Automation",
    "Not sure",
];

// ─── Step 3 Data ────────────────────────────────────────
const industryOptions = [
    "Startup",
    "E-commerce",
    "Healthcare",
    "Education",
    "Finance",
    "Real Estate",
    "Manufacturing",
    "Agency",
    "Other",
];

const businessSizeOptions = [
    "Solo Founder",
    "Small Business",
    "Startup Team",
    "Growing Company",
    "Enterprise",
];

const timelineOptions = ["ASAP", "1 Month", "2-3 Months", "Flexible"];

const budgetOptions = ["₹50k – ₹1.5L", "₹1.5L – ₹5L", "₹5L+", "Need estimate"];

// ─── Step 4 Data ────────────────────────────────────────
const communicationOptions = ["Email", "WhatsApp", "Video Call"];

// ─── Initial State ──────────────────────────────────────
const initialFormData: FormData = {
    projectTypes: [],
    projectName: "",
    description: "",
    currentStage: "",
    features: [],
    company: "",
    industry: "",
    businessSize: "",
    timeline: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    communication: [],
    notes: "",
    botField: "",
};

// ─── Animation ──────────────────────────────────────────
const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.25, ease: "easeIn" as const } },
};

// ─── Validation ─────────────────────────────────────────
function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
    return /^[+]?[\d\s()-]{7,20}$/.test(phone);
}

// ─── Component ──────────────────────────────────────────
interface InquiryFormProps {
    onClose: () => void;
}

export function InquiryForm({ onClose }: InquiryFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Load saved draft from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setFormData((prev) => ({ ...prev, ...parsed }));
            }
        } catch {
            // Ignore parse errors
        }
    }, []);

    // Save draft to localStorage on changes
    useEffect(() => {
        try {
            const { botField, ...saveable } = formData;
            void botField;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saveable));
        } catch {
            // Ignore storage errors
        }
    }, [formData]);

    const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    }, []);

    const toggleArrayItem = useCallback((key: "projectTypes" | "features" | "communication", value: string) => {
        setFormData((prev) => {
            const arr = prev[key];
            const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
            return { ...prev, [key]: next };
        });
        setErrors((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    }, []);

    // Step validation
    const validateStep = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 0) {
            if (formData.projectTypes.length === 0) {
                newErrors.projectTypes = "Select at least one project type";
            }
        } else if (currentStep === 1) {
            if (!formData.description.trim() || formData.description.trim().length < 10) {
                newErrors.description = "Tell us more about your project (at least 10 characters)";
            }
        } else if (currentStep === 2) {
            if (!formData.timeline) newErrors.timeline = "Select a timeline";
            if (!formData.budget) newErrors.budget = "Select a budget range";
        } else if (currentStep === 3) {
            if (!formData.name.trim()) newErrors.name = "Name is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!validateEmail(formData.email)) newErrors.email = "Enter a valid email";
            if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
            else if (!validatePhone(formData.phone)) newErrors.phone = "Enter a valid phone number";
        }

        console.log(`[InquiryForm] Step ${currentStep} validation:`, {
            formData,
            newErrors,
            isValid: Object.keys(newErrors).length === 0,
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [currentStep, formData]);

    const nextStep = useCallback(() => {
        if (validateStep()) {
            setCurrentStep((s) => Math.min(s + 1, 3));
            setTimeout(() => {
                scrollContainerRef.current?.scrollTo({ top: 0 });
            }, 50);
        } else {
            setTimeout(() => {
                scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
        }
    }, [validateStep]);

    const prevStep = useCallback(() => {
        setCurrentStep((s) => Math.max(s - 1, 0));
        setTimeout(() => {
            scrollContainerRef.current?.scrollTo({ top: 0 });
        }, 50);
    }, []);

    const handleSubmit = useCallback(async () => {
        console.log("[InquiryForm] Submit triggered.");
        if (!validateStep()) {
            console.warn("[InquiryForm] Submit aborted: Client validation failed.");
            setTimeout(() => {
                scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
            return;
        }
        console.log("[InquiryForm] Submit validation passed. Sending payload to /api/contact...");
        setIsSubmitting(true);

        try {
            const payload = {
                type: "project-inquiry",
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                projectType: formData.projectTypes.join(", "),
                timeline: formData.timeline,
                budget: formData.budget,
                details: [
                    formData.projectName && `Project: ${formData.projectName}`,
                    `Description: ${formData.description}`,
                    formData.currentStage && `Stage: ${formData.currentStage}`,
                    formData.features.length > 0 && `Features: ${formData.features.join(", ")}`,
                    formData.company && `Company: ${formData.company}`,
                    formData.industry && `Industry: ${formData.industry}`,
                    formData.businessSize && `Business Size: ${formData.businessSize}`,
                    formData.country && `Country: ${formData.country}`,
                    formData.communication.length > 0 && `Preferred Contact: ${formData.communication.join(", ")}`,
                    formData.notes && `Additional Notes: ${formData.notes}`,
                ].filter(Boolean).join("\n\n"),
                botField: formData.botField,
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("[InquiryForm] Server response status:", res.status);

            if (!res.ok) {
                const data = await res.json();
                console.error("[InquiryForm] Server response error data:", data);
                setErrors({ submit: data.error || "Something went wrong. Please try again." });
                return;
            }

            console.log("[InquiryForm] Submission successful. Clearing draft.");
            // Clear saved draft
            localStorage.removeItem(STORAGE_KEY);
            setIsSubmitted(true);
        } catch (err) {
            console.error("[InquiryForm] Network/Submission error:", err);
            setErrors({ submit: "Network error. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateStep]);

    // Handle success close
    const handleSuccessClose = useCallback(() => {
        setFormData(initialFormData);
        setCurrentStep(0);
        setIsSubmitted(false);
        onClose();
    }, [onClose]);

    // ─── Renders ────────────────────────────────────────
    if (isSubmitted) {
        return <SuccessState onClose={handleSuccessClose} />;
    }

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Step indicator */}
            <div className="px-6 sm:px-10 pt-6 pb-4">
                <StepIndicator currentStep={currentStep} totalSteps={4} labels={STEP_LABELS} />
            </div>

            {/* Honeypot */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                <input
                    type="text"
                    name="botField"
                    value={formData.botField}
                    onChange={(e) => updateField("botField", e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                />
            </div>

            {/* Form steps */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 sm:px-10 py-6">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div key="step-0" variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                What are you looking to build?
                            </h3>
                            <p className="text-white/55 text-sm mb-8 font-light">Select all that apply.</p>

                            {errors.projectTypes && (
                                <p className="text-red-400 text-xs mb-4 font-mono">{errors.projectTypes}</p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {projectTypeOptions.map((opt) => {
                                    const isSelected = formData.projectTypes.includes(opt.value);
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => toggleArrayItem("projectTypes", opt.value)}
                                            className={`
                                                group text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer
                                                ${isSelected
                                                    ? "bg-white/[0.05] border-white/50"
                                                    : "bg-surface border-line hover:border-line-strong"
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300 ${
                                                        isSelected
                                                            ? "bg-accent border-accent"
                                                            : "border-white/25 bg-transparent"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                            <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className={`text-sm font-semibold block transition-colors text-white`}>
                                                        {opt.value}
                                                    </span>
                                                    <span className="text-white/50 text-xs font-light mt-0.5 block">
                                                        {opt.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div key="step-1" variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                Tell us about your project.
                            </h3>
                            <p className="text-white/55 text-sm mb-8 font-light">Help us understand what you need.</p>

                            <div className="space-y-6">
                                {/* Project Name */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Project Name
                                        <span className="text-white/20 ml-1">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.projectName}
                                        onChange={(e) => updateField("projectName", e.target.value)}
                                        placeholder="e.g. My SaaS Platform"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Describe your idea *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => updateField("description", e.target.value)}
                                        placeholder="Tell us about your business, problem, users, and what you want to achieve."
                                        rows={4}
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300 resize-none"
                                    />
                                    {errors.description && (
                                        <p className="text-red-400 text-xs mt-1 font-mono">{errors.description}</p>
                                    )}
                                </div>

                                {/* Current Stage */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Current Stage
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {stageOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => updateField("currentStage", opt)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                    formData.currentStage === opt
                                                        ? "bg-white border-white text-black"
                                                        : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Important Features Needed
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {featureOptions.map((opt) => {
                                            const isSelected = formData.features.includes(opt);
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => toggleArrayItem("features", opt)}
                                                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                        isSelected
                                                            ? "bg-white border-white text-black"
                                                            : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                    }`}
                                                >
                                                    {isSelected && <span className="mr-1">✓</span>}
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="step-2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                Business Information
                            </h3>
                            <p className="text-white/55 text-sm mb-8 font-light">Help us tailor the right approach.</p>

                            <div className="space-y-6">
                                {/* Company */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Company / Brand Name
                                        <span className="text-white/20 ml-1">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => updateField("company", e.target.value)}
                                        placeholder="Your company name"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Industry
                                    </label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => updateField("industry", e.target.value)}
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-all duration-300 appearance-none cursor-pointer [&>option]:bg-[#111] [&>option]:text-white"
                                    >
                                        <option value="">Select industry</option>
                                        {industryOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Business Size */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Business Size
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {businessSizeOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => updateField("businessSize", opt)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                    formData.businessSize === opt
                                                        ? "bg-white border-white text-black"
                                                        : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Timeline *
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {timelineOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => updateField("timeline", opt)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                    formData.timeline === opt
                                                        ? "bg-white border-white text-black"
                                                        : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.timeline && <p className="text-red-400 text-xs mt-2 font-mono">{errors.timeline}</p>}
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Budget Range *
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {budgetOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => updateField("budget", opt)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                    formData.budget === opt
                                                        ? "bg-white border-white text-black"
                                                        : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.budget && <p className="text-red-400 text-xs mt-2 font-mono">{errors.budget}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step-3" variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                How do we reach you?
                            </h3>
                            <p className="text-white/55 text-sm mb-8 font-light">We respond within 24–48 hours.</p>

                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">Phone / WhatsApp *</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                    {errors.phone && <p className="text-red-400 text-xs mt-1 font-mono">{errors.phone}</p>}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Country
                                        <span className="text-white/20 ml-1">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => updateField("country", e.target.value)}
                                        placeholder="India"
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                                    />
                                </div>

                                {/* Communication */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-3">
                                        Preferred Communication
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {communicationOptions.map((opt) => {
                                            const isSelected = formData.communication.includes(opt);
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => toggleArrayItem("communication", opt)}
                                                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                                                        isSelected
                                                            ? "bg-white border-white text-black"
                                                            : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                                                    }`}
                                                >
                                                    {isSelected && <span className="mr-1">✓</span>}
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="text-white/50 text-xs font-mono uppercase tracking-wider block mb-2">
                                        Additional Notes
                                        <span className="text-white/20 ml-1">(optional)</span>
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => updateField("notes", e.target.value)}
                                        placeholder="Any other context or questions..."
                                        rows={3}
                                        className="w-full bg-surface border border-line-strong rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {errors.submit && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                        <p className="text-red-400 text-xs font-mono">{errors.submit}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer nav */}
            <div className="px-6 sm:px-10 py-5 border-t border-white/[0.06] flex items-center justify-between bg-canvas">
                {currentStep > 0 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="group inline-flex items-center gap-2 text-white/55 text-sm hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                        <Icon icon={ArrowLeft01Icon} size={16} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {currentStep < 3 ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-hover transition-all duration-300 cursor-pointer"
                    >
                        Continue
                        <Icon icon={ArrowRight01Icon} size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-hover transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : "Request Project Review"}
                        {!isSubmitting && <Icon icon={ArrowRight01Icon} size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />}
                    </button>
                )}
            </div>
        </div>
    );
}
