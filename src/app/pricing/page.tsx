import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon, MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq-list";
import { Eyebrow, Reveal, SectionHeader, Stagger, StaggerItem, WordReveal } from "@/components/ui/motion-primitives";
import { Enter } from "@/components/ui/enter";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { QuoteButton } from "@/components/marketing/quote-button";
import { CtaBand } from "@/components/sections/cta-band";
import { Pricing } from "@/components/sections/pricing";
import { marketingPageList } from "@/lib/marketing-pages";
import { approxUsd, planComparison, priceFactors, priceReasons, pricingFaqs } from "@/lib/pricing";
import { resolveLink, type SiteLink } from "@/lib/site-links";
import { JsonLd, breadcrumbSchema, faqSchema, rupees } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
    title: "Pricing: SaaS, Web App & Website Development",
    description: "Websites from ₹34,999 and SaaS products from ₹98,999, with a fixed written quote before work starts. Compare plans and see starting prices for every service.",
    canonical: "/pricing",
    ogKicker: "Pricing",
});

const fact = (path: string, label: string) => marketingPageList.find((p) => p.path === path)?.facts.find((f) => f.label === label)?.value;

/** Every service, solution and technology page with its own starting price and timeline, so the list never drifts. */
const servicePrices = marketingPageList
    .filter((p) => p.kind === "Services" || p.kind === "Solutions" || p.kind === "Technologies")
    .map((p) => ({ path: p.path, name: p.navLabel, kind: p.kind, price: fact(p.path, "Starting at") ?? "Custom quote", timeline: fact(p.path, "Typical timeline") }));

const guidePaths = ["/guides/saas-development-cost-india", "/guides/website-development-cost-india", "/guides/mvp-development-cost"];

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
    if (value === "yes")
        return (
            <>
                <Icon icon={Tick02Icon} size={20} strokeWidth={2} className={highlight ? "text-accent sm:text-black" : "text-accent"} />
                <span className="sr-only">Included</span>
            </>
        );
    if (value === "no")
        return (
            <>
                <Icon icon={MinusSignIcon} size={18} className={highlight ? "text-white/30 sm:text-black/40" : "text-white/30"} />
                <span className="sr-only">Not included</span>
            </>
        );
    return <span>{value}</span>;
}

