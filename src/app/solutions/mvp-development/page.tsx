import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["mvp-development"];

export const metadata = marketingMetadata(page);

export default function MvpDevelopmentPage() {
    return <MarketingPage page={page} />;
}
