import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["saas-development"];

export const metadata = marketingMetadata(page);

export default function SaasDevelopmentPage() {
    return <MarketingPage page={page} />;
}
