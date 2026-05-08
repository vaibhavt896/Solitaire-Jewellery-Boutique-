import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { COLLECTIONS, getCollection } from '@/lib/data/collections';
import { getPiecesInCollection } from '@/lib/data/pieces';
import { Reveal } from '@/components/Reveal';
import { CollectionPieces } from '@/components/CollectionPieces';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

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
            <Link href="/" className="link-underline">Home</Link>
            <span className="mx-2 text-gold">·</span>
            <Link href="/collections" className="link-underline">Collections</Link>
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

      {/* Pieces with functional filters — client component */}
      <CollectionPieces pieces={pieces} collectionTitle={collection.title} />
    </>
  );
}
