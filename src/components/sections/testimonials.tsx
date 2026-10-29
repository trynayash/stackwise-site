import React from "react";
import { CustomerSupportIcon, DashboardSpeed02Icon, GitBranchIcon, Key01Icon, SecurityCheckIcon, SourceCodeIcon } from "@hugeicons/core-free-icons";
import { siteConfig } from "@/config/site";
import { SectionHeader, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { Icon, type IconSvgElement } from "@/components/ui/icon";

const principleIcons: Record<string, IconSvgElement> = {
    "Zero-Debt Codebase": SourceCodeIcon,
    "Deterministic Performance": DashboardSpeed02Icon,
    "100% Code Ownership": Key01Icon,
    "Production Security": SecurityCheckIcon,
    "CI/CD & Edge Deploy": GitBranchIcon,
    "Post-Launch Support": CustomerSupportIcon,
};

/** Engineering principles (kept in this file for its original section id). */
export function Testimonials() {
    return (
        <section id="principles" className="relative py-20 md:py-28" aria-label="Engineering principles">
            <div className="container mx-auto px-5 sm:px-6">
                <SectionHeader
                    index="07"
                    eyebrow="Principles"
                    title="How we build"
                    muted="every project."
                    description="The standards behind the software we hand over to you — on every project, at every price point."
                />

                <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {siteConfig.engineeringPrinciples.map((p) => (
                        <StaggerItem key={p.title} className="bg-canvas">
                            <div className="flex h-full flex-col p-7 md:p-8">
                                <div className="flex items-center justify-between">
                                    <Icon icon={principleIcons[p.title] ?? SourceCodeIcon} size={24} className="text-white" />
                                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-white/50">{p.metric}</span>
                                </div>
                                <h3 className="mt-8 text-lg font-semibold text-white">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/55">{p.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
