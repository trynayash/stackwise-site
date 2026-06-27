import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Shield, LayoutGrid, Code2, Users2, Database, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
    title: "SaaS MVP Development & Rapid Prototyping Solutions",
    description: "Accelerated prototyping without architectural compromise. Build the core product right from day one.",
    canonical: "/solutions/mvp-development",
});

const features = [
    {
        icon: LayoutGrid,
        title: "Lean Feature Scoping",
        description: "Filter out vanity features. Focus 100% of effort on the core product loop that users pay for."
    },
    {
        icon: Code2,
        title: "No-Debt Coding",
        description: "Even when shipping fast, we write modular React components, clean schemas, and type-safe API routing."
    },
    {
        icon: Database,
        title: "Scale-Ready Database Architecture",
        description: "PostgreSQL or MongoDB tables mapped to support millions of queries when you hit product-market fit."
    },
    {
        icon: Users2,
        title: "User Onboarding Flows",
        description: "Frictionless email/social authentication, role setups, and custom customer workspaces by default."
    },
    {
        icon: Rocket,
        title: "CI/CD Deployment Pipelines",
        description: "Deploy to production from day one. Staging environments to review features on every Git pull request."
    },
    {
        icon: Shield,
        title: "Secure Payment Hooks",
        description: "Pre-integrated billing models (subscriptions, usage pricing) utilizing Stripe or Razorpay API schemas."
    }
];

export default function MvpDevelopmentPage() {
    return (
        <main className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80vw] h-[400px] bg-[#C8FF00]/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <Link href="/#portfolio" className="inline-flex items-center text-white/40 hover:text-[#C8FF00] transition-colors mb-12 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <div className="mb-16">
                    <span className="px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-[11px] font-mono uppercase tracking-wider">
                        Accelerated Build
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mt-6 mb-8">
                        SaaS MVP Development<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">Without Technical Debt.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                        Shipping fast doesn&apos;t mean cutting corners. We build production-ready Minimum Viable Products using robust, modern stacks (Next.js, TypeScript, PostgreSQL) so your codebase is an asset, not a rewrite, for your future dev team.
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
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Validate Your Idea With Elite Engineering</h3>
                    <p className="text-white/35 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                        Ready to transform your wireframes or logic steps into a secure, functional web application? Let&apos;s build your core.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 rounded-full">
                                Book MVP Scoping Call
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
