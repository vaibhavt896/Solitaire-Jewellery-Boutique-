'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'piece' | 'whatsapp' | 'cta';

const SPRING = { stiffness: 260, damping: 28, mass: 0.5 };

export function CustomCursor() {
  const [state, setState]       = useState<CursorState>('default');
  const [label, setLabel]       = useState('');
  const [visible, setVisible]   = useState(false);
  const [isTouch, setIsTouch]   = useState(true);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [rawX, rawY, visible]);

  const onLeave  = useCallback(() => setVisible(false), []);
  const onEnter  = useCallback(() => setVisible(true),  []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsTouch(false);

    window.addEventListener('mousemove',   onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el     = target.closest('[data-cursor]') as HTMLElement | null;
      if (!el) return;
      const kind = el.dataset.cursor as CursorState;
      setState(kind);
      setLabel(el.dataset.cursorLabel ?? '');
    };
    const handleLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-cursor]')) return;
      setState('default');
      setLabel('');
    };

    document.addEventListener('mouseover',  handleEnter);
    document.addEventListener('mouseout',   handleLeave);

    return () => {
      window.removeEventListener('mousemove',   onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover',  handleEnter);
      document.removeEventListener('mouseout',   handleLeave);
    };
  }, [onMove, onLeave, onEnter]);

  if (isTouch) return null;

  const sizeMap: Record<CursorState, number> = {
    default:  12,
    piece:    64,
    whatsapp: 64,
    cta:      48,
  };
  const colorMap: Record<CursorState, string> = {
    default:  '#B8923A',
    piece:    '#1A1410',
    whatsapp: '#25D366',
    cta:      '#B8923A',
  };

  const size  = sizeMap[state];
  const color = colorMap[state];
  const showLabel = state !== 'default' && label;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '50%',
        mixBlendMode: state === 'default' ? 'multiply' : 'normal',
      }}
      animate={{
        width:  size,
        height: size,
        background: color,
        opacity: visible ? (state === 'default' ? 0.7 : 0.88) : 0,
      }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-hidden
    >
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F4EFE3',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            padding: '0 6px',
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
