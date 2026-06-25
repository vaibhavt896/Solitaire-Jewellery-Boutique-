'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-bone-deep">
      <div className="container-wide">
        <Reveal className="max-w-2xl mb-6">
          <p className="eyebrow mb-4">The Solitaire Difference</p>
          <h2 className="display-page">
            Three things that make a Solitaire piece, a Solitaire piece.
          </h2>
        </Reveal>

        {/* Gold line that draws across on scroll */}
        <motion.div
          className="mb-16 md:mb-20"
          style={{
            height: 1,
            background: 'linear-gradient(to right, var(--gold), transparent)',
            transformOrigin: 'left',
          }}
          initial={reduce ? {} : { scaleX: 0 }}
          whileInView={reduce ? {} : { scaleX: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <div className="flex flex-col gap-6">
                {/* Pillar number */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    opacity: 0.6,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex items-start gap-6 md:flex-col md:gap-6">
                  <Icon className="text-gold-deep shrink-0" />
                  <div>
                    <h3 className="font-display text-h1 mb-3">{title}</h3>
                    <p className="text-body text-ink-soft">{body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
