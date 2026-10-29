import React from "react";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

import { technologies } from "@/lib/data";

const coreStack = [
    {
        name: "Next.js",
        tagline: "React framework for production",
        logo: "/logos/tech/nextdotjs.svg",
    },
    {
        name: "TypeScript",
        tagline: "Type-safe JavaScript",
        logo: "/logos/tech/typescript.svg",
    },
    {
        name: "React",
        tagline: "Component architecture",
        logo: "/logos/tech/react.svg",
    },
    {
        name: "TailwindCSS",
        tagline: "Utility-first CSS",
        logo: "/logos/tech/tailwindcss.svg",
    },
    {
        name: "Node.js",
        tagline: "Server-side runtime",
        logo: "/logos/tech/nodedotjs.svg",
    },
    {
        name: "PostgreSQL",
        tagline: "Scalable SQL database",
        logo: "/logos/tech/postgresql.svg",
    },
    {
        name: "AWS",
        tagline: "Cloud infrastructure",
        logo: "/logos/tech/aws.svg",
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
    return (
        <section id="tech-stack" className="relative py-20 md:py-28" aria-label="Technology">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="09"
                    eyebrow="Technology"
                    title="Modern, proven"
                    muted="technology."
                    description="Custom code on a typed, well-supported stack — no page builders or templates, and nothing your next engineer won't recognise."
                />

                <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
                    {techStack.map((tech) => (
                        <StaggerItem key={tech.name} className="bg-canvas">
                            <div className="group flex h-full items-center gap-3.5 p-5 transition-colors hover:bg-surface">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={tech.logo}
                                    alt=""
                                    className="h-8 w-8 flex-shrink-0 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                                    loading="lazy"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">{tech.name}</p>
                                    <p className="truncate text-xs text-white/45">{tech.tagline}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
