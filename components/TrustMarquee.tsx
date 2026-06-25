'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

gsap.config({ force3D: true });

/* ─── Data ───────────────────────────────────────────────── */
const ITEMS_A = [
  { text: 'GIA Certified',               serif: true  },
  { text: 'Polki',                        serif: false },
  { text: 'IGI Certified',               serif: true  },
  { text: 'Solitaires',                  serif: false },
  { text: 'BIS 916 Hallmarked',          serif: true  },
  { text: 'Antique Gold',                serif: false },
  { text: 'The Certificate Goes Home With You', serif: true  },
  { text: 'Temple Jewellery',            serif: false },
  { text: 'Trusted by Kanpur Families',  serif: true  },
  { text: 'Bridal',                      serif: false },
  { text: 'Curated by Hand',             serif: true  },
  { text: 'Diamond',                     serif: false },
];

const ITEMS_B = [
  { text: 'Est. Kanpur',                                 serif: true  },
  { text: 'Kundan',                                      serif: false },
  { text: 'Since the Boutique Opened',                   serif: true  },
  { text: 'Jadau',                                       serif: false },
  { text: 'A Small Family Boutique',                     serif: true  },
  { text: 'By Appointment',                              serif: false },
  { text: 'No Pressure to Buy',                          serif: true  },
  { text: 'Handcrafted Pieces',                          serif: false },
  { text: 'Swaroop Nagar · Kanpur',                      serif: true  },
];

/* ─── Diamond separator ─────────────────────────────────── */
function Diamond() {
  return (
    <span
      aria-hidden
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          40,
        flexShrink:     0,
      }}
    >
      <svg width="5" height="5" viewBox="0 0 6 6" style={{ display: 'block' }}>
        <rect
          x="1" y="1" width="4" height="4"
          transform="rotate(45 3 3)"
          fill="none"
          stroke="rgba(184,146,58,0.42)"
          strokeWidth="0.9"
        />
      </svg>
    </span>
  );
}

/* ─── MarqueeRow ─────────────────────────────────────────── */
function MarqueeRow({
  items,
  reverse = false,
  speed,
  wrapRef,
}: {
  items: typeof ITEMS_A;
  reverse?: boolean;
  speed: number;
  wrapRef: React.RefObject<HTMLDivElement>;
}) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const hoveredRef = useRef(false);
  const loop       = [...items, ...items, ...items];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return; // component unmounted before fonts loaded
      const track = trackRef.current;
      if (!track) return;
      const singleW = track.scrollWidth / 3;
      const tween = gsap.fromTo(
        track,
        { x: reverse ? -singleW : 0 },
        { x: reverse ? 0 : -singleW, duration: speed, ease: 'none', repeat: -1 }
      );
      tweenRef.current = tween;
    });

    return () => {
      cancelled = true;
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Hover: smoothly breathe speed down / back up */
  const slowDown = () => {
    const tw = tweenRef.current;
    if (!tw) return;
    hoveredRef.current = true;
    gsap.to(tw, { timeScale: 0.22, duration: 0.75, ease: 'power2.out', overwrite: 'auto' });
  };

  const speedUp = () => {
    const tw = tweenRef.current;
    if (!tw) return;
    hoveredRef.current = false;
    gsap.to(tw, { timeScale: 1, duration: 1.1, ease: 'power2.inOut', overwrite: 'auto' });
  };

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden"
      onMouseEnter={slowDown}
      onMouseLeave={speedUp}
    >
      <div
        ref={trackRef}
        style={{
          display:    'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
          >
            {item.serif ? (
              <span
                style={{
                  display:       'inline-block',
                  fontFamily:    'var(--font-display)',
                  fontSize:      '1.0625rem',
                  fontStyle:     'italic',
                  fontWeight:    400,
                  color:         'rgba(244,239,227,0.80)',
                  letterSpacing: '0.01em',
                  cursor:        'default',
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    color:      'rgba(184,146,58,0.96)',
                    y:          -2.5,
                    textShadow: '0 0 20px rgba(184,146,58,0.24)',
                    duration:   0.28,
                    ease:       'power2.out',
                    overwrite:  'auto',
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    color:      'rgba(244,239,227,0.80)',
                    y:          0,
                    textShadow: '0 0 0px rgba(184,146,58,0)',
                    duration:   0.55,
                    ease:       'power2.inOut',
                    overwrite:  'auto',
                  })
                }
              >
                {item.text}
              </span>
            ) : (
              <span
                style={{
                  display:       'inline-block',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.66rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  fontWeight:    600,
                  color:         'rgba(244,239,227,0.34)',
                  cursor:        'default',
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    color:    'rgba(184,146,58,0.72)',
                    y:        -2,
                    duration: 0.28,
                    ease:     'power2.out',
                    overwrite: 'auto',
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    color:    'rgba(244,239,227,0.30)',
                    y:        0,
                    duration: 0.55,
                    ease:     'power2.inOut',
                    overwrite: 'auto',
                  })
                }
              >
                {item.text}
              </span>
            )}
            <Diamond />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── TrustMarquee ─────────────────────────────────────────── */
export function TrustMarquee() {
  const shimmerRef = useRef<HTMLDivElement>(null);
  const rowARef    = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const rowBRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* Ambient gold light sweeping across the section */
    if (shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { x: '-100%' },
        {
          x:           '700%',
          duration:    3.8,
          ease:        'power1.inOut',
          repeat:      -1,
          repeatDelay: 3.6,
        }
      );
    }

    /* Entrance: rows stagger up */
    gsap.from(
      [rowARef.current, dividerRef.current, rowBRef.current].filter(Boolean),
      {
        opacity:     0,
        y:           14,
        duration:    0.9,
        stagger:     0.1,
        delay:       0.4,
        ease:        'power3.out',
        clearProps:  'opacity,y',
      }
    );

    return () => {
      gsap.killTweensOf(shimmerRef.current);
      gsap.killTweensOf([rowARef.current, dividerRef.current, rowBRef.current]);
    };
  }, []);

  return (
    <div
      style={{
        position:     'relative',
        background:   'var(--mahogany)',
        borderTop:    '1px solid rgba(184,146,58,0.12)',
        borderBottom: '1px solid rgba(184,146,58,0.12)',
        overflow:     'hidden',
      }}
    >
      {/* Ambient gold shimmer that sweeps across */}
      <div
        ref={shimmerRef}
        aria-hidden
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '18%',
          height:        '100%',
          background:    'linear-gradient(to right, transparent 0%, rgba(184,146,58,0.05) 38%, rgba(184,146,58,0.09) 50%, rgba(184,146,58,0.05) 62%, transparent 100%)',
          pointerEvents: 'none',
          zIndex:        1,
        }}
      />

      {/* Edge-fade mask + content */}
      <div
        style={{
          padding:         '22px 0',
          display:         'flex',
          flexDirection:   'column',
          gap:             0,
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage:       'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          position:        'relative',
          zIndex:          2,
        }}
      >
        <MarqueeRow items={ITEMS_A} speed={55} wrapRef={rowARef as React.RefObject<HTMLDivElement>} />

        {/* Gold hairline between rows */}
        <div
          ref={dividerRef}
          style={{
            height:     1,
            margin:     '13px 0',
            background: 'linear-gradient(to right, transparent 0%, rgba(184,146,58,0.22) 20%, rgba(184,146,58,0.28) 50%, rgba(184,146,58,0.22) 80%, transparent 100%)',
          }}
        />

        <MarqueeRow items={ITEMS_B} reverse speed={70} wrapRef={rowBRef as React.RefObject<HTMLDivElement>} />
      </div>
    </div>
  );
}
