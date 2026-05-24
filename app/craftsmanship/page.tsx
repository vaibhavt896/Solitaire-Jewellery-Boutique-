import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Craftsmanship & Certification',
  description:
    'How a Polki necklace is made, how a diamond gets graded, and how a Solitaire piece is finished — from sketch to certificate to handover.',
  path: '/craftsmanship',
});

const STEPS = [
  {
    n: '01',
    title: 'The Sketch',
    body: 'Every Polki piece begins on paper. A bridal necklace is sketched to scale, with each diamond\'s position marked, and the gold weight estimated. The sketch goes back and forth between the boutique and the atelier until the proportions feel right.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    n: '02',
    title: 'The Foundation',
    body: '22-karat gold is shaped to the sketch. Each setting is hammered by hand, not cast in a mould. The foundation is the slowest part — a bridal choker takes a senior craftsman about two weeks before the first stone is set.',
    image:
      'https://images.unsplash.com/photo-1620794108219-aedbaded4eea?auto=format&fit=crop&w=1600&q=80',
  },
  {
    n: '03',
    title: 'The Setting',
    body: 'Polki stones are set using the kundan technique — fine gold foil pressed around each stone to hold it in place. The diamonds we use here are uncut, sourced from a single Jaipur supplier we have worked with for a decade.',
    image:
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    n: '04',
    title: 'The Finish',
    body: 'A final hand-polish, the Solitaire authentication card, the certificate of any graded stone, the storage pouch. The piece is photographed for our records and yours, then it leaves the atelier. The first time you see it is at the boutique.',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80',
  },
];

const CERT = [
  {
    title: 'Sourced',
    body: 'Diamonds are selected by hand from trusted suppliers in Mumbai and Surat — never bulk-bought, never quota-filled.',
  },
  {
    title: 'Graded',
    body: 'Stones of significance are sent to GIA or IGI for grading. The lab issues a unique report — colour, clarity, cut, carat, and a laser inscription on the girdle.',
  },
  {
    title: 'Certified',
    body: 'The certificate travels with every piece. We walk you through the report at handover, and we keep a copy on file for the life of the piece.',
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
            <p className="eyebrow mb-4">Craftsmanship</p>
            <h1 className="display-page max-w-3xl mx-auto leading-tight">
              How a Polki necklace becomes a Solitaire piece.
            </h1>
            <p className="body-lead mt-6 max-w-xl mx-auto">
              Six weeks. Two ateliers. A few thousand decisions. The four steps
              below describe the process for almost every piece we make.
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
                      alt={`${s.title} — Solitaire craftsmanship`}
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
            <p className="eyebrow">Certification</p>
            <h2 className="display-page mt-3">
              How we authenticate every diamond.
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
            See the certificates, hold the pieces, ask the questions.
          </p>
          <Link href="/visit" className="btn-primary mt-10 inline-flex">
            Visit the Boutique
          </Link>
        </div>
      </section>
    </>
  );
}
