import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { JsonLd, siteGraph } from "@/lib/schema";
import { servicePages } from "@/lib/marketing-pages";
import { LayoutShell } from "@/components/layout/layout-shell";
import { navLinks } from "@/lib/all-pages";
import Script from "next/script";

// Self-hosted (Latin + Latin Extended, includes ₹), so builds never depend on Google Fonts being reachable.
const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-Variable.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
  display: "swap",
});

// Wordmark font: next/font preloads it, so the logo paints in its final face without a late swap. It only
// sets "STACKWISE" and the "S" mark, so the web copy is cut down to capital letters (the full .otf stays for
// the share image).
const oughter = localFont({
  src: "../fonts/Oughter-Caps.woff2",
  variable: "--font-oughter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: "technology",
  authors: [{ name: siteConfig.author, url: siteConfig.links.portfolio }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: siteConfig.homeTitle,
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    images: ["/og"],
    creator: "@YashVibes1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search console ownership tags, set as environment variables in Vercel.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const siteSchema = siteGraph({ services: servicePages.map((p) => ({ name: p.navLabel, path: p.path })) });

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
        
        {/* Site-wide structured data: studio, founder, website and services as one linked graph */}
        <JsonLd data={siteSchema} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${oughter.variable} font-sans antialiased bg-canvas text-foreground`}
        suppressHydrationWarning
      >
        <LayoutShell links={navLinks()}>{children}</LayoutShell>
      </body>
    </html>
  );
}
