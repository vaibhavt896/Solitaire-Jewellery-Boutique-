'use client';

/* ──────────────────────────────────────────────────────────
   CollectionsShowcase — "Discover Timeless Elegance"
   A premium horizontal slider of the seven collections, in the
   exact order and naming used across the site. Drag / swipe on
   touch; the gold arrows on the right page through on desktop.
   Cards with no photo yet fall back to a clearly-labelled,
   on-brand placeholder so the category still reads at a glance.
────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { IconArrowRight } from '@/components/icons/Icon';

type Card = {
  slug: string;
  name: string;
  desc: string;
  img: string | null;
};

/* Exact names + order, matched to the live collection slugs. */
const CARDS: Card[] = [
  { slug: 'polki',              name: 'Polki',                desc: 'Uncut diamonds, set in pure gold by hand.',        img: '/Homepage images/Polki homee.webp' },
  { slug: 'solitaires',         name: 'Certified Solitaires', desc: 'One stone, GIA & IGI certified to its character.',  img: '/Homepage images/Solitaire Diamond.webp' },
  { slug: 'antique-gold',       name: 'Antique Gold',         desc: 'Old-world craftsmanship, warm and hallmarked.',     img: '/Homepage images/kundan-on-gold.webp' },
  { slug: 'diamond',            name: 'Diamond',              desc: 'Modern, faceted brilliance for every day.',         img: '/Homepage images/Studded, set.webp' },
  { slug: 'temple',             name: 'Temple',               desc: 'Divine motifs, kept exactly as they should be.',    img: '/Homepage images/Temple Jewellery.webp' },
  { slug: 'bridal',             name: 'Bridal Sets',          desc: 'The full bridal look, composed around you.',        img: '/Homepage images/Bridal Jewellery.webp' },
  { slug: 'dubai-gold-bangles', name: 'Gold Bangles',         desc: '22K bangles, hand-picked and hallmarked.',          img: '/Homepage images/Gold Bangles.webp' },
];

export function CollectionsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd]     = useState(false);

  /* Recompute which arrows are live from the current scroll offset. */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  /* Page by (almost) a full viewport, keeping one card of context. */
  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap   = parseFloat(getComputedStyle(el).columnGap) || 20;
    const cardW = first ? first.offsetWidth + gap : 320;
    const amount = Math.max(cardW, el.clientWidth - cardW);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container-wide">

        {/* ── Header row: heading left · arrows right ── */}
        <Reveal className="flex items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="min-w-0">
            <p className="eyebrow mb-4">Our Collections</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: 'var(--obsidian)',
              }}
            >
              Discover Timeless Elegance
            </h2>
          </div>

          {/* Slider controls — sit on the right, page through the rail */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 pb-1">
            <SliderArrow direction="prev" disabled={atStart} onClick={() => page(-1)} />
            <SliderArrow direction="next" disabled={atEnd}   onClick={() => page(1)} />
          </div>
        </Reveal>

        {/* ── Slider track ── */}
        <div
          ref={trackRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: 4, WebkitOverflowScrolling: 'touch' }}
        >
          {CARDS.map((card, i) => (
            <Reveal
              key={card.slug}
              delay={Math.min(i, 4) * 0.05}
              className="snap-start shrink-0 w-[74vw] sm:w-[300px] lg:w-[clamp(248px,23vw,300px)]"
            >
              <CategoryCard card={card} />
            </Reveal>
          ))}
        </div>

        {/* ── Footer: hint + view all ── */}
        <div className="flex items-center justify-between gap-4 mt-7">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 group/vac"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10.5,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--aged-gold)',
              borderBottom: '1px solid var(--aged-gold)',
              paddingBottom: 3,
            }}
          >
            View All Collections
            <span aria-hidden className="transition-transform duration-300 group-hover/vac:translate-x-1">→</span>
          </Link>

          {/* On touch we hide the arrows — tell the user it swipes */}
          <span
            className="sm:hidden inline-flex items-center gap-1.5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--ink-muted)',
            }}
          >
            Swipe <span aria-hidden style={{ fontSize: 13 }}>→</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── A single collection card ───────────────────────────── */
function CategoryCard({ card }: { card: Card }) {
  return (
    <Link
      href={`/collections/${card.slug}`}
      className="group block h-full"
      style={{
        background: 'var(--ivory-raised)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 14px 40px -12px rgba(26,20,16,0.16), 0 2px 8px rgba(26,20,16,0.05)',
      }}
    >
      {/* Image / placeholder */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {card.img ? (
          <>
            <Image
              src={card.img}
              alt={`${card.name} jewellery at Solitaire Jewellery Boutique`}
              fill
              sizes="(max-width: 640px) 76vw, (max-width: 1024px) 300px, 23vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none transition-colors duration-700 group-hover:bg-obsidian/10"
            />
          </>
        ) : (
          <CardPlaceholder />
        )}
      </div>

      {/* Plaque */}
      <div className="flex items-end justify-between gap-2.5 lg:gap-3 px-3.5 lg:px-5 py-3.5 lg:py-5">
        <div className="min-w-0">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--obsidian)',
              marginBottom: '0.45rem',
            }}
          >
            {card.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              color: 'var(--ink-muted)',
            }}
          >
            {card.desc}
          </p>
        </div>

        {/* Gold circular arrow */}
        <span
          aria-hidden
          className="shrink-0 grid place-items-center transition-all duration-500 group-hover:scale-105 w-8 h-8 lg:w-[38px] lg:h-[38px]"
          style={{
            borderRadius: '50%',
            background: 'var(--aged-gold)',
            color: 'var(--ivory)',
            boxShadow: '0 6px 16px rgba(154,122,46,0.34)',
          }}
        >
          <IconArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

/* ── On-brand placeholder for a category with no photo yet ── */
function CardPlaceholder() {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 0%, rgba(189,154,69,0.18), rgba(189,154,69,0.05) 55%, var(--ivory-raised) 100%)',
      }}
    >
      {/* subtle bangle motif */}
      <svg
        width="78" height="78" viewBox="0 0 78 78" fill="none" aria-hidden
        className="transition-transform duration-700 group-hover:scale-105"
        style={{ opacity: 0.55 }}
      >
        <circle cx="39" cy="39" r="26" stroke="var(--aged-gold)" strokeWidth="1.4" />
        <circle cx="39" cy="39" r="20" stroke="var(--aged-gold)" strokeWidth="1" opacity="0.6" />
        <circle cx="39" cy="39" r="32" stroke="var(--aged-gold)" strokeWidth="0.8" opacity="0.35" />
      </svg>
      <span
        className="absolute"
        style={{
          bottom: 14,
          fontFamily: 'var(--font-body)',
          fontSize: 9.5,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--aged-gold)',
          opacity: 0.85,
        }}
      >
        Photo coming soon
      </span>
    </div>
  );
}

/* ── Round gold slider arrow ────────────────────────────── */
function SliderArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'next' ? 'Next collections' : 'Previous collections'}
      className="grid place-items-center w-11 h-11 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-default enabled:hover:scale-105 enabled:active:scale-95"
      style={{
        border: '1px solid var(--aged-gold)',
        color: 'var(--aged-gold)',
        background: 'transparent',
      }}
    >
      <span style={{ transform: direction === 'prev' ? 'rotate(180deg)' : 'none', display: 'grid', placeItems: 'center' }}>
        <IconArrowRight size={16} />
      </span>
    </button>
  );
}
