'use client';

/* Route transition — each navigation settles in with a soft
   rise. Entry-only (no exit phase) keeps navigation instant. */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', clearProps: 'opacity,transform' }
    );
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
