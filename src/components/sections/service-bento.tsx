import React from "react";
import Link from "next/link";
import { AiBrain01Icon, ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Card, IconTile } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { marketingPages, servicePages, solutionPages } from "@/lib/marketing-pages";
import { cn } from "@/lib/utils";

/* ─── Mini animated visuals, one per service ───────────────────────── */

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("relative h-40 w-full overflow-hidden rounded-xl border border-line bg-canvas", className)}>{children}</div>;
}

function BarsVisual() {
    const bars = [40, 65, 52, 80, 58, 92, 70, 100, 84];
    return (
        <Panel className="p-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <div className="h-1.5 w-16 rounded-full bg-white/25" />
                    <div className="h-1.5 w-10 rounded-full bg-white/10" />
                </div>
                <div className="flex gap-1">
                    <span className="h-5 w-12 rounded-md border border-line-strong" />
                    <span className="h-5 w-8 rounded-md border border-line" />
                </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className={cn("flex-1 origin-bottom rounded-t-[3px]", i === 7 ? "bg-accent" : "bg-white/15")}
                        style={{ height: `${h}%`, animation: `barGrow ${2.6 + (i % 3) * 0.4}s ease-in-out ${i * 0.12}s infinite` }}
                    />
                ))}
            </div>
        </Panel>
    );
}

function NodesVisual() {
    const nodes = [[18, 24], [82, 20], [92, 62], [70, 86], [24, 82], [8, 52]];
    return (
        <Panel>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                {nodes.map(([x, y], i) => (
                    <line
                        key={i}
                        x1="50" y1="50" x2={x} y2={y}
                        stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3"
                        vectorEffect="non-scaling-stroke"
                        style={{ animation: `dash ${1.6 + i * 0.2}s linear infinite` }}
                    />
                ))}
            </svg>
            {nodes.map(([x, y], i) => (
                <span
                    key={i}
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    style={{ left: `${x}%`, top: `${y}%`, animation: `nodePulse 2.4s ease-in-out ${i * 0.3}s infinite` }}
                />
            ))}
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-accent text-black">
                <Icon icon={AiBrain01Icon} size={22} />
            </div>
        </Panel>
    );
}

