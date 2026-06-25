'use client';

/* ──────────────────────────────────────────────────────────
   BridalBanner, Section 06
   "Bring your mother. We'll bring the pieces."
   Two-column: image left (60%), text right (40%).
   Rich editorial copy, consultation details, no urgency.
   GSAP animations for image with sharper edges.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';
import { TextReveal } from '@/components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

export function BridalBanner() {
  const reduce = useReducedMotion();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageZoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !imageContainerRef.current || !imageZoomRef.current) return;

    const ctx = gsap.context(() => {
      // Container entrance with sharper left-to-right translate
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Ken Burns zoom with sharp deceleration
      gsap.fromTo(
        imageZoomRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.9,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      style={{ background: 'var(--ivory)' }}
      className="section-pad"
    >
      <div className="container-wide grid md:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* ── Image column (left, 7/12) ── */}
        <div
          ref={imageContainerRef}
          className="md:col-span-7 relative overflow-hidden group cursor-none"
          style={{
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 28px 70px -6px rgba(26,20,16,0.14), 0 8px 24px rgba(26,20,16,0.07)',
            aspectRatio: '4/3',
            width: '100%',
          }}
        >
          <div
            ref={imageZoomRef}
            className="absolute inset-0"
          >
            <Image
              src="/bridal-consultation-boutique.webp"
              alt="A bridal consultation at Solitaire, pieces laid out on the boutique table"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              priority
            />
          </div>

          {/* Warm vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,20,16,0.22) 100%)',
              zIndex: 2,
            }}
          />

          {/* Inset gold frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(184,146,58,0.20)',
              borderRadius: 'var(--radius-lg)',
              zIndex: 2,
            }}
          />

          {/* Eyebrow overlay on image */}
          <div className="absolute top-6 left-6 z-10">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,227,0.85)',
                border: '1px solid rgba(244,239,227,0.25)',
                padding: '5px 12px',
                background: 'rgba(26,20,16,0.5)',
                backdropFilter: 'blur(6px)',
                borderRadius: '4px',
              }}
            >
              Planning a wedding?
            </span>
          </div>
        </div>

        {/* ── Text column (right, 5/12) ── */}
        <div className="md:col-span-5 flex flex-col justify-center py-6 md:py-0">
          <p className="eyebrow mb-4">07 — For the Bride</p>
          <TextReveal
            as="h2"
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            Bring your mother.<br />We&rsquo;ll bring the pieces.
          </TextReveal>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--ink-soft)',
              marginBottom: '2rem',
            }}
          >
            A private sitting is 45 minutes, free, and completely unhurried. We
            listen first, your outfit, your day, your budget, and then we show
            you only what truly fits. Bring your mother, your sister, whoever you
            trust most.
          </p>

          {/* What to expect list */}
          <ul className="space-y-3 mb-10">
            {[
              'We listen first, your outfit, your ceremonies, your budget',
              'We bring out six to ten pieces, chosen for you, not the whole shop',
              'We size, set, or make each piece to suit you',
              'And we care for it for life, long after the day',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
              >
                <span
                  aria-hidden
                  style={{
                    display: 'block',
                    width: 16,
                    height: 1,
                    background: 'var(--aged-gold)',
                    flexShrink: 0,
                    marginTop: '0.7em',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full max-w-[420px]">
            <Link href="/bridal/book" className="btn-primary w-full text-center justify-center">
              <span>Book a Private Sitting →</span>
            </Link>
            <a
              href={whatsappLinkFor(WHATSAPP_MESSAGES.bridal)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center justify-center"
            >
              <span>Message Us on WhatsApp</span>
            </a>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.875rem',
              fontStyle: 'italic',
              color: 'var(--ink-muted)',
              marginTop: '1.25rem',
            }}
          >
            A private sitting is free. Sundays by request.
          </p>
        </div>

      </div>
    </section>
  );
}
