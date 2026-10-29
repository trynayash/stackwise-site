"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/motion-primitives";

import { technologies } from "@/lib/data";

const coreStack = [
    {
        name: "Next.js",
        tagline: "React framework for production",
        logo: "/logos/nextjs.svg",
    },
    {
        name: "TypeScript",
        tagline: "Type-safe JavaScript",
        logo: "/logos/typescript.svg",
    },
    {
        name: "React",
        tagline: "Component architecture",
        logo: "/logos/react.svg",
    },
    {
        name: "TailwindCSS",
        tagline: "Utility-first CSS",
        logo: "/logos/tailwindcss.svg",
    },
    {
        name: "Node.js",
        tagline: "Server-side runtime",
        logo: "/logos/nodejs.svg",
    },
    {
        name: "PostgreSQL",
        tagline: "Scalable SQL database",
        logo: "/logos/postgresql.svg",
    },
    {
        name: "AWS",
        tagline: "Cloud infrastructure",
        logo: "/logos/aws.svg",
    },
];

const techStack = [
    ...coreStack,
    ...technologies.map((tech) => ({
        name: tech.name,
        tagline: tech.description,
        logo: tech.icon,
    })),
];


export function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="tech-stack" className="py-20 md:py-32 relative z-10" aria-label="Our technology stack" ref={sectionRef}>
            <div className="container mx-auto px-5 sm:px-6">

                <SectionHeader
                    eyebrow="Technology"
                    title="The tech"
                    muted="we wield."
                    description="Custom code with a modern TypeScript stack, without page builders or templates."
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left: Tech Grid */}
                    <div className="lg:col-span-12">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    className="group p-4 rounded-xl bg-[#0d0d0d]/80 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 text-center hover:bg-[#111] cursor-default"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.05 + index * 0.03 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={tech.logo}
                                            alt={tech.name}
                                            className="w-10 h-10 object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-0.5 group-hover:text-[#C8FF00] transition-colors duration-300">
                                        {tech.name}
                                    </h4>
                                    <p className="text-white/20 text-[10px] font-mono">{tech.tagline}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
