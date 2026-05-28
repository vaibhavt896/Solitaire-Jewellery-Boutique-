'use client';

/* ──────────────────────────────────────────────────────────
   FeaturedPiece — Section 05
   Full-bleed dark Mahogany. Single cinematic image with Ken
   Burns slow zoom. Editorial copy below. Refreshed monthly.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getFeaturedPiece } from '@/lib/data/pieces';
import { whatsappLinkFor } from '@/lib/site';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function FeaturedPiece() {
  const reduce = useReducedMotion();
  const piece = getFeaturedPiece();
  const main = piece.images[0];
  if (!main) return null;

  return (
    <section style={{ background: 'var(--mahogany)' }}>

      {/* ── Eyebrow strip ── */}
      <div className="container-wide pt-16 pb-10">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,227,0.45)',
              marginBottom: '0.6rem',
            }}
          >
            02 — THE PIECE FOR THIS SEASON
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              color: 'var(--ivory)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontStyle: 'italic',
            }}
          >
            {piece.title}.
          </h2>
        </motion.div>
      </div>

      {/* ── Cinematic full-width image with Ken Burns ── */}
      <div
        className="w-full overflow-hidden"
        style={{ height: 'clamp(340px, 62vh, 720px)', position: 'relative' }}
      >
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(58,31,20,0.65) 100%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          className="absolute inset-0"
          initial={reduce ? {} : { scale: 1.08 }}
          whileInView={reduce ? {} : { scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 9, ease }}
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* SKU / provenance line over image */}
        <motion.p
          className="absolute bottom-6 left-1/2 z-20"
          style={{
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,227,0.45)',
            whiteSpace: 'nowrap',
          }}
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease }}
        >
          {piece.collectionLabel} · SKU {piece.sku} · Currently in the boutique
        </motion.p>
      </div>

      {/* ── Editorial copy block ── */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10 items-start">

          {/* Left: editorial paragraph */}
          <motion.div
            className="md:col-span-7"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.85,
                color: 'rgba(244,239,227,0.70)',
                maxWidth: 600,
              }}
            >
              {piece.longDescription}
            </p>
          </motion.div>

          {/* Right: CTAs + price */}
          <motion.div
            className="md:col-span-5 md:pt-1"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9.5,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,227,0.35)',
                marginBottom: '1.5rem',
              }}
            >
              Price on enquiry · Currently in the boutique
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLinkFor(
                  `Hello Solitaire — I'd like to enquire about ${piece.title} (SKU ${piece.sku}). When can I view it?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: 'var(--aged-gold)',
                  color: 'var(--ivory)',
                  border: '1px solid var(--aged-gold)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                }}
              >
                Enquire on WhatsApp →
              </a>
              <Link
                href={`/piece/${piece.slug}`}
                className="btn"
                style={{
                  background: 'transparent',
                  color: 'rgba(244,239,227,0.7)',
                  border: '1px solid rgba(244,239,227,0.2)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                }}
              >
                Read the piece&rsquo;s story →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
