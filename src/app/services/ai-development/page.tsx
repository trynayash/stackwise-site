import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["ai-development"];

export const metadata = marketingMetadata(page);

export default function AiDevelopmentPage() {
    return <MarketingPage page={page} />;
}
