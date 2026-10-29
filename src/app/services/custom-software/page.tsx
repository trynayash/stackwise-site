import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["custom-software"];

export const metadata = marketingMetadata(page);

export default function CustomSoftwarePage() {
    return <MarketingPage page={page} />;
}
