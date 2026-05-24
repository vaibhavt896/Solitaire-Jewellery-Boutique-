import { Reveal } from '@/components/Reveal';

const CERTIFICATIONS = [
  {
    body: 'GIA',
    full: 'Gemological Institute of America',
    note: 'The world standard for diamond grading. Every significant stone carries its report.',
  },
  {
    body: 'IGI',
    full: 'International Gemological Institute',
    note: 'Independent grading for coloured stones and lab-grown diamonds in our collection.',
  },
  {
    body: 'BIS 916',
    full: 'Bureau of Indian Standards',
    note: 'All gold pieces are hallmarked at 22kt. The stamp is on every clasp and setting.',
  },
];

export function TrustNumbers() {
  return (
    <section className="bg-bone-deep">
      <div className="container-wide py-16 md:py-20">
        <Reveal className="mb-10 md:mb-14">
          <p className="eyebrow mb-3">Certified by</p>
          <h2 className="font-display text-h1 max-w-xl">
            Every piece carries its paper.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal
              key={c.body}
              delay={i * 0.1}
              className="bg-bone-deep px-8 py-10 flex flex-col gap-5"
            >
              {/* Certification mark */}
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: 'var(--gold-deep)',
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {c.body}
                </span>
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: 'var(--gold)',
                    opacity: 0.5,
                    flexShrink: 0,
                    alignSelf: 'center',
                    display: 'block',
                  }}
                  aria-hidden
                />
              </div>

              <div>
                <p className="text-small font-medium text-ink">{c.full}</p>
                <p className="mt-2 text-small text-ink-soft leading-relaxed">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex items-center gap-4">
          <span
            aria-hidden
            style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)', opacity: 0.5, flexShrink: 0 }}
          />
          <p className="text-small text-ink-muted">
            Certificates travel with every piece. Ask to see them at the boutique.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
