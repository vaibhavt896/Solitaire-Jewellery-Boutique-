/* ──────────────────────────────────────────────────────────
   InstagramStrip — "Follow Our Journey"
   A row of seven jewellery tiles and a follow card, all linking
   out to the boutique's Instagram. One tile carries a play badge
   to echo the reels.
────────────────────────────────────────────────────────── */

import Image from 'next/image';
import { SITE } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

const TILES = [
  { src: '/Homepage images/Polki homee.webp',                  alt: 'Polki bridal necklace' },
  { src: '/Homepage images/Solitaire Diamond.webp',            alt: 'Certified diamond solitaire' },
  { src: '/Homepage images/Temple Jewellery.webp',             alt: 'Temple jewellery necklace' },
  { src: '/Homepage images/Bridal Jewellery.webp',             alt: 'Bridal jewellery set' },
  { src: '/Homepage images/Studded, set.webp',                 alt: 'Studded diamond set in gold' },
  { src: '/Homepage images/kundan-on-gold.webp',               alt: 'Kundan-on-gold antique necklace' },
  { src: '/Polki Bridal Necklace with Emerald Drops..webp',    alt: 'Polki bridal necklace with emerald drops', play: true },
];

const PlayBadge = () => (
  <span
    aria-hidden
    className="absolute inset-0 grid place-items-center pointer-events-none"
  >
    <span
      className="grid place-items-center"
      style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(244,239,227,0.92)', color: 'var(--mahogany)' }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M7 4.5v15l13-7.5z" />
      </svg>
    </span>
  </span>
);

function Tile({ src, alt, play, sizes }: { src: string; alt: string; play?: boolean; sizes: string }) {
  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden"
      style={{ aspectRatio: '1', borderRadius: 'var(--radius-sm)' }}
      aria-label={`${alt} — view on Instagram`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
      />
      <span
        aria-hidden
        className="absolute inset-0 transition-colors duration-500 group-hover:bg-obsidian/15"
      />
      {play && <PlayBadge />}
    </a>
  );
}

function FollowCard() {
  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-center h-full w-full"
      style={{
        background: 'var(--ivory-raised)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--ivory-smoke)',
        padding: '1.4rem 1.5rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
          marginBottom: '1rem',
        }}
      >
        Follow us on Instagram for more updates &amp; exclusive designs.
      </p>
      <span
        className="inline-flex items-center gap-2"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--aged-gold)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
        Follow Us →
      </span>
    </a>
  );
}

export function InstagramStrip() {
  return (
    <section className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container-wide">

        <Reveal className="mb-7">
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ fontWeight: 700, color: 'var(--obsidian)' }}>Follow Our Journey</span>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{ marginLeft: '0.85em', fontWeight: 600, color: 'var(--aged-gold)' }}
            >
              {SITE.instagramHandle}
            </a>
          </p>
        </Reveal>

        {/* Desktop: single row of seven tiles + follow card */}
        <Reveal>
          <div className="hidden lg:flex gap-3">
            {TILES.map((t) => (
              <div key={t.src} style={{ flex: '1 1 0' }}>
                <Tile {...t} sizes="11vw" />
              </div>
            ))}
            <div style={{ flex: '1.7 1 0' }}>
              <FollowCard />
            </div>
          </div>

          {/* Mobile / tablet: tile grid + follow card below */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
              {TILES.map((t) => (
                <Tile key={t.src} {...t} sizes="(max-width: 640px) 30vw, 22vw" />
              ))}
            </div>
            <FollowCard />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
