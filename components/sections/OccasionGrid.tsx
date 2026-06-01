'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '@/lib/placeholder-media';

gsap.registerPlugin(ScrollTrigger);

const OCCASIONS = [
  {
    label: 'For the Bride',
    eyebrow: 'Polki, Kundan, and full bridal sets',
    href: '/collections/bridal',
    image: MEDIA.bridal,
  },
  {
    label: 'For an Engagement',
    eyebrow: 'Certified solitaires, chosen with care',
    href: '/collections/solitaires',
    image: MEDIA.solitaire,
  },
  {
    label: 'For a Gift',
    eyebrow: 'Something they will keep for years',
    href: '/collections',
    image: MEDIA.diamond,
  },
  {
    label: 'For Every Day',
    eyebrow: 'Light gold and antique pieces, made to actually wear',
    href: '/collections/antique-gold',
    image: MEDIA.gold,
  },
];

export function OccasionGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const tiles = gridRef.current?.querySelectorAll('[data-tile]');
      if (!tiles) return;

      tiles.forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 65%',
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-bone-deep">
      {/* Section header */}
      <div className="container-wide pt-16 pb-10 md:pt-20 md:pb-12">
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginBottom: '0.75rem',
            }}
          >
            What brings you in?
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: 'var(--ink)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            What brings you in today?
          </h2>
        </div>
      </div>

      {/* 4-tile grid */}
      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((tile, i) => (
          <div key={tile.label} data-tile>
            <Link
              href={tile.href}
              className="group relative overflow-hidden bg-ink flex items-end"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background image, opacity transitions on hover via CSS */}
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700 opacity-[0.28] group-hover:opacity-[0.48]"
              />

              {/* Bottom gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(26,20,16,0.90) 0%, rgba(26,20,16,0.30) 50%, transparent 75%)',
                }}
              />

              {/* Gold bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ height: 1, background: 'var(--gold-soft)' }}
              />

              {/* Text content */}
              <div className="relative p-6 md:p-8 pb-8 md:pb-10">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-soft)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {tile.eyebrow}
                </p>
                <h3
                  className="font-display text-bone leading-tight group-hover:text-gold-soft transition-colors duration-400"
                  style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)' }}
                >
                  {tile.label}
                </h3>
                <span
                  className="mt-3 inline-block text-bone/40 group-hover:text-gold-soft/80 transition-colors duration-400 translate-y-1 group-hover:translate-y-0"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)',
                    display: 'block',
                    transition: 'color 0.4s ease, transform 0.4s ease',
                  }}
                >
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
