"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { InquiryProvider } from "@/components/providers/inquiry-context";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { InquiryModal } from "@/components/project-inquiry/inquiry-modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function LayoutShell({ children }: { children: React.ReactNode }) {
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
        <InquiryProvider>
            <MotionConfig reducedMotion="user">
                <SmoothScroll>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
                    >
                        Skip to content
                    </a>
                    <ScrollProgress />
                    <Navbar />

                    <main id="main" className="relative flex min-h-screen flex-col">
                        {children}
                    </main>

                    <div ref={footerRef}>
                        <Footer />
                    </div>

                    <MobileCtaBar hidden={footerVisible} />
                    <InquiryModal />
                </SmoothScroll>
            </MotionConfig>
        </InquiryProvider>
    );
}
