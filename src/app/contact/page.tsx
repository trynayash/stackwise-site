import React from "react";
import { Contact } from "@/components/sections/contact";
import { Breadcrumbs } from "@/components/marketing/marketing-page";
import { FaqList } from "@/components/ui/faq-list";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { faqs, type Faq } from "@/lib/faqs";
import { JsonLd, breadcrumbSchema, faqSchema, orgId } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
    title: "Contact Us: Free Quote in 24–48 Hours",
    description:
        "Contact StackWise, a software development company in Mumbai. Get a free, fixed quote for your website, app or SaaS within 24–48 hours by chat or email.",
    canonical: "/contact",
    ogKicker: "Contact",
});

const shared = (start: string) => faqs.find((f) => f.q.startsWith(start));

const contactFaqs: Faq[] = [
    {
        q: "How quickly will you reply?",
        a: "Within 24–48 hours on working days, by email, or on WhatsApp if you add a number in the chat. The reply comes from the team that would build your project, with questions, a rough scope and a starting price.",
    },
    {
        q: "Is the first call free?",
        a: "Yes. The consultation call is free and there is no commitment. After it you get a written quote with a fixed price and a timeline.",
    },
    {
        q: "What should I include in my message?",
        a: "What you want to build, who it is for, any deadline and a rough budget if you have one. Links to sites or apps you like help too. You don't need a full specification.",
    },
    {
        q: "Do you work with clients outside Mumbai?",
        a: "Yes. We work remotely with clients across India and abroad, and can meet in person in Mumbai by arrangement. Calls are scheduled at a time that suits both time zones.",
    },
    ...[shared("Do you sign NDAs"), shared("How do you communicate")].filter((f): f is Faq => Boolean(f)),
];

export default function ContactPage() {
    return (
        <div className="relative">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Contact", path: "/contact" },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        name: "Contact StackWise",
                        url: `${siteConfig.url}/contact`,
                        about: { "@id": orgId },
                    },
                    faqSchema(contactFaqs),
                ]}
            />

            <div className="container mx-auto px-5 pt-28 sm:px-6 md:pt-36">
                <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
            </div>
            <Contact headingAs="h1" className="pt-2 md:pt-4" />

            <section className="relative pb-20 md:pb-28" aria-label="Contact questions">
                <div className="container mx-auto px-5 sm:px-6">
                    <SectionHeader eyebrow="Before you write" title="Common questions." />
                    <Reveal className="max-w-3xl">
                        <FaqList faqs={contactFaqs} />
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
