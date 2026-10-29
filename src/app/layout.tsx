import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ogImageUrl } from "@/lib/seo";
import { servicePages } from "@/lib/marketing-pages";
import { LayoutShell } from "@/components/layout/layout-shell";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "SaaS development company",
    "custom software development",
    "AI development services",
    "MVP development",
    "Next.js development agency",
    "web development studio India",
    "business automation software",
    "product engineering for startups",
  ],
  applicationName: siteConfig.name,
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: "technology",
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImageUrl(siteConfig.tagline, "Software Studio"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [ogImageUrl(siteConfig.tagline, "Software Studio")],
    creator: "@YashVibes1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// JSON-LD Schemas
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/web-app-manifest-512x512.png`,
  "email": siteConfig.emails.inbound,
  "description": siteConfig.description,
  "founder": { "@type": "Person", "name": siteConfig.author },
  "sameAs": [
    siteConfig.links.twitter,
    siteConfig.links.github,
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#service`,
  "name": `${siteConfig.name} Software Studio`,
  "image": `${siteConfig.url}/web-app-manifest-512x512.png`,
  "url": siteConfig.url,
  "email": siteConfig.emails.inbound,
  "priceRange": "₹₹₹",
  "parentOrganization": { "@id": `${siteConfig.url}/#organization` },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software development services",
    "itemListElement": servicePages.map((p) => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": p.navLabel, "url": `${siteConfig.url}${p.path}` },
    })),
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": siteConfig.location.city,
    "addressRegion": siteConfig.location.region,
    "addressCountry": siteConfig.location.countryCode,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Analytics Readiness */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Structured Schema Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-canvas text-foreground`}
        suppressHydrationWarning
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
