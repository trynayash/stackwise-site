import React from "react";
import { Breadcrumbs } from "@/components/marketing/marketing-page";

/** Shared layout for policy pages. Body copy is styled by the `.legal` rules in globals.css. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
    return (
        <div className="relative pt-28 pb-24 md:pt-36">
            <div className="container mx-auto max-w-3xl px-5 sm:px-6">
                <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title }]} />
                <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">{title}</h1>
                <p className="mt-5 text-sm text-white/55">Last updated: {updated}</p>
                <div className="legal mt-12 border-t border-line pt-4">{children}</div>
            </div>
        </div>
    );
}
