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
}: {
    name: string;
    description: string;
    path: string;
    serviceType: string;
    /** Starting price in INR, when the page states one. */
    startingPrice?: number;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        url: `${siteConfig.url}${path}`,
        provider: { "@id": orgId },
        areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
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
                address,
                founder: { "@id": personId },
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
                priceRange: "₹₹₹",
                address,
                areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
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
