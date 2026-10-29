import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["nextjs"];

export const metadata = marketingMetadata(page);

export default function NextjsPage() {
    return <MarketingPage page={page} />;
}
