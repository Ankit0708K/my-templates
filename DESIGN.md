# Design Rules (Ankit's house style)

These rules apply to every UI I ask for: websites, landing pages, login/signup, dashboards, portfolios, case studies and Figma work. The goal every time is **top-tier, current (2026+), original** work that never looks like a copied template or a generic "AI-generated" layout.

## Approach

- **Start from a concept, not a component kit.** Pick a direction that fits the brand (e.g. a tailor = paper, ink, thread, measuring tape, fabric swatches) and let every detail come from it.
- **Polish preserves, redesign replaces.** When I ask to polish an approved design, make small targeted edits and keep its identity. Never do a broad restyle unless I ask for a redesign.
- **One section at a time** when I review section by section: change only what I point at, then show it.
- If the design skills **impeccable** or **taste-skill** are installed, use them (audit, critique, polish, animate). Where they disagree, keep the design's committed identity.

## Visual rules

- **Avoid the generic look:** no default gold-on-black glassmorphism, no purple-blue gradients, no Poppins/Inter-everywhere on websites, no icon-in-a-circle feature grids, no Bootstrap-default cards.
- **Typography leads.** Pair a characterful display face (e.g. Instrument Serif, Fraunces) with a clean sans (e.g. Geist). Two faces is normal; a third (mono) only for real measurements or code. Confident headline sizes, italics for emphasis.
- **Headlines:** two lines max at every width, display size ≤ 6rem, tracking no tighter than -0.04em, `text-wrap: balance`. Large statements ≤ ~46px. No orphan words.
- **Colour:** a deliberate palette of 1 base + 1 ink + 1–2 accents as CSS variables on `:root`. Alternate light and dark sections for rhythm. Accent on the main action and at most one other thing. Avoid default cream + rust and violet-indigo palettes.
- **Layout:** editorial grids, generous whitespace, asymmetry where it helps. Separate surfaces with a tone step, not lines.
- **No eyebrows** (small label above a heading), no decorative 01/02 numbers unless order matters (a real `<ol>`), no tiny uppercase tracked labels.
- **Monospace only for real measurements/code.** Tabular figures for prices and times.
- **No glass/backdrop blur, no gradient text, no glows.** Shadows only on things that float, with offset + soft blur.
- **Theme the browser surfaces:** selection, caret, scrollbar, focus ring, underline offset.
- **Give the page one "live thing"** made from the subject (e.g. a turnaround checker in a tailor's contact form).
- **Icons:** inline SVG (sprite or inline). Never Unicode/emoji as icons, no icon-font CDNs.
- **Images:** a broken image must never wreck the layout. Give image containers a fitting background and handle `onerror`. Prefer CSS-drawn visuals when they fit the concept.

## Honesty in content

- **Only real info.** Never invent customer counts, reviews, ratings, press, prices or features. Fact-check against the official source; if something can't be verified, say so.
- **Never invent a brand's logo** (no made-up monograms for a real product). Use the official file, or plain text if there isn't one.
- **Never present illustrations as real screens.** Real screenshots only; blur personal data (phones, emails) softly, only on the text itself.
- **No repetition.** Each fact appears once, in the place it matters most.
- **Copy:** specific and human (real details, prices, timings), client-focused, never filler like "premium quality solutions".
- Flag any sample/placeholder content clearly.

## Motion

Motion with intent: smooth, eased (`cubic-bezier(0.22, 1, 0.36, 1)`), never janky.

- Short intro loader (≤ 1.5s) with a CSS fail-safe so it can never block the page
- Split-text headline reveals, clip-path image reveals, light parallax
- At least one scroll-linked signature effect tied to the concept (measuring tape, reading-highlight text, filling progress line)
- Hover craft: custom cursor (fine pointers only), magnetic buttons, animated underlines, hover previews
- Animate only `transform`, `opacity`, `clip-path`; batch scroll work in `requestAnimationFrame`
- **Always** honour `prefers-reduced-motion` and make the page work without JS (`no-js` fallback)
- Print/PDF pieces (portfolios, case studies) stay static: no motion

## Tech

- Plain HTML, CSS and vanilla JS by default; a framework only if the project needs one
- Structure: `index.html`, `assets/css/style.css`, `assets/js/main.js`, plus a `README.md` (features, customisation)
- Forms: inline validation and success states, never `alert()`
- Accessible: semantic HTML, labels, visible `:focus-visible`, `aria-*` on toggles/menus, contrast ≥ 4.5:1 (3:1 for large text)

## Portfolios and case-study PDFs

- **Poppins** for all text (overrides the website font advice above).
- One continuous page, sections separated by background (no hard breaks), a "main screens" section with captioned key screens, and a separate "all screens" gallery grouped by area.
- Width **1200px with 72px side margins** (content 1056px), so the PDF reads at fit-width without zoom or side gaps. Same in Figma.
- Screens large enough to read (main screens ~280px wide on a 1200px page).
- Ship a single self-contained HTML too (images, font and icons embedded) so it imports into Figma cleanly. Avoid CSS-counter or other pseudo-element content that importers drop.
- Keep Figma, the HTML and the PDF in sync after every change.

## How we work (step by step)

1. **Brief:** understand the brand/product, collect real facts and real screenshots/photos. Ask only if something important is missing.
2. **Concept:** pick a direction that fits the brand (palette, type pair, one signature idea). No template copies.
3. **Build:** first full version, checked in a browser, then shared with screenshots and a preview link.
4. **Review section by section:** I point at a section ("ab yeh section"), you give an honest opinion (what's weak, what's fine), then make only the agreed changes.
5. **Approved base:** once I say "yahi final", that version is the base. Only small targeted edits after that; never redo it.
6. **Final check:** whole page top to bottom for misinfo, repetition, broken layout, then export (PDF / single HTML / Figma).
7. **Save every approved change** (commit + push) so nothing is lost and any version can be restored.

## Exports

- **PDF:** one continuous tall page at the design width (e.g. 1200px), backgrounds printed, no page breaks inside sections.
- **Single HTML:** one file with images (base64), font and SVG icons embedded, so it opens offline and imports cleanly.
- **Figma (html.to.design or similar):** import at the same width (1200px), then check:
  - frame width and side margins match the design (no extra gaps)
  - nothing sticks out of the frame (labels with `white-space: nowrap` + `translateX` can import huge)
  - headlines didn't wrap into an extra line (set the text to auto-width if they did)
  - all images loaded, no clipped text
- Fix issues directly in Figma when asked, and copy the same fixes back to HTML/PDF.

## Before calling anything done

1. Open it in a real (headless) browser and screenshot every section at **1440px**, **768px** and **390px** (or the fixed width for PDFs). Look at them and fix what looks off.
2. No console/page errors, no horizontal overflow, no clipped text, no headline over two lines.
3. Check reveal animations actually fire (IntersectionObserver ignores fully clipped elements; observe the parent).
4. Show me screenshots and a preview link after each change.
5. If a sandbox blocks CDNs/images/sites, say so instead of guessing.

## Communication

I write in Hinglish. Reply in the same casual Hinglish, short and clear. Be honest: if something is weak, missing or unverified, tell me straight and recommend the best option.

## Keeping this file updated

Whenever I approve a new rule or preference ("aage se aise hi karna"), add it to the right section of this file in one short line, so every future project follows it.
