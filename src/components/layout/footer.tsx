"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useInquiry } from "@/components/providers/inquiry-context";
import { marketingPageList } from "@/lib/marketing-pages";

export function Footer() {
    const pathname = usePathname();
    const router = useRouter();

    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === "/") {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push("/#" + id);
        }
    };

    const { openInquiry } = useInquiry();
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Animation controls for the footer logo
    const [animationPhase, setAnimationPhase] = React.useState<"idle" | "color" | "explode" | "return">("idle");

    // Particle interface
    type Particle = {
        id: number;
        x: number;
        y: number;
        size: number;
        color: string;
        rotation: number;
    };

    const [particles, setParticles] = React.useState<Particle[]>([]);

    const handleLogoClick = () => {
        if (!isMobile || animationPhase !== "idle") return;

        // Phase 1: Reveal Color
        setAnimationPhase("color");

        // Phase 2: Explode (after short delay to show color)
        setTimeout(() => {
            // Generate particles
            const newParticles: Particle[] = [];
            const colors = ["#C8FF00", "#ffffff", "#3d6600"];
            for (let i = 0; i < 40; i++) {
                newParticles.push({
                    id: i,
                    x: (Math.random() - 0.5) * 600, // Wider spread
                    y: (Math.random() - 0.5) * 600,
                    size: Math.random() * 12 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                });
            }
            setParticles(newParticles);
            setAnimationPhase("explode");
        }, 600);

        // Phase 3: Return (reassemble)
        setTimeout(() => {
            setAnimationPhase("return");
        }, 2200);

        // Reset to idle
        setTimeout(() => {
            setAnimationPhase("idle");
            setParticles([]);
        }, 3500);
    };

    const logoVariants = {
        idle: {
            x: 0, y: 0, opacity: 1, rotate: 0, scale: 1,
            color: "rgba(255, 255, 255, 0.2)", // Grayscale/Dimmed
            filter: "blur(0px)",
            transition: { duration: 0.5 }
        },
        color: (isStack: boolean) => ({
            color: isStack ? "#C8FF00" : "#ffffff", // Neon for Stack, White for Wise
            scale: 1.05,
            filter: "drop-shadow(0 0 10px rgba(200, 255, 0, 0.5))",
            transition: { duration: 0.4 }
        }),
        explode: () => ({
            x: (Math.random() - 0.5) * 800,
            y: (Math.random() - 0.5) * 800,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
            scale: 0,
            filter: "blur(4px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }),
        return: {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            color: "rgba(255, 255, 255, 0.2)", // Return to gray
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as const }
        }
    };

    return (
        <footer className="relative bg-[#050505] pt-20 md:pt-32 pb-10 overflow-hidden border-t border-white/5" role="contentinfo">
            <div className="container mx-auto px-5 sm:px-6 relative z-10">

                {/* Top Section: CTA & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">

                    {/* Left Column: Start a project */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div className="max-w-md">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Start a project</h3>
                            <p className="text-white/70 text-2xl md:text-3xl mb-8 font-semibold leading-tight tracking-tight">
                                Have an idea? Let&apos;s turn it into <span className="text-[#C8FF00]">software you own.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                                <button
                                    onClick={openInquiry}
                                    className="btn-shine group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C8FF00] px-6 text-sm font-bold text-black hover:bg-[#d4ff33] transition-colors cursor-pointer"
                                >
                                    Get a free quote
                                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                                <a
                                    href={`mailto:${siteConfig.emails.inbound}`}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-white/70 hover:text-white hover:border-white/30 transition-colors"
                                >
                                    <Mail size={15} />
                                    Email us
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12 text-xs text-white/30 font-mono uppercase tracking-wider">
                            <p>&copy; {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</p>
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Right Columns: Links */}
                    <nav aria-label="Footer" className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
                        {(["Services", "Solutions"] as const).map((kind) => (
                            <div key={kind}>
                                <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
                                    <Link href={`/${kind.toLowerCase()}`} className="hover:text-[#C8FF00] transition-colors">{kind}</Link>
                                </h3>
                                <ul className="space-y-3">
                                    {marketingPageList.filter((p) => p.kind === kind).map((p) => (
                                        <li key={p.path}>
                                            <Link href={p.path} className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1">{p.navLabel}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Company</h3>
                            <ul className="space-y-3">
                                {[
                                    { id: "portfolio", label: "Work" },
                                    { id: "pricing", label: "Pricing" },
                                    { id: "founder", label: "About" },
                                    { id: "faq", label: "FAQ" },
                                    { id: "contact", label: "Contact" },
                                ].map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/#${item.id}`} className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo(item.id)}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Connect</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: "Twitter", href: siteConfig.links.twitter },
                                    { name: "GitHub", href: siteConfig.links.github },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a href={`mailto:${siteConfig.emails.inbound}`} className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1">Email</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Bottom Section: Massive Brand Name */}
                <div className="pt-24 pb-8 flex justify-center">
                    <div
                        className="relative cursor-pointer md:cursor-default select-none overflow-visible"
                        onClick={handleLogoClick}
                    >
                        {/* Shockwave for impact */}
                        {animationPhase === "explode" && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-[10px] border-[#C8FF00] blur-md pointer-events-none"
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 5, opacity: 0, borderWidth: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        )}

                        {/* Explosion Particles */}
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                                style={{
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                                animate={{
                                    x: particle.x,
                                    y: particle.y,
                                    opacity: 0,
                                    scale: 0,
                                    rotate: particle.rotation
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                }}
                            />
                        ))}

                        <h1
                            className="text-[14vw] leading-[0.8] font-medium tracking-tight text-center flex items-center justify-center gap-[0.5vw]"
                            style={{ fontFamily: "'Oughter', sans-serif" }}
                        >
                            {"STACK".split("").map((char, i) => (
                                <motion.span
                                    key={`stack-${i}`}
                                    className="inline-block relative mix-blend-normal"
                                    variants={logoVariants}
                                    initial="idle"
                                    animate={animationPhase}
                                    custom={true} // Custom prop to indicate it is "Stack" part
                                    style={{ display: "inline-block" }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            {"WISE".split("").map((char, i) => (
                                <motion.span
                                    key={`wise-${i}`}
                                    className="inline-block relative mix-blend-normal"
                                    variants={logoVariants}
                                    initial="idle"
                                    animate={animationPhase}
                                    custom={false} // Custom prop to indicate it is "Wise" part (not Stack)
                                    style={{ display: "inline-block" }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    );
}
