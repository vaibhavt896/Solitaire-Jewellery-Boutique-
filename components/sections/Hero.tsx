'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';

gsap.config({ force3D: true });

/* ─── Slide data ───────────────────────────────────────────── */
const SLIDES = [
  { src: '/Hero-Slider-Images/slide%201.avif', alt: 'Curated solitaire jewellery, Swaroop Nagar Kanpur' },
  { src: '/Hero-Slider-Images/Slide%202.avif', alt: 'Bridal jewellery, timeless elegance' },
  { src: '/Hero-Slider-Images/slide%203.avif', alt: 'Heritage gold, Polki, Kundan, antique gold' },
  { src: '/Hero-Slider-Images/Slide%204.avif', alt: 'Certified diamond solitaires, GIA & IGI' },
  { src: '/Hero-Slider-Images/Slide%205.avif', alt: 'Fine jewellery for every occasion' },
] as const;

const N        = SLIDES.length;
const EXTENDED = [SLIDES[N - 1], ...SLIDES, SLIDES[0]] as const;

const DURATION = 5000;
const GAP      = 16;
const SLIDE_MS = 750;
const KB_SCALE = 1.065;                    // Ken Burns max zoom
const KB_DUR   = (DURATION + 400) / 1000; // slightly longer than slide lifetime

