'use client';

/*  BoutiqueReels — clean horizontal sliding carousel
    No 3D distortion. No background video.
    objectFit: contain → full jewelry always visible.
    GSAP for: track slide, color halo, pill indicators, entrance.
*/

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

gsap.config({ force3D: true });

/* ─── Data ───────────────────────────────────────────────── */
const REELS = [
  { src: '/Reels/web/1.mp4', caption: 'Inside the boutique.',  label: 'Swaroop Nagar · Kanpur' },
  { src: '/Reels/web/2.mp4', caption: 'The pieces, laid out.', label: 'Collections · In stock'  },
  { src: '/Reels/web/3.mp4', caption: 'Set by hand, in gold.', label: 'Atelier · Craft'         },
  { src: '/Reels/web/4.mp4', caption: 'For the bride.',        label: 'Bridal · Consultation'   },
  { src: '/Reels/web/5.mp4', caption: 'A stone worth seeing.', label: 'Solitaires · Certified'  },
] as const;

const REEL_HUES = [
  '#B8923A', // warm gold
  '#6B7FA8', // twilight blue
  '#C9A84C', // rich gold
  '#C48A8A', // soft rose
  '#4E8B7E', // aquamarine
] as const;

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GAP      = 18;   // gap between cards (px)
const INTERVAL = 4500; // auto-advance interval (ms)

/* ─── Utility: compute track offset to center card `idx` ── */
function getOffset(
  idx:          number,
  cardWidth:    number,
  containerWidth: number
): number {
  return containerWidth / 2 - cardWidth / 2 - idx * (cardWidth + GAP);
}

