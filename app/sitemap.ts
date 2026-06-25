import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { PIECES } from '@/lib/data/pieces';
import { ARTICLES } from '@/lib/data/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, priority: 1, changeFrequency: 'weekly' },
    { url: `${SITE.url}/collections`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${SITE.url}/bridal`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${SITE.url}/bridal/book`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE.url}/story`, lastModified: now, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${SITE.url}/craftsmanship`, lastModified: now, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${SITE.url}/visit`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${SITE.url}/journal`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${SITE.url}/trust`, lastModified: now, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${SITE.url}/contact`, lastModified: now, priority: 0.5, changeFrequency: 'yearly' },
  ];

  const collections = COLLECTIONS.map((c) => ({
    url: `${SITE.url}/collections/${c.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const pieces = PIECES.map((p) => ({
    url: `${SITE.url}/piece/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const articles = ARTICLES.map((a) => ({
    url: `${SITE.url}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...fixed, ...collections, ...pieces, ...articles];
}