export function Hero() {
  const [idx,      setIdx]      = useState(0);
  const [vIdx,     setVIdx]     = useState(1);
  const [peek,     setPeek]     = useState(56);
  const [slideW,   setSlideW]   = useState(0);
  const [slideH,   setSlideH]   = useState(0);
  const [pb,       setPb]       = useState(24);
  const [dragging, setDragging] = useState(false);

  const idxRef       = useRef(0);
  const vIdxRef      = useRef(1);
  const slideWRef    = useRef(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout>>(undefined);
  const loopCleanup  = useRef<(() => void) | null>(null);
  const dotRefs      = useRef<(HTMLButtonElement | null)[]>([]);
  const dotSpanRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const slideRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const kenBurnRef   = useRef<gsap.core.Tween | null>(null);
  const prevVIdxRef  = useRef<number | null>(null);
  const reduceRef    = useRef(false);

  /* Pointer drag refs, all zero-state, zero re-renders during drag */
  const pointerDown = useRef(false);
  const ptrStartX   = useRef(0);
  const trackStartX = useRef(0);
  const velX        = useRef(0);
  const lastPtrX    = useRef(0);
  const lastPtrT    = useRef(0);

  /* ── Reduced-motion, must be first effect ─────────────── */
  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* ── Measure container ─────────────────────────────────── */
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = containerRef.current?.offsetWidth || vw;
      /* Hero height constraints to keep all slider and buttons above the fold */
      const CHROME  = 128;
      const NAV     = vw < 640 ? 128 : 118;
      const avail   = vh - CHROME - NAV;

      const isDesktop = vw >= 768;
      const minPeek = vw < 640 ? 10 : vw < 1024 ? 14 : 16;
      
      let sw = cw - minPeek * 2;
      let pk = minPeek;
      let slideH = Math.max(220, Math.round(avail * 0.80));
      let targetPb = 24;

      if (isDesktop) {
        const maxHForFold = Math.round(avail * 0.98);
        const targetSw = Math.round(maxHForFold * 2.7424);
        
        if (targetSw < cw - minPeek * 2) {
          sw = targetSw;
          slideH = maxHForFold;
          pk = Math.round((cw - sw) / 2);
        } else {
          sw = cw - minPeek * 2;
          slideH = Math.round(sw / 2.7424);
          pk = minPeek;
        }

        const contentHeight = 12 + slideH + NAV;
        const extraSpace = (vh - CHROME) - contentHeight;
        targetPb = Math.max(16, extraSpace);
      } else {
        const contentHeight = 12 + slideH + NAV;
        const extraSpace = (vh - CHROME) - contentHeight;
        targetPb = Math.max(16, extraSpace);
      }

      slideWRef.current = sw;
      setPeek(pk);
      setSlideW(sw);
      setSlideH(slideH);
      setPb(targetPb);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Set track transform directly via GSAP ─────────────── */
  const setTrack = useCallback((vi: number, animated: boolean) => {
    const t  = trackRef.current;
    const sw = slideWRef.current;
    if (!t) return;
    const targetX = -(vi * (sw + GAP));

    if (animated && !reduceRef.current) {
      // Animate track using GSAP
      gsap.to(t, {
        x: targetX,
        duration: SLIDE_MS / 1000,
        ease: 'power4.out',
        overwrite: 'auto',
      });

      // Animate slide card scales, opacities, and box-shadows concurrently
      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;
        const isActive = idx === vi;
        gsap.to(slide, {
          scale: isActive ? 1.0 : 0.96,
          opacity: isActive ? 1.0 : 0.68,
          boxShadow: isActive
            ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
            : '0 4px 12px rgba(26,20,16,0.04)',
          duration: SLIDE_MS / 1000,
          ease: 'power4.out',
          overwrite: 'auto',
        });
      });
    } else {
      // Snap instantly without animation
      gsap.killTweensOf(t);
      gsap.set(t, { x: targetX });

      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;
        const isActive = idx === vi;
        gsap.killTweensOf(slide);
        gsap.set(slide, {
          scale: isActive ? 1.0 : 0.96,
          opacity: isActive ? 1.0 : 0.68,
          boxShadow: isActive
            ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
            : '0 4px 12px rgba(26,20,16,0.04)',
        });
      });
    }
  }, []);

  /* On resize: instant snap to current visual position */
  useEffect(() => {
    if (slideW > 0) setTrack(vIdxRef.current, false);
  }, [slideW, setTrack]);

  /* ── GSAP entrance: section fades + lifts up on mount ─── */
  useEffect(() => {
    if (reduceRef.current || !sectionRef.current) return;
    const tween = gsap.from(sectionRef.current, {
      opacity:    0,
      y:          24,
      duration:   1.3,
      ease:       'power3.out',
      clearProps: 'opacity,y',
      overwrite:  'auto',
    });
    return () => { tween.kill(); };
  }, []);

  /* ── Ken Burns: zoom active image slowly over slide life ─ */
  useEffect(() => {
    if (reduceRef.current) return;
    const img = imageRefs.current[vIdx];
    if (!img) return;

    /* Smoothly return the exiting slide's image to scale 1 */
    if (prevVIdxRef.current !== null && prevVIdxRef.current !== vIdx) {
      const prevImg = imageRefs.current[prevVIdxRef.current];
      if (prevImg) {
        gsap.to(prevImg, { scale: 1, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      }
    }
    prevVIdxRef.current = vIdx;

    /* Start fresh Ken Burns on active image */
    kenBurnRef.current?.kill();
    kenBurnRef.current = gsap.fromTo(
      img,
      { scale: 1.0 },
      { scale: KB_SCALE, duration: KB_DUR, ease: 'sine.inOut', overwrite: 'auto' }
    );

    return () => { kenBurnRef.current?.kill(); };
  }, [vIdx]);

  /* ── Dot pill animations via GSAP ─────────────────────── */
  useEffect(() => {
    dotSpanRefs.current.forEach((span, i) => {
      if (!span) return;
      gsap.to(span, {
        width:           i === idx ? 20 : 7,
        backgroundColor: i === idx ? 'var(--gold)' : 'rgba(26,20,16,0.20)',
        duration:        0.45,
        ease:            'power3.out',
        overwrite:       'auto',
      });
    });
  }, [idx]);

  /* ── goTo: navigate to a real slide ───────────────────── */
  const goTo = useCallback((realIdx: number, animated = true) => {
    loopCleanup.current?.();
    loopCleanup.current = null;
    const vi = realIdx + 1;
    vIdxRef.current = vi;
    idxRef.current  = realIdx;
    setIdx(realIdx);
    setVIdx(vi);
    setTrack(vi, animated);
  }, [setTrack]);

  /* ── advance: smooth loop via GSAP callbacks ──────────── */
  const advance = useCallback((dir: 1 | -1) => {
    loopCleanup.current?.();
    loopCleanup.current = null;
    const cur = idxRef.current;
    const sw  = slideWRef.current;
    const t   = trackRef.current;

    /* Forward loop: last real → clone-first → real-first */
    if (dir === 1 && cur === N - 1) {
      const cloneVi = N + 1;
      vIdxRef.current = cloneVi;
      idxRef.current  = 0;
      setIdx(0);
      setVIdx(cloneVi);

      if (t) {
        gsap.to(t, {
          x: -(cloneVi * (sw + GAP)),
          duration: SLIDE_MS / 1000,
          ease: 'power4.out',
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(t, { x: -(1 * (sw + GAP)) });
            vIdxRef.current = 1;
            setVIdx(1);
          }
        });

        slideRefs.current.forEach((slide, idx) => {
          if (!slide) return;
          const isActive = idx === cloneVi;
          gsap.to(slide, {
            scale: isActive ? 1.0 : 0.96,
            opacity: isActive ? 1.0 : 0.68,
            boxShadow: isActive
              ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
              : '0 4px 12px rgba(26,20,16,0.04)',
            duration: SLIDE_MS / 1000,
            ease: 'power4.out',
            overwrite: 'auto',
            onComplete: () => {
              const isFirst = idx === 1;
              gsap.set(slide, {
                scale: isFirst ? 1.0 : 0.96,
                opacity: isFirst ? 1.0 : 0.68,
                boxShadow: isFirst
                  ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
                  : '0 4px 12px rgba(26,20,16,0.04)',
              });
            }
          });
        });
      }
      return;
    }

    /* Backward loop: first real → clone-last → real-last */
    if (dir === -1 && cur === 0) {
      const cloneVi = 0;
      vIdxRef.current = cloneVi;
      idxRef.current  = N - 1;
      setIdx(N - 1);
      setVIdx(cloneVi);

      if (t) {
        gsap.to(t, {
          x: -(cloneVi * (sw + GAP)),
          duration: SLIDE_MS / 1000,
          ease: 'power4.out',
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(t, { x: -(N * (sw + GAP)) });
            vIdxRef.current = N;
            setVIdx(N);
          }
        });

        slideRefs.current.forEach((slide, idx) => {
          if (!slide) return;
          const isActive = idx === cloneVi;
          gsap.to(slide, {
            scale: isActive ? 1.0 : 0.96,
            opacity: isActive ? 1.0 : 0.68,
            boxShadow: isActive
              ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
              : '0 4px 12px rgba(26,20,16,0.04)',
            duration: SLIDE_MS / 1000,
            ease: 'power4.out',
            overwrite: 'auto',
            onComplete: () => {
              const isLast = idx === N;
              gsap.set(slide, {
                scale: isLast ? 1.0 : 0.96,
                opacity: isLast ? 1.0 : 0.68,
                boxShadow: isLast
                  ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
                  : '0 4px 12px rgba(26,20,16,0.04)',
              });
            }
          });
        });
      }
      return;
    }

    goTo(cur + dir);
  }, [goTo]);

  /* ── Auto-advance ──────────────────────────────────────── */
  useEffect(() => {
    if (reduceRef.current || dragging) { clearTimeout(timerRef.current); return; }
    timerRef.current = setTimeout(() => advance(1), DURATION);
    return () => clearTimeout(timerRef.current);
  }, [idx, dragging, advance]);

  /* ── Keyboard ──────────────────────────────────────────── */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') advance(1);
      if (e.key === 'ArrowLeft')  advance(-1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [advance]);

  /* ── Pointer drag ──────────────────────────────────────── */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pointerDown.current = true;
    ptrStartX.current   = e.clientX;
    lastPtrX.current    = e.clientX;
    lastPtrT.current    = e.timeStamp;
    velX.current        = 0;
    
    // Kill any active slide/track tweens to prevent fighting the drag
    if (trackRef.current) gsap.killTweensOf(trackRef.current);
    slideRefs.current.forEach(slide => {
      if (slide) gsap.killTweensOf(slide);
    });

    const currentX = trackRef.current ? gsap.getProperty(trackRef.current, 'x') as number : 0;
    trackStartX.current = currentX || -(vIdxRef.current * (slideWRef.current + GAP));

    setDragging(true);
    clearTimeout(timerRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current) return;
    const delta = e.clientX - ptrStartX.current;
    const sw    = slideWRef.current;
    const raw   = trackStartX.current + delta;
    const maxX  = -(1 * (sw + GAP));
    const minX  = -(N * (sw + GAP));
    const tx    = raw > maxX ? maxX + (raw - maxX) * 0.18
                : raw < minX ? minX + (raw - minX) * 0.18
                : raw;
    const t = trackRef.current;
    if (t) {
      gsap.set(t, { x: tx });
    }
    const dt = e.timeStamp - lastPtrT.current;
    if (dt > 0) velX.current = (e.clientX - lastPtrX.current) / dt * 1000;
    lastPtrX.current = e.clientX;
    lastPtrT.current = e.timeStamp;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    setDragging(false);
    const delta = e.clientX - ptrStartX.current;
    const vel   = velX.current;
    if      (delta < -60 || vel < -400) advance(1);
    else if (delta >  60 || vel >  400) advance(-1);
    else goTo(idxRef.current);
  }, [advance, goTo]);

  return (
    <section ref={sectionRef} className="w-full" style={{ paddingTop: 12, paddingBottom: pb }}>

      {/* ── Carousel viewport ─────────────────────────────── */}
      <div
        ref={containerRef}
        className="overflow-hidden w-full"
        style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          style={{
            display:    'flex',
            gap:        GAP,
            marginLeft: peek,
            willChange: 'transform',
            opacity:    slideW > 0 ? 1 : 0,
            transform:  'translateX(0)',
          }}
        >
          {EXTENDED.map((s, vi) => (
            <div
              key={vi}
              ref={(el) => { slideRefs.current[vi] = el; }}
              style={{
                width:        slideW || 0,
                height:       slideH || undefined,
                flexShrink:   0,
                overflow:     'hidden',
                borderRadius: 12,
                lineHeight:   0,
                position:     'relative',
                background:   'var(--ivory)',
                willChange:   'transform, opacity',
                opacity:      vi === vIdx ? 1 : 0.68,
                transform:    vi === vIdx ? 'scale(1)' : 'scale(0.96)',
                boxShadow:    vi === vIdx
                  ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
                  : '0 4px 12px rgba(26,20,16,0.04)',
              }}
            >
              {/* Blurred fill */}
              <div
                aria-hidden
                style={{
                  position:           'absolute',
                  inset:              '-12px',
                  backgroundImage:    `url('${s.src}')`,
                  backgroundSize:     'cover',
                  backgroundPosition: 'center',
                  filter:             'blur(22px)',
                  opacity:            0.45,
                  zIndex:             0,
                }}
              />
              <Image
                ref={(el) => { imageRefs.current[vi] = el; }}
                src={s.src}
                alt={s.alt}
                width={2076}
                height={757}
                sizes="(max-width: 768px) 96vw, 90vw"
                quality={90}
                priority={vi === 1}
                draggable={false}
                style={{
                  width:           '100%',
                  height:          '100%',
                  display:         'block',
                  objectFit:       'contain',
                  objectPosition:  'center center',
                  transformOrigin: 'center center',
                  willChange:      'transform',
                  position:        'relative',
                  zIndex:          1,
                }}
              />
              {/* Inset gold frame */}
              <div
                aria-hidden
                style={{
                  position:      'absolute',
                  inset:         0,
                  border:        '0.5px solid rgba(184, 146, 58, 0.22)',
                  borderRadius:  12,
                  pointerEvents: 'none',
                  zIndex:        2,
                }}
              />
              {/* Cinematic vignette */}
              <div
                aria-hidden
                style={{
                  position:      'absolute',
                  inset:         0,
                  background:    'radial-gradient(ellipse at center, transparent 55%, rgba(26,20,16,0.15) 100%)',
                  pointerEvents: 'none',
                  zIndex:        2,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0 0' }}>

        {/* Pill dots */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          role="tablist"
          aria-label="Slide navigation"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              const next = (idx + 1) % N;
              goTo(next);
              requestAnimationFrame(() => dotRefs.current[next]?.focus());
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              const prev = (idx - 1 + N) % N;
              goTo(prev);
              requestAnimationFrame(() => dotRefs.current[prev]?.focus());
            }
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              role="tab"
              tabIndex={i === idx ? 0 : -1}
              aria-selected={i === idx}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{ padding: '8px 6px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}
            >
              <span
                ref={(el) => { dotSpanRefs.current[i] = el; }}
                style={{
                  display:         'block',
                  width:           i === idx ? 20 : 7,
                  height:          6,
                  borderRadius:    3,
                  backgroundColor: i === idx ? 'var(--gold)' : 'rgba(26,20,16,0.20)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Buttons row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/visit" className="cta cta--gold">
            <span>Visit the Boutique</span>
          </Link>
          <a
            href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta--ink"
          >
            <span>Message Us on WhatsApp</span>
          </a>
        </div>

        {/* Custom global styling to completely clear track transforms on drag */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .carousel-dragging * {
              user-select: none !important;
            }
          `
        }} />

      </div>
    </section>
  );
}
