import React from "react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { bookCallUrl } from "@/lib/booking";

/**
 * "Book a call" button that opens the Calendly page in a new tab. Renders nothing while no booking page is
 * configured, so it can sit in layouts unconditionally. `source` names the placement for Calendly's reports.
 */
export function BookCallLink({
    source,
    label = "Book a call",
    variant = "secondary",
    size = "lg",
    className,
}: {
    source: string;
    label?: string;
    variant?: "primary" | "secondary" | "dark";
    size?: "sm" | "md" | "lg";
    className?: string;
}) {
    const href = bookCallUrl(source);
    if (!href) return null;
    return (
        <ButtonLink href={href} variant={variant} size={size} className={className} target="_blank" rel="noopener noreferrer">
            <Icon icon={Calendar03Icon} size={18} />
            {label}
        </ButtonLink>
    );
}
