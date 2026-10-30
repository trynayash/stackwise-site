import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GuidePage } from "@/components/guides/guide-page";
import { guideBySlug, guides } from "@/lib/guides";
import { constructMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const guide = guideBySlug[(await params).slug];
    if (!guide) return {};
    const meta = constructMetadata({ title: guide.seo.title, description: guide.seo.description, canonical: guide.path, ogKicker: "Guide" });
    return {
        ...meta,
        openGraph: { ...meta.openGraph, type: "article", publishedTime: guide.published, modifiedTime: guide.updated },
    };
}

export default async function Page({ params }: PageProps) {
    const guide = guideBySlug[(await params).slug];
    if (!guide) notFound();
    return <GuidePage guide={guide} />;
}
