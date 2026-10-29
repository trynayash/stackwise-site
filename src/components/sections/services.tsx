"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AiBrain01Icon, Analytics01Icon, CloudServerIcon, Compass01Icon, Globe02Icon, Layers01Icon, PackageIcon, PaintBoardIcon,
    Plug01Icon, RefreshIcon, ServerStack01Icon, Settings02Icon, ShoppingCart01Icon, SmartPhone01Icon, UserGroupIcon,
    WorkflowSquare01Icon, Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { useInquiry } from "@/components/providers/inquiry-context";
import { SectionHeader } from "@/components/ui/motion-primitives";
import { Button } from "@/components/ui/button";
import { Icon, type IconSvgElement } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────
type ServiceItem = {
    icon: IconSvgElement;
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
                icon: Layers01Icon,
                title: "SaaS Product Development",
                description: "Build subscription-based software platforms with secure architecture.",
                deliverables: ["Architecture", "Subscriptions", "Dashboards", "Deployment"],
            },
            {
                icon: PackageIcon,
                title: "MVP Development",
                description: "Launch the first version of your product without months of unnecessary complexity.",
                deliverables: ["Product planning", "Core features", "UI/UX design", "Fast launch"],
            },
            {
                icon: Globe02Icon,
                title: "Web Platforms",
                description: "Fast digital platforms designed for credibility, growth, and conversion.",
                deliverables: ["Company websites", "Landing pages", "CMS systems", "SEO foundations"],
            },
            {
                icon: SmartPhone01Icon,
                title: "Mobile Apps",
                description: "Build mobile experiences connected with powerful backend systems.",
                deliverables: ["iOS & Android", "Cross-platform", "Mobile APIs", "App deployment"],
            },
            {
                icon: PaintBoardIcon,
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
                icon: AiBrain01Icon,
                title: "AI Product Engineering",
                description: "Add practical AI capabilities that create actual business value.",
                deliverables: ["LLM integrations", "RAG systems", "Intelligent workflows", "AI automation"],
            },
            {
                icon: WorkflowSquare01Icon,
                title: "Business Automation",
                description: "Replace disconnected tools and manual processes with software built around your operations.",
                deliverables: ["Workflow engines", "Process automation", "System integrations", "Custom dashboards"],
            },
            {
                icon: Analytics01Icon,
                title: "Data Dashboards & Analytics",
                description: "Turn business data into clear insights and better decisions.",
                deliverables: ["Admin dashboards", "KPI systems", "Data visualization", "Reporting tools"],
            },
            {
                icon: Settings02Icon,
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
                icon: ServerStack01Icon,
                title: "Backend Engineering",
                description: "Design high-performance backend systems focused on architecture and predictable behavior.",
                deliverables: ["System architecture", "Database design", "Performance tuning", "Security"],
            },
            {
                icon: Plug01Icon,
                title: "APIs & Integrations",
                description: "Connect your business systems with reliable APIs and integrations.",
                deliverables: ["REST APIs", "Payment integrations", "CRM connections", "Developer platforms"],
            },
            {
                icon: CloudServerIcon,
                title: "Cloud & DevOps",
                description: "Deploy and operate applications with reliable infrastructure.",
                deliverables: ["Cloud architecture", "CI/CD pipelines", "Docker deployments", "Monitoring"],
            },
            {
                icon: ShoppingCart01Icon,
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
                icon: RefreshIcon,
                title: "Software Modernization",
                description: "Upgrade outdated software into faster, safer and more maintainable systems.",
                deliverables: ["Code refactoring", "Performance improvements", "Migration planning", "Security upgrades"],
            },
            {
                icon: Wrench01Icon,
                title: "Maintenance & Support",
                description: "Long-term engineering support after your product goes live.",
                deliverables: ["Bug fixes", "Security updates", "Performance monitoring", "New features"],
            },
            {
                icon: Compass01Icon,
                title: "Technical Consulting",
                description: "Senior engineering guidance before making important technology decisions.",
                deliverables: ["Architecture reviews", "Stack selection", "Scaling strategy", "Development roadmap"],
            },
            {
                icon: UserGroupIcon,
                title: "Startup Technology Partner",
                description: "Work with StackWise as your external product engineering team.",
                deliverables: ["MVP development", "Product iterations", "Feature planning", "Engineering ownership"],
            },
        ],
    },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Component ──────────────────────────────────────────
export function Services() {
    const [activeCategory, setActiveCategory] = useState("build");
    const current = categories.find((c) => c.id === activeCategory) ?? categories[0];
    const { openInquiry } = useInquiry();

    return (
        <section id="services-catalog" className="relative py-20 md:py-28" aria-label="Services catalog">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="03"
                    eyebrow="Capabilities"
                    title="Everything from idea"
                    muted="to production."
                    description="Validating a startup idea, scaling a SaaS platform or untangling operations — pick where you are and see exactly what we deliver."
                />

                {/* Segmented tabs */}
                <div role="tablist" aria-label="Service categories" className="mb-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${cat.id}`}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                                    isActive ? "text-black" : "text-white/60 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.span layoutId="services-tab-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        id={`panel-${current.id}`}
                        role="tabpanel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                        className="grid grid-cols-1 gap-5 lg:grid-cols-12"
                    >
                        {/* Story */}
                        <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 md:p-9 lg:col-span-4">
                            <div>
                                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">{current.label}</span>
                                <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">{current.hook}</h3>
                                <p className="mt-4 text-base leading-relaxed text-white/60">{current.storyLine1}</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">{current.storyLine2}</p>
                            </div>
                            <Button onClick={openInquiry} arrow="right" className="mt-8 self-start">
                                Discuss your project
                            </Button>
                        </div>

                        {/* Rows */}
                        <ul className="overflow-hidden rounded-2xl border border-line lg:col-span-8">
                            {current.services.map((service, i) => (
                                <motion.li
                                    key={service.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.05 + i * 0.05, ease: EASE } }}
                                    className="grid grid-cols-1 gap-4 border-b border-line bg-canvas p-6 last:border-b-0 md:grid-cols-12 md:gap-6 md:p-7"
                                >
                                    <div className="flex items-start gap-4 md:col-span-6">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-white">
                                            <Icon icon={service.icon} size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-white md:text-lg">{service.title}</h4>
                                            <p className="mt-1 text-sm leading-relaxed text-white/55">{service.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap content-start gap-1.5 md:col-span-6 md:justify-end">
                                        {service.deliverables.map((item) => (
                                            <span key={item} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Services;
