import React from "react";
import Link from "next/link";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ArrowBubble } from "@/components/ui/card";
import { Tilt } from "@/components/ui/interactive";
import {
  Eyebrow,
  Reveal,
  Stagger,
  StaggerItem,
  WordReveal,
} from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { guides, type Guide } from "@/lib/guides";
import { readingMinutes } from "@/lib/guides/text";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: "Guides: SaaS & Software Development Costs",
  description:
    "Straight answers on what SaaS products, MVPs and websites cost in India, how long they take, and how to choose and work with a development partner.",
  canonical: "/guides",
  ogKicker: "Guides",
});

const categories: Guide["category"][] = [
  "Pricing",
  "Planning",
  "Hiring",
  "Engineering",
];

const categoryIntro: Record<Guide["category"], string> = {
  Pricing: "What things cost, and why",
  Planning: "Timelines and scope",
  Hiring: "Choosing and working with a partner",
  Engineering: "Technical decisions, explained",
};

export default function GuidesPage() {
  return (
    <div className="relative">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: guides.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}${g.path}`,
              name: g.title,
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container relative mx-auto px-5 sm:px-6">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Guides" }]}
          />
          <Enter>
            <Eyebrow>Guides</Eyebrow>
          </Enter>
          <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
            <WordReveal text="Straight answers on" immediate />{" "}
            <WordReveal
              text="building software."
              immediate
              delay={0.15}
              className="text-accent"
            />
          </h1>
          <Enter
            delay={0.25}
            className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="max-w-2xl text-lg leading-relaxed text-white/60">
              What a SaaS product, MVP or website really costs, how long it
              takes, and how to pick the right people to build it. Written by{" "}
              {siteConfig.author}, who builds them for a living.
            </p>
            <QuoteButton />
          </Enter>
        </div>
      </section>

      <section className="relative pb-16 md:pb-24" aria-label="All guides">
        <div className="container mx-auto space-y-16 px-5 sm:px-6">
          {categories.map((cat) => {
            const list = guides.filter((g) => g.category === cat);
            if (list.length === 0) return null;
            return (
              <div key={cat}>
                <Reveal className="mb-6 flex items-baseline justify-between gap-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {cat}
                  </h2>
                  <p className="hidden text-sm text-white/55 sm:block">
                    {categoryIntro[cat]}
                  </p>
                </Reveal>
                <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((g) => (
                    <StaggerItem key={g.slug} className="h-full">
                      <Tilt max={4} className="h-full">
                        <Link
                          href={g.path}
                          className="group flex h-full flex-col rounded-3xl bg-surface p-7 transition-colors duration-300 hover:bg-surface-2"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex items-center gap-1.5 text-sm text-white/55">
                              <Icon icon={Clock01Icon} size={15} />
                              {readingMinutes(g)} min read
                            </span>
                            <ArrowBubble size="sm" />
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-white text-balance">
                            {g.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                            {g.summary}
                          </p>
                        </Link>
                      </Tilt>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
