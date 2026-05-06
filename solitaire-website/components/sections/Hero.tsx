'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE } from '@/lib/site';

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  return (
    /*
     * mt-[-120px] pulls the section up behind the sticky header (h = 120px).
     * The video fills the full viewport INCLUDING the header zone so the
     * transparent header shows the video behind it.
     */
    <section className="relative h-[calc(100svh+120px)] mt-[-120px] min-h-[760px] overflow-hidden bg-ink">

      {/* ── Video with Ken Burns ── */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 origin-center"
          initial={{ scale: 1.05 }}
          animate={reduce ? {} : { scale: 1.12 }}
          transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        >
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Cinematic overlay stack ── */}
        {/* Strong bottom lift — where all the text lives */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(14,11,8,0.93) 0%, rgba(14,11,8,0.55) 30%, rgba(14,11,8,0.15) 55%, transparent 75%)',
          }}
        />
        {/* Left curtain — keeps left edge readable, right stays bright & cinematic */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(14,11,8,0.40) 0%, rgba(14,11,8,0.10) 40%, transparent 65%)',
          }}
        />
        {/* Top band — header legibility */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 160,
            background: 'linear-gradient(to bottom, rgba(14,11,8,0.55) 0%, transparent 100%)',
          }}
        />
        {/* Warm gold tone — brand palette richness */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(166,124,44,0.055)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative h-full container-wide flex flex-col justify-end pb-24 md:pb-36 pt-32">
        <div className="max-w-[660px]">

          {/* Decorative rule */}
          <motion.div {...rise(0.15)} className="flex items-center gap-3 mb-5">
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold-soft)', opacity: 0.60 }} />
            <span
              style={{
                fontSize: 8.5,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-soft)',
                opacity: 0.70,
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              Est. Kanpur · Curated by Hand
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...rise(0.32)}
            className="font-display font-semibold leading-[1.01]"
            style={{
              fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)',
              color: 'var(--bone)',
              textShadow: '0 2px 40px rgba(14,11,8,0.50)',
            }}
          >
            An ultimate destination
            <br />
            <em className="not-italic" style={{ color: 'var(--gold-soft)' }}>
              for intricate jewellery.
            </em>
          </motion.h1>

          {/* Thin ruled line */}
          <motion.div
            {...rise(0.50)}
            className="my-9"
            style={{ width: 56, height: 1, background: 'rgba(245,238,224,0.20)' }}
          />

          {/* CTAs */}
          <motion.div {...rise(0.60)} className="flex flex-wrap items-center gap-5">

            {/* Primary — ghost with sliding fill */}
            <Link
              href="/collections"
              className="group relative inline-block overflow-hidden text-small uppercase tracking-button font-medium px-7 py-[13px] transition-colors duration-500"
              style={{ border: '1px solid rgba(245,238,224,0.45)', color: 'var(--bone)' }}
            >
              <span
                className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"
                style={{ background: 'var(--bone)', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                aria-hidden
              />
              <span className="relative group-hover:text-ink transition-colors duration-500">
                Discover the Collection
              </span>
            </Link>

            {/* Secondary — text only */}
            <Link
              href="/bridal/book"
              className="text-small uppercase tracking-button font-medium transition-colors duration-300"
              style={{ color: 'rgba(245,238,224,0.60)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-soft)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,238,224,0.60)')}
            >
              Book an Appointment →
            </Link>
          </motion.div>
        </div>

        {/* Location — bottom right, whisper quiet */}
        <div className="absolute bottom-9 right-6 md:right-12" aria-hidden>
          <p
            className="text-micro uppercase tracking-eyebrow"
            style={{ color: 'rgba(245,238,224,0.28)' }}
          >
            {SITE.address.full}
          </p>
        </div>
      </div>

      {/* ── Scroll indicator — bottom centre ── */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={reduce ? {} : { opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[5px]"
        aria-hidden
      >
        <span
          className="text-micro uppercase tracking-eyebrow"
          style={{ color: 'rgba(245,238,224,0.30)', letterSpacing: '0.2em' }}
        >
          Scroll
        </span>
        <div
          className="relative w-px overflow-hidden"
          style={{ height: 40, background: 'rgba(245,238,224,0.10)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: '44%', background: 'var(--gold-soft)' }}
            animate={reduce ? {} : { y: ['0%', '230%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
