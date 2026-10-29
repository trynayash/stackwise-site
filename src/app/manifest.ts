import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${siteConfig.name} — Software Studio`,
        short_name: siteConfig.name,
        description: siteConfig.description,
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        categories: ["business", "productivity", "developer"],
        icons: [
            { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    };
}
