import { SITE } from '@/lib/site';
import type { Piece, JournalArticle, ContentBlock } from '@/lib/data/types';

export function jewelryStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': SITE.url,
    name: SITE.name,
    image: `${SITE.url}/og/store.jpg`,
    url: SITE.url,
    telephone: SITE.phoneRaw,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: SITE.hoursSpec,
    priceRange: '₹₹₹',
    sameAs: [SITE.instagram, SITE.whatsappUrl],
    paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
    currenciesAccepted: 'INR',
  } as const;
}

export function productSchema(piece: Piece) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: piece.title,
    image: piece.images.map((i) => i.src),
    description: piece.description,
    sku: piece.sku,
    brand: { '@type': 'Brand', name: SITE.name },
    category: piece.collectionLabel,
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/piece/${piece.slug}`,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        price: 'Price on Request',
      },
    },
  } as const;
}

export function articleSchema(article: JournalArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `${SITE.url}${article.hero.src}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: article.category,
    inLanguage: 'en-IN',
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/solitaire-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/journal/${article.slug}`,
    },
  } as const;
}

/**
 * FAQ structured data, derived from the article body so the schema stays in
 * sync with the visible Q&A (Google requires the two to match). We treat any
 * h3 ending in a question mark, followed by a paragraph, as a Q&A pair, which
 * cleanly picks up the "Questions we hear often" sections and ignores other
 * subheadings. Returns null when an article has no such pairs.
 */
export function faqSchema(article: JournalArticle) {
  const body = article.body as ContentBlock[];
  const faqs: { question: string; answer: string }[] = [];

  body.forEach((block, i) => {
    if (
      typeof block === 'object' &&
      block.type === 'h3' &&
      block.text.trim().endsWith('?')
    ) {
      const answer = body[i + 1];
      if (typeof answer === 'string') {
        faqs.push({ question: block.text, answer });
      }
    }
  });

  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } as const;
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  } as const;
}
