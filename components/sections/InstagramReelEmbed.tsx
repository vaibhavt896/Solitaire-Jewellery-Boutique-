'use client';

/*  InstagramReelGallery — professional reel selector.
    One embed loads at a time (lazy). User picks the reel.
    Social footer is hidden via CSS crop.
    Sound control note: Instagram's mute icon lives inside their
    iframe (top-right of the video) — cross-origin means we can't
    duplicate it outside, so we show an honest "In player" pill.  */

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { SITE } from '@/lib/site';

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

type Reel = {
  id:    string;
  url:   string;
  label: string;  /* update these labels after reviewing each reel */
  tag?:  string;  /* optional badge, e.g. "Latest" */
};

/* ── Reels: latest → oldest ──────────────────────────────── */
const REELS: Reel[] = [
  { id: 'DZ-LbeypsAV', url: 'https://www.instagram.com/reel/DZ-LbeypsAV/?utm_source=ig_embed&utm_campaign=loading', label: 'Coral & Onyx Necklace',    tag: 'Latest' },
  { id: 'DYylWyHxxyr', url: 'https://www.instagram.com/reel/DYylWyHxxyr/?utm_source=ig_embed&utm_campaign=loading', label: 'Polki Gold Pieces'   },
  { id: 'DYgs87sRSjm', url: 'https://www.instagram.com/reel/DYgs87sRSjm/?utm_source=ig_embed&utm_campaign=loading', label: 'Temple Jewellery'     },
  { id: 'DYWfVfURB23', url: 'https://www.instagram.com/reel/DYWfVfURB23/?utm_source=ig_embed&utm_campaign=loading', label: 'Bridal Selection'     },
  { id: 'DYG8KhoRLAC', url: 'https://www.instagram.com/reel/DYG8KhoRLAC/?utm_source=ig_embed&utm_campaign=loading', label: 'Diamond Stories'     },
  { id: 'DYEXT65xD62', url: 'https://www.instagram.com/reel/DYEXT65xD62/?utm_source=ig_embed&utm_campaign=loading', label: 'Antique Gold'         },
  { id: 'DX06NbWxVPl', url: 'https://www.instagram.com/reel/DX06NbWxVPl/?utm_source=ig_embed&utm_campaign=loading', label: 'Certified Solitaires' },
  { id: 'DXySxVJRQOD', url: 'https://www.instagram.com/reel/DXySxVJRQOD/?utm_source=ig_embed&utm_campaign=loading', label: 'Heritage Craftsmanship'},
  { id: 'DXjU8mmkXR8', url: 'https://www.instagram.com/reel/DXjU8mmkXR8/?utm_source=ig_embed&utm_campaign=loading', label: 'Wedding Sets'         },
];

/*  CROP_HEIGHT — controls how much of the iframe is visible.
    Instagram renders: [~56px header] + [video ~480–520px at 400px wide] + [~180px social footer].
    Increase to reveal more caption; decrease to crop the footer more tightly.  */
const CROP_HEIGHT = 540;

