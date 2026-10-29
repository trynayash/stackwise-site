import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["startups"];

export const metadata = marketingMetadata(page);

export default function StartupsPage() {
    return <MarketingPage page={page} />;
}
