"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/components/providers/loading-context";
import { InquiryProvider } from "@/components/providers/inquiry-context";
import { Background } from "@/components/ui/background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { GlassDock, type DockItem } from "@/components/ui/glass-dock";
import { InquiryModal } from "@/components/project-inquiry/inquiry-modal";
import { AnimatePresence, motion } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import { cn } from "@/lib/utils";
import {
    Home,
    Briefcase,
    FolderOpen,
    CreditCard,
    Users,
    Mail,
} from "lucide-react";

const dockItems: DockItem[] = [
    { title: "Home", icon: Home, href: "#hero" },
    { title: "Services", icon: Briefcase, href: "#services" },
    { title: "Work", icon: FolderOpen, href: "#portfolio" },
    { title: "Pricing", icon: CreditCard, href: "#pricing" },
    { title: "About", icon: Users, href: "#why-stackwise" },
    { title: "Contact", icon: Mail, href: "#contact" },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const { isLoading, setLoadingDone } = useLoading();
    const footerRef = React.useRef<HTMLDivElement>(null);
    const [hideDock, setHideDock] = React.useState(false);
    const [scrolledPastHero, setScrolledPastHero] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideDock(entry.isIntersecting);
            },
            { threshold: 0.1 } // Start hiding as soon as footer nudges in
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, [isLoading]); // Re-run when loading finishes and footer mounts

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setScrolledPastHero(true);
            } else {
                setScrolledPastHero(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDockNav = (href: string) => {
        if (pathname === "/") {
            const id = href.replace("#", "");
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push("/" + href);
        }
    };

    const dockItemsWithClick: DockItem[] = dockItems.map((item) => ({
        ...item,
        onClick: () => handleDockNav(item.href!),
        href: undefined,
    }));

    return (
        <InquiryProvider>
        <SmoothScroll>
            {/* The preloader overlay - human visual block on initial entry */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[100]"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <RevealLoader
                            text="STACKWISE"
                            textSize="clamp(48px, 10vw, 120px)"
                            textColor="#C8FF00"
                            bgColors={["#060606", "#1a1a00", "#0d0d0a"]}
                            angle={135}
                            staggerOrder="center-out"
                            movementDirection="top-down"
                            textFadeDelay={0.4}
                            onComplete={setLoadingDone}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* We render background, navbar, footer, and children immediately for SEO indexability */}
            <div className={cn("transition-opacity duration-700", isLoading ? "opacity-0 pointer-events-none" : "opacity-100")}>
                <Background />
                <Navbar />

                <main className="relative z-10 flex min-h-screen flex-col">
                    {children}
                </main>

                <div ref={footerRef}>
                    <Footer />
                </div>

                {/* Glass Dock — fixed bottom center, desktop only */}
                <div
                    className={cn(
                        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ease-in-out",
                        (hideDock || !scrolledPastHero) ? "translate-y-[200%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
                    )}
                >
                    <GlassDock items={dockItemsWithClick} />
                </div>
            </div>

            {/* Project Inquiry Modal */}
            <InquiryModal />
        </SmoothScroll>
        </InquiryProvider>
    );
}
