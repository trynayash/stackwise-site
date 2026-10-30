import { siteConfig } from "@/config/site";
import type { Faq } from "@/lib/faqs";

const orgId = `${siteConfig.url}/#organization`;

export function faqSchema(faqs: Faq[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
}

/** An article (used for guides), authored by the founder and published by the studio. */
export function articleSchema({
    title,
    description,
    path,
    published,
    updated,
    section,
    keywords,
    image,
}: {
    title: string;
    description: string;
    path: string;
    published: string;
    updated: string;
    section: string;
    keywords: string[];
    image: string;
}) {
    const url = `${siteConfig.url}${path}`;
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
        datePublished: published,
        dateModified: updated,
        inLanguage: "en-IN",
        articleSection: section,
        keywords: keywords.join(", "),
        author: { "@type": "Person", "@id": `${siteConfig.url}/#founder`, name: siteConfig.author, url: siteConfig.links.portfolio },
        publisher: { "@id": orgId },
        // The short answer and takeaways are the parts written to be read aloud or quoted by assistants.
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#short-answer", "#key-takeaways"] },
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${siteConfig.url}${item.path}`,
        })),
    };
}

/** "₹1,49,999" → 149999; anything that isn't a rupee amount (e.g. "Custom quote") → undefined. */
export function rupees(value: string | undefined) {
    const m = value?.match(/^₹\s*([\d,]+)/);
    return m ? Number(m[1].replace(/,/g, "")) : undefined;
}

export function serviceSchema({
    name,
    description,
    path,
    serviceType,
    startingPrice,
    areaServed,
}: {
    name: string;
    description: string;
    path: string;
    serviceType: string;
    /** Starting price in INR, when the page states one. */
    startingPrice?: number;
    /** Countries the page is about; defaults to India and worldwide. */
    areaServed?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        url: `${siteConfig.url}${path}`,
        provider: { "@id": orgId },
        areaServed: areaServed?.length
            ? areaServed.map((name) => ({ "@type": name === siteConfig.location.city ? "City" : "Country", name }))
            : [{ "@type": "Country", name: "India" }, "Worldwide"],
        ...(startingPrice
            ? {
                  offers: {
                      "@type": "Offer",
                      url: `${siteConfig.url}${path}`,
                      priceSpecification: { "@type": "PriceSpecification", minPrice: startingPrice, priceCurrency: "INR" },
                  },
              }
            : {}),
    };
}

/**
 * Site-wide entities in one linked graph: the studio, its founder, the website and the service listing.
 * Rendered once in the root layout; pages reference these by @id.
 */
export function siteGraph({ services }: { services: { name: string; path: string }[] }) {
    const { url, name, author, location, links, emails } = siteConfig;
    const personId = `${url}/#founder`;
    const address = {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.region,
        addressCountry: location.countryCode,
    };
    const logo = { "@type": "ImageObject", url: `${url}/web-app-manifest-512x512.png`, width: 512, height: 512 };
    // Topics the studio is an entity for: helps search and answer engines connect it to these queries.
    const knowsAbout = [
        "SaaS development", "SaaS product development", "MVP development", "Custom software development", "Web application development",
        "Website development", "Next.js development", "React development", "Node.js development", "Go development", "TypeScript",
        "AI development", "LLM integration", "Retrieval-augmented generation", "AI agents", "Mobile app development", "React Native",
        "UI/UX design", "Cloud and DevOps", "AWS", "PostgreSQL", "Redis", "Stripe integration", "Razorpay integration",
        "Multi-tenant architecture", "API development", "Business process automation", "Software modernization",
        "White-label development for agencies", "Fintech software", "Healthcare software", "Edtech platforms", "E-commerce development",
    ];
    const areaServed = ["India", "United States", "United Kingdom", "United Arab Emirates", "Australia", "Canada", "Singapore"].map((n) => ({ "@type": "Country", name: n }));

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": orgId,
                name,
                url,
                logo,
                email: emails.inbound,
                description: siteConfig.description,
                slogan: siteConfig.tagline,
                address,
                founder: { "@id": personId },
                foundingLocation: { "@type": "Place", name: `${location.city}, ${location.country}` },
                areaServed,
                knowsAbout,
            },
            {
                "@type": "Person",
                "@id": personId,
                name: author,
                jobTitle: "Founder & Lead Engineer",
                worksFor: { "@id": orgId },
                url: links.portfolio,
                address,
                sameAs: [links.portfolio, links.github, links.twitter, links.orcid, links.devto],
                knowsAbout: ["SaaS development", "Next.js", "React", "TypeScript", "Node.js", "Go", "Redis", "PostgreSQL", "AI integration", "Rate limiting"],
            },
            {
                "@type": "WebSite",
                "@id": `${url}/#website`,
                url,
                name,
                description: siteConfig.description,
                inLanguage: "en-IN",
                publisher: { "@id": orgId },
            },
            {
                "@type": "ProfessionalService",
                "@id": `${url}/#studio`,
                name: `${name} Software Studio`,
                url,
                image: logo.url,
                email: emails.inbound,
                priceRange: "₹34,999 – ₹98,999+",
                address,
                areaServed,
                knowsAbout,
                founder: { "@id": personId },
                parentOrganization: { "@id": orgId },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Software development services",
                    itemListElement: services.map((s) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: s.name, url: `${url}${s.path}` },
                    })),
                },
            },
        ],
    };
}

export function JsonLd({ data }: { data: object | object[] }) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is escaped for "<" so content can't close the script tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
