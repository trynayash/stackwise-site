"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

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

    const [email, setEmail] = React.useState("");
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
            <div className="container mx-auto px-6 relative z-10">

                {/* Top Section: Newsletter & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-24 border-b border-white/10">

                    {/* Left Column: Subscribe (4 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full border-r-0 lg:border-r border-white/10 pr-0 lg:pr-12">
                        <div className="max-w-md">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Subscribe</h3>
                            <p className="text-white/60 text-lg mb-8 font-light">
                                Join our newsletter to stay up to date on features and releases.
                            </p>
                            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent border-b border-white/20 py-4 pr-32 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-[#C8FF00] transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-2 bg-transparent text-xs font-bold text-[#C8FF00] border border-[#C8FF00]/30 rounded-full hover:bg-[#C8FF00] hover:text-black transition-all uppercase tracking-wider"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-16 text-xs text-white/30 font-mono uppercase tracking-wider">
                            <p>&copy; {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</p>
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Right Columns: Links (8 cols) */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
                        {/* Column 1: Explore */}
                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Explore</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#services" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo("services")}>
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#portfolio" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo("portfolio")}>
                                        Work
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Company */}
                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Company</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#why-stackwise" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo("why-stackwise")}>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo("pricing")}>
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#contact" className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1" onClick={scrollTo("contact")}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Connect */}
                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8">Connect</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: "Twitter", href: siteConfig.links.twitter },
                                    { name: "LinkedIn", href: siteConfig.links.linkedin },
                                    { name: "GitHub", href: siteConfig.links.github }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/60 hover:text-[#C8FF00] text-sm transition-colors block py-1"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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
