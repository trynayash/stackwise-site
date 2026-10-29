import { MarketingHub } from "@/components/marketing/marketing-hub";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Software Solutions for Startups & Businesses",
    description: "Software solutions by goal: MVP development, product engineering for startups and business automation. Ship faster without technical debt.",
    canonical: "/solutions",
    ogKicker: "Solutions",
});

export default function SolutionsPage() {
    return (
        <MarketingHub
            kind="Solutions"
            title="Solutions built"
            accent="around your goal."
            intro="Whether you're validating an idea, launching a startup or removing manual work from operations — start from the outcome you need."
        />
    );
}
