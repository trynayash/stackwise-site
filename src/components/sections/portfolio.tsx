import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { projects, type Project } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

export const projectDomains: Record<string, string> = {
    limityourapis: "limityourapi.tech",
    "startupdeck-ai": "startupdeck.in",
    codefusionai: "codefusion.vercel.app",
    promptp: "promptp.vercel.app",
    "stackwise-platform": "stackwise.agency",
};

/** "LimitYourAPI — API Usage Limits" → name + tagline. */
export function splitTitle(title: string) {
    const [name, ...rest] = title.split(" — ");
    return { name, tagline: rest.join(" — ") };
}

export function Screenshot({ project, className }: { project: Project; className?: string }) {
    return (
        <div className={cn("overflow-hidden rounded-xl border border-line bg-canvas", className)}>
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="ml-2 truncate text-[10px] font-mono text-white/35">{projectDomains[project.id] ?? `${project.id}.dev`}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={`${splitTitle(project.title).name} interface`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

function Meta({ project, large = false }: { project: Project; large?: boolean }) {
    const { name, tagline } = splitTitle(project.title);
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">{project.category}</span>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-white/60 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <Icon icon={ArrowUpRight01Icon} size={18} />
                </span>
            </div>
            <h3 className={cn("mt-3 font-semibold tracking-tight text-white", large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")}>{name}</h3>
            {tagline && <p className={cn("mt-1 text-white/45", large ? "text-lg" : "text-[15px]")}>{tagline}</p>}
            <p className={cn("mt-4 leading-relaxed text-white/60", large ? "text-base" : "text-sm line-clamp-2")}>{project.summary}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {project.tech.slice(0, large ? 6 : 4).map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-white/55">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

/** Compact project card linking to its case study. */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/work/${project.id}`} className="block h-full">
            <Card interactive className="flex h-full flex-col gap-6 p-5 md:p-6">
                <Screenshot project={project} />
                <Meta project={project} />
            </Card>
        </Link>
    );
}

export function Portfolio() {
    const [featured, ...rest] = projects.filter((p) => p.caseStudy);

    return (
        <section id="portfolio" className="relative py-20 md:py-28" aria-label="Selected work">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="02"
                    eyebrow="Selected work"
                    title="Products we've designed"
                    muted="and engineered."
                    description="Each project has a write-up of the problem, how it's built and what's inside — so you can judge the engineering, not just the screenshots."
                />

                {featured && (
                    <Reveal>
                        <Link href={`/work/${featured.id}`} className="block">
                            <Card interactive className="grid grid-cols-1 gap-8 p-5 md:p-6 lg:grid-cols-12 lg:gap-10">
                                <Screenshot project={featured} className="lg:col-span-7" />
                                <div className="lg:col-span-5 lg:py-2">
                                    <Meta project={featured} large />
                                </div>
                            </Card>
                        </Link>
                    </Reveal>
                )}

                <Stagger className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
                    {rest.map((project) => (
                        <StaggerItem key={project.id}>
                            <ProjectCard project={project} />
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
