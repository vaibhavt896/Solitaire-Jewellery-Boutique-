'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Which edge the curtain wipes from */
  from?: 'bottom' | 'left' | 'right';
  delay?: number;
};

const CLIP: Record<NonNullable<Props['from']>, [string, string]> = {
  bottom: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
  left:   ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  right:  ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
};

export function ImageReveal({ children, className, from = 'bottom', delay = 0 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const [initial, animate] = CLIP[from];

  return (
    <motion.div
      className={className}
      initial={{ clipPath: initial }}
      whileInView={{ clipPath: animate }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
