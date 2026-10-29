import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["react"];

export const metadata = marketingMetadata(page);

export default function ReactPage() {
    return <MarketingPage page={page} />;
}
