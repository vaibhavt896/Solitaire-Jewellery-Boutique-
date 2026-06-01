'use client';

/* ──────────────────────────────────────────────────────────
   TheAtelier, Section 04 (NEW, no competitor has this)
   Black-and-white documentary aesthetic. Full-bleed image,
   sepia-tone filter, named makers, editorial copy.
   GSAP animations for sharper visual impact.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '@/lib/placeholder-media';

gsap.registerPlugin(ScrollTrigger);

/* ⚠️ PLACEHOLDER: swap `src` for a real commissioned behind-the-scenes
   shot from one of our ateliers. Caption kept honest (no invented names)
   until the real image and its real maker are confirmed. */
const ATELIER_IMAGE = {
  src: MEDIA.atelier,
  alt: 'Inside the boutique, pieces from our atelier network, Swaroop Nagar',
  caption: 'From the ateliers we work with, to the boutique table.',
};

export function TheAtelier() {
  const reduce = useReducedMotion();
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Clip-path reveal with sharp timing
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.04 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 50%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      className="section-pad-lg"
      style={{ background: 'var(--stone-100)' }}
    >
      <div className="container-wide">

        {/* Eyebrow */}
        <p className="eyebrow mb-5">
          05 — The Atelier
        </p>

        {/* Headline */}
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            fontStyle: 'italic',
            maxWidth: 700,
            marginBottom: '3.5rem',
          }}
        >
          Made slowly, by people we know by name.
        </h2>

        {/* Full-bleed image with film grain overlay */}
        <div
          ref={imageContainerRef}
          className="relative w-full overflow-hidden"
          style={{
            height: 'clamp(320px, 58vh, 680px)',
            marginBottom: '3rem',
          }}
        >
          <Image
            src={ATELIER_IMAGE.src}
            alt={ATELIER_IMAGE.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              filter: 'grayscale(0.85) sepia(0.35) contrast(1.08) brightness(0.9)',
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
              opacity: 0.4,
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }}
          />

          {/* Caption */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 py-4"
            style={{
              background: 'linear-gradient(to top, rgba(26,20,16,0.72) 0%, transparent 100%)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,227,0.55)',
                fontStyle: 'italic',
              }}
            >
              {ATELIER_IMAGE.caption}
            </p>
          </div>
        </div>

        {/* Two-column editorial body */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)',
              lineHeight: 1.85,
              color: 'var(--ink-soft)',
            }}
          >
            Our Polki comes from two workshops in Jaipur we have worked with for
            more than ten years. Each piece is drawn, shaped, and set by hand,
            one stone at a time. Slow is the whole point, it is what gives a
            piece the weight and warmth that machine work never quite catches.
          </p>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.6vw, 1.0625rem)',
                lineHeight: 1.85,
                color: 'var(--ink-soft)',
                marginBottom: '2rem',
              }}
            >
              We work directly with the people who make our pieces, visit them
              through the year, and bring each finished piece back to the boutique
              ourselves. You meet the work, and the care behind it, in one place.
            </p>

            <Link
              href="/craftsmanship"
              className="btn-ghost"
              style={{ color: 'var(--aged-gold)', fontSize: 10.5, letterSpacing: '0.18em' }}
            >
              See How a Piece Is Made →
            </Link>
          </div>

        </div>

        {/* Three atelier names, small, typewritten */}
        <div
          className="mt-16 pt-10 flex flex-wrap gap-x-12 gap-y-4"
          style={{ borderTop: '1px solid var(--ivory-smoke)' }}
        >
          {[
            { name: 'Polki & Kundan',     place: 'Two workshops, Jaipur', spec: '10+ years together' },
            { name: 'Antique & Temple Gold', place: 'Hand-finished',      spec: 'The old techniques' },
            { name: 'Certified Diamonds', place: 'Mumbai & Surat',        spec: 'GIA / IGI graded' },
          ].map((a) => (
            <div key={a.name}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  color: 'var(--obsidian)',
                  fontWeight: 500,
                  marginBottom: 3,
                }}
              >
                {a.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                {a.place} · {a.spec}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
