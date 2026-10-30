import React from "react";
import {
    AiBrain01Icon, Analytics01Icon, CheckmarkCircle02Icon, CloudUploadIcon, CodeIcon, DashboardSquare01Icon, Layers01Icon, PenTool03Icon,
    Search01Icon, Settings01Icon, Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/*
 * The hero visual: a product dashboard, the code behind it and the path to production, drawn in HTML so it
 * stays sharp at every size. "Northstar" is a sample product, not a client. Everything here is decoration
 * for sighted visitors; the section's copy carries the message, so the whole thing is aria-hidden.
 */

const nav = [
    { icon: DashboardSquare01Icon, label: "Workspace", active: true },
    { icon: Layers01Icon, label: "Projects" },
    { icon: AiBrain01Icon, label: "AI assistants" },
    { icon: Analytics01Icon, label: "Analytics" },
    { icon: CloudUploadIcon, label: "Deployments" },
    { icon: Settings01Icon, label: "Settings" },
];

const stats = [
    { label: "Active projects", value: "4", delta: "+2" },
    { label: "Total users", value: "12.4K", delta: "+28%" },
    { label: "API requests", value: "892K", delta: "+52%" },
    { label: "Uptime", value: "99.9%", delta: "" },
];

const deploys = [
    { title: "Production deploy", when: "2 minutes ago" },
    { title: "API update", when: "1 hour ago" },
    { title: "Database migration", when: "3 hours ago" },
    { title: "AI model update", when: "1 day ago" },
];

const steps = [
    { icon: PenTool03Icon, title: "Design", sub: "UI/UX" },
    { icon: CodeIcon, title: "Build", sub: "Development" },
    { icon: CheckmarkCircle02Icon, title: "Test", sub: "Quality checks" },
    { icon: CloudUploadIcon, title: "Deploy", sub: "Production" },
];

/** Syntax-coloured code, kept as data so the markup stays readable. */
const code: [string, string][][] = [
    [["kw", "import"], ["p", " { createClient } "], ["kw", "from"], ["s", ' "@northstar/sdk"'], ["p", ";"]],
    [],
    [["kw", "const"], ["p", " client = createClient({"]],
    [["p", "  apiKey: process.env."], ["v", "API_KEY"], ["p", ","]],
    [["p", "});"]],
    [],
    [["kw", "export async function"], ["fn", " POST"], ["p", "(req: Request) {"]],
    [["p", "  "], ["kw", "const"], ["p", " { prompt } = "], ["kw", "await"], ["p", " req.json();"]],
    [["p", "  "], ["kw", "const"], ["p", " result = "], ["kw", "await"], ["p", " client.ai.generate({ prompt });"]],
    [["p", "  "], ["kw", "return"], ["p", " Response.json({ result });"]],
    [["p", "}"]],
];

const tone: Record<string, string> = { kw: "text-[#c792ea]", s: "text-[#c3e88d]", v: "text-[#82aaff]", fn: "text-[#ffcb6b]", p: "text-white/80" };

function WindowBar({ url, dark = false }: { url?: string; dark?: boolean }) {
    return (
        <div className={cn("flex items-center gap-2 border-b px-3 py-2", dark ? "border-white/10" : "border-ink/[0.08]")}>
            <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            {url && (
                <span className={cn("mx-auto rounded-md px-3 py-0.5 font-mono text-[10px]", dark ? "bg-white/[0.08] text-white/70" : "bg-ink/[0.05] text-ink/65")}>
                    {url}
                </span>
            )}
        </div>
    );
}

function Chart() {
    const points = "0,78 25,70 50,74 75,58 100,62 125,48 150,52 175,40 200,44 225,30 250,34 275,20 300,24";
    return (
        <svg viewBox="0 0 300 90" className="h-full w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="hero-chart" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#C8FF00" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#C8FF00" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,90 ${points} 300,90`} fill="url(#hero-chart)" />
            <polyline points={points} fill="none" stroke="#5c8a00" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    );
}

function Dashboard({ className }: { className?: string }) {
    return (
        <div className={cn("overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]", className)}>
            <WindowBar url="app.northstar.so" />
            <div className="flex">
                <aside className="hidden w-32 flex-shrink-0 border-r border-ink/[0.06] p-2.5 md:block">
                    <p className="mb-3 px-2 text-[11px] font-bold tracking-tight text-ink">Northstar</p>
                    <ul className="space-y-0.5">
                        {nav.map((n) => (
                            <li key={n.label} className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px]", n.active ? "bg-accent/60 font-semibold text-ink" : "text-ink/60")}>
                                <Icon icon={n.icon} size={12} />
                                {n.label}
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="min-w-0 flex-1 p-3 md:p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[13px] font-bold tracking-tight text-ink md:text-sm">Workspace</p>
                            <p className="text-[10px] text-ink/60">Build, ship and grow your product.</p>
                        </div>
                        <span className="hidden items-center gap-1.5 rounded-md border border-ink/10 px-2 py-1 text-[10px] text-ink/60 sm:flex">
                            <Icon icon={Search01Icon} size={11} />
                            Search
                        </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="rounded-lg border border-ink/[0.07] p-2">
                                <p className="text-[9px] text-ink/60">{s.label}</p>
                                <p className="mt-0.5 flex items-baseline gap-1.5 text-[15px] font-bold tracking-tight text-ink">
                                    {s.value}
                                    {s.delta && <span className="rounded bg-accent/60 px-1 text-[8px] font-semibold">{s.delta}</span>}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-5">
                        <div className="rounded-lg border border-ink/[0.07] p-2 md:col-span-3">
                            <div className="flex items-center justify-between text-[9px]">
                                <span className="font-semibold text-ink">User growth</span>
                                <span className="text-ink/60">Last 30 days</span>
                            </div>
                            <div className="mt-2 h-14 md:h-16">
                                <Chart />
                            </div>
                        </div>
                        <ul className="hidden space-y-1.5 rounded-lg border border-ink/[0.07] p-2 md:col-span-2 md:block">
                            <li className="text-[9px] font-semibold text-ink">Recent deployments</li>
                            {deploys.map((d) => (
                                <li key={d.title} className="flex items-center justify-between gap-2 text-[9px]">
                                    <span>
                                        <span className="block text-ink/80">{d.title}</span>
                                        <span className="text-ink/60">{d.when}</span>
                                    </span>
                                    <span className="rounded bg-accent/60 px-1.5 py-0.5 text-[8px] font-semibold text-ink">Live</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeWindow({ className }: { className?: string }) {
    return (
        <div className={cn("overflow-hidden rounded-xl bg-[#121212] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] ring-1 ring-white/10", className)}>
            <WindowBar url="api/route.ts" dark />
            <pre className="overflow-hidden p-3 font-mono text-[10px] leading-[1.6] md:text-[11px]">
                {code.map((line, i) => (
                    <div key={i} className="flex">
                        <span className="w-5 flex-shrink-0 select-none text-white/45">{i + 1}</span>
                        <span>
                            {line.map(([t, text], j) => (
                                <span key={j} className={tone[t]}>
                                    {text}
                                </span>
                            ))}
                        </span>
                    </div>
                ))}
            </pre>
        </div>
    );
}

function Pipeline({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-xl border border-ink/10 bg-white p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:p-4", className)}>
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-ink">From code to production</p>
                <span className="flex items-center gap-1 text-[9px] text-ink/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5c8a00]" />
                    Production ready
                </span>
            </div>
            <ol className="mt-3 flex items-start justify-between gap-1">
                {steps.map((s, i) => (
                    <li key={s.title} className="flex flex-1 items-start">
                        <div className="flex flex-col items-center text-center">
                            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.05] text-ink">
                                <Icon icon={s.icon} size={14} />
                                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-ink">
                                    <Icon icon={Tick02Icon} size={8} strokeWidth={3} />
                                </span>
                            </span>
                            <span className="mt-1.5 text-[10px] font-semibold text-ink">{s.title}</span>
                            <span className="text-[8px] text-ink/60">{s.sub}</span>
                        </div>
                        {i < steps.length - 1 && <span className="mt-4 h-px flex-1 bg-ink/15" />}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export function HeroMockup({ className }: { className?: string }) {
    return (
        // Phones: the windows stack in normal flow, overlapping slightly. From md up they sit at fixed spots in a framed box.
        <div aria-hidden className={cn("relative w-full pt-7 md:aspect-[5/4] md:pt-0 lg:aspect-[7/6]", className)}>
            {/* Annotations */}
            <p className="enter-fade absolute left-[12%] top-0 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 md:block" style={{ ["--d" as string]: "700ms" } as React.CSSProperties}>
                Design → Build → Ship
            </p>
            <span
                className="enter-fade absolute right-0 top-0 z-20 flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink md:text-[11px]"
                style={{ ["--d" as string]: "600ms" } as React.CSSProperties}
            >
                <span className="h-2 w-2 rounded-full bg-ink" />
                Live build
            </span>
            <p
                className="enter-fade absolute -right-2 bottom-[-6%] hidden -rotate-6 font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-ink/70 lg:block"
                style={{ ["--d" as string]: "800ms" } as React.CSSProperties}
            >
                Real products
                <br />
                Real ownership
            </p>

            <Dashboard className="enter-fade relative md:absolute md:left-[8%] md:right-0 md:top-[9%]" />
            <CodeWindow className="enter-fade relative -mt-10 w-[76%] md:absolute md:bottom-[12%] md:left-0 md:mt-0 md:w-[46%]" />
            <Pipeline className="enter-fade hidden w-[52%] md:absolute md:bottom-0 md:right-0 md:block" />
        </div>
    );
}
