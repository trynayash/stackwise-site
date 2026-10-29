import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["maintenance-support"];

export const metadata = marketingMetadata(page);

export default function MaintenanceSupportPage() {
    return <MarketingPage page={page} />;
}
