import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["mobile-app-development"];

export const metadata = marketingMetadata(page);

export default function MobileAppDevelopmentPage() {
    return <MarketingPage page={page} />;
}
