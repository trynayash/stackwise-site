import React from "react";
import Link from "next/link";
import { ArrowRight01Icon, Clock01Icon, CodeIcon, Invoice01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Eyebrow, Reveal, SectionHeader, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { ProofGrid } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";
import { servicePages } from "@/lib/marketing-pages";
import { locationPageList } from "@/lib/all-pages";
import { JsonLd, breadcrumbSchema, orgId } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "About Us: Software Development Team in Mumbai",
    description:
        "StackWise is a software development team in Mumbai building SaaS products, web apps and websites at fixed prices, in weeks. See how we work.",
    canonical: "/about",
    ogKicker: "About",
});

/** What every client gets, whatever the project. Each must match the terms stated on the pricing page and in the FAQs. */
const promises = [
    {
        icon: Invoice01Icon,
        title: "A fixed price, in writing",
        text: "You get a written quote for an agreed scope before any work starts. No hourly billing, and small additions under 10% of the scope are absorbed.",
    },
    {
        icon: Clock01Icon,
        title: "Weeks, not months",
        text: "Websites in 2–3 weeks, MVPs in 4–8 and SaaS products in 8–12, with milestone dates in your quote.",
    },
    {
        icon: UserGroupIcon,
        title: "One team, start to finish",
        text: "The team that scopes your project designs, builds and launches it, so nothing is lost in hand-offs.",
    },
    {
        icon: CodeIcon,
        title: "You own everything",
        text: "The code, designs, documentation and every account are yours at handover. No licences and no lock-in.",
    },
];

export default function AboutPage() {
    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "About StackWise",
                        url: `${siteConfig.url}/about`,
                        about: { "@id": orgId },
                    },
                ]}
            />

            {/* ─── Header ─── */}
            <section className="relative overflow-hidden pt-28 pb-4 md:pt-36 md:pb-8">
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
                    <Enter>
                        <Eyebrow>About StackWise</Eyebrow>
                    </Enter>
                    <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text="A software team in Mumbai" immediate /> <WordReveal text="that ships in weeks." immediate delay={0.15} className="text-accent" />
                    </h1>
                    <Enter delay={0.25} className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-2xl text-lg leading-relaxed text-white/60">
                            StackWise designs and builds SaaS products, web apps, AI features and websites for startups and businesses in India and abroad. We
                            keep the team small on purpose: the people who scope your project design, build and launch it, at a fixed price and on dates
                            agreed before work starts.
                        </p>
                        <QuoteButton />
                    </Enter>
                </div>
            </section>

            {/* ─── Promises ─── */}
            <section className="relative py-16 md:py-24" aria-label="How we work">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="How we work" title="Four promises on every project." />
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {promises.map((p) => (
                            <StaggerItem key={p.title} className="h-full">
                                <Card className="h-full p-7">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-black">
                                        <Icon icon={p.icon} size={20} />
                                    </span>
                                    <h2 className="mt-7 text-lg font-semibold text-white">{p.title}</h2>
                                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.text}</p>
                                </Card>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── What we build, and where ─── */}
            <section className="relative py-16 md:py-24" aria-label="What we build">
                <div className="container mx-auto grid grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-7">
                        <Eyebrow>What we build</Eyebrow>
                        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Products, platforms and websites.</h2>
                        <ul className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                            {servicePages.map((p) => (
                                <li key={p.path}>
                                    <Link href={p.path} className="group flex items-center justify-between gap-6 py-4">
                                        <span className="min-w-0">
                                            <span className="block text-[15px] font-medium text-white group-hover:text-accent">{p.navLabel}</span>
                                            <span className="mt-0.5 block text-sm text-white/50">{p.summary}</span>
                                        </span>
                                        <Icon icon={ArrowRight01Icon} size={18} className="flex-shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.1} className="lg:col-span-5">
                        <Eyebrow>Where we work</Eyebrow>
                        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">From Mumbai, for clients anywhere.</h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                            We are based in {siteConfig.location.city} and work remotely with clients across India and abroad, with calls at a time that suits
                            both time zones. Clients in Mumbai can meet us in person by arrangement.
                        </p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {locationPageList.map((p) => (
                                <li key={p.path}>
                                    <Link
                                        href={p.path}
                                        className="inline-flex items-center rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white"
                                    >
                                        {p.navLabel}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ─── Proof ─── */}
            <section className="relative py-16 md:py-24" aria-label="Proof">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="Proof" title="Things you can check for yourself." />
                    <ProofGrid />
                </div>
            </section>

            <Testimonials />
            <CtaBand />
        </div>
    );
}
