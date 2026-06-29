/* ──────────────────────────────────────────────────────────
   TrustBadges — four-up assurance row inside a single soft card.
   Two presets:
     · "promise" — the boutique's standing (homepage)
     · "service" — practical promises (kept for other layouts)
   Gold line-icon, bold uppercase title, muted sub. 2×2 on mobile.
────────────────────────────────────────────────────────── */

import { Reveal } from '@/components/Reveal';

type Badge = { icon: React.ReactNode; title: string; sub: string };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ── Line icons, drawn to sit on the gold accent ── */
const IBespoke = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M6 3h12l3 5-9 13L3 8z" />
    <path d="M3 8h18M9 3 7.5 8 12 21 16.5 8 15 3M7.5 8 12 13l4.5-5" />
  </svg>
);
const IMedal = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M9 3 7 9M15 3l2 6M8.5 2.5h7" />
    <circle cx="12" cy="15" r="6" />
    <path d="m9.6 15 1.6 1.6L15 13" />
  </svg>
);
const IShield = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M12 2.5 4.5 5.5V11c0 5 3.4 8.4 7.5 10.5C16.1 19.4 19.5 16 19.5 11V5.5z" />
    <path d="m9 11.5 2 2 4-4.5" />
  </svg>
);
const ICalendar = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <rect x="3" y="4.5" width="18" height="17" rx="2" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4M8.5 15l2.2 2.2L15.5 13" />
  </svg>
);
const IDelivery = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" />
    <circle cx="6" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" />
  </svg>
);
const IReturns = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M3 8a9 9 0 0 1 16-3M21 16a9 9 0 0 1-16 3" />
    <path d="M3 4v4h4M21 20v-4h-4" />
  </svg>
);
const IAssist = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} aria-hidden>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.4" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.4" />
    <path d="M20 19a4 4 0 0 1-4 3.2h-2" />
  </svg>
);

const SETS: Record<'promise' | 'service', Badge[]> = {
  promise: [
    { icon: IBespoke,  title: 'Bespoke Designs',   sub: 'Crafted Uniquely for You' },
    { icon: IMedal,    title: 'Certified Diamonds', sub: 'Authenticity You Can Trust' },
    { icon: IShield,   title: 'Heritage of Trust',  sub: 'Years of Timeless Legacy' },
    { icon: ICalendar, title: 'Private Viewings',   sub: 'By Appointment Only' },
  ],
  service: [
    { icon: IDelivery, title: 'Secure & Insured Delivery', sub: 'Across India' },
    { icon: IReturns,  title: 'Easy Returns',              sub: '14 Day Return Policy' },
    { icon: IMedal,    title: 'Certified Jewellery',       sub: '100% Hallmarked' },
    { icon: IAssist,   title: 'Personal Assistance',       sub: "We're Here to Help" },
  ],
};

function Cell({ b, i, divider }: { b: Badge; i: number; divider: string }) {
  return (
    <div
      className={`flex items-center gap-4 justify-center lg:justify-start px-4 lg:px-7 ${i > 0 ? 'lg:border-l' : ''}`}
      style={{ borderColor: divider }}
    >
      <span style={{ color: 'var(--aged-gold)', flexShrink: 0 }}>{b.icon}</span>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--obsidian)',
            lineHeight: 1.3,
          }}
        >
          {b.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'var(--ink-muted)',
            marginTop: 3,
            lineHeight: 1.4,
          }}
        >
          {b.sub}
        </p>
      </div>
    </div>
  );
}

export function TrustBadges({ variant = 'promise' }: { variant?: 'promise' | 'service' }) {
  const items = SETS[variant];

  /* "promise" → warm contained card. "service" → full-width band. */
  if (variant === 'promise') {
    return (
      <section style={{ background: 'var(--ivory)', padding: 'clamp(1.5rem,4vh,2.75rem) 0' }}>
        <Reveal className="container-wide">
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{
              background: '#F3EADC',
              border: '1px solid rgba(184,146,58,0.14)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 18px 48px -22px rgba(26,20,16,0.14), 0 2px 8px rgba(26,20,16,0.04)',
              padding: 'clamp(1.3rem,2.6vw,2rem) clamp(0.5rem,2vw,1rem)',
              rowGap: '1.5rem',
            }}
          >
            {items.map((b, i) => (
              <Cell key={b.title} b={b} i={i} divider="rgba(184,146,58,0.22)" />
            ))}
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section style={{ background: 'var(--ivory)' }}>
      <div style={{ borderTop: '1px solid var(--ivory-smoke)', borderBottom: '1px solid var(--ivory-smoke)' }}>
        <Reveal className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ padding: 'clamp(1.6rem,3vh,2.2rem) 0', rowGap: '1.5rem' }}>
            {items.map((b, i) => (
              <Cell key={b.title} b={b} i={i} divider="var(--ivory-smoke)" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
