import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects } from "@/lib/data";
import { constructMetadata } from "@/lib/seo";
import { CaseStudyClient } from "./case-study-client";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects
        .filter((p) => p.caseStudy)
        .map((p) => ({
            slug: p.id,
        }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project || !project.caseStudy) {
        return {};
    }

    return constructMetadata({
        title: `${project.title} — Labs`,
        description: project.summary,
        image: project.coverImage || project.image,
        canonical: `/work/${project.id}`,
    });
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project || !project.caseStudy) {
        notFound();
    }

    return <CaseStudyClient project={project} />;
}
