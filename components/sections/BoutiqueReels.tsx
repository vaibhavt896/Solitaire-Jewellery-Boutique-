'use client';

/*  BoutiqueReels, infinite looping carousel
    Clone first/last cards at each end so the loop wraps without
    ever showing blank. GSAP expo.out for silky deceleration.
*/

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

gsap.config({ force3D: true });

/* ─── Data ───────────────────────────────────────────────── */
/* Add new reels to the TOP of this array — they will always play first */
const REELS = [
  { src: '/Reels/web/navratna-polki.mp4', caption: 'Colour and heritage, by hand.', label: 'Navratna · Polki'          },
  { src: '/Reels/web/emerald-ruby.mp4',   caption: 'Emerald greens, ruby pinks.',   label: 'Colour · Timeless'         },
  { src: '/Reels/web/bird-inspired.mp4',  caption: 'Graceful and luminous.',        label: 'Fine Craft · Nature'       },
  { src: '/Reels/web/1.mp4',              caption: 'Inside the boutique.',           label: 'Swaroop Nagar · Kanpur'   },
  { src: '/Reels/web/2.mp4',              caption: 'The pieces, up close.',          label: 'Collections · By hand'    },
  { src: '/Reels/web/3.mp4',              caption: 'Set by hand, in gold.',          label: 'Gold · By hand'           },
  { src: '/Reels/web/4.mp4',              caption: 'For the bride.',                 label: 'Bridal · Private sitting' },
  { src: '/Reels/web/5.mp4',              caption: 'A stone worth seeing.',          label: 'Solitaires · Certified'   },
] as const;

const REEL_HUES = ['#8B6AAE', '#4A7C5E', '#4A8B7E', '#B8923A', '#6B7FA8', '#C9A84C', '#C48A8A', '#4E8B7E'] as const;

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

const N        = REELS.length;
/* EXT = [clone-last, real 0…N-1, clone-first]
   Visual index (vIdx) 1…N maps to real 0…N-1.
   vIdx 0   = clone of last  → used when wrapping backward
   vIdx N+1 = clone of first → used when wrapping forward  */
const EXT      = [REELS[N - 1], ...REELS, REELS[0]] as const;
const GAP      = 18;
const INTERVAL = 4500;

function getOffset(vi: number, cardW: number, containerW: number): number {
  return containerW / 2 - cardW / 2 - vi * (cardW + GAP);
}

