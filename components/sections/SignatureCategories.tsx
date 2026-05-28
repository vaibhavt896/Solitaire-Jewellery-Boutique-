'use client';

/* ──────────────────────────────────────────────────────────
   Collections (SignatureCategories) — Section 04
   Editorial alternating rows. Each collection: image 8-col,
   text 4-col, massive numbered, scroll-triggered reveal.
   Cursor changes to "View collection →" on image hover.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { COLLECTIONS } from '@/lib/data/collections';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const COLLECTION_ITEMS = [
  {
    slug:     'polki',
    num:      '01',
    headline: 'The setting that’s older than the diamond.',
    body:     'Polki is uncut diamond, set in foil, behind gold. The technique pre-dates the brilliant cut by four centuries. We work with a single atelier in Jaipur for every Polki piece in this boutique — set the way it was meant to be set, finished in 22kt.',
    cta:      'See the Polki pieces',
  },
  {
    slug:     'solitaires',
    num:      '02',
    headline: 'Every stone here has paper.',
    body:     'Every solitaire of significance at Solitaire is graded by GIA, IGI, or both. The certificate travels with the piece. We will show you the report before we show you the stone — that is the only correct order.',
    cta:      'See the solitaires',
  },
  {
    slug:     'antique-gold',
    num:      '03',
    headline: 'For the woman who already has the modern things.',
    body:     'Jadau, meenakari, kundan-on-gold, temple-influence. Antique gold is what a serious wardrobe builds towards, not begins with. Each piece is hand-finished in 22kt and BIS hallmarked.',
    cta:      'See the antique gold',
  },
  {
    slug:     'diamond',
    num:      '04',
    headline: 'Studded, set, and entirely your call.',
    body:     'Day pieces, mangalsutras, light necklaces, tennis bracelets, everyday studs. The diamond category is the most personal — and the one we recommend you come in to see, because diamond on screen is never diamond in hand.',
    cta:      'See the diamond pieces',
  },
  {
    slug:     'temple',
    num:      '05',
    headline: 'The South, finished in the North.',
    body:     'Temple jewellery is a Tamil and Kerala tradition we hold in deep respect. Our temple pieces are sourced from the same families in Vadasery and Nagercoil that have been finishing them for generations. We are the agents, not the makers.',
    cta:      'See the temple pieces',
  },
  {
    slug:     'bridal',
    num:      '06',
    headline: 'The day you’ll show your daughter, in fifteen years.',
    body:     'The bridal category is not a category — it’s a consultation. We bring the lehenga reference, you bring the family, and we work towards the set that fits both the night and the years afterwards.',
    cta:      'Begin the bridal consultation',
  },
];

function CollectionRow({
  item,
  flip,
  index,
}: {
  item: typeof COLLECTION_ITEMS[0];
  flip: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const collection = COLLECTIONS.find((c) => c.slug === item.slug);
  if (!collection) return null;

  return (
    <motion.div
      className={`grid md:grid-cols-12 gap-0 items-center ${flip ? '' : ''}`}
      style={{ borderTop: '1px solid var(--ivory-smoke)', paddingTop: '5rem', paddingBottom: '5rem' }}
      initial={reduce ? {} : { opacity: 0, y: 32 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.9, delay: 0.05 * index, ease }}
    >
      {/* Massive section number — always first on mobile */}
      <div
        className={`hidden md:flex md:col-span-1 ${flip ? 'md:order-3' : 'md:order-1'} items-end justify-center pb-2`}
      >
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            fontWeight: 400,
            lineHeight: 1,
            color: 'var(--aged-gold)',
            opacity: 0.18,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          {item.num}
        </span>
      </div>

      {/* Image — 7 columns */}
      <div
        className={`md:col-span-7 ${flip ? 'md:order-2' : 'md:order-2'}`}
        style={{
          borderRadius: '4px',
          boxShadow: '0 40px 90px rgba(26,20,16,0.22), 0 12px 32px rgba(26,20,16,0.12), 0 2px 8px rgba(26,20,16,0.06)',
        }}
      >
        <div className="overflow-hidden group cursor-none relative" style={{ borderRadius: '4px' }}>
          <motion.div
            initial={reduce ? {} : { scale: 1.06 }}
            whileInView={reduce ? {} : { scale: 1 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 1.4, ease }}
          >
            <Image
              src={collection.hero.src}
              alt={collection.hero.alt}
              width={collection.hero.width || 1600}
              height={collection.hero.height || 2000}
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-700" />

          {/* Hover label */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--ivory)',
                border: '1px solid rgba(244,239,227,0.5)',
                padding: '10px 22px',
                background: 'rgba(26,20,16,0.45)',
                backdropFilter: 'blur(4px)',
              }}
            >
              View collection →
            </span>
          </div>

          {/* Thin inset gold frame — luxury finish */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(184,146,58,0.18)', borderRadius: '4px' }}
          />
        </div>
      </div>

      {/* Text — 4 columns */}
      <motion.div
        className={`md:col-span-4 ${flip ? 'md:order-1 md:pr-12 lg:pr-20' : 'md:order-3 md:pl-12 lg:pl-20'} pt-8 md:pt-0`}
        initial={reduce ? {} : { opacity: 0, x: flip ? -24 : 24 }}
        whileInView={reduce ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-6%' }}
        transition={{ duration: 0.9, delay: 0.12, ease }}
      >
        {/* Mobile number */}
        <span
          aria-hidden
          className="md:hidden block mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4rem',
            fontWeight: 400,
            lineHeight: 1,
            color: 'var(--aged-gold)',
            opacity: 0.25,
            letterSpacing: '-0.04em',
          }}
        >
          {item.num}
        </span>

        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            fontStyle: 'italic',
            color: 'var(--obsidian)',
            marginBottom: '1.25rem',
          }}
        >
          {item.headline}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--ink-soft)',
            marginBottom: '2rem',
          }}
        >
          {item.body}
        </p>

        <Link
          href={`/collections/${item.slug}`}
          className="btn-ghost"
          style={{ fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--aged-gold)' }}
        >
          {item.cta} →
        </Link>
      </motion.div>

    </motion.div>
  );
}

export function SignatureCategories() {
  const reduce = useReducedMotion();

  return (
    <section
      className="section-pad-lg"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="container-wide">

        {/* Header */}
        <motion.div
          className="mb-4"
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow mb-4">02 — COLLECTIONS</p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: 680,
            }}
          >
            Currently in the boutique.
          </h2>
        </motion.div>

        {/* Rows */}
        {COLLECTION_ITEMS.map((item, i) => (
          <CollectionRow
            key={item.slug}
            item={item}
            flip={i % 2 !== 0}
            index={i}
          />
        ))}

        {/* View all CTA */}
        <motion.div
          className="pt-16 flex justify-center"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <Link href="/collections" className="btn-gold">
            View all collections →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
