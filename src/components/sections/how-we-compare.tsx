import React from "react";
import { Reveal, SectionHeader } from "@/components/ui/motion-primitives";
import { CompetitorComparison } from "@/components/sections/competitor-comparison";

/** Home page: StackWise against a freelancer, a typical agency and a large IT firm. */
export function HowWeCompare() {
    return (
        <section id="compare" className="relative py-20 md:py-28" aria-label="How StackWise compares">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    eyebrow="How we compare"
                    title="StackWise next to the usual options."
                    description="What a freelancer, a typical agency and a large IT firm usually offer, side by side."
                />
                <Reveal>
                    <CompetitorComparison />
                </Reveal>
            </div>
        </section>
    );
}
