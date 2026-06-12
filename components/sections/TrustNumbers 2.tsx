'use client';

/* ──────────────────────────────────────────────────────────
   ThePaper (TrustNumbers) — Section 07
   "04 — THE PAPER" — certifications with authority.
   Three hover-lift cards + animated number counters.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import { motion, useReducedMotion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* Animated counter hook */
function useCountUp(to: number, duration = 1.5, inView = false) {
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const ref       = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
  }, [spring]);

  return ref;
}

function CounterStat({ n, suffix = '', label }: { n: number; suffix?: string; label: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: '-10%' });
  const numRef = useCountUp(reduce ? 0 : n, 1.5, isInView);

  return (
    <div ref={wrapRef} className="text-center">
      <p
        className="counter-num"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        <span ref={numRef}>{reduce ? n : 0}</span>
        {suffix}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginTop: '0.6rem',
        }}
      >
        {label}
      </p>
    </div>
  );
}

const CERTIFICATIONS = [
  {
    body: 'GIA',
    full: 'Gemological Institute of America',
    note: "The world's most respected grading lab for natural diamonds. Every solitaire over 0.30ct in the boutique carries a full GIA report — 4Cs, plot diagram, inclusion mapping. Verify at gia.edu/report-check while sitting at our table.",
    link: '/journal/how-to-verify-a-gia-certified-solitaire',
    linkLabel: 'How to verify a GIA report →',
  },
  {
    body: 'IGI',
    full: 'International Gemological Institute',
    note: "For coloured stones, lab-grown diamonds where applicable, and smaller-carat naturals. IGI is the second-most-trusted lab in our category and the standard most North Indian buyers actually verify.",
    link: '/trust',
    linkLabel: 'Read about IGI →',
  },
  {
    body: 'BIS 916',
    full: 'Bureau of Indian Standards',
    note: 'The 916 mark certifies 22kt gold purity. Every gold piece in the boutique carries the hallmark stamped on the clasp or setting — with a six-digit HUID, fully traceable on manakonline.in.',
    link: '/trust',
    linkLabel: 'How to verify the hallmark →',
  },
];

export function TrustNumbers() {
  const reduce = useReducedMotion();

  return (
    <section style={{ background: 'var(--stone-200)' }}>
      <div className="container-wide py-20 md:py-28">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow mb-4">04 — THE PAPER</p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.022em',
              fontStyle: 'italic',
              maxWidth: 640,
              marginBottom: '1.2rem',
            }}
          >
            Every piece comes with the papers it ought to.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)',
              lineHeight: 1.8,
              color: 'var(--ink-soft)',
              maxWidth: 580,
            }}
          >
            At Solitaire, &ldquo;certified&rdquo; means there is a physical report, with a
            number you can verify on the certifying body&rsquo;s website, that travels with
            the piece. If we can&rsquo;t show it to you, we won&rsquo;t claim it.
          </p>
        </motion.div>

        {/* Three certification cards */}
        <div className="grid md:grid-cols-3 gap-1">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.body}
              style={{
                background: 'var(--ivory)',
                padding: '2.5rem 2rem',
                cursor: 'default',
              }}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              whileHover={reduce ? {} : { y: -4, boxShadow: '0 12px 40px rgba(26,20,16,0.10)' }}
            >
              {/* Cert mark */}
              <div className="flex items-baseline gap-3 mb-5">
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                    color: 'var(--aged-gold)',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {c.body}
                </span>
                <span
                  aria-hidden
                  style={{
                    display: 'block', width: 20, height: 1,
                    background: 'var(--aged-gold)', opacity: 0.5, flexShrink: 0,
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                {c.full}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: 'var(--ink-soft)',
                  marginBottom: '1.5rem',
                }}
              >
                {c.note}
              </p>

              <Link
                href={c.link}
                className="btn-ghost"
                style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--aged-gold)' }}
              >
                {c.linkLabel}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Animated stat counters */}
        <motion.div
          className="mt-16 pt-12 grid grid-cols-2 md:grid-cols-4 gap-10"
          style={{ borderTop: '1px solid var(--ivory-smoke)' }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <CounterStat n={500}  suffix="+" label="Families trusted" />
          <CounterStat n={47}         label="Polki pieces in our collection" />
          <CounterStat n={400}  suffix="+" label="Brides since opening" />
          <CounterStat n={11}         label="Ateliers in our network" />
        </motion.div>

        {/* Footer line */}
        <motion.p
          className="mt-10 text-center"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.85rem, 1.2vw, 0.9375rem)',
            fontStyle: 'italic',
            color: 'var(--ink-muted)',
          }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          If you&rsquo;d like to see how certificates are verified before your visit — we
          wrote a guide.{' '}
          <Link href="/journal/how-to-verify-a-gia-certified-solitaire" className="link-underline">
            Read it →
          </Link>
        </motion.p>

      </div>
    </section>
  );
}
