import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["nodejs"];

export const metadata = marketingMetadata(page);

export default function NodejsPage() {
    return <MarketingPage page={page} />;
}
