import React from "react";
import { caseStudies } from "@/lib/case-studies";
import { allWork } from "@/lib/more-work";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/motion-primitives";
import { WorkGrid } from "@/components/work/work-card";

/** Home page work section: the three featured case studies, then a link to the rest. */
export function Portfolio() {
    return (
        <section id="portfolio" className="relative py-20 md:py-28" aria-label="Selected work">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="Our work"
                    title="Products we've built and shipped."
                    description="Real products that people use, each with a write-up of how it was built. Have a look before you get in touch."
                    action={
                        <ButtonLink href="/work" variant="secondary" arrow="right">
                            See all {allWork.length} projects
                        </ButtonLink>
                    }
                />
                <WorkGrid studies={caseStudies} />
            </div>
        </section>
    );
}
