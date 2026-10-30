"use client";

import React, { createContext, useContext } from "react";
import type { NavLinks } from "@/lib/all-pages";

const SiteLinksContext = createContext<NavLinks>({ industries: [], locations: [], guides: [] });

/** Industry, location and guide links for the navigation and footer, handed down from the server layout. */
export function SiteLinksProvider({ links, children }: { links: NavLinks; children: React.ReactNode }) {
    return <SiteLinksContext.Provider value={links}>{children}</SiteLinksContext.Provider>;
}

export const useSiteLinks = () => useContext(SiteLinksContext);
