import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { MEDIA } from '@/lib/placeholder-media';

export const metadata: Metadata = buildMetadata({
  title: 'How a Piece Is Made | Craftsmanship & Certification',
  description:
    'How a Polki necklace is drawn, set by hand, and certified, from sketch to the certificate that goes home with you. See it in person in Kanpur.',
  path: '/craftsmanship',
});

const STEPS = [
  {
    n: '01',
    title: 'The drawing',
    body: 'Every Polki piece begins on paper. A bridal necklace is drawn to size, with the place of each diamond marked and the gold weight worked out. The drawing goes back and forth between us and the workshop until it feels right.',
    image: MEDIA.gold,
  },
  {
    n: '02',
    title: 'The gold',
    body: '22K gold is shaped to the drawing. Each setting is worked by hand, not poured into a mould. This is the slowest step, a bridal choker takes a senior craftsman about two weeks before the first stone is even set.',
    image: MEDIA.boutique,
  },
  {
    n: '03',
    title: 'The setting',
    body: 'The Polki stones are set in the old way, with fine gold pressed around each one to hold it. The uncut diamonds we use come from a single Jaipur supplier we have trusted for over a decade.',
    image: MEDIA.polki,
  },
  {
    n: '04',
    title: 'The finish',
    body: 'A final hand-polish, the certificate for any graded stone, our own card, and the pouch. The piece is photographed for our records and yours. The first time you see it is here, at the boutique.',
    image: MEDIA.bridal,
  },
];

const CERT = [
  {
    title: 'Sourced',
    body: 'Our diamonds are chosen by hand from suppliers we know in Mumbai and Surat, never bought in bulk to fill a shelf.',
  },
  {
    title: 'Graded',
    body: "Stones of value are sent to GIA or IGI, the world's leading labs. They issue an independent report, colour, clarity, cut, carat, and a tiny laser mark on the stone itself.",
  },
  {
    title: 'Certified',
    body: 'The certificate goes home with the piece. We explain it to you in plain words at handover, and we keep a copy on file for life.',
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Craftsmanship', href: '/craftsmanship' },
        ])}
      />

      {/* Hero */}
      <section className="bg-bone py-20 md:py-32">
        <div className="container-content">
          <Reveal className="text-center">
            <p className="eyebrow mb-4">How it is made</p>
            <h1 className="display-page max-w-3xl mx-auto leading-tight">
              Made slowly, the way good jewellery has always been made.
            </h1>
            <p className="body-lead mt-6 max-w-xl mx-auto">
              Six weeks. Two workshops. Many pairs of careful hands. Here is how
              almost every Solitaire piece comes to be.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-bone-deep">
        <div className="container-wide">
          {STEPS.map((s, i) => (
            <Reveal key={s.n}>
              <div
                className={`grid md:grid-cols-2 gap-10 lg:gap-20 items-center py-20 md:py-28 ${
                  i !== STEPS.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="aspect-[4/5] overflow-hidden bg-bone">
                    <img
                      src={s.image}
                      alt={`${s.title}, Solitaire craftsmanship`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-display text-display text-gold-soft">{s.n}</p>
                  <h2 className="font-display text-display mt-2 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-body text-ink-soft mt-6 max-w-md">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow">How you can trust it</p>
            <h2 className="display-page mt-3">
              You should never have to take a stone on faith.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {CERT.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="bg-bone-deep p-8 md:p-10 h-full">
                  <p className="font-display text-display text-gold-soft mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-h1 mb-4">{c.title}</h3>
                  <p className="text-body text-ink-soft">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone-deep py-16 md:py-20">
        <div className="container-content text-center">
          <p className="font-display text-h1 leading-snug max-w-2xl mx-auto">
            See the certificates. Hold the pieces. Ask anything.
          </p>
          <Link href="/visit" className="btn-primary mt-10 inline-flex">
            Visit the Boutique
          </Link>
        </div>
      </section>
    </>
  );
}