export default function PricingPage() {
    const plans = siteConfig.pricing;
    const guidesToRead = guidePaths.map(resolveLink).filter((l): l is SiteLink => Boolean(l));

    return (
        <div className="relative">
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Software development",
                        serviceType: "SaaS, web application and website development",
                        url: `${siteConfig.url}/pricing`,
                        provider: { "@id": `${siteConfig.url}/#organization` },
                        areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: "StackWise plans",
                            itemListElement: plans.map((p) => ({
                                "@type": "Offer",
                                name: p.title,
                                description: p.description,
                                url: `${siteConfig.url}/pricing`,
                                ...(rupees(p.price) ? { priceSpecification: { "@type": "PriceSpecification", minPrice: rupees(p.price), priceCurrency: "INR" } } : {}),
                            })),
                        },
                    },
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Pricing", path: "/pricing" },
                    ]),
                    faqSchema(pricingFaqs),
                ]}
            />

            {/* ─── Header ─── */}
            <section className="relative overflow-hidden pt-28 pb-4 md:pt-36 md:pb-8">
                <div className="container relative mx-auto px-5 sm:px-6">
                    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />
                    <Enter>
                        <Eyebrow>Pricing</Eyebrow>
                    </Enter>
                    <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl text-balance">
                        <WordReveal text="Software development pricing," immediate /> <WordReveal text="clear up front." immediate delay={0.15} className="text-accent" />
                    </h1>
                    <Enter delay={0.25} className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-2xl text-lg leading-relaxed text-white/60">
                            Websites from ₹34,999 and SaaS products from ₹98,999. Every project gets a fixed, written quote before any work starts. No hourly billing, no
                            surprise invoices, and you own all of the code.
                        </p>
                        <QuoteButton label="Get my price" />
                    </Enter>
                </div>
            </section>

            <Pricing standalone />

            {/* ─── Compare plans ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="compare-plans">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="Compare plans" title="What each plan includes." />
                    <Reveal>
                        {/* Phones: one card per feature listing the three plans. Wider screens: the full table. */}
                        <div role="region" aria-label="Plan comparison" tabIndex={0} className="relative rounded-3xl bg-surface sm:overflow-x-auto">
                            <table className="w-full border-collapse text-left text-[15px] sm:min-w-[720px]">
                                <caption className="sr-only">Starter Build, Product Build and Scale plans compared</caption>
                                <thead className="max-sm:sr-only">
                                    <tr>
                                        <th scope="col" className="w-[30%] px-6 py-5 text-sm font-medium text-white/55">
                                            Plan
                                        </th>
                                        {plans.map((p) => (
                                            <th key={p.title} scope="col" className={p.highlight ? "bg-accent px-6 py-5 text-black" : "px-6 py-5 text-white"}>
                                                <span className="block text-lg font-semibold">{p.title}</span>
                                                <span className={p.highlight ? "text-sm text-black/65" : "text-sm text-white/55"}>
                                                    {p.price === "Custom" ? "Custom quote" : `From ${p.price.replace("+", "")}`}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {planComparison.map((row) => (
                                        <tr key={row.feature} className="block border-t border-white/[0.06] px-5 py-4 first:border-t-0 sm:table-row sm:border-t sm:p-0">
                                            <th scope="row" className="block pb-2 text-base font-semibold text-white sm:table-cell sm:px-6 sm:py-4 sm:text-[15px] sm:font-medium sm:text-white/80">
                                                {row.feature}
                                            </th>
                                            {row.values.map((v, i) => (
                                                <td
                                                    key={i}
                                                    data-label={plans[i].title}
                                                    className={cn(
                                                        "flex items-center justify-between gap-6 py-1.5 text-right text-white/70 before:text-left before:text-sm before:text-white/50 before:content-[attr(data-label)] sm:table-cell sm:px-6 sm:py-4 sm:text-left sm:before:content-none",
                                                        plans[i].highlight && "sm:bg-accent/[0.92] sm:text-black/80"
                                                    )}
                                                >
                                                    <Cell value={v} highlight={plans[i].highlight} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── Prices by service ─── */}
            <section className="relative py-16 md:py-24" aria-labelledby="service-prices">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader
                        eyebrow="Every service"
                        title="Starting prices by service."
                        description="Figures come straight from each service page. Anything marked custom is quoted after a free discovery call, usually within 48 hours."
                    />
                    <Reveal>
                        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-3xl bg-surface">
                            {servicePrices.map((s) => (
                                <li key={s.path}>
                                    <Link
                                        href={s.path}
                                        className="group grid grid-cols-1 gap-1 px-6 py-5 transition-colors hover:bg-surface-2 sm:grid-cols-12 sm:items-center sm:gap-4"
                                    >
                                        <span className="flex items-center gap-2 text-base font-semibold text-white sm:col-span-5">
                                            {s.name}
                                            <Icon
                                                icon={ArrowUpRight01Icon}
                                                size={16}
                                                className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                                            />
                                        </span>
                                        <span className="text-sm text-white/50 sm:col-span-2">{s.kind.replace(/s$/, "")}</span>
                                        <span className="text-[15px] text-white/70 sm:col-span-2">{s.timeline ?? "Scoped after discovery"}</span>
                                        <span className="text-[15px] font-semibold text-white sm:col-span-3 sm:text-right">
                                            {s.price === "Custom quote" ? "Custom quote" : `From ${s.price}`}
                                            {approxUsd(s.price) && <span className="block text-xs font-normal text-white/50">{approxUsd(s.price)}</span>}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ─── Why it costs less ─── */}
            <section className="relative py-16 md:py-24" aria-label="Why our prices are lower">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader
                        eyebrow="Why it costs less"
                        title="Agency-quality work without agency overheads."
                        description="Lower prices come from how the studio is run, not from cutting corners on code, testing or security."
                    />
                    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {priceReasons.map((r, i) => (
                            <StaggerItem key={r.title} className="h-full">
                                <Card className="h-full p-7">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
                                    <h3 className="mt-7 text-lg font-semibold text-white">{r.title}</h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{r.text}</p>
                                </Card>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── What affects the price ─── */}
            <section className="relative py-16 md:py-24" aria-label="What affects the price">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="Your quote" title="What moves the price up or down." />
                    <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {priceFactors.map((f) => (
                            <StaggerItem key={f.title} className="h-full">
                                <Card className="h-full p-7">
                                    <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{f.text}</p>
                                </Card>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="relative py-16 md:py-24" aria-label="Pricing questions">
                <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Pricing questions</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/60">Want a number for your own project? The chat gives you a starting price in about a minute.</p>
                        <QuoteButton label="Get my price" size="md" variant="secondary" className="mt-6" />
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-8">
                        <FaqList faqs={pricingFaqs} />
                    </Reveal>
                </div>
            </section>

            {guidesToRead.length > 0 && (
                <section className="relative py-16 md:py-20" aria-label="Cost guides">
                    <div className="container mx-auto px-5 sm:px-6">
                        <Reveal className="mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Cost guides</h2>
                        </Reveal>
                        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {guidesToRead.map((g) => (
                                <StaggerItem key={g.path} className="h-full">
                                    <Link href={g.path} className="group block h-full">
                                        <Card interactive className="flex h-full flex-col p-6">
                                            <p className="text-xs font-medium uppercase tracking-wider text-white/45">Guide</p>
                                            <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{g.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-white/55">{g.summary}</p>
                                        </Card>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            <CtaBand title="Get a written quote for your project" subtitle="Tell us what you're building. You'll get a starting price straight away and a written quote within 24–48 hours." />
        </div>
    );
}
