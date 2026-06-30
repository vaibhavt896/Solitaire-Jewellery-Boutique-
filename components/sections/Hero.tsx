'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

gsap.config({ force3D: true });

/* ─── Slide data — ordered 1–7 exactly as named ─────────────
   `eyebrow/title/subtitle/cta` drive the mobile overlay hero only;
   the desktop carousel ignores them (it reads src/alt/w/h). ───── */
const SLIDES = [
  { src: '/Hero-Slider-Images/slide%201.webp', mobileSrc: '/Hero-Slider-Images/slide%201%20(Mob).webp', alt: 'Temple Treasures — antique 22ct gold temple necklace set at Solitaire Jewellery Boutique', w: 1994, h: 789,
    eyebrow: 'Heritage in Every Detail', title: 'Temple Treasures',     subtitle: 'Antique 22ct gold temple set',                cta: { label: 'Explore Collection', href: '/collections/temple' } },
  { src: '/Hero-Slider-Images/Slide%202.webp', alt: 'A curated fine jewellery collection — Polki, Kundan and diamond pieces at Solitaire',       w: 1994, h: 789,
    eyebrow: 'Chosen by Hand',          title: 'The Curated Edit',      subtitle: 'Polki, Kundan & fine diamond',                cta: { label: 'View Collections',   href: '/collections' } },
  { src: '/Hero-Slider-Images/slide%203.webp', alt: 'Emerald and gold stud earrings, handcrafted at Solitaire Jewellery Boutique',               w: 1994, h: 789,
    eyebrow: 'Everyday Heirlooms',      title: 'Emerald & Gold',        subtitle: 'Handcrafted stud earrings',                   cta: { label: 'Explore Antique Gold', href: '/collections/antique-gold' } },
  { src: '/Hero-Slider-Images/Slide%204.webp', alt: 'Timeless Elegance — antique 22ct gold and Polki bridal set at Solitaire',                   w: 1994, h: 789,
    eyebrow: 'Timeless Elegance',       title: 'The Bridal Set',        subtitle: 'Antique gold & Polki, made to keep',          cta: { label: 'Explore Bridal',     href: '/bridal' } },
  { src: '/Hero-Slider-Images/Slide%205.webp', alt: 'Handcrafted gold bangles — Dubai gold collection at Solitaire Jewellery Boutique',          w: 1994, h: 789,
    eyebrow: 'Pure & Hallmarked',       title: 'Handcrafted Bangles',   subtitle: 'BIS hallmarked 22ct gold',                    cta: { label: 'Explore Collection', href: '/collections/dubai-gold-bangles' } },
  { src: '/Hero-Slider-Images/slide%206.webp', alt: "The Bride's Collection — Polki and Kundan bridal jewellery set at Solitaire",               w: 1994, h: 789,
    eyebrow: 'Crafted for Forever',     title: "The Bride's Collection", subtitle: 'Timeless pieces for your most precious moments', cta: { label: 'Explore Bridal',  href: '/bridal' } },
  { src: '/Hero-Slider-Images/Slide%207.webp', alt: 'Heritage jewellery — temple gold and antique designs, Solitaire Jewellery Boutique',        w: 1994, h: 789,
    eyebrow: 'A Living Heritage',       title: 'Heritage Gold',         subtitle: 'Temple & antique designs',                    cta: { label: 'Explore Collections', href: '/collections' } },
] as const;

const N        = SLIDES.length;
const EXTENDED = [SLIDES[N - 1], ...SLIDES, SLIDES[0]] as const;

const DURATION = 5000;
const GAP      = 16;
const SLIDE_MS = 900;
const KB_SCALE = 1.065;                    // Ken Burns max zoom
const KB_DUR   = (DURATION + 400) / 1000; // slightly longer than slide lifetime

/* ─── Mobile hero — full-bleed portrait with overlaid copy + CTA ───
   Rendered only below `md`. The desktop landscape carousel below is
   hidden on mobile, so its behaviour is completely unchanged. ──────── */
