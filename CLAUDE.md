# my-templates

Website templates (landing pages, login/signup, single-page sites). Each template lives in its own folder, e.g. `royal-stitch-studio/`.

The owner wants every template to look **top-tier and current**, never generic or "AI-generated". `royal-stitch-studio/` is the reference for the minimum quality bar. Each new template should beat it.

## Design skills

Two official design skills are installed in `.claude/skills/`:

- **impeccable** ([pbakaus/impeccable](https://github.com/pbakaus/impeccable)): use `/impeccable polish`, `audit`, `critique`, `animate` etc. Read `reference/craft-floor.md` before any UI edit.
- **taste-skill** ([Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)): anti-slop art direction for landing pages, with house rules and a critique rubric.

Where the two disagree, keep the template's committed identity (impeccable: "polish preserves, redesign replaces") and apply the rules both share.

## Design rules

- **Start from a concept, not a component kit.** Pick a direction that fits the brand (e.g. Royal Stitch = tailor's atelier: paper, ink, thread, measuring tape, fabric swatches) and let the details come from it.
- **Avoid the generic look:** no default gold-on-black glassmorphism, no purple-blue gradients, no Poppins/Inter-everywhere, no icon-in-a-circle feature grids, no Bootstrap-default cards.
- **Typography leads.** Pair a characterful display face (e.g. Instrument Serif, Fraunces) with a clean sans (e.g. Geist); two faces is normal, a third (mono) only for real measurements. Use confident headline sizes and italics for emphasis.
- **Colour:** a deliberate palette of 1 base + 1 ink + 1–2 accents, defined as CSS variables on `:root`. Alternate light and dark sections for rhythm.
- **Layout:** editorial grids, generous whitespace, asymmetry where it helps. Separate surfaces with a tone step, not lines.
- **No eyebrows** (small label above a heading), no decorative index numbers (01/02) unless the order matters (a real `<ol>`), no tiny uppercase tracked labels.
- **Monospace only for real measurements/code** (e.g. a measuring tape), not as a "technical" costume. Use tabular figures for prices and times.
- **Headlines:** two lines max at every width, display size ≤ 6rem, tracking no tighter than -0.04em, `text-wrap: balance`. Large statements stay ≤ ~46px.
- **Accent colour** on the main action and at most one other thing. Avoid the default cream + rust / violet-indigo palettes.
- **No glass/backdrop blur, no gradient text, no glows**; shadows only on things that float, with offset + soft blur.
- **Never invent proof** (customer counts, reviews, press). Flag sample content for the owner.
- **Give the page one "live thing"** made from the subject (e.g. Royal Stitch's turnaround checker in the contact form).
- **Theme the browser surfaces:** selection, caret, scrollbar, focus ring, underline offset.
- **Copy:** specific and human (real details, prices, timings), not filler like "premium quality solutions".
- **Images:** never let a broken image wreck the layout. Give image containers a fitting background and handle `onerror`. Prefer CSS-drawn visuals when they fit the concept.

## Motion rules

Use motion with intent: smooth, eased (`cubic-bezier(0.22, 1, 0.36, 1)`), never janky.

- Short intro loader (≤ 1.5s) with a CSS fail-safe so it can never block the page
- Split-text headline reveals, clip-path image reveals, light parallax
- At least one scroll-linked signature effect tied to the concept (e.g. measuring tape, reading-highlight text, filling progress line)
- Unicode/emoji never stand in for icons; use inline SVG
- Hover craft: custom cursor (fine pointers only), magnetic buttons, animated underlines, hover previews
- Animate only `transform`, `opacity`, `clip-path`; batch scroll work in `requestAnimationFrame`
- **Always** honour `prefers-reduced-motion` and make the page work without JS (`no-js` class fallback)

## Tech

- Plain HTML, CSS and vanilla JS by default; no framework unless the template needs one (or is a React template)
- Structure: `index.html`, `assets/css/style.css`, `assets/js/main.js`, plus a template `README.md`
- Inline SVG icons (sprite) instead of icon-font CDNs
- Forms: inline validation and success states, no `alert()`
- Accessible: semantic HTML, labels, visible `:focus-visible`, `aria-*` on toggles/menus

## Before calling it done

1. Serve the folder locally and open it in headless Chromium (Playwright, `executablePath: '/opt/pw-browsers/chromium'`)
2. Screenshot every section at **1440px**, **768px** and **390px**, then look at them and fix what looks off
3. No console/page errors, no horizontal overflow (`scrollWidth === innerWidth`), text contrast ≥ 4.5:1 (3:1 for large), no headline over two lines
   (taste-skill's own `scripts/lint.mjs` / `inspect.mjs` can do this too if the environment allows running them)
4. Check reveal animations actually fire. IntersectionObserver ignores fully clipped elements, so observe the parent.
5. Update the template's README (features, customisation)

Note: cloud sandboxes may block CDNs/Unsplash. Missing photos in screenshots can be the sandbox, not the code. Say so instead of guessing.

## Portfolio / case-study PDFs

- The owner's house style for portfolios and case studies is **Poppins** for all text (this overrides the font advice above for these documents).
- Format follows the owner's examples: one continuous page, sections separated by background, a "main screens" section with captioned key screens, and a separate "all screens" gallery grouped by area.
- Real screenshots go in the case study's `screens/` folder; never present illustrations as real screens.

## Communication

The owner writes in Hinglish. Reply in the same casual Hinglish, keep it clear, and share preview links (raw.githack.com for branches) and screenshots after each change.
