import type { Collection } from './types';
import { MEDIA } from '@/lib/placeholder-media';

export const COLLECTIONS: Collection[] = [
  {
    slug: 'polki',
    title: 'Polki',
    eyebrow: 'Uncut diamonds, the original way',
    intro: 'The oldest form of diamond jewellery in India.',
    description:
      'Polki is the diamond before it was ever cut, natural, full of character, set in pure gold by hand. Ours comes from two workshops in Jaipur we have known for over a decade. No two pieces are ever quite the same, which is rather the point. Polki is uncut by nature, so each stone is one of a kind, and we will explain exactly what you are looking at, in plain words.',
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
    eyebrow: 'GIA & IGI certified',
    intro: 'One stone. Certified down to its character.',
    description:
      'A solitaire is a single diamond, and a big decision. So we make it a calm one. Every solitaire of value here is graded by GIA or IGI, and we walk you through the report in simple words, what the four Cs mean, and which ones actually matter for you. The certificate is independent of us. It travels home with the ring, and we keep a copy on file for life.',
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
    eyebrow: 'Old-world craftsmanship',
    intro: 'The warm gold of an earlier time.',
    description:
      'Hand-finished gold in the old techniques, the soft, matte glow that machine-made pieces never quite catch. These are pieces with weight and history to them, made to be worn often and kept for good. All our gold is hallmarked for purity, so you never have to take our word for it.',
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
    eyebrow: 'Modern, faceted, certified',
    intro: 'Diamond pieces for the way you live now.',
    description:
      'Rings, pendants, earrings, and bracelets in faceted diamond, set in 18K and 22K gold. Clean, modern, and easy to wear every day, with the same honest certification as everything else we sell. Every diamond piece of value comes with an IGI certificate, so the brilliance is matched by proof.',
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
    eyebrow: 'A southern tradition, kept exact',
    intro: 'The old motifs, treated with respect.',
    description:
      'Temple jewellery carries the figures and forms passed down through generations. We keep them exactly as they should be, for the southern bride, the festival, and anyone who loves jewellery with meaning behind it. These are detailed, traditional pieces, and we are happy to explain the motifs and their stories when you visit.',
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
    eyebrow: 'For the wedding day',
    intro: 'Everything for the big day, in one harmony.',
    description:
      'A bride wears more than one piece, and they all have to sing together, the choker, the long necklace, the earrings, the head piece, the bangles. We compose the full set around you, your outfit, and your day, so nothing fights and nothing is forgotten. This is what our free private sitting is for: we plan the whole look with you, calmly, weeks before the day.',
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
    title: 'Gold Bangles',
    eyebrow: '22K · hand-picked',
    intro: 'Bangles worth keeping, brought to Swaroop Nagar.',
    description:
      'A hand-picked selection of 22K gold bangles, in both classic and modern patterns. Some are made for daily wear, some for the big occasions. All are tested for purity and chosen for how they feel on the wrist. Every bangle is hallmarked, ask us and we will show you exactly where to look.',
    hero: {
      src: MEDIA.gold,
      alt: 'Gold bangles in 22K, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 18,
  },
  {
    slug: 'fashion',
    title: 'Evening Bags',
    eyebrow: 'A small, careful edit',
    intro: 'The right finish for the evening.',
    description:
      'A small, changing selection of evening bags, chosen to complete a look, never to steal from it. Limited in number, and they rotate, so what you see today may not be here next month. If you have your eye on one, message us to check it is still in.',
    hero: {
      src: MEDIA.diamond,
      alt: 'Evening clutch bag, Solitaire Boutique Kanpur',
      width: 1600,
      height: 2000,
    },
    pieceCount: 9,
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
