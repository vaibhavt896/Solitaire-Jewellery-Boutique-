'use client';

/* ──────────────────────────────────────────────────────────
   Magnetic — the element leans toward the cursor and springs
   back on leave. gsap.quickTo = zero re-renders, one tween
   reused per axis. Desktop pointers only.
────────────────────────────────────────────────────────── */

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';

type Props = {
  children: ReactNode;
  /** Pull strength, 0–1 of cursor offset. */
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.22, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex' }}>
      {children}
    </div>
  );
}
