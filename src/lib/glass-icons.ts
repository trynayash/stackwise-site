/**
 * StackWise's own icon set: frosted-glass icons drawn on a 48×48 grid.
 *
 * Every icon has three layers. `back` is solid and takes the brand accent; a part is a filled path, or `{ d, w }` for a
 * stroked one. `front` is a frosted glass shape: where it overlaps the back, the back shows through it blurred.
 * `marks` (stroked) and `dots` (filled) are the white details that sit on the glass.
 *
 * Keep shapes simple and rounded, let the back stick out from behind the glass so both layers read, and keep marks on
 * the glass. Rendered by <GlassIcon> in src/components/ui/glass-icon.tsx.
 */

export type GlassPart = string | { d: string; w: number };
export type GlassDef = { back: GlassPart[]; front: string; marks?: string; dots?: string };

/** Rounded rectangle. */
const rr = (x: number, y: number, w: number, h: number, r: number) =>
    `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

/** Circle. */
const ci = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;

/** Head and shoulders, for people. */
const person = (cx: number, top: number, s: number) =>
    `${ci(cx, top + 7 * s, 7 * s)} M${cx - 14 * s} ${top + 30 * s}c0-7.7 6.3-13.5 14-13.5s14 5.8 14 13.5v1.5a2 2 0 0 1-2 2H${cx - 12 * s}a2 2 0 0 1-2-2Z`;

// Shared layouts: a disc behind a round glass face, and a card behind a glass panel.
const DISC = ci(34, 14, 8);
const FACE = ci(22, 27, 14);
const CLOUD = "M14 38a7 7 0 0 1-.9-13.94A11 11 0 0 1 34.3 22.4 8 8 0 0 1 33 38Z";
const BUBBLE = "M12 15H29a6 6 0 0 1 6 6V30a6 6 0 0 1-6 6H18.5L12.5 41.5V36H12a6 6 0 0 1-6-6V21a6 6 0 0 1 6-6Z";
const PHONE_BACK = rr(21, 5, 18, 30, 5);
const PHONE = rr(9, 11, 20, 32, 5);

export const glassIcons = {
    // Money and paperwork
    card: { back: [rr(17, 8, 25, 18, 4)], front: rr(6, 17, 30, 22, 5), marks: "M11 24.5H31 M11 32H18" },
    invoice: { back: [rr(21, 6, 19, 25, 4)], front: rr(8, 12, 24, 30, 5), marks: "M14 21H26 M14 27H26 M14 33H21" },
    document: { back: [ci(34, 33, 8)], front: rr(8, 6, 24, 34, 5), marks: "M14 15H26 M14 21H26 M14 27H21" },
    checklist: {
        back: [rr(19, 6, 22, 28, 5)],
        front: rr(7, 13, 25, 29, 6),
        marks: "M12.5 22.5L15 25L19.5 20.5 M12.5 32L15 34.5L19.5 30 M23 23H27 M23 32.5H27",
    },
    briefcase: { back: [{ d: "M18 16V11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5", w: 4 }], front: rr(6, 14, 36, 26, 6), marks: "M10 26H38" },
    bank: { back: ["M24 4L43 14V18H5V14Z"], front: rr(8, 14, 32, 27, 4), marks: "M15.5 23V34 M24 23V34 M32.5 23V34" },

    // Security and ownership
    shield: {
        back: [DISC],
        front: "M24 7L37 12V22.5C37 31 31.5 37 24 40.5C16.5 37 11 31 11 22.5V12Z",
        marks: "M18.5 23.5L22.5 27.5L29.5 20",
    },
    shieldUser: {
        back: [DISC],
        front: "M24 7L37 12V22.5C37 31 31.5 37 24 40.5C16.5 37 11 31 11 22.5V12Z",
        marks: "M18.5 31c1-3.5 3-5 5.5-5s4.5 1.5 5.5 5",
        dots: ci(24, 20.5, 3),
    },
    lock: { back: [{ d: "M16.5 22V16a7.5 7.5 0 0 1 15 0v6", w: 5 }], front: rr(9, 20, 30, 22, 6), dots: ci(24, 31, 2.6) },
    key: { back: [rr(18, 21, 24, 6, 3), rr(34, 25, 4, 9, 2), rr(28, 25, 4, 6, 2)], front: ci(16, 24, 11), dots: ci(16, 24, 3) },
    eyeOff: {
        back: [DISC],
        front: "M5 26c4.5-7.5 11-11 19-11s14.5 3.5 19 11c-4.5 7.5-11 11-19 11S9.5 33.5 5 26Z",
        marks: "M14 36L34 16",
        dots: ci(24, 26, 3.5),
    },

    // Data and infrastructure
    database: {
        back: [rr(17, 5, 24, 22, 11)],
        front: rr(7, 14, 27, 28, 10),
        marks: "M12 25c3.5 2.6 13.5 2.6 17 0 M12 32c3.5 2.6 13.5 2.6 17 0",
    },
    server: { back: [rr(13, 6, 28, 18, 4)], front: rr(7, 16, 34, 24, 5), marks: "M20 28H34", dots: ci(13.5, 28, 2) },
    container: { back: [rr(8, 7, 14, 13, 3), rr(26, 7, 14, 13, 3)], front: rr(6, 17, 36, 23, 6), marks: "M15 25V33 M24 25V33 M33 25V33" },
    cloud: { back: [ci(32, 15, 8.5)], front: CLOUD },
    cloudUpload: { back: [ci(32, 15, 8.5)], front: CLOUD, marks: "M24 35V27 M20.5 30.5L24 27L27.5 30.5" },
    cloudServer: { back: [ci(32, 15, 8.5)], front: CLOUD, marks: "M18.5 29.5H29.5 M18.5 34H25" },
    cpu: {
        back: [{ d: "M17 5V14 M24 5V14 M31 5V14 M17 34V43 M24 34V43 M31 34V43 M5 17H14 M5 24H14 M5 31H14 M34 17H43 M34 24H43 M34 31H43", w: 3 }],
        front: rr(10, 10, 28, 28, 7),
        marks: rr(19, 19, 10, 10, 2),
    },
    plug: { back: [rr(16, 4, 5, 15, 2.5), rr(27, 4, 5, 15, 2.5), { d: "M24 30V44", w: 4.5 }], front: rr(10, 12, 28, 22, 8), dots: ci(24, 23, 2.4) },
    branch: { back: [{ d: "M15 13V35 M15 29c0-8 18-6 18-14", w: 4 }], front: `${ci(15, 36, 6)} ${ci(33, 13, 6)} ${ci(15, 12, 5)}` },
    layers: { back: [rr(17, 6, 25, 22, 6)], front: rr(6, 17, 26, 25, 6) },

    // Code and product
    code: { back: [rr(19, 7, 23, 20, 5)], front: rr(6, 15, 31, 25, 6), marks: "M15 24.5L11.5 28L15 31.5 M28 24.5L31.5 28L28 31.5 M23.5 23L19.5 33" },
    terminal: { back: [rr(19, 7, 23, 20, 5)], front: rr(6, 15, 31, 25, 6), marks: "M12 24L16 28L12 32 M19.5 32.5H28" },
    browser: {
        back: [rr(17, 6, 25, 18, 5)],
        front: rr(6, 14, 32, 26, 6),
        marks: "M11 27H27 M11 33H22",
        dots: `${ci(11.5, 19.5, 1.5)} ${ci(16, 19.5, 1.5)}`,
    },
    layout: { back: [rr(25, 6, 17, 16, 4)], front: rr(6, 14, 28, 27, 6), marks: "M10 23.5H30 M17 27V37" },
    table: { back: [rr(23, 6, 19, 15, 4)], front: rr(6, 13, 32, 28, 6), marks: "M10 22.5H34 M18 26V37" },
    dashboard: { back: [rr(25, 7, 17, 15, 4)], front: rr(6, 14, 28, 27, 6), marks: "M12 22H22 M12 28.5H28 M12 35H24" },
    chart: { back: [rr(29, 8, 10, 30, 4)], front: rr(7, 15, 28, 25, 6), marks: "M12.5 33L18 27L23 30L29 23" },
    pulse: { back: [ci(34, 13, 7)], front: rr(7, 15, 32, 25, 6), marks: "M12 28.5H17L20 22L24.5 34L27.5 28.5H33" },
    gauge: { back: [DISC], front: FACE, marks: "M13 31a9 9 0 0 1 18 0 M22 31L27 25" },
    bug: {
        back: [ci(24, 13, 7), { d: "M8 21H16 M32 21H40 M8 30H16 M32 30H40 M16 8L19.5 13 M32 8L28.5 13", w: 3.5 }],
        front: rr(14, 14, 20, 27, 10),
        marks: "M24 20V35",
    },
    tune: { back: [ci(32, 13, 6.5), ci(16, 35, 6.5)], front: rr(7, 10, 34, 29, 7), marks: "M13 18H25 M22 31H35" },
    refresh: { back: [DISC], front: FACE, marks: "M28 22a7.5 7.5 0 1 0 1.5 5.5 M28.3 17.5L28 22.2L23.4 21.6" },
    flow: { back: [rr(6, 6, 18, 16, 5), { d: "M15 22V33H24", w: 4 }], front: rr(20, 24, 22, 18, 5) },
    exchange: { back: [rr(22, 7, 20, 17, 5)], front: rr(6, 20, 26, 21, 5), marks: "M11 27H25 M22 24L25 27L22 30 M27 34H13 M16 31L13 34L16 37" },
    live: { back: [{ d: "M12 13a15 15 0 0 0 0 22 M36 13a15 15 0 0 1 0 22 M19 18.5a8 8 0 0 0 0 11 M29 18.5a8 8 0 0 1 0 11", w: 3.5 }], front: ci(24, 24, 9) },

    // Design and devices
    palette: {
        back: [DISC],
        front: FACE,
        dots: `${ci(15.5, 25, 2.2)} ${ci(19.5, 19, 2.2)} ${ci(26.5, 19.5, 2.2)} ${ci(29.5, 26.5, 2.2)}`,
    },
    pen: { back: [ci(34, 12, 7)], front: "M22 9L34 25L22 41L10 25Z", marks: "M22 28V37", dots: ci(22, 24, 2.6) },
    cursor: { back: [rr(19, 6, 23, 19, 5)], front: "M9 11L33 22L23 25.5L19 35Z" },
    phone: { back: [PHONE_BACK], front: PHONE, marks: "M16 37H22" },
    appDownload: { back: [PHONE_BACK], front: PHONE, marks: "M19 20V30 M15.5 26.5L19 30L22.5 26.5" },
    image: { back: [ci(33, 14, 7)], front: rr(7, 12, 32, 28, 6), marks: "M12 34L19.5 26.5L25 32L29 28L35 34" },

    // Time
    clock: { back: [DISC], front: FACE, marks: "M22 20V27L27 30" },
    stopwatch: { back: [DISC, rr(18, 5, 8, 9, 3)], front: FACE, marks: "M22 20V27" },
    calendar: {
        back: [{ d: "M17 7V15 M31 7V15", w: 4.5 }],
        front: rr(8, 11, 32, 30, 7),
        dots: `${ci(15, 25, 2)} ${ci(24, 25, 2)} ${ci(33, 25, 2)} ${ci(15, 32.5, 2)} ${ci(24, 32.5, 2)}`,
    },
    schedule: { back: [{ d: "M17 7V15 M31 7V15", w: 4.5 }], front: rr(8, 11, 32, 30, 7), marks: "M24 20V27L29 30" },

    // People and conversation
    user: { back: [ci(35, 12, 7)], front: person(22, 9, 1) },
    users: { back: [ci(32, 12, 6), "M21 33c0-6.6 4.9-11 11-11s11 4.4 11 11v1.5H21Z"], front: person(17, 10, 0.95) },
    idCard: {
        back: [ci(33, 12, 8)],
        front: rr(6, 15, 34, 24, 6),
        marks: "M23 24H33 M23 30.5H30",
        dots: `${ci(14.5, 23.5, 3.2)} M9.5 33.5c.7-3 2.6-4.5 5-4.5s4.3 1.5 5 4.5Z`,
    },
    userSearch: {
        back: [{ d: "M28 30L39 41", w: 6 }, ci(35, 11, 6)],
        front: ci(20, 22, 12),
        dots: `${ci(20, 19, 3.2)} M14 29.5c1-3.3 3.3-5 6-5s5 1.7 6 5Z`,
    },
    chat: { back: [rr(22, 7, 20, 16, 6)], front: BUBBLE, dots: `${ci(14, 25.5, 2)} ${ci(20.5, 25.5, 2)} ${ci(27, 25.5, 2)}` },
    chatLines: { back: [rr(22, 7, 20, 16, 6)], front: BUBBLE, marks: "M12 22.5H29 M12 28.5H23" },
    chatQuestion: {
        back: [rr(22, 7, 20, 16, 6)],
        front: BUBBLE,
        marks: "M17.5 22.5a3.2 3.2 0 1 1 4.6 2.9c-1.1.6-1.6 1.2-1.6 2.3",
        dots: ci(20.5, 31, 1.6),
    },
    chatCode: { back: [rr(22, 7, 20, 16, 6)], front: BUBBLE, marks: "M16 22.5L12.5 25.5L16 28.5 M25 22.5L28.5 25.5L25 28.5" },
    bell: { back: [ci(34, 11, 6), rr(19, 33, 10, 8, 4)], front: "M12 34H36L33 29V22a9 9 0 0 0-18 0V29Z" },
    translate: { back: [rr(23, 15, 19, 19, 5)], front: rr(6, 7, 22, 22, 5), marks: "M12 23L17 12L22 23 M13.8 19.5H20.2" },
    access: {
        back: [ci(35, 12, 7)],
        front: FACE,
        marks: "M15.5 24.5H28.5 M22 24.5V30.5 M22 30.5L18 36 M22 30.5L26 36",
        dots: ci(22, 19.5, 2.4),
    },

    // Finding and aiming
    search: { back: [{ d: "M25 25L40 40", w: 6.5 }, ci(30, 12, 6)], front: ci(21, 21, 13) },
    target: { back: [{ d: "M27 21L40 8 M34 8H40V14", w: 4 }], front: FACE, marks: ci(22, 27, 6), dots: ci(22, 27, 2) },
    globe: {
        back: [DISC],
        front: FACE,
        marks: "M8 27H36 M22 13c-5.5 6.5-5.5 21.5 0 28 M22 13c5.5 6.5 5.5 21.5 0 28",
    },
    pin: {
        back: ["M12 27H36a2 2 0 0 1 1.9 1.4L42.2 39.4A2 2 0 0 1 40.3 42H7.7a2 2 0 0 1-1.9-2.6L10.1 28.4A2 2 0 0 1 12 27Z"],
        front: "M24 6a10 10 0 0 1 10 10c0 8-10 17-10 17s-10-9-10-17A10 10 0 0 1 24 6Z",
        dots: ci(24, 16, 3.5),
    },

    // Commerce and logistics
    cart: { back: [rr(20, 4, 15, 15, 4), ci(17, 38, 3.5), ci(33, 38, 3.5), { d: "M5 9H10L13 15", w: 3.5 }], front: "M12 15H40L36.5 31H15.5Z" },
    box: { back: [rr(7, 8, 34, 10, 3)], front: rr(9, 15, 30, 26, 5), marks: "M19.5 23H28.5" },
    truck: { back: [rr(27, 15, 15, 17, 4), ci(15, 37, 4.5), ci(33, 37, 4.5)], front: rr(5, 10, 28, 24, 5) },
    warehouse: { back: ["M24 5L43 15V20H5V15Z"], front: rr(8, 17, 32, 24, 4), marks: "M16 27H32 M16 33H32" },

    // Places and sectors
    building: {
        back: [rr(26, 15, 16, 25, 4)],
        front: rr(7, 7, 23, 34, 5),
        dots: `${ci(13, 15, 1.8)} ${ci(18.5, 15, 1.8)} ${ci(24, 15, 1.8)} ${ci(13, 22, 1.8)} ${ci(18.5, 22, 1.8)} ${ci(24, 22, 1.8)} ${ci(13, 29, 1.8)} ${ci(18.5, 29, 1.8)} ${ci(24, 29, 1.8)}`,
    },
    home: { back: [rr(29, 8, 6, 12, 2)], front: "M8 22L24 9L40 22V37a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z", marks: "M20.5 41V33H27.5V41" },
    hospital: { back: [ci(34, 12, 8)], front: rr(8, 13, 30, 28, 6), marks: "M23 21V33 M17 27H29" },
    graduation: { back: ["M24 8L43 17L24 26L5 17Z", { d: "M39 18V28", w: 2.5 }], front: "M12 22V31c0 4 5.5 7 12 7s12-3 12-7V22L24 28Z" },
    book: { back: [rr(20, 8, 21, 32, 5)], front: rr(7, 10, 21, 30, 5), marks: "M12 19H22 M12 25H22 M12 31H18" },
} satisfies Record<string, GlassDef>;

export type GlassName = keyof typeof glassIcons;
