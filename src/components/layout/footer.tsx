"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp01Icon, Github01Icon, Mail01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { useSectionNav } from "@/hooks/use-section-nav";
import { servicePages, solutionPages } from "@/lib/marketing-pages";
import { siteConfig } from "@/config/site";

const linkClass = "text-sm text-white/55 transition-colors hover:text-white";

function Column({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                {href ? <Link href={href} className="hover:text-white transition-colors">{title}</Link> : title}
            </h3>
            <ul className="space-y-3">{children}</ul>
        </div>
    );
}

export function Footer() {
    const goToSection = useSectionNav();

    return (
        <footer className="relative overflow-hidden border-t border-line bg-canvas" role="contentinfo">
            <div className="container mx-auto px-5 sm:px-6">
                {/* Links */}
                <div className="grid grid-cols-2 gap-10 pt-16 pb-14 md:grid-cols-4 lg:grid-cols-12">
                    <div className="col-span-2 md:col-span-4 lg:col-span-4">
                        <Link href="/" aria-label="StackWise home" className="group inline-block">
                            <Logo size="md" />
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                            A software studio by {siteConfig.author}. We design and build SaaS products, custom software and AI features.
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                            {[
                                { label: "StackWise on X", href: siteConfig.links.twitter, icon: NewTwitterIcon },
                                { label: "StackWise on GitHub", href: siteConfig.links.github, icon: Github01Icon },
                                { label: "Email StackWise", href: `mailto:${siteConfig.emails.inbound}`, icon: Mail01Icon },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white/60 transition-colors hover:border-line-strong hover:text-white"
                                >
                                    <Icon icon={s.icon} size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <Column title="Services" href="/services">
                            {servicePages.map((p) => (
                                <li key={p.path}>
                                    <Link href={p.path} className={linkClass}>{p.navLabel}</Link>
                                </li>
                            ))}
                        </Column>
                    </div>

                    <div className="lg:col-span-3">
                        <Column title="Solutions" href="/solutions">
                            {solutionPages.map((p) => (
                                <li key={p.path}>
                                    <Link href={p.path} className={linkClass}>{p.navLabel}</Link>
                                </li>
                            ))}
                        </Column>
                    </div>

                    <div className="lg:col-span-2">
                        <Column title="Company">
                            {[...siteConfig.navItems, { title: "Contact", id: "contact" }].map((item) => (
                                <li key={item.id}>
                                    <Link href={`/#${item.id}`} onClick={goToSection(item.id)} className={linkClass}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </Column>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                        >
                            Back to top
                            <Icon icon={ArrowUp01Icon} size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Oversized wordmark */}
            <div aria-hidden className="pointer-events-none select-none overflow-hidden">
                <p
                    className="whitespace-nowrap text-center leading-[0.75] text-white/[0.04] translate-y-[18%]"
                    style={{ fontFamily: "'Oughter', sans-serif", fontSize: "clamp(3rem, 13.5vw, 16rem)" }}
                >
                    STACKWISE
                </p>
            </div>
        </footer>
    );
}
