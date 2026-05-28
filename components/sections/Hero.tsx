'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

gsap.config({ force3D: true });

/* ─── Slide data ───────────────────────────────────────────── */
const SLIDES = [
  { src: '/Hero-Slider-Images/slide%201.avif', alt: 'Curated solitaire jewellery — Swaroop Nagar Kanpur' },
  { src: '/Hero-Slider-Images/Slide%202.avif', alt: 'Bridal jewellery — timeless elegance' },
  { src: '/Hero-Slider-Images/slide%203.avif', alt: 'Heritage gold — Polki, Kundan, antique gold' },
  { src: '/Hero-Slider-Images/Slide%204.avif', alt: 'Certified diamond solitaires — GIA & IGI' },
  { src: '/Hero-Slider-Images/Slide%205.avif', alt: 'Fine jewellery for every occasion' },
] as const;

const N        = SLIDES.length;
const EXTENDED = [SLIDES[N - 1], ...SLIDES, SLIDES[0]] as const;

const DURATION = 5000;
const GAP      = 10;
const SLIDE_MS = 1000;
const EASE     = '0.65,0,0.35,1';
const KB_SCALE = 1.065;                    // Ken Burns max zoom
const KB_DUR   = (DURATION + 400) / 1000; // slightly longer than slide lifetime

