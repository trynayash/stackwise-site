import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["software-modernization"];

export const metadata = marketingMetadata(page);

export default function SoftwareModernizationPage() {
    return <MarketingPage page={page} />;
}
