import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { CaseStudyToc } from "@/components/work/case-study-toc";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const pages = [
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms of Service" },
] as const;

/** Plain text of a React tree, enough to estimate reading time. */
function textOf(node: React.ReactNode): string {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join(" ");
    if (React.isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
    return "";
}

/**
 * Reading layout for policy pages: the dates and reading time up top, a plain-English summary before the
 * full text, a contents list that follows the reader, and numbered sections set in a measure that is easy
 * to read. Body copy is styled by the `.legal` rules in globals.css.
 */
export function LegalPage({
    path,
    title,
    lede,
    updated,
    effective = updated,
    summary,
    sections,
}: {
    path: (typeof pages)[number]["path"];
    title: string;
    lede: string;
    updated: string;
    effective?: string;
    /** Three or four one-line points that say what the page means in practice. */
    summary: string[];
    sections: LegalSection[];
}) {
    const words = sections.reduce((n, s) => n + textOf(s.body).split(/\s+/).filter(Boolean).length, 0);
    const minutes = Math.max(1, Math.round(words / 200));
    const other = pages.find((p) => p.path !== path)!;
    const email = siteConfig.emails.inbound;

    return (
        <div className="relative pt-28 pb-24 md:pt-36">
            <div className="container mx-auto px-5 sm:px-6">
                <div className="max-w-3xl">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title }]} />
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">Legal</p>
                    <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">{title}</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 text-pretty md:text-xl">{lede}</p>
                </div>

                {/* Which document, and when it applies */}
                <div className="mt-10 flex flex-col gap-5 border-y border-white/10 py-5 md:flex-row md:items-center md:justify-between">
                    <nav aria-label="Legal documents" className="flex gap-1 rounded-full bg-white/[0.06] p-1 self-start">
                        {pages.map((p) => {
                            const current = p.path === path;
                            return (
                                <Link
                                    key={p.path}
                                    href={p.path}
                                    aria-current={current ? "page" : undefined}
                                    className={cn(
                                        "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors",
                                        current ? "bg-white text-black" : "text-white/65 hover:text-white"
                                    )}
                                >
                                    {p.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                        <div className="flex gap-2">
                            <dt>Updated</dt>
                            <dd className="text-white">{updated}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt>Effective</dt>
                            <dd className="text-white">{effective}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt>Reading time</dt>
                            <dd className="text-white">{minutes} min</dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    <aside className="lg:col-span-3">
                        <CaseStudyToc items={sections.map(({ id, title }) => ({ id, title }))} />
                    </aside>

                    <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                        {/* The gist, before the full text */}
                        <section aria-labelledby="in-short" className="rounded-3xl bg-surface p-6 md:p-8">
                            <h2 id="in-short" className="text-lg font-semibold text-white">
                                In short
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {summary.map((line) => (
                                    <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                                        <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 text-sm text-white/55">This summary is a guide. The full text below is what applies.</p>
                        </section>

                        <div className="legal mt-4">
                            {sections.map((s, i) => (
                                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-28 border-t border-white/10 py-10 first:border-t-0 md:py-12">
                                    <div className="flex gap-5">
                                        <span aria-hidden className="pt-1 font-mono text-xs text-white/55">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <h2 id={`${s.id}-heading`}>{s.title}</h2>
                                            {s.body}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Where to go next */}
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col rounded-3xl bg-surface p-6 md:p-7">
                                <p className="text-lg font-semibold text-white">Questions about this page?</p>
                                <p className="mt-2 text-[15px] leading-relaxed text-white/60">Email Yash directly. Replies within 24–48 hours on working days.</p>
                                <ButtonLink href={`mailto:${email}`} variant="secondary" size="md" arrow={false} className="mt-6 self-start">
                                    <Icon icon={Mail01Icon} size={18} />
                                    {email}
                                </ButtonLink>
                            </div>
                            <Link href={other.path} className="group flex flex-col rounded-3xl bg-surface p-6 transition-colors hover:bg-surface-2 md:p-7">
                                <p className="text-sm text-white/50">Also read</p>
                                <p className="mt-2 text-lg font-semibold text-white">{other.label}</p>
                                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-white">
                                    Open
                                    <Icon icon={ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