function FlowVisual() {
    const steps = ["Trigger", "Process", "Notify"];
    return (
        <Panel className="flex items-center justify-between gap-2 px-4">
            {steps.map((s, i) => (
                <React.Fragment key={s}>
                    <div className={cn("relative z-10 flex flex-col items-center gap-1.5 rounded-lg border px-3 py-2.5", i === 1 ? "border-accent bg-accent text-black" : "border-line-strong bg-surface")}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", i === 1 ? "bg-black" : "bg-white/50")} />
                        <span className={cn("text-[10px] font-mono", i === 1 ? "text-black" : "text-white/60")}>{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <svg viewBox="0 0 40 4" className="h-1 min-w-4 flex-1" aria-hidden>
                            <line x1="0" y1="2" x2="40" y2="2" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash 0.9s linear infinite" }} />
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </Panel>
    );
}

function CodeVisual() {
    const lines = [
        { w: "62%", c: "bg-accent", indent: 0 },
        { w: "48%", c: "bg-white/25", indent: 1 },
        { w: "70%", c: "bg-white/15", indent: 1 },
        { w: "38%", c: "bg-white/30", indent: 2 },
        { w: "55%", c: "bg-white/15", indent: 1 },
        { w: "30%", c: "bg-white/25", indent: 0 },
    ];
    return (
        <Panel>
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="ml-2 text-[10px] font-mono text-white/35">page.tsx</span>
            </div>
            <div className="space-y-2.5 p-3">
                {lines.map((l, i) => (
                    <div key={i} className="flex items-center gap-2" style={{ paddingLeft: l.indent * 14 }}>
                        <span className="w-3 text-[9px] font-mono text-white/20">{i + 1}</span>
                        <div
                            className={cn("h-1.5 rounded-full", l.c)}
                            style={{ ["--w" as string]: l.w, width: l.w, animation: `typeLine 4.5s ease-out ${i * 0.25}s infinite` } as React.CSSProperties}
                        />
                    </div>
                ))}
            </div>
        </Panel>
    );
}

/* ─── Data ─────────────────────────────────────────────────────────── */

const services = [
    {
        page: marketingPages["saas-development"],
        description: "Multi-tenant products with auth, roles, subscriptions and dashboards — architected to grow from first customer to thousands.",
        tags: ["Auth & roles", "Stripe / Razorpay", "Dashboards", "Multi-tenant"],
        visual: <BarsVisual />,
        span: "lg:col-span-7",
    },
    {
        page: marketingPages["ai-development"],
        description: "LLM features that do real work: search over your documents, agents that call your APIs, and smart automations.",
        tags: ["LLMs", "RAG", "Agents"],
        visual: <NodesVisual />,
        span: "lg:col-span-5",
    },
    {
        page: marketingPages["custom-software"],
        description: "Internal tools, CRMs and admin panels shaped around how your team actually works.",
        tags: ["Internal tools", "CRM / ERP", "APIs"],
        visual: <FlowVisual />,
        span: "lg:col-span-5",
    },
    {
        page: marketingPages["web-development"],
        description: "Fast, search-friendly marketing sites and web platforms in Next.js, built to turn visitors into enquiries.",
        tags: ["Next.js", "Technical SEO", "Core Web Vitals", "CMS"],
        visual: <CodeVisual />,
        span: "lg:col-span-7",
    },
];

/* ─── Section ──────────────────────────────────────────────────────── */

export function ServiceBento() {
    return (
        <section id="services" className="relative py-20 md:py-28" aria-label="Services">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="01"
                    eyebrow="Services"
                    title="Software that earns"
                    muted="its keep."
                    description="Four core services, one standard: production-grade code, clear communication, and a product you fully own when we're done."
                    action={
                        <ButtonLink href="/services" variant="secondary" arrow="right">
                            All services
                        </ButtonLink>
                    }
                />

                <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 md:gap-5">
                    {services.map(({ page, description, tags, visual, span }) => (
                        <StaggerItem key={page.path} className={span}>
                            <Link href={page.path} className="block h-full" aria-label={`${page.navLabel} — learn more`}>
                                <Card interactive className="flex h-full flex-col p-5 md:p-6">
                                    {visual}
                                    <div className="mt-6 flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <IconTile size="sm">
                                                <Icon icon={page.icon} size={18} />
                                            </IconTile>
                                            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{page.navLabel}</h3>
                                        </div>
                                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-white/60 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                                            <Icon icon={ArrowUpRight01Icon} size={18} />
                                        </span>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{description}</p>
                                    <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
                                        {tags.map((t) => (
                                            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>

                {/* The rest of the catalogue */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-sm text-white/45">Also:</span>
                    {servicePages
                        .filter((p) => !services.some((core) => core.page.path === p.path))
                        .map((p) => (
                            <Link
                                key={p.path}
                                href={p.path}
                                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-white/70 transition-colors hover:border-line-strong hover:text-white"
                            >
                                <Icon icon={p.icon} size={16} />
                                {p.navLabel}
                            </Link>
                        ))}
                </div>

                {/* Solutions by goal */}
                <div className="mt-14">
                    <p className="mb-5 text-sm text-white/45">Or start from your goal</p>
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                        {solutionPages.map((p) => (
                            <StaggerItem key={p.path}>
                                <Link href={p.path} className="block h-full">
                                    <Card interactive className="flex h-full items-center gap-4 p-5">
                                        <IconTile>
                                            <Icon icon={p.icon} size={20} />
                                        </IconTile>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base font-semibold text-white">{p.navLabel}</h3>
                                            <p className="mt-0.5 text-sm leading-snug text-white/50">{p.summary}</p>
                                        </div>
                                        <Icon icon={ArrowRight01Icon} size={18} className="flex-shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                                    </Card>
                                </Link>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </div>
        </section>
    );
}
