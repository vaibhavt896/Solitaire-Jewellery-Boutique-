import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  PIECES,
  getPiece,
  getRelatedPieces,
} from '@/lib/data/pieces';
import { whatsappLinkFor } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, productSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { Reveal } from '@/components/Reveal';
import { PieceCard } from '@/components/PieceCard';
import { PieceGallery } from '@/components/PieceGallery';
import { Accordion } from '@/components/Accordion';
import { IconCheck } from '@/components/icons/Icon';

export function generateStaticParams() {
  return PIECES.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return { title: 'Piece not found' };
  return buildMetadata({
    title: piece.title,
    description: `${piece.description} ${piece.collectionLabel} from Solitaire Jewellery Boutique, Kanpur.`,
    path: `/piece/${slug}`,
    image: piece.images[0]?.src,
  });
}

export default async function PiecePage({ params }: Params) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();
  const related = getRelatedPieces(piece);

  const whatsappMessage = `Hi Solitaire — I'm interested in ${piece.title} (SKU ${piece.sku}). Could you share availability and a price?`;

  return (
    <>
      <JsonLd data={productSchema(piece)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Collections', href: '/collections' },
          { name: piece.collectionLabel, href: `/collections/${piece.collection}` },
          { name: piece.title, href: `/piece/${slug}` },
        ])}
      />

      <section className="bg-bone pt-12 pb-16 md:pt-16 md:pb-24">
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
            <Link
              href={`/collections/${piece.collection}`}
              className="link-underline"
            >
              {piece.collectionLabel}
            </Link>
            <span className="mx-2 text-gold">·</span>
            <span className="text-ink">{piece.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            <Reveal>
              <PieceGallery images={piece.images} title={piece.title} />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-mono text-micro uppercase tracking-eyebrow text-gold-deep">
                {piece.collectionLabel} · SKU {piece.sku}
              </p>
              <h1 className="font-display text-display mt-3">{piece.title}</h1>

              {piece.certification && (
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2 text-small text-emerald">
                    <IconCheck size={16} />
                    {piece.certification.type === 'BIS Hallmark'
                      ? 'BIS Hallmarked 22K gold'
                      : `${piece.certification.type}-certified diamond`}
                    {piece.certification.number ? (
                      <span className="text-mono text-ink-muted ml-1">
                        · #{piece.certification.number}
                      </span>
                    ) : null}
                  </li>
                  {piece.collection === 'solitaires' || piece.collection === 'diamond' ? (
                    <li className="flex items-center gap-2 text-small text-emerald">
                      <IconCheck size={16} />
                      Hallmarked gold band
                    </li>
                  ) : null}
                </ul>
              )}

              <p className="mt-8 text-mono text-small text-ink-muted uppercase tracking-eyebrow">
                Price on Enquiry
              </p>
              <p className="text-body text-ink-soft mt-2 max-w-md">
                We share photos, video, and a price within the hour on WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappLinkFor(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Enquire on WhatsApp
                </a>
                <Link href="/bridal/book" className="btn-secondary">
                  Book a Viewing
                </Link>
              </div>

              <hr className="my-10 border-line" />

              <h2 className="eyebrow mb-5">Specifications</h2>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-small">
                {piece.specifications.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-ink-muted text-mono">{s.label}</dt>
                    <dd className="text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <h2 className="eyebrow mb-3">Materials</h2>
                <p className="text-body text-ink-soft">
                  {piece.materials.join(' · ')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bone-deep">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow mb-4">About This Piece</p>
            <p className="font-display text-h1 leading-snug text-ink-soft">
              {piece.longDescription}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone">
        <div className="container-content py-16">
          <Accordion title="Care Instructions">
            <p>{piece.careInstructions}</p>
          </Accordion>
          <Accordion title="Authenticity & Returns">
            <p>
              Every piece comes with a Solitaire authentication card and the
              applicable certificate (GIA, IGI, or BIS). Bring the piece in for
              an annual check-up at no charge — we tighten settings, polish,
              and re-foil any kundan that has loosened.
            </p>
          </Accordion>
          <Accordion title="Shipping & Visit">
            <p>
              Inspection is in-store at Swaroop Nagar, Kanpur. For high-value
              pieces, we arrange a private courier for trial within Kanpur and
              Lucknow.
            </p>
          </Accordion>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-bone">
          <div className="container-wide">
            <Reveal className="mb-12">
              <p className="eyebrow">You may also like</p>
              <h2 className="display-page mt-3">More from the boutique</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {related.slice(0, 4).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <PieceCard piece={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bone-deep py-16 md:py-24">
        <div className="container-content text-center">
          <p className="eyebrow mb-4">Still deciding?</p>
          <h2 className="display-page">
            Visit us in Swaroop Nagar to try this piece on.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/visit" className="btn-primary">
              Plan Your Visit
            </Link>
            <a
              href={whatsappLinkFor(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
