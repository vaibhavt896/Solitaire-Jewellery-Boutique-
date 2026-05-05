import { Reveal } from '@/components/Reveal';
import { IconCert, IconCurate, IconHeritage } from '@/components/icons/Icon';

const PILLARS = [
  {
    Icon: IconCert,
    title: 'GIA & IGI Certified',
    body: "Every diamond of significance is graded by the world's leading labs. The certificate travels with the piece.",
  },
  {
    Icon: IconCurate,
    title: 'Curated Exclusivity',
    body: 'No mass-market pieces. Each piece is selected by hand, in small numbers, for the woman who wants only her own piece.',
  },
  {
    Icon: IconHeritage,
    title: 'Heritage Craftsmanship',
    body: 'Polki, antique gold, and temple techniques preserved exactly. Pieces finished by ateliers we have known for years.',
  },
];

export function Difference() {
  return (
    <section className="section-pad bg-bone-deep">
      <div className="container-wide">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-4">The Solitaire Difference</p>
          <h2 className="display-page">
            Three things that make a Solitaire piece, a Solitaire piece.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex items-start gap-6 md:flex-col md:gap-8">
                <Icon className="text-gold-deep shrink-0" />
                <div>
                  <h3 className="font-display text-h1 mb-3">{title}</h3>
                  <p className="text-body text-ink-soft">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
