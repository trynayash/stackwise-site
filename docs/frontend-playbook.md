# StackWise frontend playbook, for upgrading yashsuthar.dev

This guide covers StackWise's layouts, sections, components, buttons and animations, written so an agent can rebuild the same look and feel on Yash Suthar's portfolio (yashsuthar.dev).

The working reference is the StackWise repo: `github.com/trynayash/stackwise-site` (live at https://stackwise.yashsuthar.dev). File paths below point into that repo.

---

## 1. Prompt to give the agent

> You are upgrading the frontend of my portfolio, **yashsuthar.dev**. The portfolio's content, SEO, metadata, structured data and FAQs are already right and must stay exactly as they are. Your job is the UI/UX only: layouts, sections, components, buttons, motion and responsiveness.
>
> Bring it up to the standard of my studio site, StackWise (https://stackwise.yashsuthar.dev, repo `trynayash/stackwise-site`). Read `docs/frontend-playbook.md` in that repo first and follow it as the design spec.
>
> 1. **Audit first.** Read the portfolio codebase: stack, routes, sections, existing components (it already has a `Roll` text effect), brand colours and fonts. Take screenshots of every page at 390px and 1280px. Write a short plan mapping each portfolio section to a StackWise pattern from section 6 of the playbook. Wait for my OK before building.
> 2. **Keep the portfolio's identity.** Keep its logo, name, copy, accent colour and fonts. If they're already close, map StackWise's design tokens onto them. Don't rename sections or invent content: no fake numbers, testimonials, clients or awards.
> 3. **Build in this order:**
>    1. tokens and primitives: Button, Magnetic, Tilt, Reveal and Stagger with the reached-fallback, WordReveal, Enter, the `.rise-word` and `.page-enter` CSS
>    2. navbar and mobile menu
>    3. hero
>    4. work grid and project cards
>    5. light "what I do" panel
>    6. stats and proof bento
>    7. about card with scroll-lit quote
>    8. logo loop and kinetic band
>    9. CTA band and footer
> 4. **Follow the rules in sections 2, 4, 7 and 8 of the playbook:**
>    - no glows, gradient blobs, dot grids, sparkles or decorative lines
>    - Hugeicons only, no Lucide
>    - LCP-safe motion: nothing above the fold starts at opacity 0
>    - honour reduced motion
>    - tap targets of 44px or more
>    - nothing overflows or gets hidden at 320px
> 5. **Verify before every commit:**
>    - typecheck, lint and build
>    - screenshots at 320, 390, 768, 1024, 1280 and 1920
>    - Lighthouse on mobile: performance 90 or more, accessibility 100
>    - the responsive audit in section 9
> 6. **Git rules:**
>    - Commit as `Yash Suthar <yashrsuthar90@gmail.com>`.
>    - Never add `Co-Authored-By` or any other trailer.
>    - Don't rewrite published history unless I ask.
>    - Push to the branch I name. Don't open pull requests unless I ask.

---

## 2. Design language

**The feel:** confident, editorial, product-led. Big tight headlines, a lot of black, one sharp accent, real screenshots of real work, and motion that responds to the user rather than decorating the page.

**Do:**
- Use flat layered greys for depth, never glow.
- Use the accent colour as a solid fill only (buttons, chips, the selected state, one highlight card).
- Make real product screenshots the visual hero.
- Put one idea per section, with a short eyebrow, a big heading and one line of support.
- Alternate dark sections with one light "paper" panel for rhythm.
- Make motion respond to the user (scroll, cursor, hover) and let it settle quickly.

**Never:**
- glow, neon shadows, gradient blobs, radial spotlights or "aurora" backgrounds
- dot grids, graph-paper grids, decorative lines, dashed connectors or sparkles/stars
- Lucide icons (use Hugeicons: `@hugeicons/react` and `@hugeicons/core-free-icons`)
- emoji in the UI
- glassmorphism cards
- text that starts invisible above the fold
- blur animations, which are expensive and hurt Lighthouse
- AI-sounding filler copy

---

## 3. Design tokens

Tailwind v4 tokens in `src/app/globals.css`. Map them onto the portfolio's colours if it already has a brand.

```css
@import "tailwindcss";

/* Screen-height variants: landscape phones have little vertical room */
@custom-variant short (@media (max-height: 520px));
@custom-variant tall (@media (min-height: 640px));

@theme {
  --font-sans: var(--font-space-grotesk), system-ui, sans-serif;
  --color-canvas: #0a0a0a;      /* page background */
  --color-surface: #111111;     /* cards */
  --color-surface-2: #161616;   /* hovered or raised cards */
  --color-surface-3: #1c1c1c;
  --color-paper: #f2f1ec;       /* the one light panel */
  --color-ink: #0b0b0b;         /* text on paper */
  --color-accent: #C8FF00;      /* solid only */
  --color-accent-hover: #d6ff3d;
}

@layer base {
  /* In the base layer so outline-none can switch it off where needed */
  :focus-visible { outline: 2px solid #C8FF00; outline-offset: 3px; }
}
::selection { background: #C8FF00; color: #000; }
section[id] { scroll-margin-top: 5.5rem; }
```

**Type**
- Font: Space Grotesk, self-hosted as a variable font with `next/font/local` (weights 300–700). Never load it from Google at build time.
- Hero H1: `text-[2.5rem] min-[400px]:text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5.4rem] leading-[1.02] tracking-[-0.05em] font-semibold`
- Section H2: `text-[2.125rem] sm:text-[2.75rem] md:text-[3.5rem] leading-[1.06] tracking-[-0.04em] font-semibold text-balance`
- Card H3: `text-xl md:text-2xl font-semibold tracking-[-0.03em]`
- Body: `text-base md:text-lg leading-relaxed text-white/60 text-pretty`
- Eyebrow: `text-sm md:text-[15px] font-medium text-accent`
- Minimum text size is 12px, and secondary text is never below `text-white/50`.

**Shape and spacing**
- Radii:
  - cards `rounded-3xl`
  - big panels `rounded-[2rem] md:rounded-[3rem]`
  - buttons, chips and badges `rounded-full`
- Sections use `py-20 md:py-28`. The container is `container mx-auto px-5 sm:px-6`.
- Card padding is `p-7 md:p-8`; large cards use `p-8 md:p-10`.
- The only shadow is a soft deep drop under floating media: `shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]` plus `ring-1 ring-white/10`.

---

## 4. Motion system

| Use | Value |
|---|---|
| Standard easing | `cubic-bezier(0.16, 1, 0.3, 1)` (fast out, long settle) |
| Entrances | 0.6–0.9s, 0.07s stagger between items |
| Hover transitions | 0.3–0.5s |
| Springs: magnetic | stiffness 220, damping 16, mass 0.4 |
| Springs: tilt | stiffness 180, damping 18 |
| Springs: deck cards | stiffness 170, damping 24 |
| Springs: nav pill | stiffness 380, damping 32 |
| Smooth scroll | Lenis, duration 1.2, easing `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |

**Rules learned the hard way:**
1. **Above the fold, animate in CSS, not JavaScript,** so the content paints before hydration.
   - Headlines start at opacity **0.35, never 0**. Chrome skips content painted at opacity 0 when it measures LCP.
   - The page transition is transform-only, with no fade.
2. **Never animate `filter: blur()`.** It cost about 25 Lighthouse points.
3. **Make continuous loops CSS** (logo strip, badge spin), or gate any `requestAnimationFrame` loop on being in view.
4. **Scroll reveals need a fallback.** IntersectionObserver misses elements that a fast fling or anchor jump skips past, and they then stay invisible forever. Use `useReached` (5.4), which reveals anything above the viewport bottom.
5. **Count-ups must land on the real number** even if the visitor jumps past them, so start them with `useReached`.
6. **Respect `prefers-reduced-motion`:** wrap the app in `<MotionConfig reducedMotion="user">` and add the CSS kill-switch below.
7. **Pointer effects** (magnetic, tilt, cursor label) run for `pointerType === "mouse"` only. Touch and keyboard users get the plain element.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  .marquee { animation: none; }
}
```

---

## 5. Component recipes

Copy them from the StackWise repo. The core of each is below.

### 5.1 Button: fill slides up, label rolls, arrow swaps, press shrinks
Source: `src/components/ui/button.tsx`, plus the `.roll` CSS in `globals.css`.

```ts
const base = "btn-roll group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold transition-[color,transform] duration-300 ease-out active:scale-[0.97] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:translate-y-0";
const variants = {
  primary:   "bg-accent text-black before:bg-white",
  secondary: "bg-white/[0.08] text-white before:bg-accent hover:text-black",
  dark:      "bg-black text-white before:bg-white hover:text-black",
  ghost:     "text-white/70 hover:text-white before:hidden",
};
const sizes = { sm: "h-10 px-4 text-sm", md: "h-12 px-6 text-[15px]", lg: "h-14 px-8 text-base" };
```
```css
.roll { display:inline-block; height:1.3em; overflow:hidden; line-height:1.3; vertical-align:top; }
.roll-inner { display:flex; flex-direction:column; transition: transform .45s cubic-bezier(.16,1,.3,1); }
.btn-roll:hover .roll-inner, .btn-roll:focus-visible .roll-inner { transform: translateY(-50%); }
```
- The label renders twice, stacked: `<span class="roll"><span class="roll-inner"><span>Text</span><span aria-hidden>Text</span></span></span>`.
- The arrow is two icons in an 18px clipped box. The first slides out (`group-hover/btn:translate-x-full`) while the second slides in from `-translate-x-full`.

### 5.2 Magnetic: the CTA leans toward the cursor
Source: `src/components/ui/interactive.tsx`.
```tsx
const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 }), y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
<motion.div style={{ x, y }} className="inline-block"
  onPointerMove={(e) => { if (reduced || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3); y.set((e.clientY - (r.top + r.height / 2)) * 0.3); }}
  onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
```
Use it on primary CTAs, the navbar CTA and footer social icons. Use strength 0.25 in the navbar and 0.4 on small icons.

### 5.3 Tilt: cards tilt in 3D toward the cursor
Wrap the card in a `[perspective:900px]` div. On the inner `motion.div` (`[transform-style:preserve-3d]`):
- set `rotateY = (x - 0.5) * max * 2` and `rotateX = -(y - 0.5) * max * 2`, using springs at stiffness 180 / damping 18
- scale to 1.02 while hovered
- use `max = 5–7` degrees

Use it on process, price and proof cards. Not on images.

### 5.4 Reveal, Stagger and `useReached`: scroll entrances that can't get stuck
Source: `src/components/ui/use-reached.ts` and `src/components/ui/motion-primitives.tsx`.
- `useReached(offset = 60)` returns `[ref, reached]`.
  - `reached` becomes true when the element's top is within `offset` px of the viewport bottom, or the page is scrolled to the end. It never goes back to false.
  - One shared, rAF-throttled scroll listener measures after paint (`requestAnimationFrame(() => setTimeout(check, 0))`) and removes itself when nothing is waiting.
- `Reveal`: `initial={{opacity:0, y:24}} animate={reached ? {opacity:1, y:0} : undefined}` over 0.7s.
- `Stagger` and `StaggerItem`: the parent uses variants `hidden`/`show` with `staggerChildren: 0.07`; each child goes from `{opacity:0, y:20}` to `{opacity:1, y:0}` over 0.6s.
- Pass a negative offset (e.g. `useReached(-800)`) to start loading heavy components about a screen early.

### 5.5 WordReveal: headings rise word by word
Each word is wrapped in `<span class="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">`. The inner `motion.span` animates from `y: "110%", rotate: 6` to `y: "0%", rotate: 0` over 0.9s, with a 0.07s stagger.
- The trigger goes on the outer span. Each word starts clipped by its own mask, so measuring the words themselves would never count as visible.
- Keep the full sentence for screen readers with `aria-label={text} role="text"`, and mark the word spans `aria-hidden`.
- Above the fold, use the CSS version instead (`.enter-word`: from `translateY(105%)` to none over 0.8s).

### 5.6 Hero headline: rising words and a rotating last word
```css
.rise-word { display:inline-block; animation: riseWord 1s cubic-bezier(.16,1,.3,1) both; animation-delay: var(--d,0ms); }
@keyframes riseWord { from { opacity:.35; transform: translateY(.4em) rotate(3deg); } to { opacity:1; transform:none; } }
```
- Stagger the words with `--d` at 0, 70, 140 and 240ms.
- The last line is a rotating word: `AnimatePresence mode="popLayout"`, entering from `{y:"100%", rotate:4}` and exiting to `{y:"-100%", rotate:-4}` over 0.55s, cycling every 2.4s.
- Wrap it in `inline-flex overflow-hidden` and give the words `whitespace-nowrap`.
- Put the full sentence in an `sr-only` span and mark the visual line `aria-hidden`.
- For the portfolio, cycle what Yash does, e.g. "SaaS products." / "AI features." / "fast websites."

### 5.7 Enter and the page transition
- `Enter` is a CSS-only fade-up for hero copy (`.enter-fade`: from `opacity 0; translateY(12px)` over 0.7s, with a `--d` delay). Use it for below-headline copy only, never for the LCP element.
- `src/app/template.tsx` wraps every page in `<div class="page-enter">`, which animates from `translateY(10px)` to none over 0.6s. It's transform-only.

### 5.8 Project deck (used as an alternative hero visual)
Source: `src/components/sections/project-deck.tsx`.
- A stack of real screenshots. Each card sits at a position based on its distance from the front:
```ts
const STACK = [
  { x:"0%",  y:"0%",   scale:1,    rotate:0, opacity:1 },
  { x:"6%",  y:"-15%", scale:.92,  rotate:4, opacity:.85 },
  { x:"11%", y:"-28%", scale:.84,  rotate:8, opacity:.5 },
];
const LEAVING = { x:"-16%", y:"14%",  scale:.94, rotate:-6, opacity:0 };
const HIDDEN  = { x:"15%",  y:"-38%", scale:.76, rotate:11, opacity:0 };
```
- Each card is a `motion.div animate={target}` with a spring (stiffness 170, damping 24).
- The deck auto-advances every 4.2s and pauses on hover and focus.
- The whole deck tilts toward the mouse (rotateY ±7°, rotateX ±5°) inside a 1400px perspective.
- Keep one stable `<Link>` per card. If the wrapper element changes, the image re-mounts on every shuffle.
- A caption sits below (name, plus kind and status) with prev/next buttons (`h-11 w-11`). Reserve two lines of caption height on phones so the buttons don't jump.
- Scroll parallax with `useScroll` on the hero: the deck drifts `y 0 → -90`, `rotate 0 → -4`, and the copy `y 0 → 60`.

### 5.9 Circular badge: rotating text ring with an arrow
An SVG `textPath` around a circle of radius 56. Set `textLength = round(2π·56) - 6` so the text fills exactly one lap without overlapping.
- The ring spins slowly in CSS (`spin 22s linear infinite`).
- A nested copy spins at 4s with `animation-play-state: paused`, running only on `.group:hover`. That speeds up on hover without the ring jumping.
- The centre is an accent circle (`h-16 w-16`) holding an up-right arrow that rotates 45° and scales to 1.1 on hover.
- Position it overlapping the deck's corner, and show it from desktop up (`hidden lg:flex`).
- Use `useId()` for the path id. `Math.random()` would break hydration.

### 5.10 Work card: clip-path wipe, inner parallax, cursor label
Source: `src/components/work/work-card.tsx`.
- **Reveal:** `clipPath: inset(12% 12% 12% 12% round 24px)` animates to `inset(0% 0% 0% 0% round 24px)` over 1.1s, triggered by `useReached`.
- **Parallax:** the inner image wrapper is `absolute inset-x-0 -top-[7%] -bottom-[7%]`, with `y` following `useScroll` from `-6%` to `6%`. The image scales to 1.04 on card hover.
- **Cursor label (`CursorFollow`):** a 96px accent circle reading "View case study". It follows the mouse on springs (stiffness 450, damping 38), scales from 0.2 to 1 on enter, and is mouse-only and desktop-only.
- **Status badge:** `rounded-full px-3 py-1 text-xs font-semibold` in the corner. Use the accent for "Live", and `bg-black/70 backdrop-blur` otherwise.
- **Grid:** every third card spans the full row (`md:col-span-2`, aspect `16/10` on mobile, `2/1` on desktop); the others sit in pairs. Use `gap-y-14 md:gap-y-16`.
- **Footer row:** name and tagline on the left; kind plus a round arrow on the right, turning accent on hover.

### 5.11 Kinetic band: velocity-reactive marquee
Source: `src/components/sections/marquee.tsx`.
- Two rows of huge words (`text-[2.75rem] sm:text-6xl md:text-8xl`). The second row is outlined (`text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.55)]`). Accent slashes separate the words.
- The base drift is ±2.2%/s. Scroll velocity, through a spring, maps `[-1500, 0, 1500] → [-4, 0, 4]`, which boosts the speed and flips direction.
- Use 4 copies of the words in the strip and wrap at -25%.
- Gate the rAF loop with `useInView(ref, { margin: "100px" })`.
- Mark the strip `aria-hidden` and put an `sr-only` sentence in its place.

### 5.12 Logo loop (CSS-only)
```css
.marquee { display:flex; width:max-content; animation: marquee var(--marquee-duration,40s) linear infinite; }
.marquee:hover { animation-play-state: paused; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```
- Render the list twice; the second copy is `aria-hidden`.
- Fade the edges with a mask: `[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]`.
- Each item is a tech logo (28px, 70% opacity) plus its name, going to full white on hover.

### 5.13 Scroll-lit quote and count-ups
Source: `src/components/ui/scroll-effects.tsx`.
- **`ScrollLitText`:** each word's opacity goes from 0.3 to 1 as `useScroll({ target, offset: ["start 85%", "end 55%"] })` passes through that word's slice.
  - Use a **function** transform: `useTransform(p, v => 0.3 + 0.7 * clamp((v - a) / (b - a)))`. The range form can be handed to a native scroll timeline, and then words you've already read fade back.
  - With reduced motion, show the same markup at full opacity.
- **`CountUp`:** keeps any prefix and suffix ("3,400+", "₹98,999", which uses en-IN grouping). It animates 0 → target over 1.4s and starts on `useReached(40)`. The real value sits in an `sr-only` span.

### 5.14 Navbar
- `fixed` at `h-[72px]`, transparent at the top. After 16px of scroll it becomes `bg-canvas/85 backdrop-blur-xl`.
- It hides when scrolling down past 480px (`-translate-y-full`) and comes back on any scroll up. Ignore deltas under 6px.
- A hover pill slides between links: `motion.span layoutId="nav-pill"` with `bg-white/[0.08] rounded-full` and a spring (stiffness 380, damping 32).
- Desktop mega menu: a 12-column grid. The left 6 columns hold a 2-column list (icon tile, label and one-line summary). The middle 3 hold grouped links. The right 3 hold an accent CTA card. A bottom strip carries secondary links.
- The CTA on the right is Magnetic.
- Mobile menu:
  - full-screen `bg-canvas` with big `text-2xl` links and expandable groups
  - CTA button plus email pinned at the bottom
  - on `short:` screens (landscape) the links go into two columns and the bottom bar turns into a single row

### 5.15 Sticky mobile CTA
- After 80% of the first screen, a bottom bar slides up: an email icon button plus a full-width primary button.
- It hides over the footer and over any section that already shows the same CTA.
- On desktop it becomes a floating pill (avatar, label and sub-label) in the bottom-right corner.

### 5.16 Small details that sell it
- `.link-draw`: an underline that draws in from the left, using a background-size transition from 0% to 100% at 1px over 0.35s.
- Icon tiles: `h-12 w-12 rounded-2xl` on `bg-accent text-black`, or on `bg-white/[0.06]`.
- In process cards, the icon pops in with a spring (`scale .5 → 1, rotate -20 → 0`, stiffness 260, damping 14).
- Chips: `rounded-full bg-surface px-4 py-2.5 text-sm`, each with a tick icon in the accent.

---

## 6. Section blueprints, mapped to a portfolio

| # | Section | Layout | Motion |
|---|---|---|---|
| 1 | **Hero (light panel)** | Full-bleed `bg-paper text-ink` section marked `data-nav-light` so the navbar switches to dark text over it. Mono uppercase eyebrow with a live dot ("Independent software studio · Mumbai"). Three-line H1 (`lg:text-[4rem] xl:text-[4.5rem]`, leading 0.98) with the key phrase in a marker highlight: `bg-accent px-[0.12em] -mx-[0.12em] rounded-[0.22em] [box-decoration-break:clone]`. Paragraph, a dark primary button plus an underlined "Explore our work" link, then a 3-column trust row divided by hairlines. Right column: a stage of two real product screenshots (`hero-stage.tsx`): the front one in a thin browser frame showing only the domain, tilting toward the cursor and linking to its case study; the second layered behind at a 3° rotation; a white caption card with the product name, kind and status. Frames stack in flow on phones and sit in a fixed box from `md`. A mono bottom strip carries starting prices and the stack. | `.rise-word` headline, CSS `Enter` for copy and each mockup window, scroll parallax (`visualY` 0 → -70, `copyY` 0 → 40) |
| 2 | **Kinetic band** | Two full-bleed rows of big words (what Yash builds or works with) | Velocity marquee |
| 3 | **Selected work** | Section header (eyebrow, H2 and a "See all" button on the right), then the work grid (every 3rd card full width) | Clip-path wipe, inner parallax, cursor label, staggered Reveal |
| 4 | **What I do (paper panel)** | `mx-2 sm:mx-3 rounded-[2rem] md:rounded-[3rem] bg-paper text-ink`. Left 5 columns: a selectable list (big label, summary, round icon; the selected item gets `bg-white` and an accent icon). Right 7 columns: a sticky detail panel (screenshot, intro, chips, tick list, CTA). On mobile the details open under the selected item. Below: "Also" chips. | `AnimatePresence mode="wait"` panel swap (y 14 → 0, 0.3s); mobile accordion uses height auto |
| 5 | **Stack loop** | One centred line of copy, then the logo strip | CSS marquee |
| 6 | **Process / how I work** | 4 Tilt cards (`sm:grid-cols-2 lg:grid-cols-4`): accent icon tile, small week chip, title, text, tick list pushed to the bottom with `mt-auto`. Then a wide card with a question on the left and a button on the right. | Stagger, icon pop, tilt |
| 7 | **Proof / numbers** | Bento: an accent identity card (avatar initials, name, role, location, scroll-lit quote, link buttons) on 5 columns; a 2×2 grid of proof cards (big CountUp number, accent label, short text, link) on 7 columns | Count-ups, scroll-lit quote, tilt on the proof cards |
| 8 | **Writing / research** | Cards or a list: title, outlet, date, round arrow | Stagger |
| 9 | **CTA band** | A big accent card (`rounded-[2rem] md:rounded-[2.5rem] bg-accent text-black`): heading and buttons on 7 columns, a numbered "what happens next" list on 5 | Reveal; Magnetic CTA |
| 10 | **Footer** | `bg-surface rounded-t-[2rem] md:rounded-t-[3rem]`: brand, blurb, email, magnetic round social icons, link columns, then a bottom bar (copyright, Privacy, Terms, Back to top) | Link-draw underlines |

Section header pattern: eyebrow (accent, in a Reveal) → H2 (WordReveal) → optional description or action on the right at `lg`, wrapped in a Reveal with a 0.15s delay.

---

## 7. Responsive and accessibility rules

- **Test at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px, plus landscape phones (844×390, 667×375).**
- **No horizontal page overflow anywhere.**
  - Long words and code wrap (`[overflow-wrap:anywhere]` inside article bodies).
  - Tables become one labelled card per row below `sm`. Use `data-label` with `before:content-[attr(data-label)]`, and put a screen-reader-only header on phones.
- **Headline sizes are tuned so the longest hero line fits at 320px** and in the 6-column split at 1024px. Measure; don't guess.
- **Tap targets are 44px or more on touch devices:**
  - for nav, footer and breadcrumb links use `inline-flex min-h-11 items-center`
  - icon buttons are `h-10 w-10` at minimum
  - chips use `py-2.5`
- **Nothing hidden or faint:**
  - body text no lower than `/60`, secondary no lower than `/50`; on paper, `ink/65` or stronger
  - hover-only hints get a `[@media(hover:none)]:` variant so touch users see them
- **Short screens:** use the `short:` and `tall:` variants. Compact the menu and any drawer, and give scrolling content space before decoration.
- **Keyboard:**
  - Use the global accent focus ring.
  - Collapsed accordion panels stay in the DOM but are `inert` and `aria-hidden`.
  - Carousels pause on focus.
- **Semantics:** one H1 per page, `aria-label` on sections, `sr-only` full text behind any split or animated text, and `alt` text on real images.

---

## 8. Performance rules

1. **LCP-safe hero:** CSS animations, opacity never below 0.35 for the LCP element, and the first screenshot preloaded.
2. **Keep heavy things off the first load.** Load chat widgets, big interactive panels and anything below the fold with `next/dynamic` when the user gets near them (`useReached(-800)`), behind a same-size placeholder so nothing shifts.
3. **Send client components only what they render.** Pass minimal props from server components. Don't import whole content files into `"use client"` modules, because everything they import ships to the browser.
4. **Continuous animations:** CSS where possible; rAF loops only while in view.
5. **No blur filters, no `opacity: 0` hero content, no layout-shifting reveals.** Reserve space for anything that changes height, like rotating captions.
6. **Self-host fonts** with `next/font/local`, and use `next/image` with proper `sizes`.
7. **Targets:** Lighthouse mobile performance 90 or more, accessibility, best practices and SEO all 100, and CLS 0.

---

## 9. QA checklist (run before every push)

- **Typecheck, lint and build** must be clean: `npx tsc --noEmit`, `npx eslint src`, `npm run build`.
- **Responsive audit** with a Playwright script. StackWise's lives in the session tooling; rebuild it as `scripts/audit.mjs`.
  - Load every route at the 8 widths and scroll each page frame by frame.
  - Flag: horizontal overflow, elements off-screen, text under 12px, text with effective opacity under 0.6, clipped `nowrap` text, touch targets under 40px, broken images and console errors.
  - Fix everything except transient mid-animation frames.
- **Jump test:** load `/#section` and jump straight to the bottom. Every section above must be visible and every count-up must show its final value.
- **Screenshots** of every section at 320 and 1280, and open overlays (menu, drawer) at 390 and on landscape phones.
- **Lighthouse (mobile)** three runs; ignore a single cold-start outlier.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the page must read fine with no movement.

---

## 10. File map in the StackWise repo

| What | Path |
|---|---|
| Tokens, CSS animations | `src/app/globals.css` |
| Button | `src/components/ui/button.tsx` |
| Magnetic, Tilt, CircularBadge | `src/components/ui/interactive.tsx` |
| Reveal, Stagger, WordReveal, SectionHeader | `src/components/ui/motion-primitives.tsx` |
| useReached | `src/components/ui/use-reached.ts` |
| CountUp, ScrollLitText | `src/components/ui/scroll-effects.tsx` |
| Enter (CSS hero entrance) | `src/components/ui/enter.tsx` |
| Hero (light panel) | `src/components/sections/hero.tsx` |
| Hero stage (real screenshots) | `src/components/sections/hero-stage.tsx` |
| Project deck | `src/components/sections/project-deck.tsx` |
| Kinetic band | `src/components/sections/marquee.tsx` |
| Logo loop | `src/components/sections/stack-loop.tsx` |
| Work card, grid, cursor label | `src/components/work/work-card.tsx` |
| Paper panel with selectable list | `src/components/sections/services.tsx` |
| Process cards | `src/components/sections/process-timeline.tsx` |
| Bento with quote and count-ups | `src/components/sections/about.tsx` |
| CTA band | `src/components/sections/cta-band.tsx` |
| Navbar, mega menu, nav pill | `src/components/layout/navbar.tsx` |
| Mobile menu | `src/components/layout/mobile-nav.tsx` |
| Sticky mobile CTA | `src/components/layout/mobile-cta-bar.tsx` |
| Footer | `src/components/layout/footer.tsx` |
| Smooth scroll (Lenis) | `src/components/providers/smooth-scroll.tsx` |
| Page transition | `src/app/template.tsx` |
