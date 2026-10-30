"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { InquiryProvider, useInquiry } from "@/components/providers/inquiry-context";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteLinksProvider } from "@/components/providers/site-links";
import type { NavLinks } from "@/lib/all-pages";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import dynamic from "next/dynamic";

// The quote chat drawer loads the first time someone opens it, not on every page view.
const QuoteDrawer = dynamic(() => import("@/components/quote/quote-drawer").then((m) => m.QuoteDrawer), { ssr: false });

function LazyQuoteDrawer() {
    const { isOpen } = useInquiry();
    const [requested, setRequested] = React.useState(false);
    if (isOpen && !requested) setRequested(true);
    return requested ? <QuoteDrawer /> : null;
}

export function LayoutShell({ children, links }: { children: React.ReactNode; links: NavLinks }) {
    const footerRef = React.useRef<HTMLDivElement>(null);
    const [footerVisible, setFooterVisible] = React.useState(false);

    // Hide the phone quote bar once the footer (which has its own CTA) is on screen.
    React.useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.05 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <SiteLinksProvider links={links}>
            <InquiryProvider>
                <MotionConfig reducedMotion="user">
                    <SmoothScroll>
                        <a
                            href="#main"
                            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
                        >
                            Skip to content
                        </a>
                        <Navbar />

                        <main id="main" className="relative flex min-h-screen flex-col">
                            {children}
                        </main>

                        <div ref={footerRef}>
                            <Footer />
                        </div>

                        <MobileCtaBar hidden={footerVisible} />
                        <LazyQuoteDrawer />
                    </SmoothScroll>
                </MotionConfig>
            </InquiryProvider>
        </SiteLinksProvider>
    );
}
