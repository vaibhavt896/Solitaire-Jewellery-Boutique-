import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { Accordion } from '@/components/Accordion';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Trust & Certification',
  description:
    'GIA, IGI, BIS Hallmark — every Solitaire piece is documented, every diamond of significance is certified. How we authenticate, and what to ask any jeweller.',
  path: '/trust',
});

const FAQS = [
  {
    q: 'How can I verify my GIA certificate?',
    a: 'Every GIA report has a unique number. Visit gia.edu/report-check on your phone, enter the number, and confirm the carat, cut, colour, and clarity match what is on the certificate. We do this with you in person at handover.',
  },
  {
    q: 'What does the IGI report tell me?',
    a: 'An IGI report grades the same four Cs (cut, colour, clarity, carat), notes any treatments, and includes a unique report number. IGI is the leading lab in India and is used widely for bridal-grade diamonds. The report is verifiable at igi.org.',
  },
  {
    q: 'Do you offer buy-back?',
    a: 'Yes, on pieces purchased from us. Gold is bought back at the prevailing day rate, less making. Diamonds are bought back at a percentage of the original price. Bring the certificate and the piece — we handle the rest.',
  },
  {
    q: 'What is your authentication policy?',
    a: 'Every piece comes with a Solitaire authentication card and the applicable certificate (GIA, IGI, or BIS). We keep a copy on file for the life of the piece. Bring the piece in for a yearly check-up at no charge.',
  },
  {
    q: 'Why is BIS hallmarking important?',
    a: 'BIS hallmarking has been mandatory in India for gold jewellery since 16 June 2021. The hallmark on a piece confirms its purity (22K, 18K, etc.) and that the gold is from a registered source. Insist on it from any seller.',
  },
];

export default function TrustPage() {
  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Trust', href: '/trust' },
        ])}
      />

      <section className="bg-bone py-20 md:py-32">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow mb-4">Trust</p>
            <h1 className="display-page leading-tight">
              Every piece, accountable.
            </h1>
            <p className="body-lead mt-6">
              At Solitaire, every diamond and gemstone of significance carries a
              certificate. Every gold piece is hallmarked. Every transaction is
              documented. This is how we keep our promise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad bg-bone-deep">
        <div className="container-wide">
          <Reveal className="mb-16">
            <p className="eyebrow">Certifications</p>
            <h2 className="display-page mt-3">Three labels we insist on.</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <CertCard
              tag="GIA"
              title="Gemological Institute of America"
              body="The world's leading authority on diamonds. Every solitaire ≥0.30 ct sold by us comes with a GIA report."
              accent="emerald"
            />
            <CertCard
              tag="IGI"
              title="International Gemological Institute"
              body="The leading diamond grading lab in India. Most of our bridal diamond pieces carry an IGI report."
              accent="gold-deep"
            />
            <CertCard
              tag="BIS"
              title="Bureau of Indian Standards"
              body="Mandatory hallmark for gold jewellery in India since 16 June 2021. Every gold piece we sell carries it."
              accent="ruby"
            />
          </div>
        </div>
      </section>

      {/* Sample certificate */}
      <section className="section-pad bg-bone">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Sample Certificate</p>
            <h2 className="display-page mt-3">
              This is what every solitaire of significance comes with.
            </h2>
          </Reveal>
          <Reveal className="mt-12">
            <div className="aspect-[3/2] bg-paper border border-line p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#F2EAD0_50%,transparent_100%)] opacity-40" />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-display text-h2">GIA Report</span>
                  <span className="text-mono text-small text-ink-muted">
                    #2384719234
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto pt-8 text-mono text-small">
                  <div>
                    <p className="text-ink-muted text-micro uppercase tracking-eyebrow">
                      Carat
                    </p>
                    <p className="text-ink mt-1">1.02 ct</p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-micro uppercase tracking-eyebrow">
                      Colour
                    </p>
                    <p className="text-ink mt-1">F</p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-micro uppercase tracking-eyebrow">
                      Clarity
                    </p>
                    <p className="text-ink mt-1">VVS2</p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-micro uppercase tracking-eyebrow">
                      Cut
                    </p>
                    <p className="text-ink mt-1">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-bone-deep">
        <div className="container-content">
          <Reveal className="mb-12">
            <p className="eyebrow">Common Questions</p>
            <h2 className="display-page mt-3">What buyers ask us most.</h2>
          </Reveal>

          <Reveal>
            <div>
              {FAQS.map((f) => (
                <Accordion key={f.q} title={f.q}>
                  <p>{f.a}</p>
                </Accordion>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CertCard({
  tag,
  title,
  body,
  accent,
}: {
  tag: string;
  title: string;
  body: string;
  accent: 'emerald' | 'gold-deep' | 'ruby';
}) {
  const accentClass =
    accent === 'emerald'
      ? 'text-emerald'
      : accent === 'ruby'
        ? 'text-ruby'
        : 'text-gold-deep';
  return (
    <div className="bg-paper border border-line p-8 md:p-10 h-full">
      <p
        className={`font-display text-mega font-medium leading-none ${accentClass}`}
      >
        {tag}
      </p>
      <h3 className="font-display text-h2 mt-6">{title}</h3>
      <p className="text-body text-ink-soft mt-4">{body}</p>
    </div>
  );
}
