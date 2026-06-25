import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataProps {
    title: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
    canonical?: string;
}

export function constructMetadata({
    title,
    description = siteConfig.description,
    image = "/stackwise-icon-square.svg",
    noIndex = false,
    canonical,
}: MetadataProps): Metadata {
    const siteUrl = siteConfig.url;
    const finalCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

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
            images: [
                {
                    url: image.startsWith("http") ? image : `${siteUrl}${image}`,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${siteConfig.name}`,
            description,
            images: [image.startsWith("http") ? image : `${siteUrl}${image}`],
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
