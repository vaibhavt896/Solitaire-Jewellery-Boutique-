'use client';

/* ──────────────────────────────────────────────────────────
   TextReveal — headline lines rise out of a mask on scroll.
   Splits after fonts load (no mis-measured lines), animates
   transform/opacity only, runs once, cleans up fully.
────────────────────────────────────────────────────────── */

import { useRef, type CSSProperties, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, STAGGER } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

export function TextReveal({ children, as = 'h2', className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;

    document.fonts.ready.then(() => {
      if (!ref.current) return;

      split = new SplitText(el, {
        type: 'lines',
        linesClass: 'tr-line',
        mask: 'lines',
      });

      gsap.fromTo(
        split.lines,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: 'expo.out',
          stagger: STAGGER.lines,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
          onComplete: () => split?.revert(), // restore clean DOM after play
        }
      );
    });

    return () => split?.revert();
  }, { scope: ref });

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
