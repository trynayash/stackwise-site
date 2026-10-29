import React from "react";
import { caseStudies } from "@/lib/case-studies";
import { allWork } from "@/lib/more-work";
import { constructMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { Eyebrow, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { MoreWork, ShowcasePanel } from "@/components/sections/portfolio";
import { Proof } from "@/components/sections/proof";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = constructMetadata({
    title: "Our Work — Case Studies",
    description: "Case studies of SaaS, AI and web products designed and engineered by StackWise — LimitYourAPI, ScopeCI, StartupDeckAI, CodeFusionAI, PromptP and this website — with architecture, trade-offs and lessons.",
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
                <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work" }]} />
                    <Reveal y={12}>
                        <Eyebrow>Work</Eyebrow>
                    </Reveal>
                    <h1 className="mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text="Products we've designed" immediate /> <WordReveal text="and engineered." immediate delay={0.15} className="text-white/40" />
                    </h1>
                    <Reveal delay={0.25}>
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
                            Each case study covers the problem, the constraints, the architecture and the trade-offs — so you can judge the engineering, not just the
                            screenshots.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="pb-8" aria-label="Case studies">
                <div className="container mx-auto px-5 sm:px-6">
                    <Stagger className="space-y-5">
                        {caseStudies.map((s, i) => (
                            <StaggerItem key={s.slug}>
                                <ShowcasePanel study={s} index={i} total={caseStudies.length} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                    <MoreWork className="mt-16 md:mt-20" />
                </div>
            </section>

            <Proof />
            <CtaBand />
        </div>
    );
}
