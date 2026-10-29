import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataProps {
    title: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
    canonical?: string;
    /** Small label above the title on the generated social image. */
    ogKicker?: string;
}

/** URL of the generated social-share image for a page (see src/app/og/route.tsx). */
export function ogImageUrl(title: string, kicker?: string) {
    const params = new URLSearchParams({ title });
    if (kicker) params.set("kicker", kicker);
    return `/og?${params.toString()}`;
}

export function constructMetadata({
    title,
    description = siteConfig.description,
    image,
    noIndex = false,
    canonical,
    ogKicker,
}: MetadataProps): Metadata {
    const siteUrl = siteConfig.url;
    const finalCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
    const imagePath = image ?? ogImageUrl(title, ogKicker);
    const imageUrl = imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;

    return {
        title: `${title} | ${siteConfig.name}`,
        description,
        alternates: {
            canonical: finalCanonical,
        },
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            url: finalCanonical || siteUrl,
            siteName: siteConfig.name,
            images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${siteConfig.name}`,
            description,
            images: [imageUrl],
            creator: "@stackwise",
        },
        robots: noIndex
            ? {
                  index: false,
                  follow: false,
                  nocache: true,
                  googleBot: {
                      index: false,
                      follow: false,
                  },
              }
            : {
                  index: true,
                  follow: true,
                  nocache: false,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-video-preview": -1,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                  },
              },
    };
}
