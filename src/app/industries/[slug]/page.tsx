import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { industryPageList } from "@/lib/all-pages";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return industryPageList.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => industryPageList.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = find((await params).slug);
    return page ? marketingMetadata(page) : {};
}

export default async function Page({ params }: PageProps) {
    const page = find((await params).slug);
    if (!page) notFound();
    return <MarketingPage page={page} />;
}