function MobileHero() {
  const [idx, setIdx] = useState(0);
  const idxRef  = useRef(0);
  const reduce  = useRef(false);
  const touchX  = useRef(0);
  const timer   = useRef<ReturnType<typeof setInterval>>(undefined);

  const go = useCallback((n: number) => {
    const next = (n + N) % N;
    idxRef.current = next;
    setIdx(next);
  }, []);

  const start = useCallback(() => {
    if (reduce.current) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => go(idxRef.current + 1), DURATION);
  }, [go]);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 44) { go(idxRef.current + (dx < 0 ? 1 : -1)); start(); }
  };

  const s = SLIDES[idx];

  return (
    <section
      className="md:hidden"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      style={{ position: 'relative', width: '100%', background: 'var(--obsidian)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">Heirlooms, made by hand. A small family boutique in Swaroop Nagar, Kanpur.</h1>

      <style>{`
        @keyframes mHeroCopyIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .m-hero-img  { transition: opacity 0.3s ease !important; transform: none !important; }
          .m-hero-copy { animation: none !important; }
        }
      `}</style>

      <div style={{ position: 'relative', width: '100%', height: 'clamp(440px, 76vh, 720px)', overflow: 'hidden' }}>
        {SLIDES.map((slide, i) => (
          <Image
            key={i}
            src={'mobileSrc' in slide ? slide.mobileSrc! : slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={90}
            sizes="100vw"
            className="m-hero-img"
            draggable={false}
            style={{
              objectFit:      'cover',
              objectPosition: 'center 32%',
              opacity:        i === idx ? 1 : 0,
              transform:      i === idx ? 'scale(1.06)' : 'scale(1)',
              transition:     'opacity 0.9s ease, transform 6s ease-out',
              zIndex:         i === idx ? 1 : 0,
            }}
          />
        ))}

        {/* Bottom legibility gradient */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to top, rgba(15,11,7,0.84) 0%, rgba(15,11,7,0.36) 38%, rgba(15,11,7,0.04) 64%, transparent 100%)',
        }} />
        {/* Subtle top scrim under the sticky header */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 96, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(15,11,7,0.26), transparent)',
        }} />

        {/* Overlay copy + dots */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, padding: '0 24px 26px' }}>
          <div key={idx} className="m-hero-copy" style={{ animation: 'mHeroCopyIn 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span aria-hidden style={{ width: 22, height: 1, background: 'var(--gold-soft)', opacity: 0.85 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--gold-soft)' }}>
                {s.eyebrow}
              </span>
            </div>

            {/* Title */}
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.3rem, 10vw, 3.2rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: 'var(--ivory)', margin: 0, textShadow: '0 2px 26px rgba(0,0,0,0.38)' }}>
              {s.title}
            </p>

            {/* Subtitle */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.5, color: 'rgba(244,239,227,0.86)', margin: '12px 0 0', maxWidth: 300 }}>
              {s.subtitle}
            </p>

            {/* CTA */}
            <Link
              href={s.cta.href}
              className="inline-flex items-center"
              style={{
                marginTop: 22, gap: 10,
                background: 'var(--aged-gold)', color: 'var(--ivory)',
                padding: '14px 26px', borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600,
                boxShadow: '0 12px 32px -10px rgba(0,0,0,0.55)',
              }}
            >
              {s.cta.label}
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Dots */}
          <div role="tablist" aria-label="Slide navigation" style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 24 }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { go(i); start(); }}
                style={{ padding: '6px 0', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}
              >
                <span style={{
                  display: 'block', height: 5, width: i === idx ? 22 : 6, borderRadius: 3,
                  background: i === idx ? 'var(--gold)' : 'rgba(244,239,227,0.42)',
                  transition: 'width 0.4s ease, background 0.4s ease',
                }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const [idx,      setIdx]      = useState(0);
  const [vIdx,     setVIdx]     = useState(1);
  const [peek,     setPeek]     = useState(56);
  const [slideW,   setSlideW]   = useState(0);
  const [slideH,   setSlideH]   = useState(0);
  const [pb,       setPb]       = useState(24);
  const [coverFit, setCoverFit] = useState(false);
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
  const measure = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cw = containerRef.current?.offsetWidth || vw;
    const CHROME = 128;
    const NAV    = 32; // dots only, no buttons
    const avail  = vh - CHROME - NAV;

    const isDesktop = vw >= 768;
    const minPeek = vw < 640 ? 10 : vw < 1024 ? 14 : 16;

    const RATIO = 2.53; // 1182/467 — cinematic landscape like the reference

    let sw = cw - minPeek * 2;
    let pk = minPeek;
    let slideH = Math.round(sw / RATIO); // landscape on all viewports
    let targetPb = 8;

    if (isDesktop) {
      const maxHForFold = Math.round(avail * 0.98);
      const targetSw = Math.round(maxHForFold * RATIO);

      if (targetSw < cw - minPeek * 2) {
        sw = targetSw;
        slideH = maxHForFold;
        pk = Math.round((cw - sw) / 2);
      } else {
        sw = cw - minPeek * 2;
        slideH = Math.round(sw / RATIO);
        pk = minPeek;
      }

      const contentHeight = 12 + slideH + NAV;
      const extraSpace = (vh - CHROME) - contentHeight;
      targetPb = Math.max(8, extraSpace);
    }

    slideWRef.current = sw;
    setPeek(pk);
    setSlideW(sw);
    setSlideH(slideH);
    setPb(targetPb);
    setCoverFit(true); // always cover — full bleed, no letterboxing
  }, []);

  /* Initial measurement fires synchronously before first browser paint */
  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure]);

  /* ResizeObserver: attached once the carousel container is in the DOM */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [slideW, measure]);

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
        ease: 'expo.out',
        overwrite: 'auto',
      });

      // Animate slide card scales and opacities concurrently
      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;
        const isActive = idx === vi;
        gsap.to(slide, {
          scale:   isActive ? 1.0 : 0.96,
          opacity: isActive ? 1.0 : 0.68,
          duration: SLIDE_MS / 1000,
          ease: 'expo.out',
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
          scale:   isActive ? 1.0 : 0.96,
          opacity: isActive ? 1.0 : 0.68,
        });
      });
    }
  }, []);

  /* On resize: instant snap to current visual position — runs before paint */
  useIsomorphicLayoutEffect(() => {
    if (slideW > 0) setTrack(vIdxRef.current, false);
  }, [slideW, setTrack]);


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
          ease: 'expo.out',
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
            scale:   isActive ? 1.0 : 0.96,
            opacity: isActive ? 1.0 : 0.68,
            duration: SLIDE_MS / 1000,
            ease: 'expo.out',
            overwrite: 'auto',
            onComplete: () => {
              const isFirst = idx === 1;
              gsap.set(slide, {
                scale:   isFirst ? 1.0 : 0.96,
                opacity: isFirst ? 1.0 : 0.68,
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
          ease: 'expo.out',
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
            scale:   isActive ? 1.0 : 0.96,
            opacity: isActive ? 1.0 : 0.68,
            duration: SLIDE_MS / 1000,
            ease: 'expo.out',
            overwrite: 'auto',
            onComplete: () => {
              const isLast = idx === N;
              gsap.set(slide, {
                scale:   isLast ? 1.0 : 0.96,
                opacity: isLast ? 1.0 : 0.68,
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
    else if (Math.abs(delta) < 8)       advance(1); // click = next slide
    else goTo(idxRef.current);
  }, [advance, goTo]);

  return (
    <>
      {/* ── Mobile hero (full-bleed portrait + overlay copy) ── */}
      <MobileHero />

      {/* ── Desktop hero (landscape carousel — hidden on mobile, unchanged) ── */}
      <section ref={sectionRef} className="w-full hidden md:block" style={{ paddingTop: 12, paddingBottom: pb }}>

      {/* ── Static first-frame: server-rendered, visible before JS ── */}
      {slideW === 0 && (
        <div style={{ margin: '0 2vw', position: 'relative', aspectRatio: '2.53', overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'var(--ivory)' }}>
          <Image
            src={SLIDES[0].src}
            alt={SLIDES[0].alt}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 96vw, 90vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* ── Carousel viewport (after JS measurement) ──────── */}
      {slideW > 0 && (
      <div
        ref={containerRef}
        className="overflow-hidden w-full"
        style={{ cursor: 'pointer', userSelect: 'none', touchAction: 'pan-y' }}
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
            opacity:    1,
            transform:  `translateX(${-(vIdxRef.current * (slideWRef.current + GAP))}px)`,
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
                borderRadius: 'var(--radius-lg)',
                lineHeight:   0,
                position:     'relative',
                background:   'var(--ivory)',
                opacity:      vi === vIdx ? 1 : 0.68,
                transform:    vi === vIdx ? 'scale(1)' : 'scale(0.96)',
                boxShadow:    vi === vIdx
                  ? '0 24px 60px -8px rgba(26,20,16,0.18), 0 8px 24px -4px rgba(26,20,16,0.12)'
                  : '0 4px 12px rgba(26,20,16,0.04)',
              }}
            >
              <Image
                ref={(el) => { imageRefs.current[vi] = el; }}
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                sizes="(max-width: 768px) 96vw, 90vw"
                quality={90}
                priority={vi <= 2}  /* vi=1 (Slide 1) and vi=2 (Slide 2) in EXTENDED */
                draggable={false}
                style={{
                  width:           '100%',
                  height:          '100%',
                  display:         'block',
                  objectFit:       coverFit ? 'cover' : 'contain',
                  objectPosition:  'center center',
                  transformOrigin: 'center center',
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
                  borderRadius:  'var(--radius-lg)',
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
      )}

      {/* ── Navigation ────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0 0' }}>

        <h1 className="sr-only">Heirlooms, made by hand. A small family boutique in Swaroop Nagar, Kanpur.</h1>

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

      </div>
      </section>
    </>
  );
}
