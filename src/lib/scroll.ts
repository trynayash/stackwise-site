import type Lenis from "lenis";

/**
 * One place for everything that moves or freezes the page. Lenis (the smooth scroller) registers here when
 * it starts, so section links, "back to top" and the modal scroll lock all go through it instead of fighting
 * it with native calls. Without Lenis (reduced motion, or before it mounts) each helper falls back to the
 * browser's own behaviour.
 */

let lenis: Lenis | null = null;
let locks = 0;
// A scroll asked for while an overlay still holds the lock (a section link tapped in the menu) runs on unlock.
let pending: (() => void) | null = null;

export function registerLenis(instance: Lenis | null) {
    lenis = instance;
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scrolls to a y position, a selector or an element. Instant when motion is reduced. */
export function scrollToTarget(target: number | string | HTMLElement, options: { offset?: number; immediate?: boolean } = {}) {
    const { offset = 0 } = options;
    const run = () => {
        const immediate = options.immediate || reducedMotion();
        if (lenis) {
            lenis.scrollTo(target, { offset, immediate });
            return;
        }
        const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
        const top = typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0;
        window.scrollTo({ top: top + offset, behavior: immediate ? "auto" : "smooth" });
    };
    if (locks > 0) pending = run;
    else run();
}

/**
 * Freezes the page behind a modal. Stopped, Lenis swallows wheel and touch scrolling everywhere except
 * inside [data-lenis-prevent] containers (the chat log, the menu list), which keep scrolling natively.
 * Calls nest, so two overlays open at once still release cleanly.
 */
export function lockScroll() {
    if (locks++ > 0) return;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
    if (locks === 0 || --locks > 0) return;
    if (lenis) lenis.start();
    else document.documentElement.style.overflow = "";
    const run = pending;
    pending = null;
    run?.();
}
