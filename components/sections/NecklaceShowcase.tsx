'use client';

/*  NecklaceShowcase — cinematic full-width product film for the
    heritage necklace with antique carvings and motifs.

    Mirrors the BangleShowcase playback strategy exactly:
      · Lazy — nothing downloads until the section nears the viewport.
      · In-view autoplay, muted, looping, inline (mobile-safe).
      · Pauses when scrolled away — saves battery / CPU / data.
      · Poster paints instantly; video fades in once it's playing.
      · prefers-reduced-motion → still poster, no autoplay.

    Visual treatment is intentionally inverse to BangleShowcase:
    ivory/warm background vs the dark obsidian there, so the two
    cinematic sections feel distinct when the user scrolls through. */

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function NecklaceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v   = videoRef.current;
    const sec = sectionRef.current;
    if (!v || !sec) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto';
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2, rootMargin: '200px 0px' },
    );

    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Heritage necklace with antique carvings and motifs"
      style={{
        background: 'var(--ivory)',
        padding: 'clamp(3rem,7vh,5.5rem) 0 clamp(2.2rem,5vh,3.6rem)',
        overflow: 'hidden',
      }}
    >
      {/* Editorial intro — above the frame, never on it */}
      <div
        className="container-wide"
        style={{ textAlign: 'center', marginBottom: 'clamp(1.8rem,4vh,2.8rem)' }}
      >
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      10.5,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         'rgba(166,124,44,0.72)',
            margin:        '0 0 0.85rem',
          }}
        >
          Heritage Craftsmanship
        </p>
        <h2
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.9rem,4vw,3rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.02em',
            color:         'var(--obsidian)',
            margin:        0,
          }}
        >
          Carved by hand.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--aged-gold)' }}>
            Worn through generations.
          </span>
        </h2>
      </div>

      {/* Full-bleed video at native 16:9 — the full frame, no cropping */}
      <div
        style={{
          position:    'relative',
          width:       '100%',
          aspectRatio: '16 / 9',
          background:  'var(--bone-deep)',
        }}
      >
        {/* Poster — instant paint + reduced-motion still */}
        <Image
          src="/video/necklace-carvings-poster.webp"
          alt="Heritage necklace with antique carvings and motifs"
          fill
          sizes="100vw"
          quality={85}
          style={{ objectFit: 'cover' }}
        />

        {/* Video — fades in over the poster once playing */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            opacity:    playing ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        >
          <source src="/video/necklace-carvings.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Discreet CTA — below the frame */}
      <div
        className="container-wide"
        style={{ textAlign: 'center', marginTop: 'clamp(1.8rem,4vh,2.6rem)' }}
      >
        <Link
          href="/collections/antique-gold"
          className="inline-flex items-center"
          style={{
            gap:           8,
            fontFamily:    'var(--font-body)',
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight:    600,
            color:         'var(--aged-gold)',
            borderBottom:  '1px solid rgba(189,154,69,0.35)',
            paddingBottom: 4,
            transition:    'color 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--gold-deep)';
            e.currentTarget.style.borderBottomColor = 'var(--gold-deep)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--aged-gold)';
            e.currentTarget.style.borderBottomColor = 'rgba(189,154,69,0.35)';
          }}
        >
          Explore Heritage Jewellery
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
