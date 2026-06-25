'use client';

/* ──────────────────────────────────────────────────────────
   FeaturedPiece, Section 03
   Full-bleed dark Mahogany. Single cinematic image with Ken
   Burns slow zoom. Editorial copy below. Refreshed monthly.
   GSAP animations for sharper visual impact.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedPiece } from '@/lib/data/pieces';
import { TextReveal } from '@/components/TextReveal';
import { whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedPiece() {
  const reduce = useReducedMotion();
  const imageZoomRef = useRef<HTMLDivElement>(null);
  const skuTextRef = useRef<HTMLParagraphElement>(null);
  const piece = getFeaturedPiece();
  const main = piece.images[0];
  if (!main) return null;

  useEffect(() => {
    if (reduce || !imageZoomRef.current) return;

    const ctx = gsap.context(() => {
      // Ken Burns zoom with sharp easing
      gsap.fromTo(
        imageZoomRef.current,
        { scale: 1.09 },
        {
          scale: 1,
          duration: 8,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: imageZoomRef.current,
            start: 'top 40%',
            once: true,
          },
        }
      );

      // SKU text fade-in with delay
      if (skuTextRef.current) {
        gsap.fromTo(
          skuTextRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: 0.6,
            scrollTrigger: {
              trigger: imageZoomRef.current,
              start: 'top 40%',
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section style={{ background: 'var(--bone)' }}>

      {/* ── Eyebrow strip ── */}
      <div className="container-wide pt-16 pb-10">
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginBottom: '0.6rem',
            }}
          >
            04 — The Piece
          </p>
          <TextReveal
            as="h2"
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            {piece.title}.
          </TextReveal>
        </div>
      </div>

      {/* ── Cinematic full-width image with Ken Burns ── */}
      <div
        className="w-full overflow-hidden"
        style={{ height: 'clamp(340px, 62vh, 720px)', position: 'relative' }}
      >
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(26,20,16,0.45) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={imageZoomRef}
          className="absolute inset-0"
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* SKU / provenance line over image */}
        <p
          ref={skuTextRef}
          className="absolute bottom-6 left-1/2 z-20"
          style={{
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,227,0.45)',
            whiteSpace: 'nowrap',
          }}
        >
          {piece.collectionLabel} · SKU {piece.sku} · Currently in the boutique
        </p>
      </div>

      {/* ── Editorial copy block ── */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10 items-start">

          {/* Left: editorial paragraph */}
          <div className="md:col-span-7">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.85,
                color: 'var(--ink-soft)',
                maxWidth: 600,
              }}
            >
              {piece.longDescription}
            </p>
          </div>

          {/* Right: CTAs + price */}
          <div className="md:col-span-5 md:pt-1">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: '1.5rem',
              }}
            >
              Price on enquiry · Currently in the boutique
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLinkFor(WHATSAPP_MESSAGES.piece(piece.title, piece.sku))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Ask About This Piece
              </a>
              <Link
                href={`/piece/${piece.slug}`}
                className="btn-secondary"
              >
                Read the piece&rsquo;s story →
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
