// Types mirror the Sanity schema in ARCHITECTURE.md §9 so a swap to Sanity
// later does not require call-site changes.

export type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Specification = { label: string; value: string };

export type Certification = {
  type: 'GIA' | 'IGI' | 'BIS Hallmark';
  number?: string;
};

export type Collection = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  hero: ImageRef;
  pieceCount: number;
  description: string;
  height?: 'tall' | 'short' | 'normal';
};

export type Piece = {
  slug: string;
  sku: string;
  title: string;
  collection: string; // collection slug
  collectionLabel: string;
  images: ImageRef[];
  description: string;
  longDescription: string;
  specifications: Specification[];
  materials: string[];
  certification?: Certification;
  careInstructions: string;
  isFeatured?: boolean;
  related?: string[]; // slugs
  publishedAt: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Buying Guide' | 'Craft' | 'Heritage' | 'Bridal' | 'Festive';
  hero: ImageRef;
  readMinutes: number;
  publishedAt: string;
  body: string[];
  pullQuote?: string;
  relatedSlugs?: string[];
};
