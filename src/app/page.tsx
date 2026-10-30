import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { StackLoop } from "@/components/sections/stack-loop";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Pricing } from "@/components/sections/pricing";
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
            <About />
            <FAQ />
            <GuidesTeaser />
            <Contact />
        </div>
    );
}
