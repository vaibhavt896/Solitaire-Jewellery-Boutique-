import type { Metadata } from 'next';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Accordion } from '@/components/Accordion';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Trust & Certification | Honest Answers',
  description:
    'GIA and IGI certified diamonds, hallmarked gold, and clear answers on purity, price, and returns. No pressure, ever. Visit us in Swaroop Nagar, Kanpur.',
  path: '/trust',
});

const FAQS = [
  {
    q: 'Is your gold really the purity you say?',
    a: 'Yes, and you do not have to take our word for it. All our gold is hallmarked to BIS standard, which is an independent stamp of purity. We will show you the mark and explain what it means.',
  },
  {
    q: 'What do GIA and IGI actually mean?',
    a: "They are the world's most respected diamond labs. They grade a stone independently of any seller, including us, and issue a report on its colour, clarity, cut, and carat. It is the closest thing there is to an honest second opinion.",
  },
  {
    q: 'Do I get the certificate to keep?',
    a: 'Always. The certificate goes home with the piece. We also keep a copy on file for the life of the piece, so you are covered if it is ever misplaced.',
  },
  {
    q: 'Will someone pressure me to spend more?',
    a: 'No. This is the heart of how we work. We show you what fits your budget and your taste, and we are genuinely happy if you come just to look. A relaxed customer makes a better choice, and comes back.',
  },
  {
    q: 'Can I come in just to browse?',
    a: 'Please do. There is no appointment needed to look around, and no obligation to buy. For bridal sets or solitaire viewings, a quick appointment just means your pieces are ready when you arrive.',
  },
  {
    q: 'Do you make custom or made-to-order pieces?',
    a: 'Yes. Much of our Polki and bridal work is made specially. We start with a drawing, agree on it together, and send you photos as it is made. Come in and tell us what you have in mind.',
  },
  {
    q: 'Do you repair and clean pieces you have sold?',
    a: 'For the life of the piece, and at no cost for a clean or a check. Bring it in any time. Re-fitting and re-setting are done at fair, clear prices, told to you in advance.',
  },
  {
    q: 'Can I exchange or return a piece?',
    a: 'Yes, within our policy, which we explain clearly before you buy, never in the fine print. Ask us and we will tell you exactly how it works for your piece.',
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
            <p className="eyebrow mb-4">Why you can trust us</p>
            <h1 className="display-page leading-tight">
              The honest answers, before you ask.
            </h1>
            <p className="body-lead mt-6">
              A big purchase deserves straight talk. Here is exactly what you can
              expect from us, and what goes home with you.
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
              logo="/GIA Logo.webp"
              title="Gemological Institute of America"
              body="The world's leading authority on diamonds. Every solitaire ≥0.30 ct sold by us comes with a GIA report."
              accent="emerald"
            />
            <CertCard
              tag="IGI"
              logo="/IGI logo.webp"
              title="International Gemological Institute"
              body="The leading diamond grading lab in India. Most of our bridal diamond pieces carry an IGI report."
              accent="gold-deep"
            />
            <CertCard
              tag="BIS 916"
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
            <div className="aspect-[3/2] bg-paper border border-line rounded-image p-8 md:p-16 relative overflow-hidden">
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
            <p className="eyebrow">The questions people really ask</p>
            <h2 className="display-page mt-3">The answers, in plain language.</h2>
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
  logo,
  title,
  body,
  accent,
}: {
  tag: string;
  logo?: string;
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
    <div className="bg-paper border border-line rounded-card p-8 md:p-10 h-full">
      <div className="flex items-start justify-between gap-4">
        <p className={`font-display text-mega font-medium leading-none ${accentClass}`}>
          {tag}
        </p>
        {logo && (
          <Image
            src={logo}
            alt={`${tag} certification logo`}
            width={80}
            height={40}
            style={{ objectFit: 'contain', height: 36, width: 'auto', flexShrink: 0 }}
          />
        )}
      </div>
      <h3 className="font-display text-h2 mt-6">{title}</h3>
      <p className="text-body text-ink-soft mt-4">{body}</p>
    </div>
  );
}
