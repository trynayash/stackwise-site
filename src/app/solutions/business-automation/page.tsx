import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Shield, Calendar, BarChart3, Database, Workflow, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
    title: "Business Automation & Workflow Engineering Solutions",
    description: "Replacing friction and spreadsheets with automated software portals, internal operational tools, and integrated dashboard metrics.",
    canonical: "/solutions/business-automation",
});

const features = [
    {
        icon: Workflow,
        title: "Operational Workflows",
        description: "Map human processes into software rules. Automated notification triggers, role approvals, and status synchronizations."
    },
    {
        icon: Database,
        title: "Legacy Database Syncs",
        description: "Connect isolated spreadsheets, local SQL databases, and SaaS tools under a unified, real-time data layer."
    },
    {
        icon: BarChart3,
        title: "Centralized Dashboard Reports",
        description: "Get real-time insights into inventory levels, sales metrics, or operational logs on a single visual dashboard."
    },
    {
        icon: Calendar,
        title: "Task Scheduler Automations",
        description: "Configure automated PDF invoices, weekly Slack summaries, data backups, and report dispatches."
    },
    {
        icon: Cpu,
        title: "Low-Code/No-Code Bridges",
        description: "Clean custom API scripts that connect Webflow, Bubble, or Airtable to your core SQL or Go backend infrastructures."
    },
    {
        icon: Shield,
        title: "Secure Client Portals",
        description: "Provide clients, vendors, and staff specific access views with strict row-level security permissions."
    }
];

export default function BusinessAutomationPage() {
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
                        Operational Flow
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mt-6 mb-8">
                        Automated Systems<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">For Operational Speed.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                        Manual admin processes leak hours and money. We write custom API scripts, database connectors, and secure web dashboards to eliminate operations friction and spreadsheets completely.
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
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Eliminate Manual Operations Friction</h3>
                    <p className="text-white/35 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                        Describe your core bottlenecks or show us your current spreadsheets. Let&apos;s talk and map out an automation pipeline.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 rounded-full">
                                Book Automation Analysis
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
