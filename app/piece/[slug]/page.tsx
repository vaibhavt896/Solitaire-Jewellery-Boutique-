import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PIECES, getPiece, getRelatedPieces } from '@/lib/data/pieces';
import { whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';
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

  const whatsappMessage = WHATSAPP_MESSAGES.piece(piece.title, piece.sku);

  const hasCertCard =
    piece.certification &&
    (piece.certification.type === 'GIA' || piece.certification.type === 'IGI');

  const verifyUrl =
    piece.certification?.type === 'GIA'
      ? 'https://www.gia.edu/report-check'
      : 'https://www.igi.org/verify-your-report';

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

      {/* Main product section */}
      <section className="bg-bone pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="text-small text-ink-muted mb-8">
            <Link href="/" className="link-underline">Home</Link>
            <span className="mx-2 text-gold">·</span>
            <Link href="/collections" className="link-underline">Collections</Link>
            <span className="mx-2 text-gold">·</span>
            <Link href={`/collections/${piece.collection}`} className="link-underline">
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
                Photos can only show so much. The real piece, in the right light,
                is always better, we share photos, video, and a price within the
                hour on WhatsApp, then you come and see it.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappLinkFor(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Ask About This Piece
                </a>
                <Link href="/visit" className="btn-secondary">
                  Visit to See It
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
                <p className="text-body text-ink-soft">{piece.materials.join(' · ')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Long description */}
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

      {/* Certificate visualization, GIA / IGI only */}
      {hasCertCard && (
        <section className="bg-bone py-16 md:py-20">
          <div className="container-content">
            <Reveal>
              <p className="eyebrow mb-8">Certificate of Authenticity</p>
              <div
                style={{
                  maxWidth: 500,
                  border: '1px solid rgba(166,124,44,0.28)',
                  boxShadow: '0 4px 32px rgba(26,20,16,0.07)',
                  background: 'var(--bone)',
                }}
              >
                {/* Header row */}
                <div
                  className="flex items-center justify-between px-7 py-5"
                  style={{ borderBottom: '1px solid var(--line)' }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 8,
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-muted)',
                      }}
                    >
                      Grading Report
                    </p>
                    <p className="font-display mt-1" style={{ fontSize: '1.5rem' }}>
                      {piece.certification!.type}
                    </p>
                  </div>
                  <span style={{ fontSize: 20, color: 'var(--gold-deep)', opacity: 0.7 }}>◆</span>
                </div>

                {/* Data rows */}
                <div className="px-7 py-5 space-y-0">
                  {piece.certification!.number && (
                    <div
                      className="flex justify-between gap-6 py-3"
                      style={{ borderBottom: '1px solid var(--line)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                          color: 'var(--ink-muted)',
                        }}
                      >
                        Report No.
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                          color: 'var(--ink)',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {piece.certification!.number}
                      </span>
                    </div>
                  )}
                  {piece.specifications.map((s, i) => (
                    <div
                      key={s.label}
                      className="flex justify-between gap-6 py-3"
                      style={{
                        borderBottom:
                          i < piece.specifications.length - 1 ? '1px solid var(--line)' : 'none',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: 11,
                          color: 'var(--ink)',
                          textAlign: 'right',
                        }}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Verify footer */}
                <div
                  className="px-7 py-4"
                  style={{ borderTop: '1px solid var(--line)', background: 'var(--bone-deep)' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      color: 'var(--ink-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Verify at{' '}
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--gold-deep)', textDecoration: 'underline' }}
                    >
                      {piece.certification!.type === 'GIA'
                        ? 'gia.edu/report-check'
                        : 'igi.org/verify-your-report'}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Care / Returns / Shipping accordions */}
      <section className="bg-bone">
        <div className="container-content py-16">
          <Accordion title="Care Instructions">
            <p>{piece.careInstructions}</p>
          </Accordion>
          <Accordion title="Authenticity & Returns">
            <p>
              Every piece comes with a Solitaire authentication card and the applicable
              certificate (GIA, IGI, or BIS). Bring the piece in for an annual check-up at
              no charge, we tighten settings, polish, and re-foil any kundan that has
              loosened.
            </p>
          </Accordion>
          <Accordion title="Shipping & Visit">
            <p>
              Inspection is in-store at Swaroop Nagar, Kanpur. For high-value pieces, we
              arrange a private courier for trial within Kanpur and Lucknow.
            </p>
          </Accordion>
        </div>
      </section>

      {/* Related pieces, horizontal scroll carousel */}
      {related.length > 0 && (
        <section className="section-pad bg-bone">
          <div className="container-wide">
            <Reveal className="mb-10">
              <p className="eyebrow">You may also like</p>
              <h2 className="display-page mt-3">More from the boutique</h2>
            </Reveal>

            <div
              className="flex gap-5 md:gap-7 overflow-x-auto pb-4 -mx-4 md:-mx-6 lg:-mx-10 px-4 md:px-6 lg:px-10"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
            >
              {related.map((p) => (
                <div
                  key={p.slug}
                  className="flex-shrink-0 w-56 md:w-68 lg:w-72"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <PieceCard piece={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-bone-deep py-16 md:py-24">
        <div className="container-content text-center">
          <p className="eyebrow mb-4">Still deciding?</p>
          <h2 className="display-page">
            Come and see it before you decide.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/visit" className="btn-primary">
              Visit the Boutique
            </Link>
            <a
              href={whatsappLinkFor(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Ask About This Piece
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
