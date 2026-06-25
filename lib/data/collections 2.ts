import type { Collection } from './types';

export const COLLECTIONS: Collection[] = [
  {
    slug: 'polki',
    title: 'Polki',
    eyebrow: 'Uncut Diamond Heritage',
    intro: 'Uncut diamonds, set in untold stories.',
    description:
      'Polki is the oldest form of diamond jewellery in India — uncut, unfaceted, set in pure gold. Each Solitaire Polki piece is sourced from Jaipur ateliers and finished by hand.',
    hero: {
      src: '/Homepage images/Polki homee.webp',
      alt: 'Polki bridal necklace with uncut diamonds and emerald drops, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 42,
    height: 'tall',
  },
  {
    slug: 'solitaires',
    title: 'Solitaires',
    eyebrow: 'GIA & IGI Certified',
    intro: 'A single stone, certified to its character.',
    description:
      'Every solitaire of significance at Solitaire is graded by GIA or IGI. We help you understand the four Cs in language that respects your time and your decision.',
    hero: {
      src: '/Homepage images/Solitaire Diamond.webp',
      alt: 'GIA-certified diamond solitaire engagement ring, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 28,
    height: 'tall',
  },
  {
    slug: 'antique-gold',
    title: 'Antique Gold',
    eyebrow: 'Old-World Craftsmanship',
    intro: 'The warmth of gold, finished by hand.',
    description:
      'Antique gold pieces in nakshi, jadau, and kundan techniques — finished with the soft matte gleam that sets heritage jewellery apart.',
    hero: {
      src: '/Homepage images/kundan-on-gold.webp',
      alt: 'Kundan-on-gold antique necklace with traditional jadau work, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 31,
  },
  {
    slug: 'diamond',
    title: 'Diamond',
    eyebrow: 'Faceted Brilliance',
    intro: 'Modern diamond jewellery, every piece certified.',
    description:
      'Diamond rings, pendants, earrings, and bracelets — faceted, set in 18K and 22K gold, each major piece accompanied by an IGI certificate.',
    hero: {
      src: '/Homepage images/Studded, set.webp',
      alt: 'Studded diamond set in 18K gold, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 35,
  },
  {
    slug: 'temple',
    title: 'Temple',
    eyebrow: 'South Indian Tradition',
    intro: 'Temple jewellery, kept exact.',
    description:
      'Temple jewellery for the South Indian bride, the festive occasion, and the collector. Cast in the traditional motifs of Lakshmi, Durga, and the lotus.',
    hero: {
      src: '/Homepage images/Temple Jewellery.webp',
      alt: 'Temple jewellery necklace with traditional goddess motif, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 16,
  },
  {
    slug: 'bridal',
    title: 'Bridal',
    eyebrow: 'For The Wedding Day',
    intro: 'Pieces for the most photographed day of her life.',
    description:
      'Curated bridal sets — choker plus long-haar, mathapatti, jhumkas, kada — composed for harmony with your lehenga, your ceremony, and your day.',
    hero: {
      src: '/Homepage images/Bridal Jewellery.webp',
      alt: 'Bridal jewellery set with Polki choker and long necklace, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 24,
    height: 'tall',
  },
  {
    slug: 'dubai-gold-bangles',
    title: 'Dubai Gold Bangles',
    eyebrow: 'Imported · 22K',
    intro: 'Bangles from the Gold Souk, brought to Swaroop Nagar.',
    description:
      'Hand-picked from Dubai. 22K gold bangles in modern and classical patterns. Tested for purity and finished to wear daily or save for occasions.',
    hero: {
      src: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dubai gold bangles in 22K, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 18,
  },
  {
    slug: 'fashion',
    title: 'Fashion Accessories',
    eyebrow: 'Curated Bags',
    intro: 'A small, careful selection of evening bags.',
    description:
      'Bags chosen as a complement — rarely the centrepiece, always the right finish. Limited stock; pieces rotate.',
    hero: {
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=80',
      alt: 'Curated evening clutch bag, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 9,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
