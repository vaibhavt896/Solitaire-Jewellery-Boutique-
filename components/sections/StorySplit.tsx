'use client';

/* ──────────────────────────────────────────────────────────
   StorySplit — a soft, warm-cream rounded panel: copy on one
   side, a full-bleed image on the other. Reused for "Our Story"
   and "Craftsmanship". `flip` mirrors the layout; `ctaVariant`
   switches between an outlined and a filled gold button.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

export const PANEL_BG = '#F3EADC';

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; alt: string };
  flip?: boolean;
  ctaVariant?: 'outline' | 'fill';
  icon?: React.ReactNode;
};

export function StorySplit({
  eyebrow, title, body, ctaLabel, ctaHref, image,
  flip = false, ctaVariant = 'outline', icon,
}: Props) {
  return (
    <section style={{ background: 'var(--ivory)', padding: 'clamp(0.6rem,1.6vh,1.2rem) 0' }}>
      <Reveal className="container-wide">
        <div
          className="grid md:grid-cols-2 items-stretch overflow-hidden"
          style={{
            background: PANEL_BG,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(184,146,58,0.12)',
            boxShadow: '0 18px 50px -22px rgba(26,20,16,0.18)',
          }}
        >
          {/* Copy */}
          <div
            className={`flex flex-col justify-center ${flip ? 'md:order-2' : 'md:order-1'}`}
            style={{ padding: 'clamp(2rem,4vw,3.6rem)' }}
          >
            {icon && <div style={{ color: 'var(--aged-gold)', marginBottom: '1rem' }}>{icon}</div>}

            <div className="flex items-center gap-3" style={{ marginBottom: '1.1rem' }}>
              <span className="eyebrow">{eyebrow}</span>
              <span aria-hidden style={{ width: 28, height: 1, background: 'var(--aged-gold)', opacity: 0.5 }} />
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.022em',
                color: 'var(--obsidian)',
                marginBottom: '1.3rem',
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                lineHeight: 1.85,
                color: 'var(--ink-soft)',
                marginBottom: '2rem',
                maxWidth: 440,
              }}
            >
              {body}
            </p>

            {ctaVariant === 'fill' ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center self-start"
                style={{
                  background: 'var(--aged-gold)', color: '#FFFFFF',
                  padding: '14px 30px', borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.18em',
                  textTransform: 'uppercase', fontWeight: 600, transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-deep)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--aged-gold)'; }}
              >
                {ctaLabel}
              </Link>
            ) : (
              <Link
                href={ctaHref}
                className="inline-flex items-center self-start"
                style={{
                  background: 'transparent', color: 'var(--obsidian)',
                  border: '1px solid var(--aged-gold)',
                  padding: '13px 29px', borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.18em',
                  textTransform: 'uppercase', fontWeight: 600,
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--aged-gold)'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--obsidian)'; }}
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          {/* Image (full-bleed within the panel) */}
          <div
            className={`relative min-h-[280px] md:min-h-[440px] ${flip ? 'md:order-1' : 'md:order-2'}`}
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover"
              />
            ) : (
              /* Empty placeholder until the final asset is supplied */
              <div
                aria-hidden
                className="absolute inset-0 grid place-items-center"
                style={{ background: '#E9DEC9' }}
              >
                <div className="flex flex-col items-center gap-3" style={{ color: 'var(--stone-400)' }}>
                  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="8.5" cy="9" r="1.6" />
                    <path d="M21 16l-5-5-6 6-3-3-4 4" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                    Image
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
