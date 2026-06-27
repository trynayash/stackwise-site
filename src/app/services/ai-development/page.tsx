import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Cpu, Zap, Eye, Database, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
    title: "AI Development Services",
    description: "Intelligent agentic integrations, LLM workflows, custom automated pipelines, vector databases, and cognitive web integrations.",
    canonical: "/services/ai-development",
});

const features = [
    {
        icon: Brain,
        title: "LLM Orchestrations",
        description: "Custom prompting layers, model fine-tuning adapters, and integration with OpenAI, Anthropic, and open-source models."
    },
    {
        icon: Sparkles,
        title: "Agentic Workflows",
        description: "Autonomous software agents that execute tasks, coordinate multi-step workflows, and interface with external tool APIs."
    },
    {
        icon: Database,
        title: "Vector Databases & RAG",
        description: "Retrieval-Augmented Generation using Pinecone, pgvector, or Milvus to reference your proprietary documents securely."
    },
    {
        icon: Zap,
        title: "Cognitive Pipelines",
        description: "Real-time unstructured data classification, semantic searches, automated email summaries, and text parsing."
    },
    {
        icon: Eye,
        title: "Visual AI & Pose Estimation",
        description: "Custom models training using TensorFlow and PyTorch for posture detection, video analytics, and layout indexing."
    },
    {
        icon: Cpu,
        title: "AI Core Optimizations",
        description: "Low-latency inference caching, quantized model setups, and optimized hardware container orchestration."
    }
];

export default function AiDevelopmentPage() {
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
                        AI Orchestration
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.05] mt-6 mb-8">
                        Custom AI Systems &<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] to-[#9EFF00]">Cognitive Workflows.</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                        We build production-ready artificial intelligence integrations. No generic wrappers — we architect robust custom pipelines, Vector semantic databases, and self-improving agents designed to automate complex business workflows.
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
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Engineer Intelligent Product Infrastructures</h3>
                    <p className="text-white/35 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                        Looking to automate data processing, implement semantic queries, or build an agentic application? Let&apos;s map out an AI integration strategy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/#contact">
                            <Button variant="primary" className="h-12 px-8 rounded-full">
                                Book AI Discovery Workshop
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
