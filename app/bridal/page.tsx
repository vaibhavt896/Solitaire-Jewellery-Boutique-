import Link from 'next/link';
import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPiecesInCollection } from '@/lib/data/pieces';
import { PieceCard } from '@/components/PieceCard';
import { MEDIA } from '@/lib/placeholder-media';

export const metadata: Metadata = buildMetadata({
  title: 'Bridal Jewellery in Kanpur | Free Private Sittings',
  description:
    'Bridal sets composed around you, your outfit, and your budget. Book a free, unhurried 45-minute sitting at our Swaroop Nagar boutique in Kanpur.',
  path: '/bridal',
});

const STEPS = [
  {
    n: '01',
    title: 'We listen.',
    body: 'We meet at the boutique and talk about your day, your outfit, your ceremonies, the pieces your family may already be bringing in. We listen before we show you anything.',
  },
  {
    n: '02',
    title: 'We curate for you.',
    body: 'We bring out six to ten pieces, chosen for your face, your look, and your budget. Not the whole shop. Only what truly fits.',
  },
  {
    n: '03',
    title: 'We make it fit.',
    body: 'Pieces are sized, set, or made to suit you. If something is being made specially, we send you photos as it comes along, so there are no surprises.',
  },
  {
    n: '04',
    title: 'You keep it for life.',
    body: 'You wear it on your day. And one day, perhaps your daughter does. We care for every piece for as long as it stays in your family.',
  },
];

export default function BridalPage() {
  const bridalPieces = getPiecesInCollection('bridal');
  const polki = getPiecesInCollection('polki').slice(0, 4);
  const featured = bridalPieces.length ? bridalPieces : polki;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Bridal', href: '/bridal' },
        ])}
      />

      {/* Hero */}
      <section className="relative h-[85svh] min-h-[600px] bg-bone-deep overflow-hidden">
        <img
          src={MEDIA.bridal}
          alt="A bride in Solitaire jewellery, photographed in natural light"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/40" />
        <div className="relative h-full container-wide flex flex-col justify-end pb-20 md:pb-32 pt-32 text-bone">
          <Reveal>
            <p
              className="eyebrow mb-5"
              style={{ color: 'var(--gold-soft)' }}
            >
              For the bride
            </p>
            <h1
              className="font-display text-mega font-medium leading-[1.05] max-w-4xl"
              style={{ color: 'var(--bone)' }}
            >
              The pieces of the day you will never forget.
            </h1>
            <Link
              href="/bridal/book"
              className="cta cta--gold mt-10"
            >
              <span>Book a Private Sitting</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16 md:mb-20">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="display-page">
              From first sitting to the final piece.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative">
                  <p className="font-display text-display text-gold-soft mb-2">
                    {s.n}
                  </p>
                  <h3 className="font-display text-h1 mb-3">{s.title}</h3>
                  <p className="text-body text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal edit */}
      <section className="section-pad bg-bone-deep">
        <div className="container-wide">
          <Reveal className="mb-16">
            <p className="eyebrow">The bridal edit</p>
            <h2 className="display-page mt-3">A few pieces from this season.</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {featured.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <PieceCard piece={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-pad bg-bone">
        <Reveal className="container-content text-center">
          <p
            className="font-display text-display leading-tight"
            style={{ color: 'var(--ink)' }}
          >
            "I came to Solitaire two months before my wedding. They understood
            what my mother and I were looking for in the first meeting. The
            Polki necklace they curated for me is now my daughter's, and one day
            will be hers."
          </p>
          <p className="mt-8 text-mono text-small uppercase tracking-eyebrow text-rose">
            A Solitaire bride
          </p>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="section-pad bg-bone">
        <Reveal className="container-content text-center">
          <p className="eyebrow mb-4">Whenever you are ready</p>
          <h2 className="display-page max-w-3xl mx-auto leading-tight">
            A sitting is 45 minutes, free, and completely yours.
          </h2>
          <p className="body-lead mt-6 max-w-xl mx-auto">
            We will have a curated selection ready, based on what you tell us. Come
            alone, or bring the people whose opinion you trust most.
          </p>
          <Link href="/bridal/book" className="btn-primary mt-10 inline-flex">
            Book a Private Sitting
          </Link>
        </Reveal>
      </section>
    </>
  );
}
