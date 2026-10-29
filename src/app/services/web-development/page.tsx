import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["web-development"];

export const metadata = marketingMetadata(page);

export default function WebDevelopmentPage() {
    return <MarketingPage page={page} />;
}
