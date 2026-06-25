'use client';

/* ──────────────────────────────────────────────────────────
   TheAtelier — Section 06 (NEW — no competitor has this)
   Black-and-white documentary aesthetic. Full-bleed image,
   sepia-tone filter, named makers, editorial copy.
   Addresses Instagram audit's "missing BTS content" gap.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ATELIER_IMAGE = {
  src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2000&q=85',
  alt: 'Craftsman at work in the Jaipur atelier — Mehul Bhai of Johri Bazaar',
  caption: 'The Jaipur atelier. Mehul Bhai\'s workshop, Johri Bazaar.',
};

export function TheAtelier() {
  const reduce = useReducedMotion();

  return (
    <section
      className="section-pad-lg"
      style={{ background: 'var(--stone-100)' }}
    >
      <div className="container-wide">

        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-5"
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          03 — THE ATELIER
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            fontStyle: 'italic',
            maxWidth: 700,
            marginBottom: '3.5rem',
          }}
          initial={reduce ? {} : { opacity: 0, y: 18 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
        >
          The pieces don&rsquo;t come from us.<br />They come through us.
        </motion.h2>

        {/* Full-bleed image with film grain overlay */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(320px, 58vh, 680px)',
            marginBottom: '3rem',
          }}
          initial={reduce ? {} : { clipPath: 'inset(0 0 100% 0)', scale: 1.04 }}
          whileInView={reduce ? {} : { clipPath: 'inset(0 0 0% 0)', scale: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 1.4, ease }}
        >
          <Image
            src={ATELIER_IMAGE.src}
            alt={ATELIER_IMAGE.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              filter: 'grayscale(0.85) sepia(0.35) contrast(1.08) brightness(0.9)',
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
              opacity: 0.4,
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }}
          />

          {/* Caption */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4"
            style={{
              background: 'linear-gradient(to top, rgba(26,20,16,0.72) 0%, transparent 100%)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9.5,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,227,0.55)',
                fontStyle: 'italic',
              }}
            >
              {ATELIER_IMAGE.caption}
            </p>
          </div>
        </motion.div>

        {/* Two-column editorial body */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          <motion.p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)',
              lineHeight: 1.85,
              color: 'var(--ink-soft)',
            }}
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            Solitaire is not a manufacturer. We don&rsquo;t have machines in the back of
            the boutique. What we have is a network — eleven ateliers spread across Jaipur,
            Vadasery, Nagercoil, and Kanpur — each finishing the technique their family has
            finished for generations. Polki comes from one address in Johri Bazaar. Temple
            jewellery from one family in Tamil Nadu. Antique gold from a master in Old
            Kanpur who works out of his living room with three apprentices.
          </motion.p>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)',
                lineHeight: 1.85,
                color: 'var(--ink-soft)',
                marginBottom: '2rem',
              }}
            >
              We visit each atelier at least twice a year. We pay in full, in advance, in
              cash, the day the piece is taken from the workshop. That is why these ateliers
              work with us, and not always with the larger names.
            </p>

            <Link
              href="/craftsmanship"
              className="btn-ghost"
              style={{ color: 'var(--aged-gold)', fontSize: 10.5, letterSpacing: '0.18em' }}
            >
              Meet the ateliers →
            </Link>
          </motion.div>

        </div>

        {/* Three atelier names — small, typewritten */}
        <motion.div
          className="mt-16 pt-10 flex flex-wrap gap-x-12 gap-y-4"
          style={{ borderTop: '1px solid var(--ivory-smoke)' }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {[
            { name: 'Mehul Patel & Sons', place: 'Johri Bazaar, Jaipur', spec: 'Polki & Kundan' },
            { name: 'Pandey Sonarkhana', place: 'Old Kanpur',            spec: 'Antique Gold' },
            { name: 'Two families (named on request)', place: 'Vadasery & Nagercoil', spec: 'Temple Jewellery' },
          ].map((a) => (
            <div key={a.name}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9.5,
                  letterSpacing: '0.06em',
                  color: 'var(--obsidian)',
                  fontWeight: 500,
                  marginBottom: 3,
                }}
              >
                {a.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                {a.place} · {a.spec}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
