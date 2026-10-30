import { MarketingHub } from "@/components/marketing/marketing-hub";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Where We Work: Mumbai, India and Worldwide",
    description: "A Mumbai software studio building SaaS products, web apps and websites for clients across India, the US, UK, UAE, Australia, Canada and Singapore.",
    canonical: "/locations",
    ogKicker: "Locations",
});

export default function LocationsPage() {
    return (
        <MarketingHub
            kind="Locations"
            title="Based in Mumbai,"
            accent="working worldwide."
            intro="We're a Mumbai studio working with clients across India and abroad. Pick your region to see how time zones, data rules, hosting and payments work for you."
        />
    );
}
