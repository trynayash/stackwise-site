import React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export type { IconSvgElement };

type IconProps = {
    icon: IconSvgElement;
    size?: number;
    strokeWidth?: number;
    className?: string;
};

/** Hugeicons stroke icon with the site's default size and weight. Works in server and client components. */
export function Icon({ icon, size = 20, strokeWidth = 1.5, className }: IconProps) {
    return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
