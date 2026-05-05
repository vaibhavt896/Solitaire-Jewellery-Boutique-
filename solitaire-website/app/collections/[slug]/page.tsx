import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { COLLECTIONS, getCollection } from '@/lib/data/collections';
import { getPiecesInCollection } from '@/lib/data/pieces';
import { Reveal } from '@/components/Reveal';
import { PieceCard } from '@/components/PieceCard';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { whatsappLinkFor } from '@/lib/site';

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: 'Collection not found' };
  return buildMetadata({
    title: `${collection.title} Jewellery — Kanpur`,
    description: collection.description,
    path: `/collections/${slug}`,
    image: collection.hero.src,
  });
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const pieces = getPiecesInCollection(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Collections', href: '/collections' },
          { name: collection.title, href: `/collections/${slug}` },
        ])}
      />

      {/* Hero band */}
      <section className="bg-bone pt-12 pb-8 md:pt-20 md:pb-16">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="text-small text-ink-muted mb-8">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2 text-gold">·</span>
            <Link href="/collections" className="link-underline">
              Collections
            </Link>
            <span className="mx-2 text-gold">·</span>
            <span className="text-ink">{collection.title}</span>
          </nav>

          <Reveal className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">{collection.eyebrow}</p>
              <h1 className="display-page">{collection.intro}</h1>
              <p className="body-lead mt-6">{collection.description}</p>
              <p className="text-small text-ink-muted mt-6">
                {collection.pieceCount} pieces in this collection
              </p>
            </div>
            <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-bone-deep">
              <img
                src={collection.hero.src}
                alt={collection.hero.alt}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-20 z-20 bg-bone/95 backdrop-blur-md border-y border-line">
        <div className="container-wide flex items-center gap-2 md:gap-6 py-4 overflow-x-auto">
          <span className="text-micro uppercase tracking-eyebrow text-ink-muted whitespace-nowrap">
            Filter:
          </span>
          {['Material', 'Occasion', 'Range'].map((label) => (
            <button
              key={label}
              type="button"
              className="text-small px-4 py-2 border border-line bg-paper hover:bg-gold-veil hover:border-gold transition-colors whitespace-nowrap"
            >
              {label} ▾
            </button>
          ))}
          <span className="ml-auto text-micro uppercase tracking-eyebrow text-ink-muted whitespace-nowrap">
            Sort:
          </span>
          <button
            type="button"
            className="text-small px-4 py-2 border border-line bg-paper hover:bg-gold-veil hover:border-gold transition-colors whitespace-nowrap"
          >
            New ▾
          </button>
        </div>
      </div>

      {/* Pieces grid */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          {pieces.length === 0 ? (
            <Reveal className="bg-bone-deep border border-line p-10 md:p-16 text-center">
              <p className="font-display text-h1 mb-4">
                We're adding new pieces here.
              </p>
              <p className="text-body text-ink-soft max-w-xl mx-auto mb-8">
                Tell us what you're looking for in {collection.title}, and we'll
                send photographs of pieces in our atelier within the day.
              </p>
              <a
                href={whatsappLinkFor(
                  `Hi Solitaire — I'm browsing your ${collection.title} collection. Could you share what's currently in the boutique?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Speak to Us on WhatsApp
              </a>
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {pieces.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.04}>
                  <PieceCard piece={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
