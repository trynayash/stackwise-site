import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["ui-ux-design"];

export const metadata = marketingMetadata(page);

export default function UiUxDesignPage() {
    return <MarketingPage page={page} />;
}
