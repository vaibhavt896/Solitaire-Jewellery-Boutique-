'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SITE } from '@/lib/site';

const WA_HREF = `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(
  'Hello Solitaire Jewellery Boutique! I came across your boutique and would love to explore your jewellery collection. Could you please assist me?'
)}`;

const GREEN      = '#25D366';
const GREEN_DARK = '#0d4a38';

/* Official WhatsApp path */
function IconWA({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [mounted,  setMounted]  = useState(false);
  const [btnIn,    setBtnIn]    = useState(false);
  const [open,     setOpen]     = useState(false);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const autoOpened  = useRef(false);
  const userEngaged = useRef(false);
  const autoClose   = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Avoid SSR hydration mismatch */
  useEffect(() => { setMounted(true); }, []);

  /* Staggered entrance → button first, popup peeks open once, then
     gracefully retracts after a few seconds so it never blocks the
     hero slider. Any hover/click cancels the retract and keeps it. */
  useEffect(() => {
    if (!mounted) return;
    const t1 = setTimeout(() => setBtnIn(true), 1400);
    const t2 = setTimeout(() => {
      if (autoOpened.current || userEngaged.current) return;
      setOpen(true);
      autoOpened.current = true;
      autoClose.current = setTimeout(() => {
        if (!userEngaged.current) setOpen(false);
      }, 3500);
    }, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(autoClose.current); };
  }, [mounted]);

  /* The visitor took control — stop any pending auto-close. */
  const engage = () => { userEngaged.current = true; clearTimeout(autoClose.current); };

  /* Dismiss on outside click */
  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);

  /* Dismiss on Escape */
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Animation tokens ── */}
      <style>{`
        /* Pulse rings that radiate from the FAB */
        @keyframes wa-ring {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(2.3); opacity: 0;  }
        }

        /* FAB micro-interactions — spring easing gives it life */
        .wa-fab {
          transition:
            transform  0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.22s ease !important;
        }
        .wa-fab:hover  { transform: scale(1.11) !important; box-shadow: 0 14px 36px rgba(37,211,102,.52), 0 4px 12px rgba(0,0,0,.16) !important; }
        .wa-fab:active { transform: scale(0.93) !important; }

        /* CTA row inside popup */
        .wa-cta {
          transition:
            background  0.14s ease,
            transform   0.14s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .wa-cta:hover  { background: #1ebe5d !important; transform: translateY(-1px) !important; }
        .wa-cta:active { transform: translateY(0)        !important; }

        /* Close button in the header */
        .wa-close {
          transition: background 0.14s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .wa-close:hover  { background: rgba(255,255,255,.28) !important; transform: scale(1.12) !important; }
        .wa-close:active { transform: scale(0.9) !important; }
      `}</style>

      {/* ── Root wrapper ── */}
      <div
        ref={wrapRef}
        onMouseEnter={engage}
        onTouchStart={engage}
        className="wa-widget fixed z-[9998] flex flex-col items-end gap-3"
        style={{ bottom: 'calc(env(safe-area-inset-bottom,0px) + 72px)', right: 16 }}
      >

        {/* ═══════════════════════ POPUP CARD ═══════════════════════ */}
        <div
          role="dialog"
          aria-label="Chat with Solitaire Jewellery Boutique on WhatsApp"
          aria-hidden={!open}
          style={{
            width: 'min(320px, calc(100vw - 32px))',
            borderRadius: 18,
            overflow: 'hidden',
            /* Box shadow animates with open state */
            boxShadow: open
              ? '0 28px 72px -8px rgba(0,0,0,.30), 0 8px 22px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06)'
              : '0 8px 24px rgba(0,0,0,.08)',
            /* GPU-composited — no layout thrash */
            willChange: 'transform, opacity',
            transformOrigin: 'bottom right',
            transition: [
              'opacity  0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              'box-shadow 0.22s ease',
            ].join(', '),
            opacity:   open ? 1 : 0,
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(18px)',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              background: `linear-gradient(160deg, ${GREEN_DARK} 0%, #128C7E 100%)`,
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              position: 'relative',
            }}
          >
            {/* Actual logo in a pill-shaped white badge */}
            <div
              style={{
                width: 56, height: 44,
                borderRadius: 9,
                background: 'white',
                display: 'grid',
                placeItems: 'center',
                padding: '4px 6px',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,.22), 0 0 0 1px rgba(255,255,255,.12)',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/solitaire-logo-trimmed.webp"
                alt="Solitaire Jewellery Boutique"
                width={46}
                height={34}
                priority
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>

            {/* Name + online status */}
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14, fontWeight: 600,
                  color: 'white', lineHeight: 1.2,
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                Solitaire Jewellery
              </p>
              <p
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-body)',
                  fontSize: 11, color: 'rgba(255,255,255,.72)',
                  letterSpacing: '0.01em',
                }}
              >
                {/* Live green dot */}
                <span
                  style={{
                    display: 'inline-block',
                    width: 7, height: 7, borderRadius: '50%',
                    background: GREEN,
                    boxShadow: `0 0 0 2.5px rgba(37,211,102,.25)`,
                    flexShrink: 0,
                  }}
                />
                Typically replies within minutes
              </p>
            </div>

            {/* Close × */}
            <button
              className="wa-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 11, right: 12,
                width: 27, height: 27, borderRadius: '50%',
                background: 'rgba(255,255,255,.14)',
                border: 'none', cursor: 'pointer',
                display: 'grid', placeItems: 'center',
                color: 'rgba(255,255,255,.9)',
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
                <path d="M1 1l8 8M9 1L1 9" />
              </svg>
            </button>
          </div>

          {/* ── WhatsApp chat body ── */}
          <div
            style={{
              background: '#E5DDD5',
              padding: '18px 14px 22px',
            }}
          >
            {/* Chat bubble (left / agent side) */}
            <div style={{ position: 'relative', maxWidth: '90%' }}>
              {/* Bubble tail */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: 0, left: -8,
                  width: 0, height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 9px 12px 0',
                  borderColor: 'transparent white transparent transparent',
                  filter: 'drop-shadow(-1px 1px 1px rgba(0,0,0,.06))',
                }}
              />
              {/* Bubble */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '0 13px 13px 13px',
                  padding: '11px 14px 30px',
                  boxShadow: '0 1px 2px rgba(0,0,0,.10)',
                  position: 'relative',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13.5, lineHeight: 1.58,
                    color: '#111',
                  }}
                >
                  👋 Hello! Welcome to{' '}
                  <strong style={{ fontWeight: 600 }}>Solitaire Jewellery Boutique</strong>.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13.5, lineHeight: 1.58,
                    color: '#111', marginTop: 5,
                  }}
                >
                  How can we help you find your perfect piece today?
                </p>

                {/* Timestamp + blue double-tick */}
                <div
                  style={{
                    position: 'absolute', bottom: 7, right: 11,
                    display: 'flex', alignItems: 'center', gap: 3,
                    fontFamily: 'var(--font-body)',
                    fontSize: 10.5, color: '#8696A0',
                  }}
                >
                  <span>Just now</span>
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
                    <path d="M1 5.5l3.5 3.5 5.5-8" stroke="#53BDEB" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 5.5l3.5 3.5 5.5-8" stroke="#53BDEB" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Start chat CTA ── */}
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-cta"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              background: GREEN, color: 'white',
              padding: '14px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: 13.5, fontWeight: 600, letterSpacing: '0.02em',
              textDecoration: 'none',
            }}
          >
            <IconWA size={18} />
            Start Chat on WhatsApp
          </a>
        </div>

        {/* ═══════════════════════ FLOATING BUTTON ═══════════════════════ */}
        <button
          className="wa-fab"
          onClick={() => { engage(); setOpen(v => !v); }}
          aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
          aria-expanded={open}
          style={{
            position: 'relative',
            width: 58, height: 58, borderRadius: '50%',
            background: `linear-gradient(145deg, #2fce6a 0%, ${GREEN} 55%, #1aad57 100%)`,
            border: 'none', cursor: 'pointer',
            display: 'grid', placeItems: 'center',
            color: 'white',
            boxShadow: '0 8px 28px rgba(37,211,102,.42), 0 3px 10px rgba(0,0,0,.14)',
            /* Spring entrance on mount */
            transform: btnIn ? 'scale(1)' : 'scale(0)',
            transition: btnIn
              ? 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease'
              : 'transform 0.58s cubic-bezier(0.34,1.56,0.64,1)',
            flexShrink: 0,
            willChange: 'transform',
          }}
        >
          {/* Radiating pulse rings — hidden when popup is open */}
          {!open && (
            <>
              <span
                aria-hidden
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: `2px solid ${GREEN}`,
                  animation: 'wa-ring 2.8s ease-out infinite',
                }}
              />
              <span
                aria-hidden
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: `2px solid ${GREEN}`,
                  animation: 'wa-ring 2.8s ease-out infinite .85s',
                }}
              />
            </>
          )}

          {/* Icon: WA logo ↔ × with spring rotation */}
          <span
            style={{
              display: 'grid', placeItems: 'center',
              transition: 'transform 0.26s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease',
              transform: open ? 'rotate(90deg) scale(0.82)' : 'rotate(0deg) scale(1)',
            }}
          >
            {open ? (
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" aria-hidden>
                <path d="M3 3l15 15M18 3L3 18" />
              </svg>
            ) : (
              <IconWA size={28} />
            )}
          </span>
        </button>

      </div>
    </>
  );
}
