import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Rocket, Target, Users, Zap, ShieldAlert, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
    title: "SaaS & Product Development for Startups",
    description: "Speed-to-market solutions that secure seed funding. Handing over clean, modular code architectures that attract CTOs.",
    canonical: "/solutions/startups",
});

const features = [
    {
        icon: Rocket,
        title: "Seed-Round Tech Stack",
        description: "Modular, strictly typed Next.js and TypeScript structures. Easy for future developers to read, inherit, and scale."
    },
    {
        icon: Zap,
        title: "Speed to Market",
        description: "Kick off coding within 48 hours of design approvals. Focus on core user loops to deploy within weeks."
    },
    {
        icon: Users,
        title: "Pitch-Ready Prototypes",
        description: "Clickable Figma designs and live sandbox environments to show investors and early adopters."
    },
    {
        icon: ShieldAlert,
        title: "Risk Mitigation",
        description: "Zero lock-ins. You own 100% of the repository, source code assets, database setups, and accounts."
    },
    {
        icon: Target,
        title: "Iterative Scoping",
        description: "Flexible sprints. Shift feature requirements dynamically as user feedback comes in without heavy penalties."
    },
    {
        icon: Award,
        title: "Advisory Engineering Support",
        description: "We help interview future in-house developers and hand over detailed system architecture blueprints."
    }
];

export default function StartupsSolutionPage() {
    return (
        <main className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80vw] h-[400px] bg-[#C8FF00]/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <Link href="/#portfolio" className="inline-flex items-center text-white/40 hover:text-[#b6ff00] transition-colors mb-12 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <div className="mb-16">
                    <span className="px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-[11px] font-mono uppercase tracking-wider">
                        Startup Labs
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mt-6 mb-8">
                        Scale-Ready Engineering<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">For Fast-Growing Startups.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                        Startups need more than a mock website. They need stable, clean, and modular code assets that establish client trust and impress sophisticated technical evaluators. We build seed-round ready SaaS products and AI integrations designed for execution.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {features.map((feat) => (
                        <div key={feat.title} className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C8FF00]/25 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-full bg-[#C8FF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#C8FF00]/20 transition-all">
                                <feat.icon size={20} className="text-[#C8FF00]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                            <p className="text-white/45 text-sm leading-relaxed">{feat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="p-8 md:p-12 rounded-3xl bg-[#0d0d0d] border border-white/[0.06] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#C8FF00]/[0.01] pointer-events-none" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Code Your Product Core Right</h3>
                    <p className="text-white/35 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                        Have a design prototype or PRD document ready? Let&apos;s map out your startup development plan and configure a robust backend.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 rounded-full">
                                Request Startup Estimate
                                <ArrowUpRight size={16} className="ml-1" />
                            </Button>
                        </Link>
                        <a href={`mailto:${siteConfig.emails.inbound}`} className="inline-flex items-center text-white/50 hover:text-white text-sm font-medium transition-colors">
                            Or Email Us Directly
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
