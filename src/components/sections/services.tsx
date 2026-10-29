"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/components/providers/inquiry-context";
import { SectionHeader } from "@/components/ui/motion-primitives";
import {
    ArrowRight,
    ChevronDown,
    Layers,
    Rocket,
    Globe,
    Smartphone,
    Palette,
    Brain,
    Zap,
    BarChart3,
    Settings,
    Server,
    Plug,
    Cloud,
    ShoppingCart,
    RefreshCw,
    Wrench,
    Compass,
    Users,
    type LucideIcon,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────
type ServiceItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    deliverables: string[];
};

type CategoryData = {
    id: string;
    label: string;
    hook: string;
    storyLine1: string;
    storyLine2: string;
    services: ServiceItem[];
};

// ─── Categories & Services Data ─────────────────────────
const categories: CategoryData[] = [
    {
        id: "build",
        label: "Build",
        hook: "Have an idea?",
        storyLine1: "We help turn concepts into production-ready software products.",
        storyLine2: "From planning and design to engineering, deployment and iteration.",
        services: [
            {
                icon: Layers,
                title: "SaaS Product Development",
                description: "Build subscription-based software platforms with secure architecture.",
                deliverables: ["Architecture", "Subscriptions", "Dashboards", "Deployment"],
            },
            {
                icon: Rocket,
                title: "MVP Development",
                description: "Launch the first version of your product without months of unnecessary complexity.",
                deliverables: ["Product planning", "Core features", "UI/UX design", "Fast launch"],
            },
            {
                icon: Globe,
                title: "Web Platforms",
                description: "Fast digital platforms designed for credibility, growth, and conversion.",
                deliverables: ["Company websites", "Landing pages", "CMS systems", "SEO foundations"],
            },
            {
                icon: Smartphone,
                title: "Mobile Apps",
                description: "Build mobile experiences connected with powerful backend systems.",
                deliverables: ["iOS & Android", "Cross-platform", "Mobile APIs", "App deployment"],
            },
            {
                icon: Palette,
                title: "UI/UX Product Design",
                description: "Create intuitive digital experiences that users understand and businesses can scale.",
                deliverables: ["User research", "Design systems", "Prototypes", "Conversion optimization"],
            },
        ],
    },
    {
        id: "automate",
        label: "Automate",
        hook: "Still running operations manually?",
        storyLine1: "We replace repetitive workflows with custom software and intelligent automation.",
        storyLine2: "Purpose-built systems that eliminate manual overhead and reduce operational cost.",
        services: [
            {
                icon: Brain,
                title: "AI Product Engineering",
                description: "Add practical AI capabilities that create actual business value.",
                deliverables: ["LLM integrations", "RAG systems", "Intelligent workflows", "AI automation"],
            },
            {
                icon: Zap,
                title: "Business Automation",
                description: "Replace disconnected tools and manual processes with software built around your operations.",
                deliverables: ["Workflow engines", "Process automation", "System integrations", "Custom dashboards"],
            },
            {
                icon: BarChart3,
                title: "Data Dashboards & Analytics",
                description: "Turn business data into clear insights and better decisions.",
                deliverables: ["Admin dashboards", "KPI systems", "Data visualization", "Reporting tools"],
            },
            {
                icon: Settings,
                title: "Custom Internal Software",
                description: "Build internal tools tailored to how your team actually works.",
                deliverables: ["CRM systems", "ERP platforms", "Internal tools", "Operations software"],
            },
        ],
    },
    {
        id: "scale",
        label: "Scale",
        hook: "Growing faster than your systems?",
        storyLine1: "We rebuild infrastructure, APIs and platforms designed for reliability.",
        storyLine2: "Scalable systems that handle growth without breaking under real operating conditions.",
        services: [
            {
                icon: Server,
                title: "Backend Engineering",
                description: "Design high-performance backend systems focused on architecture and predictable behavior.",
                deliverables: ["System architecture", "Database design", "Performance tuning", "Security"],
            },
            {
                icon: Plug,
                title: "APIs & Integrations",
                description: "Connect your business systems with reliable APIs and integrations.",
                deliverables: ["REST APIs", "Payment integrations", "CRM connections", "Developer platforms"],
            },
            {
                icon: Cloud,
                title: "Cloud & DevOps",
                description: "Deploy and operate applications with reliable infrastructure.",
                deliverables: ["Cloud architecture", "CI/CD pipelines", "Docker deployments", "Monitoring"],
            },
            {
                icon: ShoppingCart,
                title: "E-commerce Platforms",
                description: "Create commerce platforms built for sales, operations and growth.",
                deliverables: ["Online stores", "Checkout systems", "Payment integrations", "Inventory"],
            },
        ],
    },
    {
        id: "improve",
        label: "Improve",
        hook: "Need a long-term technical partner?",
        storyLine1: "We continuously maintain, optimize and evolve your software.",
        storyLine2: "Engineering ownership that extends well beyond launch day.",
        services: [
            {
                icon: RefreshCw,
                title: "Software Modernization",
                description: "Upgrade outdated software into faster, safer and more maintainable systems.",
                deliverables: ["Code refactoring", "Performance improvements", "Migration planning", "Security upgrades"],
            },
            {
                icon: Wrench,
                title: "Maintenance & Support",
                description: "Long-term engineering support after your product goes live.",
                deliverables: ["Bug fixes", "Security updates", "Performance monitoring", "New features"],
            },
            {
                icon: Compass,
                title: "Technical Consulting",
                description: "Senior engineering guidance before making important technology decisions.",
                deliverables: ["Architecture reviews", "Stack selection", "Scaling strategy", "Development roadmap"],
            },
            {
                icon: Users,
                title: "Startup Technology Partner",
                description: "Work with StackWise as your external product engineering team.",
                deliverables: ["MVP development", "Product iterations", "Feature planning", "Engineering ownership"],
            },
        ],
    },
];