/* ─── Component ──────────────────────────────────────────── */
export function BoutiqueReels() {
  const [active, setActive] = useState(0);

  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const colorHaloRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs    = useRef<(HTMLVideoElement | null)[]>([]);
  const pillRefs     = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRef   = useRef(0);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const ptrStartX   = useRef(0);
  const ptrMoved    = useRef(false);
  const touchStartX = useRef(0);

  /* ── Slide track to center the active card ─────────────── */
  const slideTo = (idx: number, instant = false) => {
    const track = trackRef.current;
    const card  = cardRefs.current[0];
    if (!track || !card) return;
    const x = getOffset(idx, card.offsetWidth, containerRef.current?.offsetWidth ?? window.innerWidth);
    if (instant) gsap.set(track, { x });
    else         gsap.to(track, { x, duration: 0.72, ease: 'power3.out', overwrite: 'auto' });
  };

  /* ── Navigate to reel idx ──────────────────────────────── */
  const navigate = (idx: number) => {
    /* Pause the outgoing video, play the incoming one */
    videoRefs.current[activeRef.current]?.pause();
    videoRefs.current[idx]?.play().catch(() => {});

    activeRef.current = idx;
    setActive(idx);
    slideTo(idx);

    /* Color halo morphs per reel mood */
    if (colorHaloRef.current) {
      gsap.to(colorHaloRef.current, {
        backgroundColor: REEL_HUES[idx],
        duration: 1.1,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }

    /* Progress pill indicators */
    pillRefs.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, {
        width:   i === idx ? 28 : 7,
        opacity: i === idx ? 1  : 0.28,
        duration: 0.38,
        ease: 'power2.out',
      });
    });
  };

  /* ── Auto-advance timer ─────────────────────────────────── */
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      navigate((activeRef.current + 1) % REELS.length);
    }, INTERVAL);
  };

  /* ── Mount ─────────────────────────────────────────────── */
  useEffect(() => {
    /* Snap to initial position after first paint */
    requestAnimationFrame(() => slideTo(0, true));

    /* Section entrance */
    if (sectionRef.current) {
      gsap.from(sectionRef.current, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,y' });
    }

    /* Color halo entrance */
    if (colorHaloRef.current) {
      gsap.fromTo(colorHaloRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1,   opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.25 }
      );
    }

    /* Initial pill states */
    pillRefs.current.forEach((p, i) => {
      if (p) gsap.set(p, { width: i === 0 ? 28 : 7, opacity: i === 0 ? 1 : 0.28 });
    });

    /* Only play the first video on mount — others play when navigated to */
    videoRefs.current[0]?.play().catch(() => {});

    startTimer();

    /* Debounced resize — re-snap without firing on every pixel */
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => slideTo(activeRef.current, true));
      }, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      timerRef.current && clearInterval(timerRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      /* Pause all videos and kill all active GSAP tweens */
      videoRefs.current.forEach(v => v?.pause());
      gsap.killTweensOf(trackRef.current);
      gsap.killTweensOf(colorHaloRef.current);
      gsap.killTweensOf(sectionRef.current);
      pillRefs.current.forEach(p => p && gsap.killTweensOf(p));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pointer drag (desktop) ─────────────────────────────── */
  const onPtrDown = (e: React.PointerEvent) => {
    ptrStartX.current = e.clientX;
    ptrMoved.current  = false;
  };
  const onPtrMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - ptrStartX.current) > 5) ptrMoved.current = true;
  };
  const onPtrUp = (e: React.PointerEvent) => {
    if (!ptrMoved.current) return;
    const dx = e.clientX - ptrStartX.current;
    if (Math.abs(dx) > 50) {
      navigate((activeRef.current + (dx < 0 ? 1 : -1) + REELS.length) % REELS.length);
      startTimer();
    }
  };

  /* ── Touch swipe (mobile) ───────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) {
      navigate((activeRef.current + (dx < 0 ? 1 : -1) + REELS.length) % REELS.length);
      startTimer();
    }
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ background: '#060408', padding: 'clamp(3rem,6vh,5rem) 0 clamp(2.5rem,5vh,4rem)', position: 'relative', overflow: 'hidden' }}
    >

      {/* Per-reel GSAP color halo — mood lighting, no video */}
      <div
        ref={colorHaloRef}
        aria-hidden
        style={{
          position:        'absolute',
          top:             '50%',
          left:            '50%',
          transform:       'translate(-50%, -50%)',
          width:           640,
          height:          460,
          borderRadius:    '50%',
          backgroundColor: REEL_HUES[0],
          filter:          'blur(140px)',
          opacity:         0,
          zIndex:          0,
          mixBlendMode:    'soft-light',
          pointerEvents:   'none',
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: GRAIN,
          backgroundRepeat: 'repeat',
          opacity:         0.04,
          zIndex:          1,
          pointerEvents:   'none',
          mixBlendMode:    'overlay',
        }}
      />

      {/* ── Section header ──────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.6rem,3.5vh,2.8rem)', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily:    'var(--font-body)',
          fontSize:      9,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:         'rgba(184,146,58,0.62)',
          margin:        '0 0 0.75rem',
        }}>
          In the boutique
        </p>
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.8rem, 3.8vw, 3rem)',
          fontStyle:     'italic',
          lineHeight:    1,
          letterSpacing: '-0.022em',
          color:         'var(--ivory)',
          margin:        0,
        }}>
          The boutique,{' '}
          <span style={{ color: 'rgba(184,146,58,0.85)' }}>in motion.</span>
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
        {/* Edge fade — left */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '7%',
          background: 'linear-gradient(to right, #060408 0%, transparent 100%)',
          zIndex: 10, pointerEvents: 'none',
        }} />
        {/* Edge fade — right */}
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '7%',
          background: 'linear-gradient(to left, #060408 0%, transparent 100%)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Track — all cards in a flex row, GSAP translates this */}
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: GAP, alignItems: 'center', padding: '20px 0', willChange: 'transform' }}
        >
          {REELS.map((reel, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                onClick={() => { if (!ptrMoved.current) { navigate(i); startTimer(); } }}
                style={{
                  flexShrink:  0,
                  /* Responsive card width — CSS handles it, GSAP reads offsetWidth */
                  width:       'clamp(220px, 60vw, 290px)',
                  aspectRatio: '9/16',
                  borderRadius: 20,
                  overflow:    'hidden',
                  position:    'relative',
                  cursor:      isActive ? 'default' : 'pointer',
                  /* CSS transitions for scale/opacity — smooth and GPU-composited */
                  transition:  'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.55s ease',
                  opacity:     isActive ? 1    : 0.42,
                  transform:   `scale(${isActive ? 1 : 0.87})`,
                  boxShadow:   isActive
                    ? '0 36px 90px rgba(0,0,0,0.72), 0 0 0 0.5px rgba(184,146,58,0.22)'
                    : 'none',
                }}
              >
                {/* Video — objectFit:contain shows full frame, no cropping */}
                <video
                  ref={el => { videoRefs.current[i] = el; }}
                  src={reel.src}
                  muted
                  loop
                  playsInline
                  preload={Math.abs(i - active) <= 1 ? 'auto' : 'metadata'}
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'contain', // full video visible — no stretch, no crop
                    display:    'block',
                    background: '#000',
                  }}
                />

                {/* Active card: bottom caption gradient */}
                {isActive && (
                  <>
                    <div style={{
                      position:   'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 48%, rgba(4,2,8,0.96) 100%)',
                      pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding:  '1rem 1rem 1.3rem',
                      pointerEvents: 'none',
                    }}>
                      <p style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      '0.95rem',
                        fontStyle:     'italic',
                        color:         'var(--ivory)',
                        margin:        '0 0 0.2rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {reel.caption}
                      </p>
                      <p style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      7.5,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color:         'rgba(244,239,227,0.42)',
                        margin:        0,
                      }}>
                        {reel.label}
                      </p>
                    </div>
                    {/* Gold sheen border */}
                    <div style={{
                      position:     'absolute', inset: 0,
                      border:       '0.5px solid rgba(184,146,58,0.24)',
                      borderRadius: 20,
                      pointerEvents: 'none',
                    }} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────── */}
      <div style={{
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        gap:            18,
        marginTop:      'clamp(1.2rem,2.8vh,2rem)',
        position:       'relative',
        zIndex:         2,
      }}>
        {/* Prev */}
        <button
          onClick={() => { navigate((active - 1 + REELS.length) % REELS.length); startTimer(); }}
          aria-label="Previous reel"
          style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid rgba(184,146,58,0.28)', background: 'rgba(184,146,58,0.06)', color: 'rgba(244,239,227,0.62)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.12, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.22, ease: 'power2.out' })}
        >←</button>

        {/* Pill indicators */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {REELS.map((_, i) => (
            <button
              key={i}
              ref={el => { pillRefs.current[i] = el; }}
              onClick={() => { navigate(i); startTimer(); }}
              aria-label={`Go to reel ${i + 1}`}
              style={{
                height:     2,
                width:      7,
                borderRadius: 1,
                background: 'rgba(184,146,58,0.78)',
                border:     'none',
                padding:    0,
                cursor:     'pointer',
                opacity:    0.28,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => { navigate((active + 1) % REELS.length); startTimer(); }}
          aria-label="Next reel"
          style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid rgba(184,146,58,0.28)', background: 'rgba(184,146,58,0.06)', color: 'rgba(244,239,227,0.62)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
          onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.12, duration: 0.18, ease: 'power2.out' })}
          onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1,    duration: 0.22, ease: 'power2.out' })}
        >→</button>
      </div>

    </section>
  );
}
