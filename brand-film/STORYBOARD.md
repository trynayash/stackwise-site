# Storyboard

44 seconds, 30 fps, 1,320 frames. Vertical (9:16) is the primary cut; the horizontal (16:9) cut uses the same scenes with wider layouts (see `SHOT_LIST.md` for the per-format layout). Frame ranges come from `src/lib/timeline.ts`.

Voice lines are abbreviated here; the full cut is in `VOICEOVER.md`.

---

## Scene 1: The idea
**0:00–0:05 (frames 0–150)** · `src/scenes/Hook.tsx` · Paper

| Beat | Frame | On screen |
|---|---|---|
| Open | 0 | Flat paper (`#f2f1ec`). A black text caret blinks at the headline position: an empty page. |
| Eyebrow | 6 | "INDEPENDENT SOFTWARE STUDIO, MUMBAI" fades up, mono, tracked. |
| Headline | 30–108 | "Every great digital product starts with an idea." Words rise from behind a clip, 3 frames apart, 24-frame settle. 9:16 sets it on four lines, 16:9 on three. |
| Marker | 92–112 | The accent marker draws left-to-right behind "an idea." as the voice says it. |
| Footer | 60 | Hairline rule, "stackwise.yashsuthar.dev" left, "BRAND FILM / 2026" right. |
| Camera | 0–150 | 2.5% slow push, anchored left of centre. |

Voice: "Every great digital product starts with an idea."

---

## Scene 2: What it takes
**0:05–0:11 (frames 150–330)** · `src/scenes/Complexity.tsx` · Dark

| Beat | Frame | On screen |
|---|---|---|
| Wipe | 150–170 | The dark canvas wipes up over the paper. |
| Eyebrow | 164 | "FROM IDEA TO WORKING SOFTWARE" |
| Headline | 174 | "It takes more than code." rises in. |
| Layers | 168–260 | Six cards drop in, 13 frames apart, each slightly out of line and tilted a degree: 01 UI, 02 Frontend, 03 Backend, 04 APIs, 05 Database, 06 Deployment, each with a mono note of what it involves ("auth, jobs, payments", "schema, migrations, backups"…). The stagger and offsets make a pile. |
| Square up | 290–320 | The offsets ease to zero. The pile becomes a neat stack, ready to be compressed. |

Voice: "But turning that idea into something people actually use takes more than just code."

---

## Scene 3: StackWise
**0:11–0:17 (frames 330–510)** · `src/scenes/Reveal.tsx` · Dark

| Beat | Frame | On screen |
|---|---|---|
| Collapse | 330–356 | The six cards compress into one thin bar at the centre line. At 348 it turns accent lime. |
| Travel | 356–380 | The bar resizes to the wordmark's width and takes its place as an underline. |
| Wordmark | 374–408 | "STACKWISE" unmasks left to right above the bar, Oughter, "WISE" in the accent. The sub hit lands here. |
| Eyebrow | 392 | "INDEPENDENT SOFTWARE STUDIO, MUMBAI" under the bar. |
| Lift | 426–456 | Wordmark, bar and eyebrow lift to the upper third. |
| Line | 442–520 | "Your idea. Engineered into a product." rises in; marker on "Engineered" at 480. |
| Camera | 330–510 | 3% drift. |

Voice: "That's where StackWise comes in." (then a hold for the line)

---

## Scene 4: The work
**0:17–0:27 (frames 510–810)** · `src/scenes/Showcase.tsx` · Dark

Five real screens, two seconds each, inside the site's browser frame (light chrome, mono domain, deep soft shadow). Each slides in from the right with a 1.5° settle, pans slowly up its page, and carries its category as the headline with the project's own name, kind and status.

| Beat | Frame | Category | Project | Status |
|---|---|---|---|---|
| Wipe + 1 | 510–570 | Custom software | OM ENTERPRISE, client project | Live |
| 2 | 570–630 | SaaS product | LimitYourAPI, developer SaaS | Live |
| 3 | 630–690 | AI integration | StartupDeckAI, AI SaaS | Live |
| 4 | 690–750 | Web application | ScopeCI, GitHub App for agencies | Waitlist |
| 5 | 750–810 | Website | StackWise, studio website | Live |

Eyebrow: "PRODUCTS WE HAVE BUILT AND SHIPPED" with five progress ticks that fill in the accent as each screen plays. The status badge is lime only when the site says "Live"; ScopeCI is honestly labelled "Waitlist".

Voice: "From SaaS platforms and AI-powered applications to websites and custom software, we design, build and ship digital products."

---

## Scene 5: How we work
**0:27–0:34 (frames 810–1020)** · `src/scenes/Process.tsx` · Dark

| Beat | Frame | On screen |
|---|---|---|
| Wipe | 810–832 | Canvas wipes in from the left. |
| Eyebrow + title | 818–834 | "HOW WE WORK" / "Four steps, one engineer." |
| Rule | 832–966 | An accent rule runs down the list (9:16) or across the row (16:9). |
| 01 Plan | 832 | "Scope, a technical plan and a timeline, agreed in writing." |
| 02 Design | 870 | "Clickable Figma designs before any code is written." |
| 03 Build | 908 | "Front end, back end, database and integrations, on a live staging link." |
| 04 Launch | 946 | "Device testing, a speed and security pass, then launch and handover." |
| Footer | 956 | "WEEKLY CALL AND A LIVE STAGING LINK THROUGHOUT" |

Each step's title goes from 40% white to full white and its number to the accent as the rule reaches it. The step copy is the site's own.

Voice: "From the first conversation and design to engineering and launch, we stay with you through every step."

---

## Scene 6: What you get
**0:34–0:40 (frames 1020–1200)** · `src/scenes/Promise.tsx` · Paper

| Beat | Frame | On screen |
|---|---|---|
| Wipe | 1020–1042 | Paper wipes down over the canvas. |
| Eyebrow | 1030 | "WHAT YOU GET, EVERY PROJECT" |
| 1 | 1036 | "Direct with the engineer." marker on "the engineer." at 1058; note "NO ACCOUNT MANAGERS, NO HAND-OFFS" |
| 2 | 1090 | "Clear, fixed pricing." marker on "fixed" at 1112; note "A WRITTEN QUOTE BEFORE WORK STARTS" |
| 3 | 1144 | "100% code ownership." marker on "100%" at 1166; note "THE CODE AND IP ARE YOURS" |

Earlier statements dim to 45% as the next lands, so the three read as one stacked promise.

Voice: "Work directly with the engineer building your product. Know what you're paying. Own what we build."

---

## Scene 7: Let's build
**0:40–0:44 (frames 1200–1320)** · `src/scenes/Outro.tsx` · Dark

| Beat | Frame | On screen |
|---|---|---|
| Wipe | 1200–1220 | Canvas wipes up. |
| Headline | 1210–1270 | "Your next product, built right from day one." (the site's own H1), marker on "built right" at 1244. |
| Wordmark | 1230–1282 | "STACKWISE" unmasks with its accent rule. Final sub hit. |
| Address | 1254 | "stackwise.yashsuthar.dev" in mono. |
| Button | 1258–1284 | Accent pill "Let's build ↗", the arrow nudging up-right. |
| Footer | 1270 | "INDEPENDENT SOFTWARE STUDIO, MUMBAI" / "FOUNDED BY YASH SUTHAR" |
| Hold | 1284–1320 | Everything settled; the end card holds for 1.2 s. The camera relaxes from 1.02 to 1.0. |

Voice: "Have an idea? Let's build it. StackWise."
