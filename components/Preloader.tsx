'use client';

/* ──────────────────────────────────────────────────────────
   Preloader — ivory curtain with the wordmark and a gold
   hairline; lifts once fonts are ready (≤ 1.1s hard cap).
   Shows once per session: an inline <head> script sets
   html[data-visited] before paint, and CSS hides this
   entirely for return visits — zero flash, zero CLS.
────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    try { sessionStorage.setItem('sjb-visited', '1'); } catch { /* private mode */ }

    if (prefersReducedMotion()) { setDone(true); return; }

    let lifted = false;
    const lift = () => {
      if (lifted || !ref.current) return;
      lifted = true;
      gsap.timeline({ onComplete: () => setDone(true) })
        .to('.pre-mark', { opacity: 0, y: -14, duration: 0.4, ease: 'power2.in' })
        .to(el, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.1');
    };

    gsap.fromTo('.pre-mark', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' });
    gsap.fromTo('.pre-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'expo.inOut', delay: 0.15 });

    document.fonts.ready.then(() => setTimeout(lift, 350));
    const cap = setTimeout(lift, 1100); // never hold the page hostage
    return () => clearTimeout(cap);
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="preloader fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: 'var(--ivory)' }}
      aria-hidden
    >
      <div className="pre-mark flex flex-col items-center gap-4" style={{ opacity: 0 }}>
        <span
          className="font-display"
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            color: 'var(--obsidian)',
          }}
        >
          The Solitaire Jewellery Boutique
        </span>
        <span
          className="pre-line block"
          style={{
            width: 120,
            height: 1,
            background: 'var(--gold-metallic)',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
}