// ─── Animation Variants ─────────────────────────────────
const fadeVariant = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: "easeIn" as const } },
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const serviceRowVariant = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ─── Component ──────────────────────────────────────────
export function Services() {
    const [activeCategory, setActiveCategory] = useState("build");
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const currentCategory = categories.find((c) => c.id === activeCategory) ?? categories[0];

    const { openInquiry } = useInquiry();

    return (
        <section id="services-catalog" className="py-20 md:py-32 relative z-10" aria-label="Services catalog">
            <div className="container mx-auto px-5 sm:px-6">

                <SectionHeader
                    eyebrow="Full services catalog"
                    title="From idea to production,"
                    muted="we engineer the entire journey."
                    description="Validating a startup idea, scaling a SaaS platform or untangling operations — pick where you are and see exactly what we deliver."
                />

                {/* ── Services Catalog ── */}
                <div>
                    {/* ── Category Tabs ── */}
                    <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setOpenAccordion(null);
                                    }}
                                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer border ${
                                        isActive ? "text-black border-transparent" : "text-white/50 border-white/[0.06] hover:text-white hover:border-white/15"
                                    }`}
                                    aria-pressed={isActive}
                                    aria-label={`View ${cat.label} services`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="services-tab-pill"
                                            className="absolute inset-0 rounded-full bg-[#C8FF00] shadow-[0_0_24px_-4px_rgba(200,255,0,0.5)]"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Animated Category Content ── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentCategory.id}
                            variants={fadeVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {/* ── Solution Story Card ── */}
                            <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] overflow-hidden p-8 md:p-12 mb-10">
                                {/* Background mesh glow */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C8FF00]/[0.015] to-transparent blur-[120px] pointer-events-none rounded-full" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#C8FF00]/[0.008] to-transparent blur-[80px] pointer-events-none rounded-full" />

                                <div className="relative z-10 max-w-2xl">
                                    <span className="text-[#C8FF00] text-xs font-mono tracking-[0.15em] uppercase block mb-6">
                                        {currentCategory.label}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-5 leading-snug">
                                        {currentCategory.hook}
                                    </h3>
                                    <p className="text-white/50 text-base md:text-lg leading-relaxed font-light mb-2">
                                        {currentCategory.storyLine1}
                                    </p>
                                    <p className="text-white/30 text-sm md:text-base leading-relaxed font-light">
                                        {currentCategory.storyLine2}
                                    </p>
                                </div>
                            </div>

                            {/* ── Desktop: Service Rows ── */}
                            <motion.div
                                className="hidden md:block border-t border-white/[0.06]"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                {currentCategory.services.map((service) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <motion.div
                                            key={service.title}
                                            variants={serviceRowVariant}
                                            onClick={openInquiry}
                                            className="group relative border-b border-white/[0.05] py-10 transition-all duration-400 hover:bg-white/[0.01] cursor-pointer"
                                        >
                                            {/* Hover glow */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8FF00]/[0.006] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <div className="grid grid-cols-12 gap-8 items-start relative z-10">

                                                {/* Left: Icon & Title */}
                                                <div className="col-span-4 flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-[#C8FF00]/20 group-hover:bg-[#C8FF00]/[0.04] transition-all duration-400">
                                                        <IconComponent size={18} className="text-white/30 group-hover:text-[#C8FF00] transition-colors duration-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white group-hover:text-[#C8FF00] transition-colors duration-400 leading-snug">
                                                            {service.title}
                                                        </h3>
                                                        <p className="text-white/40 text-sm leading-relaxed mt-1.5 font-light max-w-sm">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Center: Deliverables */}
                                                <div className="col-span-5">
                                                    <span className="text-white/20 text-[9px] font-mono uppercase tracking-wider block mb-3">
                                                        Includes
                                                    </span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {service.deliverables.map((item) => (
                                                            <span
                                                                key={item}
                                                                className="text-white/50 text-xs font-light px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right: Explore Link */}
                                                <div className="col-span-3 flex items-center justify-end">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-white/30 group-hover:text-[#C8FF00] transition-colors duration-400 font-mono uppercase tracking-wider">
                                                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-400">
                                                            Discuss project
                                                        </span>
                                                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* ── Mobile: Accordion Layout ── */}
                            <div className="md:hidden space-y-3">
                                {currentCategory.services.map((service, idx) => {
                                    const isOpen = openAccordion === idx;
                                    const IconComponent = service.icon;
                                    return (
                                        <div
                                            key={service.title}
                                            className="border border-white/[0.05] rounded-xl overflow-hidden bg-[#0d0d0d]/30"
                                        >
                                            {/* Trigger */}
                                            <button
                                                onClick={() => setOpenAccordion(isOpen ? null : idx)}
                                                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors duration-300 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                                                        <IconComponent size={14} className="text-white/30" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-white">{service.title}</h3>
                                                </div>
                                                <ChevronDown
                                                    size={14}
                                                    className={`text-white/30 transition-transform duration-400 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            {/* Content */}
                                            <div
                                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                                    isOpen
                                                        ? "max-h-[400px] border-t border-white/[0.04] p-5 bg-[#0d0d0d]/50"
                                                        : "max-h-0"
                                                }`}
                                            >
                                                <p className="text-white/50 text-xs leading-relaxed mb-4 font-light">
                                                    {service.description}
                                                </p>
                                                <div>
                                                    <span className="text-white/20 text-[9px] font-mono uppercase tracking-wider block mb-2">
                                                        Includes
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {service.deliverables.map((item) => (
                                                            <span
                                                                key={item}
                                                                className="text-white/50 text-[10px] font-light px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04]"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Consulting CTA ── */}
                    <div className="mt-20 md:mt-28 border-t border-white/[0.06] pt-12 md:pt-16">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="max-w-lg">
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                                    Not sure what you need?
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed font-light">
                                    Most businesses don&apos;t need more software — they need the right system. Let&apos;s discuss your workflow and find the simplest path to your goal.
                                </p>
                            </div>
                            <button
                                onClick={openInquiry}
                                className="group inline-flex items-center gap-2 text-[#C8FF00] text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 cursor-pointer self-start md:self-auto"
                                aria-label="Discuss your workflow"
                            >
                                Let&apos;s discuss your workflow
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
