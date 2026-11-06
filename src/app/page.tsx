import type { Metadata, Viewport } from "next";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { StackLoop } from "@/components/sections/stack-loop";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Pricing } from "@/components/sections/pricing";
import { HowWeCompare } from "@/components/sections/how-we-compare";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { GuidesTeaser } from "@/components/sections/guides-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";
import { allWork } from "@/lib/more-work";
import { toWorkSummary } from "@/lib/case-studies";
import { homeServices } from "@/lib/home-data";

// The page opens on the light hero, so phone browsers tint their bars to match from the first paint; the navbar
// switches it back to the dark canvas once the hero scrolls away.
export const viewport: Viewport = { themeColor: "#f2f1ec" };

// Set here rather than in the root layout, so a page that forgets its own canonical can never inherit the home page's.
export const metadata: Metadata = { alternates: { canonical: "/" } };

// The two products framed in the hero.
const heroWork = allWork.slice(0, 2);

// Sections render on the server so the full page is in the HTML for search engines and link previews.
export default function Home() {
    return (
        <div className="flex flex-col">
            <JsonLd data={faqSchema(faqs)} />
            <Hero projects={heroWork.map(toWorkSummary)} />
            <Marquee />
            <Portfolio />
            <Testimonials />
            <Services {...homeServices(heroWork.map((w) => w.slug))} />
            <StackLoop />
            <ProcessTimeline />
            <Pricing />
            <HowWeCompare />
            <About />
            <FAQ />
            <GuidesTeaser />
            <Contact />
        </div>
    );
}
