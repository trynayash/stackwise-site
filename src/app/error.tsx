"use client";

import React, { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Shown in place of a page that threw while rendering. The navbar and footer stay, so the visitor can still
 * get anywhere else; "Try again" re-renders the page in place.
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // The digest is enough to find the server log; no visitor details are attached.
        console.error("[page] render failed", error.digest ?? error.message);
    }, [error]);

    return (
        <div className="relative overflow-hidden pt-32 pb-24 md:pt-40">
            <div className="container relative mx-auto max-w-4xl px-5 sm:px-6">
                <p className="inline-flex rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-black">Something broke</p>
                <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl text-balance">
                    This page hit an error. <span className="text-accent">The rest of the site is fine.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-white/60">
                    Try the page again. If it keeps happening, email {siteConfig.emails.inbound} and mention what you were doing.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" arrow="right" onClick={reset}>
                        Try again
                    </Button>
                    <ButtonLink href="/" size="lg" variant="secondary">
                        Back to home
                    </ButtonLink>
                </div>
                {error.digest && <p className="mt-10 font-mono text-xs text-white/40">Reference: {error.digest}</p>}
            </div>
        </div>
    );
}
