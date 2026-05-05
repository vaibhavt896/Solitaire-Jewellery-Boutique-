'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE } from '@/lib/site';

export function Hero() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <section className="relative h-[100svh] max-h-[900px] min-h-[640px] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2400&q=80"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-90"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />
      </div>

      <div className="relative h-full container-wide flex flex-col justify-end pb-20 md:pb-32 pt-32">
        <motion.p
          {...reveal(0.05)}
          className="eyebrow text-gold-soft mb-6"
          style={{ color: 'var(--gold-soft)' }}
        >
          Solitaire · Swaroop Nagar
        </motion.p>
        <motion.h1
          {...reveal(0.18)}
          className="font-display text-mega font-medium text-bone max-w-4xl leading-[1.02]"
          style={{ color: 'var(--bone)' }}
        >
          An ultimate destination
          <br />
          <em className="not-italic text-gold-soft">for intricate jewellery.</em>
        </motion.h1>
        <motion.div {...reveal(0.4)} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/collections"
            className="bg-bone text-ink px-8 py-4 text-small uppercase tracking-button font-medium hover:bg-gold-soft transition-colors"
          >
            Discover the Collection
          </Link>
          <Link
            href="/visit"
            className="text-small uppercase tracking-button font-medium text-bone hover:text-gold-soft transition-colors px-3 py-3"
          >
            Visit the Boutique →
          </Link>
        </motion.div>

        <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 text-right">
          <p
            className="text-micro uppercase tracking-eyebrow font-medium"
            style={{ color: 'var(--bone)', opacity: 0.7 }}
          >
            {SITE.address.full}
          </p>
        </div>
      </div>
    </section>
  );
}
