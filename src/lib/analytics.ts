type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

/**
 * Sends an anonymous event to Google Analytics when it is configured (NEXT_PUBLIC_GA_ID).
 * Only categories and counts: never pass anything the visitor typed.
 */
export function track(name: string, params?: Record<string, string | number>) {
    if (typeof window === "undefined") return;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    try {
        gtag?.("event", name, params);
    } catch {
        // Analytics must never break the page.
    }
}
