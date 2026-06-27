"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInquiry } from "@/components/providers/inquiry-context";

// Parallax Mountain Vista Layers Config
const layersData = [
  { className: 'layer-6', speed: '120s', size: '480px', zIndex: 1, image: '6', bottom: '-80px' },
  { className: 'layer-5', speed: '95s',  size: '620px', zIndex: 1, image: '5', bottom: '-100px' },
  { className: 'layer-4', speed: '75s',  size: '850px', zIndex: 1, image: '4', bottom: '-120px' },
  { className: 'bike-1',  speed: '10s',  size: '130px', zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '60px', noRepeat: true },
  { className: 'bike-2',  speed: '15s',  size: '130px', zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '60px', noRepeat: true },
  { className: 'layer-3', speed: '55s',  size: '320px', zIndex: 3, image: '3', bottom: '-50px' },
  { className: 'layer-2', speed: '30s',  size: '300px', zIndex: 4, image: '2', bottom: '-40px' },
  { className: 'layer-1', speed: '20s',  size: '280px', zIndex: 5, image: '1', bottom: '-30px' },
];

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const { openInquiry } = useInquiry();

    // Generate dynamic CSS for each parallax layer
    const dynamicStyles = useMemo(() => {
        return layersData
            .map(layer => {
                const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650/${layer.image}.png`;
                return `
                    .${layer.className} {
                        background-image: url(${url});
                        animation-duration: ${layer.speed};
                        background-size: auto ${layer.size};
                        z-index: ${layer.zIndex};
                        ${layer.animation ? `animation-name: ${layer.animation};` : ''}
                        ${layer.bottom ? `bottom: ${layer.bottom};` : ''}
                        ${layer.noRepeat ? 'background-repeat: no-repeat;' : ''}
                    }
                `;
            })
            .join('\n');
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 pb-10 px-6"
            aria-label="Hero"
            style={{ background: "#060606" }}
        >
            {/* Inject dynamic layer styles */}
            <style>{dynamicStyles}</style>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .parallax-layer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-position: 0 bottom;
                    background-repeat: repeat-x;
                    animation-name: parallax_scroll;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                    pointer-events: none;
                }
                .bike-1, .bike-2 {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                    pointer-events: none;
                }
                @keyframes parallax_scroll {
                    from { background-position: 0 bottom; }
                    to { background-position: -2000px bottom; }
                }
                @keyframes parallax_bike {
                    0% { background-position: -100px bottom; }
                    100% { background-position: 2000px bottom; }
                }
            `}</style>

            {/* Background Layer 1: Base radial grid aura */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 30%, #081008 0%, #070707 50%, #060606 100%)",
                }}
            />

            {/* Background Layer 2: Grid Lines */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)",
                }}
            />

            {/* Mountain Parallax Layers Background */}
            <div className="absolute inset-0 overflow-hidden z-[2] select-none pointer-events-none">
                {layersData.map(layer => (
                    <div
                        key={layer.className}
                        className={`parallax-layer ${layer.className}`}
                    />
                ))}
            </div>

            {/* Parallax Content Wrapper */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center justify-start text-center max-w-7xl w-full animate-fade-in"
            >
                {/* Aside Announcement Badge */}
                <aside className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm max-w-full">
                    <span className="text-xs text-center whitespace-nowrap text-white/50">
                        StackWise V2: Software Engineering & Labs is Live
                    </span>
                    <a
                        href="#portfolio"
                        onClick={scrollToSection("portfolio")}
                        className="flex items-center gap-1 text-xs hover:text-white transition-all active:scale-95 whitespace-nowrap text-[#C8FF00] font-mono font-medium"
                        aria-label="Read our engineering labs"
                    >
                        Explore Labs
                        <ArrowRight size={12} className="text-[#C8FF00]" />
                    </a>
                </aside>

                {/* Main Headline */}
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5.2rem] font-bold tracking-tight text-center max-w-5xl px-6 leading-[1.05] mb-5"
                    style={{
                        background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.45))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.04em"
                    }}
                >
                    <span className="block sm:whitespace-nowrap">Give your custom software</span>
                    <span className="block">the codebase it deserves.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-center max-w-xl px-6 mb-8 text-white/50 leading-relaxed font-light">
                    Premium software engineering studio designing and building production-grade SaaS, custom software systems, and AI-powered products with zero technical debt.
                </p>

                {/* Call To Actions */}
                <div className="flex items-center gap-4 relative z-10 mb-12">
                    <button
                        onClick={openInquiry}
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 bg-gradient-to-b from-[#C8FF00] via-[#C8FF00]/95 to-[#9EFF00]/80 text-black px-8 h-13 text-base shadow-[0_0_30px_rgba(200,255,0,0.2)] hover:shadow-[0_0_50px_rgba(200,255,0,0.4)] cursor-pointer"
                        aria-label="Start Your Project"
                    >
                        Start Your Project
                    </button>
                    <button
                        onClick={scrollToSection("services")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all hover:bg-white/5 text-white/80 hover:text-white px-8 h-13 text-base border border-white/10 cursor-pointer"
                        aria-label="Explore our Services"
                    >
                        Explore Services
                    </button>
                </div>

                {/* Dashboard Showcase Frame */}
                <div className="w-full max-w-4xl relative pb-10 px-6">
                    <div
                        className="absolute left-1/2 w-[90%] pointer-events-none z-0"
                        style={{
                            top: "-23%",
                            transform: "translateX(-50%)"
                        }}
                        aria-hidden="true"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://i.postimg.cc/Ss6yShGy/glows.png"
                            alt=""
                            className="w-full h-auto"
                            loading="eager"
                        />
                    </div>
                    
                    <div className="relative z-10 border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)] p-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/hero_Product_img.png"
                            alt="Product Image"
                            className="w-full h-auto rounded-lg shadow-2xl border border-white/[0.04]"
                            loading="eager"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Edge fade gradient transition */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
                style={{
                    background: "linear-gradient(to top, #060606 0%, transparent 100%)",
                }}
            />
        </section>
    );
}
