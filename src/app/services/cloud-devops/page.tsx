import { MarketingPage, marketingMetadata } from "@/components/marketing/marketing-page";
import { marketingPages } from "@/lib/marketing-pages";

const page = marketingPages["cloud-devops"];

export const metadata = marketingMetadata(page);

export default function CloudDevopsPage() {
    return <MarketingPage page={page} />;
}
