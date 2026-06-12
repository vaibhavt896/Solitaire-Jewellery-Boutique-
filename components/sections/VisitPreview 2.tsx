'use client';

/* ──────────────────────────────────────────────────────────
   VisitPreview — Section 10
   "Swaroop Nagar. The one boutique."
   Map left, editorial info right. Paper texture address card.
────────────────────────────────────────────────────────── */

import { motion, useReducedMotion } from 'framer-motion';
import { SITE, whatsappLinkFor } from '@/lib/site';
import { Reveal } from '@/components/Reveal';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function VisitPreview() {
  const reduce = useReducedMotion();

  return (
    <section style={{ background: 'var(--ivory)' }} className="section-pad">
      <div className="container-wide">

        {/* Header */}
        <Reveal className="mb-14">
          <p className="eyebrow mb-4">07 — THE BOUTIQUE</p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.022em',
              fontStyle: 'italic',
            }}
          >
            Swaroop Nagar. The one boutique.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-stretch">

          {/* ── Map placeholder (left) ── */}
          <Reveal>
            <a
              href={SITE.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden"
              style={{
                aspectRatio: '4/3',
                background: 'var(--stone-200)',
                border: '1px solid var(--ivory-smoke)',
              }}
            >
              {/* Illustrated map lines */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 35% 45%, var(--stone-100) 0%, var(--stone-200) 55%, var(--ivory-smoke) 100%)',
                }}
              />
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full opacity-50"
                viewBox="0 0 600 400"
                preserveAspectRatio="none"
              >
                <g stroke="var(--stone-400)" strokeWidth="1" fill="none">
                  <path d="M0 80 Q200 60 400 100 T600 90" />
                  <path d="M0 160 Q150 140 300 180 T600 170" />
                  <path d="M0 240 Q200 220 380 260 T600 250" />
                  <path d="M0 320 Q200 300 400 340 T600 330" />
                  <path d="M120 0 Q140 120 100 240 T80 400" />
                  <path d="M280 0 Q300 120 260 240 T240 400" />
                  <path d="M440 0 Q460 120 420 240 T400 400" />
                </g>
              </svg>

              {/* Pin */}
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div
                  className="rounded-full p-3 shadow-lg transition-transform duration-700 group-hover:scale-110"
                  style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span
                  className="mt-2 px-3 py-1 text-micro uppercase tracking-eyebrow"
                  style={{
                    background: 'var(--ivory)',
                    border: '1px solid var(--ivory-smoke)',
                    color: 'var(--obsidian)',
                    fontSize: 8.5,
                    letterSpacing: '0.14em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Solitaire · Swaroop Nagar
                </span>
              </div>

              {/* Hover CTA */}
              <span
                className="absolute bottom-4 right-4 transition-colors duration-500 group-hover:text-aged-gold"
                style={{
                  background: 'var(--ivory)',
                  border: '1px solid var(--ivory-smoke)',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 9.5,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--obsidian)',
                }}
              >
                Open in Maps →
              </span>
            </a>
          </Reveal>

          {/* ── Address + info (right) ── */}
          <Reveal delay={0.1}>
            <div
              style={{
                background: 'var(--stone-100)',
                border: '1px solid var(--ivory-smoke)',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                height: '100%',
              }}
            >
              {/* Boutique name */}
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.5rem',
                }}
              >
                Solitaire Jewellery Boutique
              </p>

              {/* Address in monospace */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  lineHeight: 1.9,
                  color: 'var(--ink-soft)',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid var(--ivory-smoke)',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ opacity: 0.5, letterSpacing: '0.14em', fontSize: 9, textTransform: 'uppercase', marginBottom: 6 }}>ADDRESS</p>
                <p>{SITE.address.full}</p>
                <br />
                <p style={{ opacity: 0.5, letterSpacing: '0.14em', fontSize: 9, textTransform: 'uppercase', marginBottom: 6 }}>HOURS</p>
                <p>{SITE.hours.weekdays}</p>
                <p>{SITE.hours.sunday}</p>
                <br />
                <p style={{ opacity: 0.5, letterSpacing: '0.14em', fontSize: 9, textTransform: 'uppercase', marginBottom: 6 }}>CONTACT</p>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="block transition-colors duration-400 hover:text-aged-gold"
                >
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-400 hover:text-aged-gold"
                >
                  WhatsApp →
                </a>
              </div>

              {/* We don't have a second location — the honest note */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9375rem',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: 'var(--ink-muted)',
                  marginBottom: '1.75rem',
                }}
              >
                We don&rsquo;t have a second location. We don&rsquo;t have an outlet.
                The boutique is on Swaroop Nagar, and it&rsquo;s the only one.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 10, letterSpacing: '0.14em' }}
                >
                  Get directions →
                </a>
                <a
                  href="/visit"
                  className="btn-secondary"
                  style={{ fontSize: 10, letterSpacing: '0.14em' }}
                >
                  Plan your visit →
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
