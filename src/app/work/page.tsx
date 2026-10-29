import React from "react";
import { allWork } from "@/lib/more-work";
import { constructMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { Eyebrow, SectionHeader, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { WorkGrid } from "@/components/work/work-card";
import { ProofGrid } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = constructMetadata({
    title: "Case Studies — SaaS, AI & Web Projects",
    description: "Case studies of SaaS, AI and web products built by StackWise: LimitYourAPI, ScopeCI, StartupDeckAI, CodeFusionAI, PromptP and more.",
    canonical: "/work",
    ogKicker: "Work",
});

export default function WorkPage() {
    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Work", path: "/work" },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: allWork.map((s, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `${siteConfig.url}/work/${s.slug}`,
                            name: s.name,
                        })),
                    },
                ]}
            />

            <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work" }]} />
                    <Enter>
                        <Eyebrow>Work</Eyebrow>
                    </Enter>
                    <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text="Products we've built" immediate /> <WordReveal text="and shipped." immediate delay={0.15} className="text-accent" />
                    </h1>
                    <Enter delay={0.25}>
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
                            Real products that people use. Each case study covers the problem, the architecture and the trade-offs, so you can judge the
                            engineering as well as the screenshots.
                        </p>
                    </Enter>
                </div>
            </section>

            <section className="pb-8" aria-label="Case studies">
                <div className="container mx-auto px-5 sm:px-6">
                    <h2 className="sr-only">All case studies</h2>
                    <WorkGrid studies={allWork} priorityFirst />
                </div>
            </section>

            <section className="relative py-20 md:py-28" aria-label="Proof">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="Proof" title="Things you can check for yourself." />
                    <ProofGrid />
                </div>
            </section>
            <CtaBand />
        </div>
    );
}
