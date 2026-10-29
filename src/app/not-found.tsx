import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { marketingPageList } from "@/lib/marketing-pages";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: true },
    // Drop the homepage canonical inherited from the root layout.
    alternates: { canonical: null },
};

export default function NotFound() {
    return (
        <div className="relative overflow-hidden pt-32 pb-24 md:pt-40">
            <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
            <div className="container relative mx-auto max-w-4xl px-5 sm:px-6">
                <p className="font-mono text-sm text-accent">404</p>
                <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl text-balance">
                    This page doesn&apos;t exist. <span className="text-white/40">Let&apos;s get you back on track.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-white/60">The link may be broken, or the page may have moved. Here are some good places to start.</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/" size="lg" arrow="right">
                        Back to home
                    </ButtonLink>
                    <ButtonLink href="/#contact" variant="secondary" size="lg">
                        Contact us
                    </ButtonLink>
                </div>

                <div className="mt-16 border-t border-line">
                    {marketingPageList.map((p) => (
                        <Link key={p.path} href={p.path} className="group flex items-center justify-between gap-4 border-b border-line py-4">
                            <span className="flex items-center gap-3 text-white/75 transition-colors group-hover:text-white">
                                <Icon icon={p.icon} size={18} className="text-white/50" />
                                {p.navLabel}
                            </span>
                            <Icon icon={ArrowRight01Icon} size={18} className="text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
