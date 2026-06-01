'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SPRING = [0.16, 1, 0.3, 1] as const;

/* ─── Animated counter ──────────────────────────────────── */
function useCountUp(to: number, duration = 1.5, inView = false) {
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const ref        = useRef<HTMLSpanElement>(null);
  useEffect(() => { if (inView) motionVal.set(to); }, [inView, to, motionVal]);
  useEffect(() => spring.on('change', (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString(); }), [spring]);
  return ref;
}

function CounterStat({ n, suffix = '', label, index }: { n: number; suffix?: string; label: string; index: number }) {
  const reduce  = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: '-10%' });
  const numRef  = useCountUp(reduce ? 0 : n, 1.5, inView);
  return (
    <motion.div
      ref={wrapRef}
      className="text-center relative px-2 flex flex-col justify-between h-full"
      initial={reduce ? {} : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: SPRING }}
    >
      <div>
        <p className="counter-num" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          <span ref={numRef}>{reduce ? n : 0}</span>{suffix}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: '0.8rem', lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      {index < 3 && (
        <div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--ivory-smoke), transparent)',
          }}
        />
      )}
    </motion.div>
  );
}

function StaticStat({ value, label, index }: { value: string; label: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="text-center relative px-2 flex flex-col justify-between h-full"
      initial={reduce ? {} : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: SPRING }}
    >
      <div>
        <p className="counter-num" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {value}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: '0.8rem', lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      {index < 3 && (
        <div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--ivory-smoke), transparent)',
          }}
        />
      )}
    </motion.div>
  );
}

/* ─── Certification data ─────────────────────────────────── */
const CERTIFICATIONS = [
  {
    body:      'GIA',
    founded:   'Est. 1931',
    full:      'Gemological Institute of America',
    note:      "The world's most respected grading lab for natural diamonds. Every diamond of value in the boutique carries a full GIA report, colour, clarity, cut, carat. Verify it at gia.edu/report-check while sitting at our table.",
    link:      '/journal/how-to-verify-a-gia-certified-solitaire',
    linkLabel: 'How to verify a GIA report',
  },
  {
    body:      'IGI',
    founded:   'Est. 1975',
    full:      'International Gemological Institute',
    note:      "For coloured stones, lab-grown diamonds where applicable, and smaller-carat naturals. IGI is the second-most-trusted lab in our category and the standard most North Indian buyers actually verify.",
    link:      '/trust',
    linkLabel: 'Read about IGI',
  },
  {
    body:      'BIS 916',
    founded:   'Hallmarked',
    full:      'Bureau of Indian Standards',
    note:      'The 916 mark certifies 22kt gold purity. Every gold piece in the boutique carries the hallmark stamped on the clasp or setting, with a six-digit HUID, fully traceable on manakonline.in.',
    link:      '/trust',
    linkLabel: 'How to verify the hallmark',
  },
];