/* ─── Component ──────────────────────────────────────────── */
export function BoutiqueReels() {
  /* active = real index 0…N-1  (controls videos, pills, halo)
     vActive = visual index 0…N+1 (controls card scale/opacity) */
  const [active,  setActive]  = useState(0);
  const [vActive, setVActive] = useState(1);

  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const colorHaloRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  /* videoRefs indexed by EXT index (0 = clone-last, 1…N = real, N+1 = clone-first) */
  const videoRefs    = useRef<(HTMLVideoElement | null)[]>([]);
  const pillRefs     = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRef  = useRef(0);
  const vActiveRef = useRef(1);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const ptrStartX  = useRef(0);
  const ptrMoved   = useRef(false);
  const touchStartX = useRef(0);

  /* ── Slide track to center EXT[vi] ─────────────────────── */
  const slideTo = (vi: number, instant = false, onDone?: () => void) => {
    const track = trackRef.current;
    const card  = cardRefs.current[1]; // use a real card for consistent width
    if (!track || !card) { onDone?.(); return; }
    const x = getOffset(vi, card.offsetWidth, containerRef.current?.offsetWidth ?? window.innerWidth);
    if (instant) { gsap.set(track, { x }); onDone?.(); }
    else gsap.to(track, { x, duration: 0.82, ease: 'expo.out', overwrite: 'auto', onComplete: onDone });
  };

  /* ── Update color halo + pill indicators ───────────────── */
  const updateMood = (ri: number) => {
    if (colorHaloRef.current) {
      gsap.to(colorHaloRef.current, { backgroundColor: REEL_HUES[ri], duration: 1.1, ease: 'power2.inOut', overwrite: 'auto' });
    }
    pillRefs.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, { width: i === ri ? 28 : 7, opacity: i === ri ? 1 : 0.28, duration: 0.38, ease: 'power2.out' });
    });
  };

  /* ── Core navigate: animate to visual index nextV ──────── */
  const goToV = (nextV: number, nextReal: number) => {
    /* Pause old real video, play new real video */
    const oldV = vActiveRef.current;
    if (oldV >= 1 && oldV <= N) videoRefs.current[oldV]?.pause();
    const newExtIdx = nextV >= 1 && nextV <= N ? nextV : (nextV === 0 ? N : 1);
    videoRefs.current[newExtIdx]?.play().catch(() => {});

    activeRef.current  = nextReal;
    vActiveRef.current = nextV;
    setActive(nextReal);
    setVActive(nextV);
    updateMood(nextReal);

    const isWrapFwd = nextV === N + 1;
    const isWrapBwd = nextV === 0;

    slideTo(nextV, false, (isWrapFwd || isWrapBwd) ? () => {
      /* After sliding to a clone, instantly snap to the matching real card */
      const snapV = isWrapFwd ? 1 : N;
      vActiveRef.current = snapV;
      setVActive(snapV);
      slideTo(snapV, true);
    } : undefined);
  };

  /* Navigate directly to real index (pill / card click) */
  const navigate = (ri: number) => goToV(ri + 1, ri);

  /* Sequential prev / next (supports wrap-around via clones) */
  const goNext = () => goToV(vActiveRef.current + 1, (activeRef.current + 1) % N);
  const goPrev = () => goToV(vActiveRef.current - 1, (activeRef.current - 1 + N) % N);

  /* ── Auto-advance timer ─────────────────────────────────── */
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, INTERVAL);
  };

  /* ── Mount ─────────────────────────────────────────────── */
  useEffect(() => {
    requestAnimationFrame(() => slideTo(1, true));

    if (sectionRef.current) {
      gsap.from(sectionRef.current, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,y' });
    }
    if (colorHaloRef.current) {
      gsap.fromTo(colorHaloRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1,   opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.25 }
      );
    }

    pillRefs.current.forEach((p, i) => {
      if (p) gsap.set(p, { width: i === 0 ? 28 : 7, opacity: i === 0 ? 1 : 0.28 });
    });

    /* Clone videos always play (so wrap transitions show live video) */
    videoRefs.current[0]?.play().catch(() => {});      // clone-last
    videoRefs.current[1]?.play().catch(() => {});      // real first
    videoRefs.current[N + 1]?.play().catch(() => {}); // clone-first

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
      gsap.killTweensOf(colorHaloRef.current);
      gsap.killTweensOf(sectionRef.current);
      pillRefs.current.forEach(p => p && gsap.killTweensOf(p));
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

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--ivory)', padding: 'clamp(3rem,6vh,5rem) 0 clamp(2.5rem,5vh,4rem)', position: 'relative', overflow: 'hidden' }}
    >

      {/* Per-reel GSAP color halo */}
      <div
        ref={colorHaloRef}
        aria-hidden
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 640, height: 460, borderRadius: '50%',
          backgroundColor: REEL_HUES[0],
          filter: 'blur(140px)', opacity: 0, zIndex: 0,
          mixBlendMode: 'soft-light', pointerEvents: 'none',
        }}
      />

      {/* Film grain */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: GRAIN, backgroundRepeat: 'repeat',
        opacity: 0.04, zIndex: 1, pointerEvents: 'none', mixBlendMode: 'overlay',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.6rem,3.5vh,2.8rem)', position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(189,154,69,0.72)', margin: '0 0 0.75rem' }}>
          02 — Inside
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.8vw,3rem)', fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          A look{' '}<span style={{ color: 'var(--gold-deep)' }}>inside.</span>
        </h2>
      </div>

      {/* ── Carousel viewport ───────────────────────────────── */}
      <div
        ref={containerRef}
        style={{ overflow: 'hidden', position: 'relative', zIndex: 2, cursor: 'grab' }}
        onPointerDown={onPtrDown}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Edge fades, match section background */}
        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '7%', background: 'linear-gradient(to right, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '7%', background: 'linear-gradient(to left, var(--ivory) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

        {/* Track, GSAP translates this */}
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: GAP, alignItems: 'center', padding: '20px 0', willChange: 'transform' }}
        >
          {EXT.map((reel, i) => {
            const isActive = i === vActive;
            const isClone  = i === 0 || i === N + 1;
            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                onClick={() => { if (!ptrMoved.current && !isClone) { navigate(i - 1); startTimer(); } }}
                style={{
                  flexShrink:   0,
                  width:        'clamp(220px, 60vw, 290px)',
                  aspectRatio:  '9/16',
                  borderRadius: 20,
                  overflow:     'hidden',
                  position:     'relative',
                  cursor:       isActive ? 'default' : 'pointer',
                  transition:   'opacity 0.68s cubic-bezier(0.16,1,0.3,1), transform 0.68s cubic-bezier(0.16,1,0.3,1), box-shadow 0.68s cubic-bezier(0.16,1,0.3,1)',
                  opacity:      isActive ? 1 : 0.42,
                  transform:    `scale(${isActive ? 1 : 0.87})`,
                  boxShadow:    isActive ? '0 36px 90px rgba(0,0,0,0.68), 0 0 0 0.5px rgba(184,146,58,0.22)' : 'none',
                }}
              >
                <video
                  ref={el => { videoRefs.current[i] = el; }}
                  src={reel.src}
                  muted
                  loop
                  playsInline
                  preload={Math.abs(i - vActive) <= 1 ? 'auto' : 'metadata'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
                />

                {/* Caption + border: only on the active non-clone card */}
                {isActive && !isClone && (
                  <>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 48%, rgba(4,2,8,0.96) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1rem 1.3rem', pointerEvents: 'none' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ivory)', margin: '0 0 0.2rem', letterSpacing: '-0.01em' }}>
                        {reel.caption}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,227,0.42)', margin: 0 }}>
                        {reel.label}
                      </p>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(184,146,58,0.24)', borderRadius: 20, pointerEvents: 'none' }} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 'clamp(1.2rem,2.8vh,2rem)', position: 'relative', zIndex: 2 }}>

        <button
          onClick={() => { goPrev(); startTimer(); }}
          aria-label="Previous reel"
          style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(26,20,16,0.18)', background: 'rgba(26,20,16,0.05)', color: 'var(--ink-soft)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.12, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.22, ease: 'power2.out' })}
        >←</button>

        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {REELS.map((_, i) => (
            <button
              key={i}
              ref={el => { pillRefs.current[i] = el; }}
              onClick={() => { navigate(i); startTimer(); }}
              aria-label={`Go to reel ${i + 1}`}
              style={{ height: 2, width: 7, borderRadius: 1, background: 'var(--aged-gold)', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.28 }}
            />
          ))}
        </div>

        <button
          onClick={() => { goNext(); startTimer(); }}
          aria-label="Next reel"
          style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(26,20,16,0.18)', background: 'rgba(26,20,16,0.05)', color: 'var(--ink-soft)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.12, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.22, ease: 'power2.out' })}
        >→</button>

      </div>
    </section>
  );
}