export function Hero() {
  const [idx,      setIdx]      = useState(0);
  const [vIdx,     setVIdx]     = useState(1);
  const [peek,     setPeek]     = useState(56);
  const [slideW,   setSlideW]   = useState(0);
  const [dragging, setDragging] = useState(false);

  const idxRef       = useRef(0);
  const vIdxRef      = useRef(1);
  const slideWRef    = useRef(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout>>(undefined);
  const loopCleanup  = useRef<(() => void) | null>(null);
  const dotRefs      = useRef<(HTMLButtonElement | null)[]>([]);
  const dotSpanRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const kenBurnRef   = useRef<gsap.core.Tween | null>(null);
  const prevVIdxRef  = useRef<number | null>(null);
  const reduceRef    = useRef(false);

  /* Pointer drag refs — all zero-state, zero re-renders during drag */
  const pointerDown = useRef(false);
  const ptrStartX   = useRef(0);
  const trackStartX = useRef(0);
  const velX        = useRef(0);
  const lastPtrX    = useRef(0);
  const lastPtrT    = useRef(0);

  /* ── Reduced-motion — must be first effect ─────────────── */
  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* ── Measure container ─────────────────────────────────── */
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const pk = vw < 640 ? 14 : vw < 1024 ? 36 : 56;
      const sw = (containerRef.current?.offsetWidth ?? vw) - pk * 2;
      slideWRef.current = sw;
      setPeek(pk);
      setSlideW(sw);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Set track transform directly on the DOM ───────────── */
  const setTrack = useCallback((vi: number, animated: boolean) => {
    const t  = trackRef.current;
    const sw = slideWRef.current;
    if (!t) return;
    t.style.transition = (animated && !reduceRef.current)
      ? `transform ${SLIDE_MS}ms cubic-bezier(${EASE})`
      : 'none';
    t.style.transform = `translateX(${-(vi * (sw + GAP))}px)`;
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

    /* Kill old Ken Burns, start fresh on active image */
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

  /* ── GSAP progress bar (replaces RAF) ─────────────────── */
  useEffect(() => {
    if (reduceRef.current || dragging || !progressRef.current) return;
    const bar = progressRef.current;
    gsap.killTweensOf(bar);
    gsap.fromTo(bar,
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION / 1000, ease: 'none', overwrite: true }
    );
    return () => { gsap.killTweensOf(bar); };
  }, [idx, dragging]);

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

  /* ── advance: smooth loop via clone slides ─────────────── */
  const advance = useCallback((dir: 1 | -1) => {
    loopCleanup.current?.();
    loopCleanup.current = null;
    const cur = idxRef.current;

    /* Forward loop: last real → clone-first → real-first */
    if (dir === 1 && cur === N - 1) {
      const cloneVi = N + 1;
      vIdxRef.current = cloneVi;
      idxRef.current  = 0;
      setIdx(0);
      setVIdx(cloneVi);
      setTrack(cloneVi, true);

      const t = trackRef.current;
      if (!t) return;
      const onEnd = () => {
        t.removeEventListener('transitionend', onEnd);
        const sw = slideWRef.current;
        t.style.transition = 'none';
        t.style.transform  = `translateX(${-(1 * (sw + GAP))}px)`;
        vIdxRef.current = 1;
        setVIdx(1);
      };
      t.addEventListener('transitionend', onEnd);
      loopCleanup.current = () => t.removeEventListener('transitionend', onEnd);
      return;
    }

    /* Backward loop: first real → clone-last → real-last */
    if (dir === -1 && cur === 0) {
      const cloneVi = 0;
      vIdxRef.current = cloneVi;
      idxRef.current  = N - 1;
      setIdx(N - 1);
      setVIdx(cloneVi);
      setTrack(cloneVi, true);

      const t = trackRef.current;
      if (!t) return;
      const onEnd = () => {
        t.removeEventListener('transitionend', onEnd);
        const sw = slideWRef.current;
        t.style.transition = 'none';
        t.style.transform  = `translateX(${-(N * (sw + GAP))}px)`;
        vIdxRef.current = N;
        setVIdx(N);
      };
      t.addEventListener('transitionend', onEnd);
      loopCleanup.current = () => t.removeEventListener('transitionend', onEnd);
      return;
    }

    goTo(cur + dir);
  }, [goTo, setTrack]);

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
    trackStartX.current = -(vIdxRef.current * (slideWRef.current + GAP));
    const t = trackRef.current;
    if (t) t.style.transition = 'none';
    setDragging(true);
    clearTimeout(timerRef.current);
    if (progressRef.current) gsap.killTweensOf(progressRef.current);
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
    if (t) t.style.transform = `translateX(${tx}px)`;
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
    <section ref={sectionRef} className="w-full" style={{ paddingTop: 18 }}>

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
              style={{
                width:        slideW || 0,
                flexShrink:   0,
                overflow:     'hidden',
                borderRadius: 10,
                lineHeight:   0,
                willChange:   Math.abs(vi - vIdx) <= 1 ? 'opacity' : 'auto',
                opacity:      vi === vIdx ? 1 : 0.68,
                transition:   `opacity ${SLIDE_MS}ms cubic-bezier(${EASE})`,
              }}
            >
              <Image
                ref={(el) => { imageRefs.current[vi] = el; }}
                src={s.src}
                alt={s.alt}
                width={1800}
                height={1000}
                sizes="(max-width: 640px) 96vw, (max-width: 1024px) 93vw, 88vw"
                quality={90}
                priority={vi === 1}
                draggable={false}
                style={{
                  width:           '100%',
                  height:          'auto',
                  display:         'block',
                  transformOrigin: 'center center',
                  willChange:      'transform',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '14px 0 6px' }}>

        {/* Pill dots — GSAP animated, no Framer Motion */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 7 }}
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
              style={{ padding: '18px 14px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}
            >
              <span
                ref={(el) => { dotSpanRefs.current[i] = el; }}
                style={{
                  display:         'block',
                  width:           i === 0 ? 20 : 7,
                  height:          7,
                  borderRadius:    4,
                  backgroundColor: i === 0 ? 'var(--gold)' : 'rgba(26,20,16,0.20)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Progress bar — GSAP driven */}
        <div style={{ width: 96, height: 2, background: 'rgba(26,20,16,0.10)', overflow: 'hidden', borderRadius: 1 }}>
          <div
            ref={progressRef}
            style={{
              height:          '100%',
              background:      'linear-gradient(to right, var(--gold-soft), var(--gold))',
              transformOrigin: 'left',
              transform:       'scaleX(0)',
              willChange:      'transform',
            }}
          />
        </div>

      </div>
    </section>
  );
}