/* ─── CertCard ───────────────────────────────────────────── */
function CertCard({ c, i }: { c: typeof CERTIFICATIONS[0]; i: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        background:    '#FDFAF5',
        padding:       '0',
        boxShadow:     '0 2px 16px rgba(26,20,16,0.06)',
        cursor:        'default',
      }}
      initial={reduce ? {} : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.9, delay: i * 0.13, ease: SPRING }}
      whileHover={reduce ? {} : {
        y: -10,
        boxShadow: '0 28px 72px rgba(26,20,16,0.14), 0 8px 24px rgba(26,20,16,0.08)',
        transition: { duration: 0.4, ease: SPRING },
      }}
    >
      {/* Animated gold top bar */}
      <motion.div
        style={{
          position:   'absolute',
          top: 0, left: 0, right: 0,
          height:     2,
          background: 'linear-gradient(90deg, var(--aged-gold) 0%, rgba(184,146,58,0.4) 100%)',
          originX:    0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: i * 0.13 + 0.3, ease: SPRING }}
      />

      {/* Ghost watermark — huge abbreviation behind content */}
      <span
        aria-hidden
        style={{
          position:    'absolute',
          bottom:      '-1rem',
          right:       '-0.75rem',
          fontFamily:  'var(--font-display)',
          fontSize:    'clamp(6rem, 12vw, 10rem)',
          fontWeight:  400,
          color:       'var(--aged-gold)',
          opacity:     0.045,
          lineHeight:  1,
          letterSpacing: '-0.04em',
          userSelect:  'none',
          pointerEvents: 'none',
          whiteSpace:  'nowrap',
        }}
      >
        {c.body}
      </span>

      {/* Card content */}
      <div style={{ padding: '2.8rem 2.6rem 2.4rem', position: 'relative', zIndex: 1 }}>

        {/* Mark row: abbreviation + founded */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
          <span
            className="font-display"
            style={{
              fontSize:      'clamp(2.8rem, 4.2vw, 4.4rem)',
              color:         'var(--aged-gold)',
              fontWeight:    400,
              lineHeight:    1,
              letterSpacing: '-0.03em',
            }}
          >
            {c.body}
          </span>
          <span
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'var(--ink-muted)',
              opacity:       0.7,
              paddingBottom: '0.2rem',
            }}
          >
            {c.founded}
          </span>
        </div>

        {/* Gold gradient separator */}
        <div style={{
          width:      '100%',
          height:     '1px',
          background: 'linear-gradient(to right, rgba(184,146,58,0.55) 0%, transparent 65%)',
          marginBottom: '1.2rem',
        }} />

        {/* Full name */}
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      9.5,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color:         'var(--ink-muted)',
            marginBottom:  '1rem',
          }}
        >
          {c.full}
        </p>

        {/* Note */}
        <p
          style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '0.9375rem',
            lineHeight:   1.82,
            color:        'var(--ink-soft)',
            marginBottom: '2rem',
          }}
        >
          {c.note}
        </p>

        {/* Link */}
        <Link
          href={c.link}
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--aged-gold)',
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.5rem',
            position:      'relative',
          }}
          className="group/link"
        >
          <span>{c.linkLabel}</span>
          <span
            style={{ display: 'inline-block', transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)' }}
            className="group-hover/link:translate-x-1"
          >
            →
          </span>
          {/* Underline reveal */}
          <span
            style={{
              position:     'absolute',
              bottom:       -2,
              left:         0,
              width:        '100%',
              height:       '1px',
              background:   'var(--aged-gold)',
              transformOrigin: 'right',
              transform:    'scaleX(0)',
              transition:   'transform 500ms cubic-bezier(0.16,1,0.3,1)',
            }}
            className="group-hover/link:scale-x-100 group-hover/link:origin-left"
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
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
          transition={{ duration: 0.8, ease: SPRING }}
        >
          <p className="eyebrow mb-4">06 — The Paper</p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.06, letterSpacing: '-0.022em', maxWidth: 640, marginBottom: '1.2rem' }}
          >
            Trusted by Kanpur families.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)', lineHeight: 1.8, color: 'var(--ink-soft)', maxWidth: 580 }}>
            &ldquo;Certified&rdquo; here means a real report, with a number you can
            verify on the lab&rsquo;s own website, that goes home with the piece. If
            we cannot show it to you, we will not claim it.
          </p>
        </motion.div>

        {/* Certification cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {CERTIFICATIONS.map((c, i) => (
            <CertCard key={c.body} c={c} i={i} />
          ))}
        </div>

        {/* Stat counters */}
        <div
          className="mt-16 pt-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-0"
          style={{ borderTop: '1px solid var(--ivory-smoke)' }}
        >
          <CounterStat n={2018}        label="A boutique built on people who come back" index={0} />
          <StaticStat  value="4.7★"    label="On Google, from families who have sat with us" index={1} />
          <StaticStat  value="GIA & IGI" label="Every diamond of value, independently certified" index={2} />
          <StaticStat  value="BIS"     label="Hallmarked gold, purity you never take on faith" index={3} />
        </div>

        {/* Footer line */}
        <motion.p
          className="mt-10 text-center"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.85rem, 1.2vw, 0.9375rem)', fontStyle: 'italic', color: 'var(--ink-muted)' }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: SPRING }}
        >
          Want to see how a certificate is checked before you visit? We wrote a simple guide.{' '}
          <Link href="/journal/how-to-verify-a-gia-certified-solitaire" className="link-underline">
            Read it →
          </Link>
        </motion.p>

      </div>
    </section>
  );
}
