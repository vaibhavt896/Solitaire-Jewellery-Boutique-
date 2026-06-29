'use client';

/*  BoutiqueReels — "A look inside."
    A row of equal reel cards (≈5 visible on desktop) that loops
    infinitely. Clone first/last so the wrap never shows blank.
    GSAP expo.out for silky deceleration. Each card autoplays a
    muted reel with a play badge and a caption, matching the
    boutique's editorial design.
*/

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE } from '@/lib/site';

gsap.config({ force3D: true });

/* ─── Data ───────────────────────────────────────────────── */
const REELS = [
  { src: '/Reels/web/navratna-polki.mp4', caption: 'The sparkle of every detail.' },
  { src: '/Reels/web/1.mp4',              caption: 'Crafted with heritage, worn with pride.' },
  { src: '/Reels/web/emerald-ruby.mp4',   caption: 'Emerald greens, ruby pinks. Timeless you.' },
  { src: '/Reels/web/bird-inspired.mp4',  caption: 'A legacy of grace in every piece.' },
  { src: '/Reels/web/2.mp4',              caption: 'Tradition that touches your soul.' },
  { src: '/Reels/web/3.mp4',              caption: 'Set by hand, in gold.' },
  { src: '/Reels/web/4.mp4',              caption: 'For the bride, for her day.' },
  { src: '/Reels/web/5.mp4',              caption: 'A stone worth seeing.' },
] as const;

const N        = REELS.length;
/* EXT = [clone-last, real 0…N-1, clone-first]; visual index 1…N maps to real. */
const EXT      = [REELS[N - 1], ...REELS, REELS[0]] as const;
const GAP      = 16;
const INTERVAL = 4500;

function getOffset(vi: number, cardW: number, containerW: number): number {
  return containerW / 2 - cardW / 2 - vi * (cardW + GAP);
}

