/* ──────────────────────────────────────────────────────────
   ArticlesGrid — "Jewellery Stories & Knowledge"
   Three equal article cards: image with a category tag, the
   headline, and the date · read-time line. Pulls live articles.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ArticlesGrid() {
  const articles = getRecentArticles(3);
  if (!articles.length) return null;

  return (
    <section className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container-wide">

        {/* Header row */}
        <Reveal className="flex items-end justify-between gap-8 mb-12 flex-wrap">
          <div>
            <p className="eyebrow mb-4">Articles &amp; Insights</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.022em',
                color: 'var(--obsidian)',
              }}
            >
              Jewellery Stories &amp; Knowledge
            </h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 shrink-0 group/vaa"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10.5,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--aged-gold)',
              borderBottom: '1px solid var(--aged-gold)',
              paddingBottom: 3,
            }}
          >
            View All Articles
            <span aria-hidden className="transition-transform duration-300 group-hover/vaa:translate-x-1">→</span>
          </Link>
        </Reveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 lg:gap-9">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link
                href={`/journal/${a.slug}`}
                className="group block h-full"
                style={{
                  background: 'var(--ivory-raised)',
                  border: '1px solid var(--ivory-smoke)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 16px 44px -14px rgba(26,20,16,0.16), 0 2px 8px rgba(26,20,16,0.05)',
                }}
              >
                {/* Image + tag */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src={a.hero.src}
                    alt={a.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 32vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    className="absolute bottom-4 left-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9.5,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: 'var(--gold-light)',
                      background: 'rgba(26,20,16,0.52)',
                      backdropFilter: 'blur(4px)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {a.category}
                  </span>
                </div>

                {/* Body */}
                <div className="px-5 py-6">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.7vw, 1.3rem)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.012em',
                      color: 'var(--obsidian)',
                      marginBottom: '1rem',
                      transition: 'color 0.5s ease',
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10.5,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {formatDate(a.publishedAt)} • {a.readMinutes} Min Read
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
