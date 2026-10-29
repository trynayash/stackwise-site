import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["go"];

export const metadata = marketingMetadata(page);

export default function GoPage() {
    return <MarketingPage page={page} />;
}
