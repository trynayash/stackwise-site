import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["business-automation"];

export const metadata = marketingMetadata(page);

export default function BusinessAutomationPage() {
    return <MarketingPage page={page} />;
}
