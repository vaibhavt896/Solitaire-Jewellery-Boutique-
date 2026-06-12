'use client';

/* ──────────────────────────────────────────────────────────
   Collections (SignatureCategories), Section 02
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
    headline: 'The oldest form of diamond jewellery in India.',
    body:     'Polki is the diamond before it was ever cut, natural, full of character, set in pure gold by hand. Ours comes from two workshops in Jaipur we have known for over a decade. No two pieces are ever quite the same, which is rather the point.',
    cta:      'See the Collection',
  },
  {
    slug:     'solitaires',
    num:      '02',
    headline: 'One stone. Certified, so you never have to wonder.',
    body:     'A solitaire is a single diamond, and a big decision. So we make it a calm one. Every solitaire of value here is graded by GIA or IGI, and we walk you through the report in simple words, what the four Cs mean, and which ones actually matter for you.',
    cta:      'See the Collection',
  },
  {
    slug:     'antique-gold',
    num:      '03',
    headline: 'The warm gold of an earlier time.',
    body:     'Hand-finished gold in the old techniques, the soft, matte glow that machine-made pieces never quite catch. These are pieces with weight and history to them, made to be worn often and kept for good. All our gold is hallmarked for purity.',
    cta:      'See the Collection',
  },
  {
    slug:     'diamond',
    num:      '04',
    headline: 'Diamond pieces for the way you live now.',
    body:     'Rings, pendants, earrings, and bracelets in faceted diamond, set in 18K and 22K gold. Clean, modern, and easy to wear every day, with the same honest certification as everything else we sell.',
    cta:      'See the Collection',
  },
  {
    slug:     'temple',
    num:      '05',
    headline: 'The old motifs, treated with respect.',
    body:     'Temple jewellery carries the figures and forms passed down through generations. We keep them exactly as they should be, for the southern bride, the festival, and anyone who loves jewellery with meaning behind it.',
    cta:      'See the Collection',
  },
  {
    slug:     'bridal',
    num:      '06',
    headline: 'Everything for the big day, in one harmony.',
    body:     'A bride wears more than one piece, and they all have to sing together, the choker, the long necklace, the earrings, the bangles. We compose the full set around you, your outfit, and your day, so nothing fights and nothing is forgotten.',
    cta:      'Book a Private Sitting',
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
      {/* Massive section number, always first on mobile */}
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

      {/* Image, 7 columns, luxury rounded corners */}
      <div
        className={`md:col-span-7 ${flip ? 'md:order-2' : 'md:order-2'}`}
        style={{
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 28px 70px -6px rgba(26,20,16,0.14), 0 8px 24px rgba(26,20,16,0.07)',
        }}
      >
        <div className="overflow-hidden group cursor-none relative" style={{ borderRadius: 'var(--radius-lg)' }}>
          <motion.div
            initial={reduce ? {} : { scale: 1.07 }}
            whileInView={reduce ? {} : { scale: 1 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 1.8, ease }}
          >
            <Image
              src={collection.hero.src}
              alt={collection.hero.alt}
              width={collection.hero.width || 1600}
              height={collection.hero.height || 2000}
              sizes="(max-width: 768px) 100vw, 58vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              priority={index === 0}
            />
          </motion.div>

          {/* Warm depth vignette, always present, adds richness */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,20,16,0.22) 100%)',
            }}
          />

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/22 transition-colors duration-700 pointer-events-none" />

          {/* Hover label */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--ivory)',
                border: '1px solid rgba(244,239,227,0.5)',
                padding: '11px 26px',
                background: 'rgba(26,20,16,0.50)',
                backdropFilter: 'blur(8px)',
              }}
            >
              View collection →
            </span>
          </div>

          {/* Inset gold frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(184,146,58,0.20)', borderRadius: 'var(--radius-lg)' }}
          />
        </div>
      </div>

      {/* Text, 4 columns */}
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
          className="md:hidden block mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            lineHeight: 1,
            color: 'var(--aged-gold)',
            opacity: 0.18,
            letterSpacing: '-0.04em',
          }}
        >
          {item.num}
        </span>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--aged-gold)',
            marginBottom: '1.1rem',
          }}
        >
          Collection {item.num}
        </p>

        {/* Gold rule, typographic anchor */}
        <div style={{ width: 30, height: 1.5, background: 'var(--aged-gold)', opacity: 0.65, marginBottom: '1.4rem' }} />

        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.022em',
            color: 'var(--obsidian)',
            marginBottom: '1.4rem',
          }}
        >
          {item.headline}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.88,
            color: 'var(--ink-soft)',
            marginBottom: '2.2rem',
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
          <p className="eyebrow mb-4">03 — Collections</p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: 680,
            }}
          >
            A few things, chosen well.
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
            See the Collections →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