/* ── SVG icons ─────────────────────────────────────────────── */
const IgIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const VolumeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ─── Main component ─────────────────────────────────────── */
export function InstagramReelEmbed() {
  const [active, setActive] = useState(0);

  /* Re-process whenever active changes — key={active} remounts the
     blockquote, this call tells Instagram's script to convert it    */
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, [active]);

  const reel = REELS[active];
  const n    = REELS.length;
  const prev = () => setActive(i => (i - 1 + n) % n);
  const next = () => setActive(i => (i + 1) % n);

  /* shared button style factory */
  const navBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: '50%',
    border: '1px solid rgba(189,154,69,0.3)',
    background: 'rgba(189,154,69,0.06)',
    color: 'rgba(189,154,69,0.85)',
    display: 'grid', placeItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.22s ease, border-color 0.22s ease',
    flexShrink: 0,
  };

  return (
    <section style={{ background: '#0D0A07', padding: 'clamp(4rem,8vh,6rem) 0' }}>
      <div className="container-wide">

        {/* ── Section header ───────────────────────────────── */}
        <div
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap',
            gap: 16, marginBottom: 'clamp(2rem,4.5vh,3.2rem)',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(189,154,69,0.7)', margin: '0 0 0.65rem',
            }}>
              From Our Studio
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem,3.8vw,3rem)',
              lineHeight: 1.08, letterSpacing: '-0.022em',
              color: '#F4EFE3', margin: 0,
            }}>
              Pieces in{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--aged-gold)' }}>Motion.</span>
            </h2>
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, flexShrink: 0,
              fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 600,
              color: 'rgba(189,154,69,0.8)',
              borderBottom: '1px solid rgba(189,154,69,0.3)',
              paddingBottom: 3,
              transition: 'color 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--aged-gold)';
              e.currentTarget.style.borderBottomColor = 'var(--aged-gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(189,154,69,0.8)';
              e.currentTarget.style.borderBottomColor = 'rgba(189,154,69,0.3)';
            }}
          >
            <IgIcon />
            {SITE.instagramHandle}
          </a>
        </div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row" style={{ gap: 36, alignItems: 'flex-start' }}>

          {/* ── LEFT: embed viewer + controls ─────────────── */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: 420 }}>

            {/* Crop wrapper — key forces remount on reel change */}
            <div
              key={active}
              style={{
                overflow: 'hidden',
                height: CROP_HEIGHT,
                borderRadius: 18,
                background: '#1a1410',
                boxShadow: '0 28px 72px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(189,154,69,0.08)',
                position: 'relative',
              }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={reel.url}
                data-instgrm-version="14"
                style={{
                  background: '#1a1410', border: 0, borderRadius: 0,
                  boxShadow: 'none', margin: 0, padding: 0,
                  width: '100%', minWidth: 0, maxWidth: '100%',
                }}
              >
                {/* Loading skeleton — replaced by Instagram's iframe */}
                <div style={{
                  height: CROP_HEIGHT, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
                }}>
                  <IgIcon />
                  <p style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '0.9rem', color: 'rgba(189,154,69,0.35)', margin: 0,
                  }}>
                    Loading reel…
                  </p>
                </div>
              </blockquote>

              {/* Gold hairline border overlay */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(189,154,69,0.12)',
                borderRadius: 18, pointerEvents: 'none',
              }} />
            </div>

            {/* Controls bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 16, gap: 10, flexWrap: 'wrap',
            }}>

              {/* Prev / Next */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  onClick={prev}
                  aria-label="Previous reel"
                  style={navBtn}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(189,154,69,0.16)';
                    e.currentTarget.style.borderColor = 'rgba(189,154,69,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(189,154,69,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(189,154,69,0.3)';
                  }}
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  aria-label="Next reel"
                  style={navBtn}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(189,154,69,0.16)';
                    e.currentTarget.style.borderColor = 'rgba(189,154,69,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(189,154,69,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(189,154,69,0.3)';
                  }}
                >
                  <ChevronRight />
                </button>

                {/* Counter */}
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em',
                  fontWeight: 600, color: 'rgba(255,255,255,0.28)',
                }}>
                  {String(active + 1).padStart(2, '0')} · {String(n).padStart(2, '0')}
                </span>
              </div>

              {/* Sound note */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '5px 10px',
              }}>
                <VolumeIcon />
                Sound in player
              </span>

              {/* Instagram CTA */}
              <a
                href={`https://www.instagram.com/reel/${reel.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-body)', fontSize: 10.5,
                  letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
                  color: 'var(--aged-gold)',
                  border: '1px solid rgba(189,154,69,0.35)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 15px',
                  background: 'transparent',
                  transition: 'background 0.22s ease, border-color 0.22s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(189,154,69,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(189,154,69,0.65)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(189,154,69,0.35)';
                }}
              >
                <IgIcon />
                View on Instagram
              </a>
            </div>
          </div>

          {/* ── RIGHT: reel selector ──────────────────────── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Mobile: horizontal number pills */}
            <div
              className="flex lg:hidden gap-2.5 overflow-x-auto pb-3"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
              {REELS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActive(i)}
                  aria-label={`Select reel ${i + 1}: ${r.label}`}
                  aria-pressed={i === active}
                  style={{
                    flexShrink: 0, scrollSnapAlign: 'start',
                    width: 44, height: 44, borderRadius: '50%',
                    border: i === active
                      ? '1.5px solid var(--aged-gold)'
                      : '1px solid rgba(255,255,255,0.1)',
                    background: i === active
                      ? 'rgba(189,154,69,0.14)'
                      : 'transparent',
                    color: i === active ? 'var(--aged-gold)' : 'rgba(255,255,255,0.35)',
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', cursor: 'pointer',
                    display: 'grid', placeItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col" style={{ gap: 2 }}>
              {REELS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActive(i)}
                  aria-label={`Select reel ${i + 1}: ${r.label}`}
                  aria-pressed={i === active}
                  style={{
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 18px',
                    borderRadius: '0 10px 10px 0',
                    borderLeft: i === active
                      ? '2px solid var(--aged-gold)'
                      : '2px solid rgba(255,255,255,0.06)',
                    background: i === active
                      ? 'rgba(189,154,69,0.07)'
                      : 'transparent',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (i !== active) {
                      e.currentTarget.style.background = 'rgba(189,154,69,0.04)';
                      e.currentTarget.style.borderLeftColor = 'rgba(189,154,69,0.28)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (i !== active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.06)';
                    }
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '1.25rem', lineHeight: 1, minWidth: 32,
                    color: i === active ? 'var(--aged-gold)' : 'rgba(255,255,255,0.16)',
                    transition: 'color 0.2s ease',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Label + badge */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem', lineHeight: 1.35,
                      fontWeight: i === active ? 600 : 400,
                      color: i === active ? '#F4EFE3' : 'rgba(255,255,255,0.38)',
                      margin: 0, transition: 'color 0.2s ease',
                    }}>
                      {r.label}
                    </p>
                    {r.tag && (
                      <span style={{
                        display: 'inline-block', marginTop: 5,
                        fontFamily: 'var(--font-body)', fontSize: 9,
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'var(--aged-gold)',
                        border: '1px solid rgba(189,154,69,0.38)',
                        borderRadius: 3, padding: '2px 7px',
                      }}>
                        {r.tag}
                      </span>
                    )}
                  </div>

                  {/* Active play marker */}
                  {i === active && (
                    <span aria-hidden style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--aged-gold)', flexShrink: 0,
                      boxShadow: '0 0 8px rgba(189,154,69,0.7)',
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Bottom: follow CTA */}
            <div style={{
              marginTop: 28, paddingTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.65,
                color: 'rgba(255,255,255,0.3)', margin: '0 0 0.9rem', maxWidth: 260,
              }}>
                More jewellery stories, bridal previews, and behind-the-scenes on Instagram.
              </p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-body)', fontSize: 10.5,
                  letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                  color: 'var(--aged-gold)',
                  transition: 'opacity 0.22s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                <IgIcon />
                Follow @solitairejewelleryboutique
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </section>
  );
}
