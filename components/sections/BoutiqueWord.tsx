'use client';

/* ──────────────────────────────────────────────────────────
   BoutiqueWord, Section 01
   "A Word from the Boutique", the cover-note section that
   no competitor does. Sets editorial tone before any product
   is shown. Drop cap, signature, centred single column.
────────────────────────────────────────────────────────── */

import { motion, useReducedMotion } from 'framer-motion';
import { TextReveal } from '@/components/TextReveal';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function BoutiqueWord() {
  const reduce = useReducedMotion();

  return (
    <section
      className="section-pad"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="container-narrow mx-auto text-center">

        {/* Ornamental top rule */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <span
            aria-hidden
            style={{
              display: 'block',
              width: 40,
              height: 1,
              background: 'linear-gradient(to right, transparent, var(--aged-gold))',
            }}
          />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <rect x="6" y="0.7" width="7.5" height="7.5" transform="rotate(45 6 6)" fill="var(--aged-gold)" opacity="0.65" />
          </svg>
          <span
            aria-hidden
            style={{
              display: 'block',
              width: 40,
              height: 1,
              background: 'linear-gradient(to left, transparent, var(--aged-gold))',
            }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-6"
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          01 — A Word
        </motion.p>

        {/* Headline */}
        <TextReveal
          as="h2"
          className="font-display"
          style={{
            fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            color: 'var(--obsidian)',
            marginBottom: '2.5rem',
          }}
        >
          If you are choosing jewellery,<br />you have come to the right place.
        </TextReveal>

        {/* Body, drop cap paragraph */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.28, ease }}
        >
          <p
            className="drop-cap text-left"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
              lineHeight: 1.85,
              color: 'var(--ink-soft)',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            We are a small family boutique, not a big showroom. We keep fewer pieces
            on purpose, so you can really see each one. We will tell you honestly what
            a stone is and what it is worth. And if today is only for looking, that is
            completely fine. Come in when you are ready. We will be glad to see you.
          </p>
        </motion.div>

        {/* Signature */}
        <motion.p
          className="gold-metallic-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            marginTop: '2.5rem',
            letterSpacing: '0.01em',
          }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          — The Boutique
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-12"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          <span aria-hidden style={{ display: 'block', width: 60, height: 1, background: 'var(--gold-metallic)', opacity: 0.5 }} />
        </motion.div>

      </div>
    </section>
  );
}
