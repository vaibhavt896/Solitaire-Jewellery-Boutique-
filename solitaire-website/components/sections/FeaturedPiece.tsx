'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getFeaturedPiece } from '@/lib/data/pieces';
import { whatsappLinkFor } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

export function FeaturedPiece() {
  const reduce = useReducedMotion();
  const piece = getFeaturedPiece();
  const main = piece.images[0];
  if (!main) return null;

  return (
    <section className="section-pad bg-bone">
      <div className="container-wide">
        <Reveal className="mb-12">
          <p className="eyebrow">This Week</p>
          <h2 className="display-page mt-3">The Featured Piece</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Cinematic image reveal: curtain lifts from bottom, image zooms out */}
          <motion.div
            className="aspect-[4/5] bg-bone-deep overflow-hidden"
            initial={reduce ? {} : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? {} : { clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={main.src}
              alt={main.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={reduce ? {} : { scale: 1.14 }}
              whileInView={reduce ? {} : { scale: 1 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <Reveal delay={0.15}>
            <p className="text-mono text-micro uppercase tracking-eyebrow text-gold-deep">
              {piece.collectionLabel} · SKU {piece.sku}
            </p>
            <h3 className="font-display text-display mt-3">{piece.title}</h3>
            <p className="text-body text-ink-soft mt-6">{piece.longDescription}</p>
            <p className="text-mono text-small text-ink-muted mt-6 uppercase tracking-eyebrow">
              Price on Enquiry
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLinkFor(
                  `Hello Solitaire — I'd like to enquire about ${piece.title} (SKU ${piece.sku}). Could you share availability and pricing?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Enquire on WhatsApp
              </a>
              <Link href={`/piece/${piece.slug}`} className="btn-secondary">
                View Piece
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
