'use client';

/*  InstagramReels — "Catch the light."

    Why this shape: Instagram (2026) no longer exposes reel cover images
    to unauthenticated requests, so a static thumbnail grid is impossible
    without an IG Business API token. Instead of empty placeholder cards,
    we let Instagram's own embed.js render the REAL reel — cover + video —
    live in the browser. One embed at a time (fast); a warm, on-palette
    selector switches between them. Click → it plays. No missing frames.

    Palette: warm ivory/cream to match the rest of the site (the white IG
    embed sits native on cream), not the previous dark obsidian.          */

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { SITE } from '@/lib/site';

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

type Reel = { id: string; url: string; label: string; tag?: string };

/* ── Reels: latest → oldest ──────────────────────────────── */
const REELS: Reel[] = [
  { id: 'DZ-LbeypsAV', url: 'https://www.instagram.com/reel/DZ-LbeypsAV/?utm_source=ig_embed&utm_campaign=loading', label: 'Coral, Onyx & Diamond Necklace', tag: 'Latest' },
  { id: 'DYylWyHxxyr', url: 'https://www.instagram.com/reel/DYylWyHxxyr/?utm_source=ig_embed&utm_campaign=loading', label: 'Bird-Inspired Ruby Earrings' },
  { id: 'DYgs87sRSjm', url: 'https://www.instagram.com/reel/DYgs87sRSjm/?utm_source=ig_embed&utm_campaign=loading', label: 'Heritage Necklace' },
  { id: 'DYWfVfURB23', url: 'https://www.instagram.com/reel/DYWfVfURB23/?utm_source=ig_embed&utm_campaign=loading', label: 'Statement Rings' },
  { id: 'DYG8KhoRLAC', url: 'https://www.instagram.com/reel/DYG8KhoRLAC/?utm_source=ig_embed&utm_campaign=loading', label: 'Gold Necklace & Earring Set' },
  { id: 'DYEXT65xD62', url: 'https://www.instagram.com/reel/DYEXT65xD62/?utm_source=ig_embed&utm_campaign=loading', label: 'Statement Earrings' },
  { id: 'DX06NbWxVPl', url: 'https://www.instagram.com/reel/DX06NbWxVPl/?utm_source=ig_embed&utm_campaign=loading', label: 'Navratna Polki Danglers' },
  { id: 'DXySxVJRQOD', url: 'https://www.instagram.com/reel/DXySxVJRQOD/?utm_source=ig_embed&utm_campaign=loading', label: 'Gemstone Earrings' },
  { id: 'DXjU8mmkXR8', url: 'https://www.instagram.com/reel/DXjU8mmkXR8/?utm_source=ig_embed&utm_campaign=loading', label: 'Gold Bangles' },
];

/* Height of the visible embed window — crops Instagram's social footer. */
const CROP_HEIGHT = 560;

const IgIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Chevron = ({ dir }: { dir: 'l' | 'r' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points={dir === 'l' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
);

export function InstagramReelEmbed() {
  const [active, setActive] = useState(0);

  /* Each time the reel changes, the keyed wrapper remounts a fresh
     blockquote — tell Instagram's script to (re)process it.          */
  useEffect(() => { window.instgrm?.Embeds.process(); }, [active]);

  const reel = REELS[active];
  const n    = REELS.length;
  const prev = () => setActive(i => (i - 1 + n) % n);
  const next = () => setActive(i => (i + 1) % n);

  const navBtn: React.CSSProperties = {
    width: 38, height: 38, borderRadius: '50%',
    border: '1px solid rgba(184,146,58,0.4)', background: 'transparent',
    color: 'var(--gold-deep)', display: 'grid', placeItems: 'center', cursor: 'pointer',
    transition: 'background 0.22s ease, border-color 0.22s ease', flexShrink: 0,
  };

  return (
    <section style={{ background: 'var(--ivory)', padding: 'clamp(3rem,7vh,5.5rem) 0' }}>
      <style>{`
        .ig-reel-row { scrollbar-width: none; -ms-overflow-style: none; }
        .ig-reel-row::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container-wide">

        {/* ── Header ───────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4.5vh,3rem)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--aged-gold)', margin: '0 0 0.85rem' }}>
            On Instagram
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.022em', color: 'var(--obsidian)', margin: 0 }}>
            Catch the{' '}<span style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>light.</span>
          </h2>
        </div>

        {/* ── Warm panel: live reel + selector ─────────────── */}
        <div
          className="flex flex-col lg:flex-row"
          style={{
            background: '#F3EADC',
            border: '1px solid rgba(184,146,58,0.16)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 24px 60px -28px rgba(26,20,16,0.22)',
            overflow: 'hidden',
          }}
        >
          {/* LEFT — the real reel, live */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: 'min(100%, 400px)', margin: '0 auto', padding: 'clamp(1.4rem,3vw,2rem)' }}>
            <div
              key={active}
              style={{
                overflow: 'hidden', height: CROP_HEIGHT, borderRadius: 14,
                background: 'var(--ivory-raised)',
                boxShadow: '0 10px 30px -12px rgba(26,20,16,0.28)',
                position: 'relative',
              }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={reel.url}
                data-instgrm-version="14"
                style={{ background: 'var(--ivory-raised)', border: 0, borderRadius: 0, boxShadow: 'none', margin: 0, padding: 0, width: '100%', minWidth: 0, maxWidth: '100%' }}
              >
                <div style={{ height: CROP_HEIGHT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <span style={{ color: 'rgba(184,146,58,0.6)' }}><IgIcon size={20} /></span>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-muted)', margin: 0 }}>Loading reel…</p>
                </div>
              </blockquote>
              <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 14, border: '1px solid rgba(184,146,58,0.18)', pointerEvents: 'none' }} />
            </div>

            {/* under-embed controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={prev} aria-label="Previous reel" style={navBtn}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,146,58,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}><Chevron dir="l" /></button>
                <button onClick={next} aria-label="Next reel" style={navBtn}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,146,58,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}><Chevron dir="r" /></button>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em', fontWeight: 600, color: 'var(--ink-muted)' }}>
                {String(active + 1).padStart(2, '0')} · {String(n).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* RIGHT — selector + follow */}
          <div style={{ flex: 1, minWidth: 0, padding: 'clamp(1.4rem,3vw,2.4rem)', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '1.2rem' }}>
              <span className="eyebrow">The Reels</span>
              <span aria-hidden style={{ flex: 1, height: 1, background: 'rgba(184,146,58,0.28)' }} />
            </div>

            {/* Mobile: horizontal chips */}
            <div className="flex lg:hidden ig-reel-row" style={{ gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: 4 }}>
              {REELS.map((r, i) => (
                <button key={r.id} onClick={() => setActive(i)} aria-pressed={i === active}
                  style={{
                    flexShrink: 0, padding: '9px 14px', borderRadius: 999, cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 12, whiteSpace: 'nowrap',
                    border: i === active ? '1px solid var(--aged-gold)' : '1px solid rgba(184,146,58,0.25)',
                    background: i === active ? 'var(--aged-gold)' : 'transparent',
                    color: i === active ? 'var(--ivory)' : 'var(--ink-soft)',
                    transition: 'all 0.2s ease',
                  }}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Desktop: refined list */}
            <div className="hidden lg:flex flex-col" style={{ gap: 2 }}>
              {REELS.map((r, i) => (
                <button key={r.id} onClick={() => setActive(i)} aria-pressed={i === active}
                  style={{
                    textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16,
                    padding: '12px 16px', borderRadius: '0 10px 10px 0',
                    borderLeft: i === active ? '2px solid var(--aged-gold)' : '2px solid rgba(184,146,58,0.18)',
                    background: i === active ? 'rgba(189,154,69,0.1)' : 'transparent',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => { if (i !== active) e.currentTarget.style.background = 'rgba(189,154,69,0.05)'; }}
                  onMouseLeave={e => { if (i !== active) e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1, minWidth: 30, color: i === active ? 'var(--gold-deep)' : 'rgba(154,122,46,0.4)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: i === active ? 600 : 400, color: i === active ? 'var(--obsidian)' : 'var(--ink-soft)' }}>
                    {r.label}
                  </span>
                  {r.tag && (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-deep)', border: '1px solid rgba(184,146,58,0.4)', borderRadius: 3, padding: '2px 7px' }}>
                      {r.tag}
                    </span>
                  )}
                  {i === active && !r.tag && (
                    <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--aged-gold)', flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Follow */}
            <div style={{ marginTop: 'auto', paddingTop: 22 }}>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center"
                style={{ gap: 9, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--gold-deep)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}>
                <IgIcon size={15} />
                Follow {SITE.instagramHandle}
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
