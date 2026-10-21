import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Shield, Layers, Zap, CreditCard, Cpu, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
    title: "SaaS Development Services",
    description: "Scale-ready custom software products, dashboards, authentication, database migrations, billing configurations, and modern web applications.",
    canonical: "/services/saas-development",
});

const features = [
    {
        icon: Layers,
        title: "Multi-Tenant Architecture",
        description: "Secure data isolation, dynamic tenant routing, and customizable workspaces for user isolation."
    },
    {
        icon: Shield,
        title: "Secure Authentication & RBAC",
        description: "MFA support, session tracking, and role-based permissions."
    },
    {
        icon: CreditCard,
        title: "Payments & Subscriptions",
        description: "Seamless integration with Stripe or Razorpay for subscriptions, recurring invoices, and credit balance management."
    },
    {
        icon: Cpu,
        title: "Performance Dashboards",
        description: "Sub-200ms real-time data widgets, reporting tables, interactive charts, and PDF export modules."
    },
    {
        icon: Server,
        title: "Cloud Infrastructure (AWS)",
        description: "Auto-scaling containers, secure databases, Redis caching layers, and zero-downtime CI/CD build scripts."
    },
    {
        icon: Zap,
        title: "Deterministic Web Speed",
        description: "Next.js dynamic edge caching, optimized hydration steps, and clean client-side JS bundles."
    }
];

export default function SaasDevelopmentPage() {
    return (
        <main className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80vw] h-[400px] bg-[#C8FF00]/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <Link href="/#services" className="inline-flex items-center text-white/40 hover:text-[#C8FF00] transition-colors mb-12 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Services
                </Link>

                <div className="mb-16">
                    <span className="px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-[11px] font-mono uppercase tracking-wider">
                        SaaS Engineering
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mt-6 mb-8">
                        Enterprise-Grade<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">SaaS Development.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                        We design, engineer, and deploy high-performance Software-as-a-Service applications. From initial architecture blueprints to secure API scaling and multitenant infrastructure pipelines — we write clean, asset-grade code built to scale.
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
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Launch Your Custom SaaS Product</h3>
                    <p className="text-white/35 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                        Need a custom dashboard, secure subscriptions, or automated workflows? Let&apos;s architect a platform that drives real business efficiency and product growth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 rounded-full">
                                Book Architecture Discovery
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
