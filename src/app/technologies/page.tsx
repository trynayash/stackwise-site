import { MarketingHub } from "@/components/marketing/marketing-hub";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Technologies We Build With",
    description: "Next.js, React, Node.js and Go development by StackWise: the typed, well-supported stack behind our SaaS products, APIs and websites.",
    canonical: "/technologies",
    ogKicker: "Technologies",
});

export default function TechnologiesPage() {
    return (
        <MarketingHub
            kind="Technologies"
            title="The stack behind"
            accent="everything we ship."
            intro="A small, proven set of technologies we know deeply — chosen so your product is fast today and easy for your next developer to pick up."
        />
    );
}
