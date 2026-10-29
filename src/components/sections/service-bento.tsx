"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Layers, Brain, Workflow, Globe, Rocket, Zap, Target } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

/* ─── Mini animated visuals, one per service ───────────────────────── */

function BarsVisual() {
    const bars = [40, 65, 52, 80, 58, 92, 70, 100, 84];
    return (
        <div className="relative h-36 w-full rounded-xl border border-white/[0.06] bg-black/40 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <div className="space-y-1.5">
                    <div className="h-1.5 w-16 rounded-full bg-white/20" />
                    <div className="h-1.5 w-10 rounded-full bg-white/10" />
                </div>
                <div className="flex gap-1">
                    <span className="h-5 w-12 rounded-md bg-[#C8FF00]/15 border border-[#C8FF00]/25" />
                    <span className="h-5 w-8 rounded-md bg-white/5 border border-white/10" />
                </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1.5 h-20">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-[3px] origin-bottom bg-gradient-to-t from-[#C8FF00]/30 to-[#C8FF00]"
                        style={{ height: `${h}%`, animation: `barGrow ${2.4 + (i % 3) * 0.4}s ease-in-out ${i * 0.12}s infinite` }}
                    />
                ))}
            </div>
        </div>
    );
}

function NodesVisual() {
    const nodes = [
        [20, 22], [80, 18], [92, 60], [70, 88], [24, 82], [8, 52],
    ];
    return (
        <div className="relative h-36 w-full rounded-xl border border-white/[0.06] bg-black/40 overflow-hidden">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                {nodes.map(([x, y], i) => (
                    <line
                        key={i}
                        x1="50" y1="50" x2={x} y2={y}
                        stroke="#C8FF00" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2 2"
                        vectorEffect="non-scaling-stroke"
                        style={{ animation: `dash ${1.4 + i * 0.2}s linear infinite` }}
                    />
                ))}
            </svg>
            {nodes.map(([x, y], i) => (
                <span
                    key={i}
                    className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8FF00]"
                    style={{ left: `${x}%`, top: `${y}%`, animation: `nodePulse 2.2s ease-in-out ${i * 0.3}s infinite`, boxShadow: "0 0 12px #C8FF00" }}
                />
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C8FF00]/40 bg-[#C8FF00]/10 shadow-[0_0_30px_rgba(200,255,0,0.3)]">
                <Brain size={20} className="text-[#C8FF00]" />
            </div>
        </div>
    );
}

function FlowVisual() {
    const steps = ["Trigger", "Process", "Notify"];
    return (
        <div className="relative h-36 w-full rounded-xl border border-white/[0.06] bg-black/40 px-4 flex items-center justify-between gap-2 overflow-hidden">
            {steps.map((s, i) => (
                <React.Fragment key={s}>
                    <div
                        className={cn(
                            "relative z-10 flex flex-col items-center gap-1.5 rounded-lg border px-2.5 py-2",
                            i === 1 ? "border-[#C8FF00]/40 bg-[#C8FF00]/10" : "border-white/10 bg-white/[0.03]"
                        )}
                        style={{ animation: `floatY 3s ease-in-out ${i * 0.3}s infinite` }}
                    >
                        <span className={cn("h-1.5 w-1.5 rounded-full", i === 1 ? "bg-[#C8FF00]" : "bg-white/40")} />
                        <span className="text-[10px] font-mono text-white/60">{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <svg viewBox="0 0 40 4" className="flex-1 h-1 min-w-4">
                            <line x1="0" y1="2" x2="40" y2="2" stroke="#C8FF00" strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash 0.8s linear infinite" }} />
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function CodeVisual() {
    const lines = [
        { w: "62%", c: "bg-[#C8FF00]/70", indent: 0 },
        { w: "48%", c: "bg-white/25", indent: 1 },
        { w: "70%", c: "bg-white/15", indent: 1 },
        { w: "38%", c: "bg-[#9EFF00]/50", indent: 2 },
        { w: "55%", c: "bg-white/20", indent: 1 },
        { w: "30%", c: "bg-[#C8FF00]/40", indent: 0 },
    ];
    return (
        <div className="relative h-36 w-full rounded-xl border border-white/[0.06] bg-black/40 overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-[#C8FF00]/60" />
                <span className="ml-2 text-[9px] font-mono text-white/30">page.tsx</span>
            </div>
            <div className="space-y-2 p-3">
                {lines.map((l, i) => (
                    <div key={i} className="flex items-center gap-2" style={{ paddingLeft: l.indent * 14 }}>
                        <span className="w-3 text-[8px] font-mono text-white/20">{i + 1}</span>
                        <div
                            className={cn("h-1.5 rounded-full", l.c)}
                            style={{ ["--w" as string]: l.w, width: l.w, animation: `typeLine 4s ease-out ${i * 0.25}s infinite` } as React.CSSProperties}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Data ─────────────────────────────────────────────────────────── */

const services = [
    {
        href: "/services/saas-development",
        icon: Layers,
        eyebrow: "Build",
        title: "SaaS Development",
        description: "Multi-tenant products with auth, roles, subscriptions and dashboards — architected to grow from first customer to thousands.",
        tags: ["Auth & RBAC", "Stripe / Razorpay", "Dashboards", "Multi-tenant"],
        visual: <BarsVisual />,
        span: "lg:col-span-2",
    },
    {
        href: "/services/ai-development",
        icon: Brain,
        eyebrow: "Automate",
        title: "AI Development",
        description: "LLM features that do real work: RAG over your documents, agents that call your APIs, and smart automations.",
        tags: ["LLMs", "RAG", "Agents"],
        visual: <NodesVisual />,
        span: "lg:col-span-1",
    },
    {
        href: "/services/custom-software",
        icon: Workflow,
        eyebrow: "Operate",
        title: "Custom Software",
        description: "Internal tools, CRMs and admin panels shaped around how your team actually works — not the other way round.",
        tags: ["Internal tools", "CRM / ERP", "APIs"],
        visual: <FlowVisual />,
        span: "lg:col-span-1",
    },
    {
        href: "/services/web-development",
        icon: Globe,
        eyebrow: "Grow",
        title: "Web Development",
        description: "Fast, search-friendly marketing sites and web platforms in Next.js, built to turn visitors into enquiries.",
        tags: ["Next.js", "Technical SEO", "Core Web Vitals", "CMS"],
        visual: <CodeVisual />,
        span: "lg:col-span-2",
    },
];

const solutions = [
    { href: "/solutions/startups", icon: Rocket, title: "For Startups", description: "Seed-ready codebases your future CTO will thank you for." },
    { href: "/solutions/mvp-development", icon: Target, title: "MVP Development", description: "Ship the core product fast without painting yourself into a corner." },
    { href: "/solutions/business-automation", icon: Zap, title: "Business Automation", description: "Replace spreadsheets and manual steps with software that runs itself." },
];

/* ─── Section ──────────────────────────────────────────────────────── */

export function ServiceBento() {
    return (
        <section id="services" className="py-20 md:py-32 relative z-10" aria-label="What we build">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="What we build"
                    title="Software that earns"
                    muted="its keep."
                    description="Four core services, one standard: production-grade code, clear communication, and a product you fully own when we're done."
                />

                <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {services.map((s) => (
                        <StaggerItem key={s.href} className={cn(s.span)}>
                            <Link href={s.href} className="block h-full" aria-label={`${s.title} — learn more`}>
                                <TiltCard maxTilt={5} className="p-6 md:p-7">
                                    <div className="flex h-full flex-col">
                                        <div className="mb-6">{s.visual}</div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-[#C8FF00]/30 group-hover:bg-[#C8FF00]/10 transition-colors">
                                                    <s.icon size={18} className="text-[#C8FF00]" />
                                                </div>
                                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{s.eyebrow}</span>
                                            </div>
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 group-hover:bg-[#C8FF00] group-hover:text-black group-hover:border-[#C8FF00] transition-all duration-300 group-hover:rotate-45">
                                                <ArrowUpRight size={16} />
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#C8FF00] transition-colors">{s.title}</h3>
                                        <p className="text-sm text-white/50 leading-relaxed mb-5">{s.description}</p>
                                        <div className="mt-auto flex flex-wrap gap-1.5">
                                            {s.tags.map((t) => (
                                                <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/45">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>

                {/* Solutions strip */}
                <Stagger className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {solutions.map((s) => (
                        <StaggerItem key={s.href}>
                            <Link href={s.href} className="block h-full">
                                <TiltCard maxTilt={6} className="p-5 md:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C8FF00]/20 to-[#C8FF00]/5 border border-[#C8FF00]/20">
                                            <s.icon size={18} className="text-[#C8FF00]" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="flex items-center gap-1.5 text-base font-semibold text-white group-hover:text-[#C8FF00] transition-colors">
                                                {s.title}
                                                <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </h3>
                                            <p className="mt-1 text-sm text-white/45 leading-relaxed">{s.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
