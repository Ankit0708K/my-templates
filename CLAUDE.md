# my-templates

Website templates (landing pages, login/signup, single-page sites). Each template lives in its own folder, e.g. `royal-stitch-studio/`.

The owner wants every template to look **top-tier and current**, never generic or "AI-generated". `royal-stitch-studio/` is the reference for the minimum quality bar. Each new template should beat it.

## Design rules

- **Start from a concept, not a component kit.** Pick a direction that fits the brand (e.g. Royal Stitch = tailor's atelier: paper, ink, thread, measuring tape, fabric swatches) and let the details come from it.
- **Avoid the generic look:** no default gold-on-black glassmorphism, no purple-blue gradients, no Poppins/Inter-everywhere, no icon-in-a-circle feature grids, no Bootstrap-default cards.
- **Typography leads.** Pair a characterful display face (e.g. Instrument Serif, Fraunces) with a clean sans (e.g. Geist) and a mono for labels. Use big, confident headline sizes and italics for emphasis.
- **Colour:** a deliberate palette of 1 base + 1 ink + 1–2 accents, defined as CSS variables on `:root`. Alternate light and dark sections for rhythm.
- **Layout:** editorial grids, generous whitespace, hairline dividers, numbered section labels (`(01) The atelier`), asymmetry where it helps.
- **Copy:** specific and human (real details, prices, timings), not filler like "premium quality solutions".
- **Images:** never let a broken image wreck the layout. Give image containers a fitting background and handle `onerror`. Prefer CSS-drawn visuals when they fit the concept.

## Motion rules

Use motion with intent: smooth, eased (`cubic-bezier(0.22, 1, 0.36, 1)`), never janky.

- Short intro loader (≤ 1.5s) with a CSS fail-safe so it can never block the page
- Split-text headline reveals, clip-path image reveals, light parallax
- At least one scroll-linked signature effect tied to the concept (e.g. measuring tape, reading-highlight text, filling progress line)
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
2. Screenshot every section at **1440px desktop** and **390px mobile**, then look at them and fix what looks off
3. No console/page errors, no horizontal overflow (`scrollWidth === innerWidth`)
4. Check reveal animations actually fire. IntersectionObserver ignores fully clipped elements, so observe the parent.
5. Update the template's README (features, customisation)

Note: cloud sandboxes may block CDNs/Unsplash. Missing photos in screenshots can be the sandbox, not the code. Say so instead of guessing.

## Communication

The owner writes in Hinglish. Reply in the same casual Hinglish, keep it clear, and share preview links (raw.githack.com for branches) and screenshots after each change.
