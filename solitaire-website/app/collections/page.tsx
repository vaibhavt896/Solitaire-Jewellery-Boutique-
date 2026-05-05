import Link from 'next/link';
import type { Metadata } from 'next';
import { COLLECTIONS } from '@/lib/data/collections';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Collections',
  description:
    'Polki, Solitaires, Antique Gold, Diamond, Temple, Bridal, and Dubai Gold Bangles — the eight collections of Solitaire Jewellery Boutique, Kanpur.',
  path: '/collections',
});

export default function CollectionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Collections', href: '/collections' },
        ])}
      />
      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-3xl mb-16 md:mb-20">
            <p className="eyebrow mb-4">The Collections</p>
            <h1 className="display-page">
              Eight worlds of intricate jewellery.
            </h1>
            <p className="body-lead mt-6">
              Each collection at Solitaire is curated independently — a Polki
              piece is found differently from a certified solitaire. Browse
              below, or speak with us for personalised guidance.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {COLLECTIONS.map((c, i) => {
              const tall = c.height === 'tall';
              return (
                <Reveal
                  key={c.slug}
                  delay={i * 0.04}
                  className={tall ? 'md:row-span-2' : ''}
                >
                  <Link href={`/collections/${c.slug}`} className="group block">
                    <div
                      className={`relative overflow-hidden bg-bone-deep ${
                        tall ? 'aspect-[3/5]' : 'aspect-[4/5]'
                      }`}
                    >
                      <img
                        src={c.hero.src}
                        alt={c.hero.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="eyebrow mt-4">{c.eyebrow}</p>
                    <h2 className="font-display text-h1 mt-2 group-hover:text-gold-deep transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-small text-ink-muted mt-1">
                      {c.pieceCount} pieces · Explore →
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
