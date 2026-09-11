# K.auto — site 19 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with K.auto, and not an official site.**

- **Live:** https://k-auto-site.vercel.app
- **Repo:** [k-auto-site](https://github.com/omaralaa0707/k-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Their room, sampled: the domed ceiling's plaster #E4DBD9 as the ground — **the first pink-cast ground in the set** — over the olive-brown showroom wall #2B2721, with the cove light #B99065 kept strictly to rim arcs, glows and fills (readable version #6B4E28), and their campaign blue #175383 used only to mark the two roster entries that are not car makers

**Type pairing**
: DM Serif Display + DM Sans / Scheherazade New + Markazi Text (AR)

**3D / signature technique**
: **The rotunda**: their circular dais rebuilt in plan — a cream turning plate set into a timber floor, 48 instanced cove-light spokes round the rim, their own frames standing upright on the plate with soft ellipse shadows. It turns on its own and the pointer adds or removes *momentum* rather than setting the angle, because a loaded turntable has mass

**Motion language**
: The round — **the only page in the set with no arrival at all**: a 900ms plain dissolve with zero travel, plus a rim arc on every section header that never stops turning. Nothing arrives in a rotunda; it is simply not facing you, and then it is

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/kautoegy/
- Facebook: https://www.facebook.com/p/K-auto-100090894047620/

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