/* ─── Play badge ─────────────────────────────────────────── */
function PlayBadge() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
    >
      <span
        className="grid place-items-center"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(244,239,227,0.90)',
          color: 'var(--mahogany)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </span>
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export function BoutiqueReels() {
  const [active,  setActive]  = useState(0);   // real index 0…N-1
  const [vActive, setVActive] = useState(1);   // visual index 0…N+1

  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs    = useRef<(HTMLVideoElement | null)[]>([]);

  const activeRef  = useRef(0);
  const vActiveRef = useRef(1);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const ptrStartX  = useRef(0);
  const ptrMoved   = useRef(false);
  const touchStartX = useRef(0);

  /* ── Slide track so EXT[vi] is centred ─────────────────── */
  const slideTo = (vi: number, instant = false, onDone?: () => void) => {
    const track = trackRef.current;
    const card  = cardRefs.current[1];
    if (!track || !card) { onDone?.(); return; }
    const x = getOffset(vi, card.offsetWidth, containerRef.current?.offsetWidth ?? window.innerWidth);
    if (instant) { gsap.set(track, { x }); onDone?.(); }
    else gsap.to(track, { x, duration: 0.82, ease: 'expo.out', overwrite: 'auto', onComplete: onDone });
  };

  /* ── Navigate to a visual index, wrapping via clones ───── */
  const goToV = (nextV: number, nextReal: number) => {
    activeRef.current  = nextReal;
    vActiveRef.current = nextV;
    setActive(nextReal);
    setVActive(nextV);

    const isWrapFwd = nextV === N + 1;
    const isWrapBwd = nextV === 0;

    slideTo(nextV, false, (isWrapFwd || isWrapBwd) ? () => {
      const snapV = isWrapFwd ? 1 : N;
      vActiveRef.current = snapV;
      setVActive(snapV);
      slideTo(snapV, true);
    } : undefined);
  };

  const goNext = () => goToV(vActiveRef.current + 1, (activeRef.current + 1) % N);
  const goPrev = () => goToV(vActiveRef.current - 1, (activeRef.current - 1 + N) % N);

  /* ── Auto-advance ───────────────────────────────────────── */
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, INTERVAL);
  };

  /* ── Mount ─────────────────────────────────────────────── */
  useEffect(() => {
    requestAnimationFrame(() => slideTo(1, true));

    /* Play videos nearest the active card first, then the rest */
    const playAll = () => {
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        const delay = Math.abs(i - vActiveRef.current) * 120;
        setTimeout(() => v.play().catch(() => {}), delay);
      });
    };
    playAll();

    startTimer();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => requestAnimationFrame(() => slideTo(vActiveRef.current, true)), 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      timerRef.current && clearInterval(timerRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      videoRefs.current.forEach(v => v?.pause());
      gsap.killTweensOf(trackRef.current);
      gsap.killTweensOf(sectionRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pointer drag (desktop) ─────────────────────────────── */
  const onPtrDown = (e: React.PointerEvent) => { ptrStartX.current = e.clientX; ptrMoved.current = false; };
  const onPtrMove = (e: React.PointerEvent) => { if (Math.abs(e.clientX - ptrStartX.current) > 5) ptrMoved.current = true; };
  const onPtrUp   = (e: React.PointerEvent) => {
    if (!ptrMoved.current) return;
    if (Math.abs(e.clientX - ptrStartX.current) > 50) {
      e.clientX - ptrStartX.current < 0 ? goNext() : goPrev();
      startTimer();
    }
  };

  /* ── Touch swipe (mobile) ───────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) { dx < 0 ? goNext() : goPrev(); startTimer(); }
  };

  const arrowBtn: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1px solid rgba(26,20,16,0.14)',
    background: 'rgba(251,247,238,0.92)',
    backdropFilter: 'blur(6px)',
    color: 'var(--ink-soft)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.1rem',
    boxShadow: '0 6px 20px rgba(26,20,16,0.12)',
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--ivory)', padding: 'clamp(3rem,6vh,5.5rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="container-wide" style={{ position: 'relative', marginBottom: 'clamp(1.6rem,3.5vh,2.6rem)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(189,154,69,0.8)', margin: '0 0 0.7rem' }}>
            02 — Inside
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,3.8vw,3rem)', lineHeight: 1, letterSpacing: '-0.022em', color: 'var(--obsidian)', margin: 0 }}>
            A look{' '}<span style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>inside.</span>
          </h2>
        </div>

        <Link
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 group/var"
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 600, color: 'var(--aged-gold)',
          }}
        >
          View All Reels
          <span aria-hidden className="transition-transform duration-300 group-hover/var:translate-x-1">→</span>
        </Link>
      </div>

      {/* ── Carousel ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{ overflow: 'hidden', position: 'relative', cursor: 'grab' }}
        onPointerDown={onPtrDown}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Edge fades */}
        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6%', background: 'linear-gradient(to right, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6%', background: 'linear-gradient(to left, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

        {/* Edge arrows */}
        <button
          onClick={() => { goPrev(); startTimer(); }}
          aria-label="Previous reel"
          style={{ ...arrowBtn, position: 'absolute', left: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,   duration: 0.22, ease: 'power2.out' })}
        >‹</button>
        <button
          onClick={() => { goNext(); startTimer(); }}
          aria-label="Next reel"
          style={{ ...arrowBtn, position: 'absolute', right: 'clamp(8px,2vw,28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,   duration: 0.22, ease: 'power2.out' })}
        >›</button>

        {/* Track */}
        <div ref={trackRef} style={{ display: 'flex', gap: GAP, alignItems: 'center', willChange: 'transform' }}>
          {EXT.map((reel, i) => {
            const isClone = i === 0 || i === N + 1;
            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                onClick={() => { if (!ptrMoved.current) { window.open(SITE.instagram, '_blank', 'noopener'); } }}
                className="group"
                style={{
                  flexShrink:   0,
                  width:        'clamp(190px, 17.5vw, 250px)',
                  aspectRatio:  '9/16',
                  borderRadius: 16,
                  overflow:     'hidden',
                  position:     'relative',
                  cursor:       'pointer',
                  boxShadow:    '0 18px 44px -12px rgba(26,20,16,0.34)',
                }}
              >
                <video
                  ref={el => { videoRefs.current[i] = el; }}
                  src={reel.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload={Math.abs(i - vActive) <= 1 ? 'auto' : 'metadata'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#1a1410' }}
                />

                {!isClone && (
                  <>
                    <PlayBadge />
                    <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 52%, rgba(4,2,8,0.82) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 1rem 1.1rem', pointerEvents: 'none' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ivory)', margin: 0, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                        {reel.caption}
                      </p>
                    </div>
                    <div aria-hidden style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(184,146,58,0.22)', borderRadius: 16, pointerEvents: 'none' }} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
