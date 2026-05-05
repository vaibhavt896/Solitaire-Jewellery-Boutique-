import Link from 'next/link';
import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPiecesInCollection } from '@/lib/data/pieces';
import { PieceCard } from '@/components/PieceCard';

export const metadata: Metadata = buildMetadata({
  title: 'Bridal Consultation',
  description:
    'A private 45-minute consultation to curate the pieces of your wedding day. Polki, antique gold, certified solitaires — at the Solitaire boutique in Swaroop Nagar, Kanpur.',
  path: '/bridal',
});

const STEPS = [
  {
    n: '01',
    title: 'Consultation',
    body: 'We meet at Swaroop Nagar to understand your day — the lehenga, the ceremony, the family heirlooms already in the picture.',
  },
  {
    n: '02',
    title: 'Curation',
    body: 'We curate from our collection and our atelier — six to ten pieces, mapped to your day, your spend, and your vision.',
  },
  {
    n: '03',
    title: 'Crafting',
    body: 'Pieces are made or selected to fit. Where a piece is being commissioned, we share progress photographs week by week.',
  },
  {
    n: '04',
    title: 'Heirloom',
    body: 'You wear it. And one day, your daughter does. We service every piece for the life of the piece.',
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
      <section className="relative h-[85svh] min-h-[600px] bg-ink overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=2400&q=80"
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
              For The Bride
            </p>
            <h1
              className="font-display text-mega font-medium leading-[1.05] max-w-4xl"
              style={{ color: 'var(--bone)' }}
            >
              The pieces of your most photographed day.
            </h1>
            <Link
              href="/bridal/book"
              className="bg-bone text-ink px-8 py-4 text-small uppercase tracking-button font-medium hover:bg-gold-soft transition-colors mt-10 inline-block"
            >
              Book Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16 md:mb-20">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="display-page">
              How a Solitaire bridal set comes to be.
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
            <p className="eyebrow">The Bridal Edit</p>
            <h2 className="display-page mt-3">Six pieces from this season.</h2>
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
      <section className="section-pad bg-rose-soft">
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
            — A Solitaire bride, 2024
          </p>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="section-pad bg-bone">
        <Reveal className="container-content text-center">
          <p className="eyebrow mb-4">Ready to begin?</p>
          <h2 className="display-page max-w-3xl mx-auto leading-tight">
            A consultation is 45 minutes.
          </h2>
          <p className="body-lead mt-6 max-w-xl mx-auto">
            We meet you in our Swaroop Nagar boutique with a curated selection
            based on what you tell us.
          </p>
          <Link href="/bridal/book" className="btn-primary mt-10 inline-flex">
            Book Your Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
