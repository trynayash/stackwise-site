"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Entrance animations start once their element has been reached: its top edge has come within `offset`
 * px of the bottom of the viewport, or the page is scrolled to the end. Unlike an IntersectionObserver,
 * this also catches elements that a fast fling, an anchor jump or a restored scroll position carries
 * straight past, which would otherwise stay invisible. One shared, rAF-throttled scroll listener serves
 * every waiting element and is removed when none are left.
 */
const pending = new Map<Element, { offset: number; done: () => void }>();
let frame = 0;

function stop() {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
}

function check() {
    frame = 0;
    const height = window.innerHeight;
    const atEnd = window.scrollY + height >= document.documentElement.scrollHeight - 2;
    for (const [el, { offset, done }] of pending) {
        if (atEnd || el.getBoundingClientRect().top < height - offset) {
            pending.delete(el);
            done();
        }
    }
    if (pending.size === 0) stop();
}

// Measure just after the next frame has painted, when layout is already up to date, so reading the
// positions never forces the browser to lay the page out early.
function schedule() {
    if (!frame) frame = requestAnimationFrame(() => setTimeout(check, 0));
}

function watch(el: Element, offset: number, done: () => void) {
    if (pending.size === 0) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
    }
    pending.set(el, { offset, done });
    schedule();
    return () => {
        pending.delete(el);
        if (pending.size === 0) stop();
    };
}

/** Returns a ref for the element and whether it has been reached yet (it stays true once set). */
export function useReached<T extends Element>(offset = 60) {
    const ref = useRef<T>(null);
    const [reached, setReached] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || reached) return;
        return watch(el, offset, () => setReached(true));
    }, [offset, reached]);

    return [ref, reached] as const;
}
