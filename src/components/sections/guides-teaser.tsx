import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { guideBySlug } from "@/lib/guides";
import { readingMinutes } from "@/lib/guides/text";

/** The guides buyers ask about most, linked from the home page. A server component, so no guide text ships to the browser. */
const featured = ["saas-development-cost-india", "website-development-cost-india", "how-to-choose-a-saas-development-company"];

export function GuidesTeaser() {
    const list = featured.map((slug) => guideBySlug[slug]).filter(Boolean);
    if (list.length === 0) return null;

    return (
        <section className="relative py-16 md:py-24" aria-label="Guides">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="Guides"
                    title="Straight answers before you ask."
                    action={
                        <ButtonLink href="/guides" variant="secondary" arrow="right">
                            All guides
                        </ButtonLink>
                    }
                />
                <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {list.map((g) => (
                        <StaggerItem key={g.slug} className="h-full">
                            <Link
                                href={g.path}
                                className="group flex h-full flex-col rounded-3xl bg-surface p-7 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-surface-2"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="flex items-center gap-1.5 text-sm text-white/55">
                                        <Icon icon={Clock01Icon} size={15} />
                                        {readingMinutes(g)} min read
                                    </span>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-colors group-hover:bg-accent group-hover:text-black">
                                        <Icon icon={ArrowUpRight01Icon} size={18} />
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-white text-balance">{g.title}</h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{g.summary}</p>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
