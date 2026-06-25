import type { Piece } from './types';
import { PIECE_GALLERY, MEDIA } from '@/lib/placeholder-media';

const polkiBridalNecklaceImages = [MEDIA.featuredPiece, ...PIECE_GALLERY];

export const PIECES: Piece[] = [
  {
    slug: 'polki-bridal-necklace-with-emerald-drops',
    sku: 'SJB-POL-8421',
    title: 'Polki Bridal Necklace with Emerald Drops',
    collection: 'polki',
    collectionLabel: 'Polki',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `Polki bridal necklace with emerald drops, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Uncut diamonds, emerald drops, hand-set in 22K gold.',
    longDescription:
      'This Polki bridal necklace was finished by an atelier in Jaipur over the course of six weeks. The uncut diamonds catch light differently from faceted stones, softer, with the warmth of an heirloom. The emerald drops are Zambian, hand-selected for their saturation. Designed for the bridal day, but worn well at a reception or formal occasion in any year that follows.',
    specifications: [
      { label: 'Weight', value: '42.5 g' },
      { label: 'Stones', value: '24 polki, 12 emeralds' },
      { label: 'Setting', value: 'Hand-set, 22K gold' },
      { label: 'Length', value: '18 inches' },
    ],
    materials: ['22K Gold', 'Polki (uncut diamond)', 'Zambian Emerald'],
    certification: { type: 'BIS Hallmark' },
    careInstructions:
      'Store in a soft pouch, away from other jewellery. Avoid contact with perfume, lotion, and chlorinated water. Polish only with a soft dry cloth, never an ultrasonic cleaner.',
    isFeatured: true,
    related: [
      'polki-choker-with-pearl-line',
      'antique-gold-temple-haar',
      'gia-solitaire-engagement-ring-1ct',
    ],
    publishedAt: '2026-04-12T10:00:00.000Z',
  },
  {
    slug: 'polki-choker-with-pearl-line',
    sku: 'SJB-POL-7233',
    title: 'Polki Choker with Pearl Line',
    collection: 'polki',
    collectionLabel: 'Polki',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `Polki choker with pearl line, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Three-row Polki choker, finished with a baroque pearl line.',
    longDescription:
      'A choker that sits close at the throat, three rows of polki framed by a single line of natural baroque pearls. Best worn with a high-neck blouse, a single jhumka, and a bare wrist.',
    specifications: [
      { label: 'Weight', value: '38.2 g' },
      { label: 'Stones', value: '36 polki, baroque pearl strand' },
      { label: 'Setting', value: 'Hand-set, 22K gold' },
      { label: 'Length', value: '14 inches, adjustable' },
    ],
    materials: ['22K Gold', 'Polki', 'Baroque Pearl'],
    certification: { type: 'BIS Hallmark' },
    careInstructions:
      'Pearls are softer than gemstones, clean with a damp cloth only. Never wear in shower or pool.',
    related: [
      'polki-bridal-necklace-with-emerald-drops',
      'polki-jhumka-earrings',
      'antique-gold-temple-haar',
    ],
    publishedAt: '2026-03-28T10:00:00.000Z',
  },
  {
    slug: 'gia-solitaire-engagement-ring-1ct',
    sku: 'SJB-SOL-1014',
    title: 'GIA Solitaire Engagement Ring · 1.02 ct',
    collection: 'solitaires',
    collectionLabel: 'Solitaires',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `GIA-certified 1.02 carat solitaire engagement ring, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Round brilliant, 1.02 ct, F colour, VVS2, GIA-certified.',
    longDescription:
      'A round-brilliant solitaire of 1.02 carats, F colour, VVS2 clarity, GIA-certified, set in a four-prong 18K white-gold band. The proportions are excellent across all three Cut criteria. Comes with the GIA report; we walk you through it before you decide.',
    specifications: [
      { label: 'Carat', value: '1.02 ct' },
      { label: 'Cut', value: 'Round Brilliant · Excellent' },
      { label: 'Colour', value: 'F' },
      { label: 'Clarity', value: 'VVS2' },
      { label: 'Setting', value: '18K White Gold, four prong' },
      { label: 'GIA Report', value: '#2384719234' },
    ],
    materials: ['18K White Gold', 'GIA-Certified Round Brilliant Diamond'],
    certification: { type: 'GIA', number: '2384719234' },
    careInstructions:
      'Bring in for a six-month check-up. We tighten prongs, polish the band, and re-issue authenticity if needed.',
    isFeatured: true,
    related: [
      'igi-solitaire-pendant-half-carat',
      'diamond-tennis-bracelet-3ct',
      'polki-bridal-necklace-with-emerald-drops',
    ],
    publishedAt: '2026-03-15T10:00:00.000Z',
  },
  {
    slug: 'igi-solitaire-pendant-half-carat',
    sku: 'SJB-SOL-1052',
    title: 'IGI Solitaire Pendant · 0.50 ct',
    collection: 'solitaires',
    collectionLabel: 'Solitaires',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `IGI-certified 0.50 carat solitaire pendant, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Half-carat solitaire pendant on an 18K gold chain.',
    longDescription:
      'A half-carat IGI-certified diamond on a fine 18K gold chain, four-prong setting, 16-inch length. Worn alone or layered.',
    specifications: [
      { label: 'Carat', value: '0.50 ct' },
      { label: 'Cut', value: 'Round Brilliant · Very Good' },
      { label: 'Colour', value: 'G' },
      { label: 'Clarity', value: 'VS1' },
      { label: 'Chain', value: '18K Yellow Gold, 16 inch' },
    ],
    materials: ['18K Yellow Gold', 'IGI-Certified Round Brilliant Diamond'],
    certification: { type: 'IGI', number: 'LG576123' },
    careInstructions: 'Wipe with a soft cloth; remove before sleeping.',
    related: [
      'gia-solitaire-engagement-ring-1ct',
      'diamond-tennis-bracelet-3ct',
      'polki-jhumka-earrings',
    ],
    publishedAt: '2026-02-19T10:00:00.000Z',
  },
  {
    slug: 'antique-gold-temple-haar',
    sku: 'SJB-ANT-3308',
    title: 'Antique Gold Temple Haar',
    collection: 'antique-gold',
    collectionLabel: 'Antique Gold',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `Antique gold temple haar with Lakshmi motif, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Long temple haar in 22K gold, Lakshmi motif clasp.',
    longDescription:
      'A long haar in 22K gold, finished in the antique manner, soft matte, no high polish. Lakshmi motif at the clasp. Best worn over the temple necklace as the second tier of a bridal layering.',
    specifications: [
      { label: 'Weight', value: '76.4 g' },
      { label: 'Length', value: '32 inches' },
      { label: 'Setting', value: 'Antique-finished 22K' },
    ],
    materials: ['22K Gold'],
    certification: { type: 'BIS Hallmark' },
    careInstructions: 'Store flat. Polish only with the cloth we provide.',
    related: [
      'polki-bridal-necklace-with-emerald-drops',
      'polki-jhumka-earrings',
      'temple-pavitra-necklace',
    ],
    publishedAt: '2026-02-08T10:00:00.000Z',
  },
  {
    slug: 'polki-jhumka-earrings',
    sku: 'SJB-POL-4419',
    title: 'Polki Jhumka Earrings',
    collection: 'polki',
    collectionLabel: 'Polki',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `Polki jhumka earrings with pearl drops, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Polki jhumka earrings, pearl drops.',
    longDescription:
      'Classic jhumka silhouette, Polki rosettes around a 22K gold dome, finished with natural pearl drops. Substantial enough to balance a heavy bridal necklace.',
    specifications: [
      { label: 'Weight', value: '18.6 g (pair)' },
      { label: 'Drop', value: '2.4 inches' },
    ],
    materials: ['22K Gold', 'Polki', 'Natural Pearl'],
    certification: { type: 'BIS Hallmark' },
    careInstructions: 'Store hung, never flat, protects the pearl drops.',
    related: [
      'polki-bridal-necklace-with-emerald-drops',
      'polki-choker-with-pearl-line',
      'antique-gold-temple-haar',
    ],
    publishedAt: '2026-01-22T10:00:00.000Z',
  },
  {
    slug: 'diamond-tennis-bracelet-3ct',
    sku: 'SJB-DIA-2200',
    title: 'Diamond Tennis Bracelet · 3.00 ct',
    collection: 'diamond',
    collectionLabel: 'Diamond',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `3-carat diamond tennis bracelet, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Classic four-prong tennis bracelet, 3 ct total weight.',
    longDescription:
      'Forty-three round-brilliant diamonds in a continuous four-prong setting, 18K white gold. A piece you wear every day if you choose; a piece for evening if you choose.',
    specifications: [
      { label: 'Total Carat', value: '3.00 ct' },
      { label: 'Cut', value: 'Round Brilliant · Excellent' },
      { label: 'Length', value: '7 inches, adjustable' },
    ],
    materials: ['18K White Gold', 'Diamond'],
    certification: { type: 'IGI' },
    careInstructions: 'Bring in yearly to check the clasp tension.',
    related: ['gia-solitaire-engagement-ring-1ct', 'igi-solitaire-pendant-half-carat'],
    publishedAt: '2026-01-08T10:00:00.000Z',
  },
  {
    slug: 'temple-pavitra-necklace',
    sku: 'SJB-TEM-7140',
    title: 'Pavitra Temple Necklace',
    collection: 'temple',
    collectionLabel: 'Temple',
    images: polkiBridalNecklaceImages.map((src, i) => ({
      src,
      alt: `Temple necklace with goddess motifs, view ${i + 1}, Solitaire Boutique Kanpur`,
      width: 1200,
      height: 1500,
    })),
    description: 'Temple necklace with Lakshmi-Saraswati panels.',
    longDescription:
      'A choker-length temple necklace in 22K gold with Lakshmi and Saraswati panels alternating. Finished in the South Indian antique manner.',
    specifications: [
      { label: 'Weight', value: '52.0 g' },
      { label: 'Length', value: '15 inches' },
    ],
    materials: ['22K Gold'],
    certification: { type: 'BIS Hallmark' },
    careInstructions: 'Polish with the cloth provided. Store separately.',
    related: ['antique-gold-temple-haar', 'polki-jhumka-earrings'],
    publishedAt: '2025-12-12T10:00:00.000Z',
  },
];

export function getPiece(slug: string): Piece | undefined {
  return PIECES.find((p) => p.slug === slug);
}

export function getPiecesInCollection(slug: string): Piece[] {
  return PIECES.filter((p) => p.collection === slug);
}

export function getRelatedPieces(piece: Piece): Piece[] {
  if (!piece.related?.length) {
    return PIECES.filter(
      (p) => p.collection === piece.collection && p.slug !== piece.slug
    ).slice(0, 4);
  }
  return piece.related
    .map((slug) => PIECES.find((p) => p.slug === slug))
    .filter((p): p is Piece => Boolean(p));
}

export function getFeaturedPiece(): Piece {
  return PIECES.find((p) => p.isFeatured) ?? PIECES[0]!;
}
