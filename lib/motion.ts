/* ──────────────────────────────────────────────────────────
   Shared motion vocabulary — one voice for the whole site.
   Only transform/opacity should ever be animated on scroll.
────────────────────────────────────────────────────────── */

/* The house ease — slow settle, no bounce (expo-style out) */
export const EASE_LUXE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_LUXE_FM = [0.16, 1, 0.3, 1] as const; // framer-motion form
export const EASE_LUXE_GSAP = 'expo.out';                // closest gsap form

export const DUR = {
  micro: 0.3,   // hovers, taps
  short: 0.65,  // small reveals
  base:  1.0,   // standard reveal
  long:  1.4,   // hero / headline moments
} as const;

export const STAGGER = {
  lines: 0.09,
  items: 0.08,
  words: 0.014,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
