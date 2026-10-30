"use client";

import React, { createContext, useContext } from "react";
import type { NavLinks } from "@/lib/all-pages";

const SiteLinksContext = createContext<NavLinks>({ services: [], solutions: [], technologies: [], industries: [], locations: [], guides: [] });

/** Navigation and footer links, handed down from the server layout so page content stays out of the browser bundle. */
export function SiteLinksProvider({ links, children }: { links: NavLinks; children: React.ReactNode }) {
    return <SiteLinksContext.Provider value={links}>{children}</SiteLinksContext.Provider>;
}

export const useSiteLinks = () => useContext(SiteLinksContext);
