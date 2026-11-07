"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown01Icon, ArrowUp01Icon, Github01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { BookCallLink } from "@/components/ui/book-call";
import { useInquiry } from "@/components/providers/inquiry-context";
import { useNavLink } from "@/hooks/use-section-nav";
import { useSiteLinks } from "@/components/providers/site-links";
import { siteConfig } from "@/config/site";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const linkClass = "link-draw inline-flex min-h-8 items-center text-sm text-white/55 transition-colors hover:text-white";

/** Phones show this many guides until the visitor asks for the rest; every guide link is in the HTML either way. */
const GUIDES_ON_PHONES = 6;

function Heading({ title, href }: { title: string; href?: string }) {
    return (
        <h3 className="mb-3 text-sm font-semibold text-white">
            {href ? (
                <Link href={href} className="transition-colors hover:text-accent">
                    {title}
                </Link>
            ) : (
                title
            )}
        </h3>
    );
}

function Column({ title, href, links }: { title: string; href?: string; links: { path: string; label: string }[] }) {
    return (
        <div>
            <Heading title={title} href={href} />
            <ul>
                {links.map((l) => (
                    <li key={l.path}>
                        <Link href={l.path} className={linkClass}>
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Site footer, in four bands split by hairlines:
 * 1. the studio on the left, ways to get in touch on the right;
 * 2. link columns for services, solutions, technologies, industries, locations and the company pages;
 * 3. every guide, in CSS columns that always sit exactly on the link columns above: 2 and 2 on tablets,
 *    3 and 3 on laptops, then 6 link columns with each guide column spanning two of them from xl;
 * 4. copyright, legal links, GitHub and back to top.
 */
export function Footer() {
    const navLink = useNavLink();
    const { openInquiry } = useInquiry();
    const { services, solutions, technologies, industries, locations, guides } = useSiteLinks();
    const [allGuides, setAllGuides] = useState(false);

    const pages = (list: { path: string; navLabel: string }[]) => list.map((p) => ({ path: p.path, label: p.navLabel }));
    const company = [...siteConfig.navItems, { title: "Guides", href: "/guides" }, { title: "Contact", href: "/contact" }];

    return (
        <footer className="relative overflow-hidden rounded-t-[2rem] bg-surface md:rounded-t-[3rem]" role="contentinfo">
            <div className="container mx-auto px-5 sm:px-6">
                {/* 1. Studio and contact */}
                <div className="grid grid-cols-1 gap-10 pb-12 pt-16 md:pb-14 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
                    <div className="lg:col-span-6">
                        <Link href="/" aria-label="StackWise home" className="inline-flex min-h-11 items-center">
                            <Logo size="md" />
                        </Link>
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                            A software studio based in {siteConfig.location.city}. Our team designs and builds SaaS products, custom software and AI features
                            for clients in India and abroad.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 lg:col-span-6 lg:items-end">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button variant="primary" arrow="up-right" onClick={() => openInquiry()} className="w-full sm:w-auto">
                                Get a free quote
                            </Button>
                            <BookCallLink source="footer" size="md" className="w-full sm:w-auto" />
                        </div>
                        <a
                            href={`mailto:${siteConfig.emails.inbound}`}
                            className="inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-medium text-white/70 transition-colors hover:text-white lg:self-end"
                        >
                            <Icon icon={Mail01Icon} size={17} />
                            {siteConfig.emails.inbound}
                        </a>
                    </div>
                </div>

                {/* 2. Pages */}
                <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line py-12 md:py-14 lg:grid-cols-3 xl:grid-cols-6">
                    <Column title="Services" href="/services" links={pages(services)} />
                    <Column title="Solutions" href="/solutions" links={pages(solutions)} />
                    <Column title="Technologies" href="/technologies" links={pages(technologies)} />
                    <Column title="Industries" href="/industries" links={industries} />
                    <Column title="Where we work" href="/locations" links={locations} />
                    <div>
                        <Heading title="Company" />
                        <ul>
                            {company.map((item) => (
                                <li key={item.title}>
                                    <Link {...navLink(item)} className={linkClass}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* 3. Guides: CSS columns with the same gap as the grid above, so the column edges line up with it at every width */}
                <div className="border-t border-line py-12 md:py-14">
                    <Heading title="Guides" href="/guides" />
                    <ul className="gap-x-8 sm:columns-2 lg:columns-3">
                        {guides.map((l, i) => (
                            <li key={l.path} className={cn("break-inside-avoid", !allGuides && i >= GUIDES_ON_PHONES && "max-sm:hidden")}>
                                <Link href={l.path} className={cn(linkClass, "py-1.5 leading-snug")}>
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {!allGuides && guides.length > GUIDES_ON_PHONES && (
                        <button
                            type="button"
                            onClick={() => setAllGuides(true)}
                            className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-semibold text-white sm:hidden"
                        >
                            Show all {guides.length} guides
                            <Icon icon={ArrowDown01Icon} size={16} />
                        </button>
                    )}
                </div>

                {/* 4. Legal */}
                <div className="flex flex-col gap-3 border-t border-line py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                    <div className="-ml-3 flex flex-wrap items-center sm:ml-0 sm:-mr-3">
                        <Link href="/privacy" className="inline-flex min-h-11 items-center px-3 transition-colors hover:text-white">
                            Privacy
                        </Link>
                        <Link href="/terms" className="inline-flex min-h-11 items-center px-3 transition-colors hover:text-white">
                            Terms
                        </Link>
                        <a
                            href="https://github.com/trynayash/stackwise-site"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 px-3 transition-colors hover:text-white"
                        >
                            <Icon icon={Github01Icon} size={16} />
                            GitHub
                        </a>
                        <button
                            type="button"
                            onClick={() => scrollToTarget(0)}
                            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 px-3 transition-colors hover:text-white"
                        >
                            Back to top
                            <Icon icon={ArrowUp01Icon} size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
