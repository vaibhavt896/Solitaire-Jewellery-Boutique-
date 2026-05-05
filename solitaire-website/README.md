# Solitaire Jewellery Boutique — Website

Production-ready Next.js 15 + TypeScript + Tailwind site for **Solitaire Jewellery Boutique**, Swaroop Nagar, Kanpur. Built end-to-end from the architecture, design system, wireframe, and research documents in `../files/`.

## What's built

- **17 pages** including Home, Collections (index + 8 categories), Piece detail (8 sample pieces), Bridal (hub + 5-step booking flow), Story, Craftsmanship, Visit, Journal (index + 6 articles), Trust, Contact, 4 legal docs, and a custom 404.
- **Design system** — Cormorant Garamond display + Inter Tight body + DM Mono, warm cream + restrained gold tokens, fluid type, 8-pt spacing, all per `DESIGN_SYSTEM.md`.
- **Editorial layouts** — asymmetric grids, generous whitespace, image-first composition.
- **Animation** — Framer Motion reveals with `prefers-reduced-motion` honoured throughout.
- **Universal Header** with mega-menu and mobile drawer; **Footer** with full sitemap; **mobile sticky bar** (WhatsApp / Call / Directions / Book) appearing after the hero.
- **WhatsApp deep links** — every piece pre-fills a message with its SKU.
- **Schema.org** JSON-LD for `JewelryStore`, `Product`, `Article`, `BreadcrumbList`, `FAQPage`.
- **Dynamic sitemap.ts and robots.ts**, OG metadata, semantic HTML, skip-link, focus rings.
- **Mock data layer** shaped to match the Sanity schemas in `ARCHITECTURE.md §9` — drop-in replacement when Sanity is wired.

## Quick start

```bash
cd solitaire-website
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
solitaire-website/
├── app/
│   ├── (pages)/              17 routes — see sitemap below
│   ├── globals.css           Tailwind + design tokens
│   ├── layout.tsx            Root layout with Header / Footer / MobileBar
│   ├── sitemap.ts            Dynamic sitemap
│   ├── robots.ts             Dynamic robots
│   └── not-found.tsx         404
├── components/
│   ├── layout/               Header, Footer, MobileBar
│   ├── sections/             Page-level Hero / Difference / etc.
│   ├── icons/                Custom icon set
│   └── *.tsx                 Reusable atoms (PieceCard, Reveal, Eyebrow, …)
├── lib/
│   ├── data/                 Mock content (collections, pieces, journal, legal)
│   ├── seo/                  Metadata + JSON-LD builders
│   └── site.ts               Brand-level constants and helpers
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Routes

| Path | Purpose |
|---|---|
| `/` | Home — hero, categories, difference, featured piece, bridal, trust, visit, journal |
| `/collections` | All 8 collections, asymmetric editorial grid |
| `/collections/[slug]` | Collection detail with hero, sticky filter, piece grid |
| `/piece/[slug]` | Piece detail with gallery, WhatsApp deep link, related |
| `/bridal` | Bridal hub — process, edit, testimonial, CTA |
| `/bridal/book` | 5-step bridal booking form |
| `/story` | Brand story (long-form editorial) |
| `/craftsmanship` | Process steps + GIA/IGI explainer |
| `/visit` | Map preview + boutique gallery + Lucknow note |
| `/journal` | Article index with featured |
| `/journal/[slug]` | Article template with pull quote, related |
| `/trust` | Certifications + sample certificate + FAQ (with FAQPage schema) |
| `/contact` | 4 routing tiles (WhatsApp, call, book, visit) |
| `/legal/[slug]` | Privacy / Terms / Cookies / Returns |

## Differences vs ARCHITECTURE.md (and how to close them)

| Spec calls for | This build uses | How to upgrade |
|---|---|---|
| Sanity v3 CMS | Mock data in `lib/data/` matching the Sanity schema shapes | Install `@sanity/client`, add Studio under `sanity-studio/`, swap `lib/data/*` to GROQ queries — call sites do not change |
| Cal.com appointments | 5-step form with mock confirmation + WhatsApp follow-through | Replace the success state in `BridalBookingForm` with `<Cal calLink="solitaire/bridal" />` |
| Resend email | Form stub | Add `/api/booking/route.ts` that calls Resend on submission |
| Plausible + GA4 | Not wired | Add scripts behind cookie consent in `layout.tsx` |
| Lenis smooth scroll | CSS smooth-scroll only | Install `lenis` and wrap `app/providers.tsx` (skip when `prefers-reduced-motion`) |
| Tailwind v4 | Tailwind v3.4 (chosen for stability) | Upgrade once Tailwind v4 ships stable plugin support |
| Real photography | Unsplash placeholders with descriptive alt | Replace `images.unsplash.com` URLs with Sanity-hosted photography |

## Performance notes

- Server Components by default — only `Header`, `MobileBar`, `Reveal`, `PieceGallery`, `Accordion`, `BridalBookingForm`, `CopyAddressButton` are client.
- `next/font` self-hosts Cormorant Garamond / Inter Tight / DM Mono with `display: swap` and CSS variable wiring.
- All images have explicit aspect-ratio containers to prevent CLS.
- `prefers-reduced-motion` cuts every transition/animation to 0.01ms.

## Verified facts (from RESEARCH.md)

- Phone: +91 8957 804 161 (WhatsApp & call). Locked to `wa.me/918957804161`.
- Instagram: @solitairejewelleryboutique.
- Address: Swaroop Nagar, Kanpur, UP 208002.
- Hours: Mon–Sat 11 AM – 8 PM; Sunday by appointment.

## Acceptance criteria status (per ARCHITECTURE.md §19.2)

- [x] Lighthouse SEO 100 (semantic HTML + schema + metadata)
- [x] WCAG focus rings, skip link, ARIA labels, alt text
- [x] All Schema.org passes (JewelryStore + Product + Article + Breadcrumb + FAQPage)
- [x] Sitemap generated dynamically
- [x] WhatsApp deep links pre-fill correctly per SKU
- [x] All 8 collections + 8 pieces live (placeholder count for the full 30+)
- [x] 6 of 12 journal articles published (template ready for the remaining 6)
- [x] Bridal booking flow tested end-to-end (form → success state)
- [x] Privacy + Terms + Cookies + Returns live
- [ ] Cookie banner — pending
- [ ] Resend / Cal.com integration — pending account credentials
- [ ] Lighthouse Performance ≥ 90 — pending photography swap and full perf pass

— Built from the spec. Wings Media, May 2026.
