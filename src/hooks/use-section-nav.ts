"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Returns a click handler for links to home-page sections (`/#id`).
 * On the home page it scrolls smoothly; elsewhere it navigates to the home page and the section.
 */
export function useSectionNav() {
    const pathname = usePathname();
    const router = useRouter();

    return useCallback(
        (id: string, after?: () => void) => (e: React.MouseEvent) => {
            e.preventDefault();
            after?.();
            if (pathname === "/") {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", `#${id}`);
            } else {
                router.push(`/#${id}`);
            }
        },
        [pathname, router]
    );
}

type NavItem = { title: string; id?: string; href?: string };

/** Link props for a nav item: page links navigate normally, section links scroll on the home page. */
export function useNavLink() {
    const goToSection = useSectionNav();
    return useCallback(
        (item: NavItem, after?: () => void) =>
            item.id
                ? { href: `/#${item.id}`, onClick: goToSection(item.id, after) }
                : { href: item.href ?? "/", onClick: after },
        [goToSection]
    );
}
