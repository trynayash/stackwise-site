import { notFound } from "next/navigation";
import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["agencies"];

export const metadata = page ? marketingMetadata(page) : {};

export default function AgenciesPage() {
    if (!page) notFound();
    return <MarketingPage page={page} />;
}
