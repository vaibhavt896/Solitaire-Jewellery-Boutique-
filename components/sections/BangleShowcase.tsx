'use client';

/*  BangleShowcase — cinematic full-width product film.

    The video is shown at its NATIVE 16:9 aspect ratio (no cropping),
    edge-to-edge, with nothing overlaid on it — the visual is the hero.
    Minimal, restrained typography sits above and below it (Apple-style),
    never on top of the frame.

    Playback (how Apple / large brands ship background video):
      • Lazy   — nothing downloads until the section nears the viewport.
      • In-view autoplay, muted, looping, inline (mobile-safe).
      • Pauses when scrolled away — saves battery / CPU / data.
      • Poster paints instantly; the video fades in once it's playing.
      • prefers-reduced-motion → the still poster is kept, no autoplay.

    Sources: WebM/VP9 first (smaller), H.264 MP4 fallback (+faststart). */

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function BangleShowcase() {
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
      aria-label="Handcrafted 22ct gold bangles"
      style={{ background: '#0B0806', padding: 'clamp(3rem,7vh,5.5rem) 0 clamp(2.2rem,5vh,3.6rem)', overflow: 'hidden' }}
    >
      {/* Minimal intro — above the frame, never on it */}
      <div className="container-wide" style={{ textAlign: 'center', marginBottom: 'clamp(1.8rem,4vh,2.8rem)' }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(189,154,69,0.72)', margin: '0 0 0.85rem',
        }}>
          Pure 22ct Gold
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem,4vw,3rem)',
          lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ivory)', margin: 0,
        }}>
          Worn every day.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>Kept for life.</span>
        </h2>
      </div>

      {/* Full-bleed video at native 16:9 — the full frame, no cropping */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#0B0806' }}>
        {/* Poster — instant paint + reduced-motion still */}
        <Image
          src="/video/bangle-animation-poster.webp"
          alt="Handcrafted 22ct gold bangles"
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
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        >
          <source src="/video/bangle-animation.webm" type="video/webm" />
          <source src="/video/bangle-animation.mp4"  type="video/mp4" />
        </video>
      </div>

      {/* Discreet CTA — below the frame */}
      <div className="container-wide" style={{ textAlign: 'center', marginTop: 'clamp(1.8rem,4vh,2.6rem)' }}>
        <Link
          href="/collections/dubai-gold-bangles"
          className="inline-flex items-center"
          style={{
            gap: 8, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', fontWeight: 600, color: 'var(--gold-soft)',
            borderBottom: '1px solid rgba(189,154,69,0.35)', paddingBottom: 4,
            transition: 'color 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--aged-gold)'; e.currentTarget.style.borderBottomColor = 'var(--aged-gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold-soft)'; e.currentTarget.style.borderBottomColor = 'rgba(189,154,69,0.35)'; }}
        >
          Explore the Collection
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
