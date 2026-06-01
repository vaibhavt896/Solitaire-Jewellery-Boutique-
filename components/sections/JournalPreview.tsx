/* ──────────────────────────────────────────────────────────
   JournalPreview, Section 07
   Magazine table-of-contents layout.
   One featured article (large, left) + three secondary
   (text-led, stacked right). No card frames, editorial.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';

export function JournalPreview() {
  const articles   = getRecentArticles(4);
  const featured   = articles[0];
  const secondary  = articles.slice(1, 4);
  if (!featured) return null;

  return (
    <section style={{ background: 'var(--ivory)' }} className="section-pad">
      <div className="container-wide">

        {/* Header row */}
        <Reveal className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <p className="eyebrow mb-4">08 — The Journal</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.022em',
              }}
            >
              A little help, before you buy.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--ink-muted)',
                marginTop: '0.75rem',
              }}
            >
              Honest guides on Polki, diamonds, and how to choose well, written to
              help you, not to sell to you.
            </p>
          </div>
          <Link
            href="/journal"
            className="btn-ghost shrink-0"
            style={{ color: 'var(--aged-gold)', fontSize: 10.5, letterSpacing: '0.16em' }}
          >
            Read the Journal →
          </Link>
        </Reveal>

        {/* Magazine two-column layout */}
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16">

          {/* Featured article, left, 7 columns */}
          <Reveal className="md:col-span-7">
            <Link href={`/journal/${featured.slug}`} className="group block">

              {/* Cinematic image */}
              <div
                className="relative overflow-hidden mb-6"
                style={{ aspectRatio: '16/10' }}
              >
                <Image
                  src={featured.hero.src}
                  alt={featured.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
                />
                {/* Tag pill */}
                <span
                  className="absolute top-5 left-5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--aged-gold)',
                    border: '1px solid rgba(184,146,58,0.4)',
                    padding: '3px 10px',
                    background: 'rgba(244,239,227,0.92)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  Featured · {featured.category}
                </span>
              </div>

              {/* Article meta */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                {featured.readMinutes} min read · By the Boutique
              </p>

              {/* Headline */}
              <h3
                className="font-display group-hover:text-gold transition-colors duration-700"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.018em',
                  marginBottom: '1rem',
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: 'var(--ink-soft)',
                  maxWidth: 480,
                  marginBottom: '1.25rem',
                }}
              >
                {featured.excerpt}
              </p>

              <span
                className="btn-ghost group-hover:text-gold"
                style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-soft)', transition: 'color 0.4s ease' }}
              >
                Continue reading →
              </span>
            </Link>
          </Reveal>

          {/* Secondary articles, right, 5 columns, stacked */}
          <div className="md:col-span-5 flex flex-col">
            {secondary.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link
                  href={`/journal/${a.slug}`}
                  className="group flex gap-5 items-start"
                  style={{
                    paddingTop: i === 0 ? 0 : '1.75rem',
                    paddingBottom: '1.75rem',
                    borderBottom: i < secondary.length - 1 ? '1px solid var(--ivory-smoke)' : 'none',
                  }}
                >
                  {/* Small thumbnail */}
                  <div
                    className="flex-shrink-0 overflow-hidden relative"
                    style={{ width: 88, height: 72 }}
                  >
                    <Image
                      src={a.hero.src}
                      alt={a.hero.alt}
                      fill
                      sizes="88px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--aged-gold)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {a.category} · {a.readMinutes} min
                    </p>
                    <h4
                      className="font-display group-hover:text-gold transition-colors duration-500"
                      style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {a.title}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-muted)',
                        transition: 'color 0.4s ease',
                      }}
                      className="group-hover:text-aged-gold"
                    >
                      Read this →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
