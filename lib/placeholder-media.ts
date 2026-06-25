/* ──────────────────────────────────────────────────────────
   Placeholder media, local, owned imagery only.

   ⚠️  PLACEHOLDERS: these point at the real local AVIFs we
   already have in /public. They remove every remote (Unsplash)
   dependency so the site has one provenance and one grade.

   When the commissioned shoot arrives, drop the new files into
   /public and update the paths here in ONE place, every piece,
   collection, journal article and editorial section reads from
   these constants.
────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────
   PLACEHOLDERS, visible, labelled slots for imagery we don't
   have yet. Each is a first-party SVG in /public/placeholders
   that reads "… image/video to be added", so an empty section
   is obvious at a glance (and never filled with a duplicate of
   another section's photo). Swap each for a real file later.
────────────────────────────────────────────────────────── */
export const PLACEHOLDER = {
  featuredPiece: '/placeholders/featured-piece.svg',
  atelier:       '/placeholders/atelier.svg',
  journal: (slug: string) => `/placeholders/journal-${slug}.svg`,
} as const;

export const MEDIA = {
  polki:         '/Homepage images/Polki homee.webp',
  solitaire:     '/Homepage images/Solitaire Diamond.webp',
  gold:          '/Homepage images/kundan-on-gold.webp',
  diamond:       '/Homepage images/Studded, set.webp',
  temple:        '/Homepage images/Temple Jewellery.webp',
  bridal:        '/Homepage images/Bridal Jewellery.webp',
  boutique:      '/bridal-consultation-boutique.webp',
  featuredPiece: '/Polki Bridal Necklace with Emerald Drops..webp',
  /* Behind-the-scenes / atelier, no real asset yet, so this points at
     a clearly-labelled placeholder instead of re-using the boutique
     photo (which already appears in the Bridal section). Drop the real
     BTS image/video in and update this one line. */
  atelier:    PLACEHOLDER.atelier,
} as const;

/* A rotation used wherever a piece needs multiple gallery views. */
export const PIECE_GALLERY = [
  MEDIA.polki,
  MEDIA.bridal,
  MEDIA.solitaire,
  MEDIA.gold,
] as const;
