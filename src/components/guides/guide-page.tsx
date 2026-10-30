import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon, Calendar03Icon, Clock01Icon, Tick02Icon, UserIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Card, IconTile } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq-list";
import { Eyebrow, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { CaseStudyToc } from "@/components/work/case-study-toc";
import { RichText } from "@/components/guides/rich-text";
import type { Guide, GuideBlock } from "@/lib/guides/types";
import { formatDate, plainText, readingMinutes } from "@/lib/guides/text";
import { resolveLink, type SiteLink } from "@/lib/site-links";
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ogImageUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";

function Block({ block }: { block: GuideBlock }) {
    switch (block.type) {
        case "p":
            return (
                <p>
                    <RichText text={block.text} />
                </p>
            );
        case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
                <List className="space-y-3">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3.5">
                            {block.ordered ? (
                                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">{i + 1}</span>
                            ) : (
                                <Icon icon={Tick02Icon} size={20} strokeWidth={2} className="mt-1 flex-shrink-0 text-accent" />
                            )}
                            <span className="min-w-0">
                                <RichText text={item} />
                            </span>
                        </li>
                    ))}
                </List>
            );
        }
        case "table":
            return (
                // Wide tables scroll sideways inside their own box on phones instead of stretching the page.
                <div role="region" aria-label={block.caption ?? "Comparison table"} tabIndex={0} className="relative overflow-x-auto rounded-2xl bg-surface">
                    <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                        {block.caption && <caption className="px-5 pt-5 text-left text-sm font-medium text-white/60">{block.caption}</caption>}
                        <thead>
                            <tr>
                                {block.head.map((h) => (
                                    <th key={h} scope="col" className="border-b border-white/10 px-5 py-4 font-semibold text-white">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, r) => (
                                <tr key={r} className="border-b border-white/[0.06] last:border-0">
                                    {row.map((cell, c) =>
                                        c === 0 ? (
                                            <th key={c} scope="row" className="px-5 py-4 align-top font-medium text-white">
                                                <RichText text={cell} />
                                            </th>
                                        ) : (
                                            <td key={c} className="px-5 py-4 align-top text-white/70">
                                                <RichText text={cell} />
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case "callout":
            return (
                <aside className="rounded-2xl bg-accent p-6 text-black md:p-7">
                    <p className="text-base font-semibold">{block.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/75">{plainText(block.text)}</p>
                </aside>
            );
    }
}

function RelatedCard({ link }: { link: SiteLink }) {
    return (
        <Link href={link.path} className="group block h-full">
            <Card interactive className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                    <IconTile>
                        <Icon icon={link.icon} size={20} />
                    </IconTile>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-colors group-hover:bg-accent group-hover:text-black">
                        <Icon icon={ArrowUpRight01Icon} size={18} />
                    </span>
                </div>
                <p className="mt-8 text-xs font-medium uppercase tracking-wider text-white/45">{link.kind}</p>
                <h3 className="mt-1.5 text-lg font-semibold text-white">{link.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{link.summary}</p>
            </Card>
        </Link>
    );
}

/** A guide: the short answer first, then takeaways, the full write-up with a contents list, FAQs and related pages. */
export function GuidePage({ guide }: { guide: Guide }) {
    const related = guide.related.map(resolveLink).filter((l): l is SiteLink => Boolean(l));
    const minutes = readingMinutes(guide);

    return (
        <div className="relative">
            <JsonLd
                data={[
                    articleSchema({
                        title: guide.title,
                        description: guide.seo.description,
                        path: guide.path,
                        published: guide.published,
                        updated: guide.updated,
                        section: guide.category,
                        keywords: guide.keywords.slice(0, 25),
                        image: ogImageUrl(guide.seo.title, "Guide"),
                    }),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Guides", path: "/guides" },
                        { name: guide.seo.title, path: guide.path },
                    ]),
                    faqSchema(guide.faqs.map((f) => ({ q: f.q, a: plainText(f.a) }))),
                ]}
            />

            {/* ─── Header ─── */}
            <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: guide.category }]} />
                    <div className="max-w-4xl">
                        <Enter>
                            <Eyebrow>Guide · {guide.category}</Eyebrow>
                        </Enter>
                        <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl text-balance">
                            <WordReveal text={guide.title} immediate />
                        </h1>
                        <Enter delay={0.2} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                            <span className="flex items-center gap-2">
                                <Icon icon={UserIcon} size={16} className="text-accent" />
                                <a href={siteConfig.links.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
                                    {siteConfig.author}
                                </a>
                                , founder of {siteConfig.name}
                            </span>
                            <span className="flex items-center gap-2">
                                <Icon icon={Calendar03Icon} size={16} className="text-accent" />
                                Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
                            </span>
                            <span className="flex items-center gap-2">
                                <Icon icon={Clock01Icon} size={16} className="text-accent" />
                                {minutes} min read
                            </span>
                        </Enter>
                    </div>
                </div>
            </section>

            {/* ─── Short answer + takeaways ─── */}
            <section className="pb-14 md:pb-20" aria-label="Short answer">
                <div className="container mx-auto grid grid-cols-1 gap-4 px-5 sm:px-6 lg:grid-cols-12">
                    <Enter delay={0.25} className="lg:col-span-7">
                        <div id="short-answer" className="h-full rounded-3xl bg-accent p-7 text-black md:p-9">
                            <p className="text-sm font-semibold uppercase tracking-wider text-black/60">Short answer</p>
                            <p className="mt-4 text-lg font-medium leading-relaxed md:text-xl">{plainText(guide.answer)}</p>
                        </div>
                    </Enter>
                    <Enter delay={0.3} className="lg:col-span-5">
                        <div id="key-takeaways" className="h-full rounded-3xl bg-surface p-7 md:p-9">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/55">Key takeaways</h2>
                            <ul className="mt-5 space-y-4">
                                {guide.takeaways.map((t) => (
                                    <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                                        <Icon icon={Tick02Icon} size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-accent" />
                                        <span>
                                            <RichText text={t} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Enter>
                </div>
            </section>

            {/* ─── Write-up ─── */}
            <section className="pb-16 md:pb-24" aria-label="Guide">
                <div className="container mx-auto grid grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <aside className="lg:col-span-3">
                        <CaseStudyToc items={guide.sections.map((s) => ({ id: s.id, title: s.heading }))} />
                    </aside>
                    <article className="min-w-0 space-y-16 lg:col-span-9">
                        {guide.sections.map((s) => (
                            <Reveal key={s.id}>
                                <section id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-heading`}>
                                    <h2 id={`${s.id}-heading`} className="text-2xl font-semibold tracking-tight text-white md:text-3xl text-balance">
                                        {s.heading}
                                    </h2>
                                    <div className="mt-6 max-w-3xl space-y-6 text-[17px] leading-relaxed text-white/75 [overflow-wrap:anywhere] md:text-lg">
                                        {s.blocks.map((b, i) => (
                                            <Block key={i} block={b} />
                                        ))}
                                    </div>
                                </section>
                            </Reveal>
                        ))}

                        <Reveal className="flex flex-col items-start gap-4 rounded-3xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                            <div>
                                <p className="text-base font-semibold text-white">Want a number for your project?</p>
                                <p className="mt-1 text-sm text-white/55">Answer a few questions and get a starting price straight away, then a written quote.</p>
                            </div>
                            <QuoteButton label="Get a free quote" size="md" />
                        </Reveal>
                    </article>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-16 md:py-20" aria-label="Frequently asked questions">
                <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Questions people also ask</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/60">Something else? Ask in the chat and get an answer straight away.</p>
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-8">
                        <FaqList faqs={guide.faqs.map((f) => ({ q: f.q, a: plainText(f.a) }))} />
                    </Reveal>
                </div>
            </section>

            {related.length > 0 && (
                <section className="relative py-16 md:py-20" aria-label="Related">
                    <div className="container mx-auto px-5 sm:px-6">
                        <Reveal className="mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Keep reading</h2>
                        </Reveal>
                        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((l) => (
                                <StaggerItem key={l.path} className="h-full">
                                    <RelatedCard link={l} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            <CtaBand />
        </div>
    );
}
