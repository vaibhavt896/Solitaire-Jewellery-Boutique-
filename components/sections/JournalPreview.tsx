import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';

export function JournalPreview() {
  const articles = getRecentArticles(5);
  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  if (!featured) return null;

  return (
    <section className="section-pad bg-bone">
      <div className="container-wide">

        {/* Header */}
        <Reveal className="flex items-end justify-between gap-8 mb-14 md:mb-18 flex-wrap">
          <div>
            <p className="eyebrow">The Solitaire Guide</p>
            <h2 className="display-page mt-3 max-w-2xl">
              Know before you buy.
            </h2>
          </div>
          <Link href="/journal" className="btn-ghost shrink-0">
            All Articles
          </Link>
        </Reveal>

        {/* Featured article — full editorial card */}
        <Reveal className="mb-12">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid md:grid-cols-2 overflow-hidden bg-bone-deep"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <Image
                src={featured.hero.src}
                alt={featured.hero.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Category pill */}
              <span
                className="absolute top-4 left-4"
                style={{
                  fontSize: 8.5,
                  letterSpacing: '0.18em',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--gold-deep)',
                  border: '1px solid rgba(166,124,44,0.35)',
                  padding: '3px 8px',
                  background: 'rgba(251,247,238,0.92)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {featured.category}
              </span>
            </div>

            {/* Text panel */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <p
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.20em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-deep)',
                }}
              >
                Featured Guide
              </p>
              <h3
                className="font-display leading-tight group-hover:text-gold-deep transition-colors duration-300"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                {featured.title}
              </h3>
              <p className="text-body text-ink-soft mt-5 max-w-sm">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4">
                <p className="text-small text-ink-muted">{featured.readMinutes} min read</p>
                <span
                  className="h-px flex-1"
                  style={{
                    background: 'var(--line)',
                    maxWidth: 40,
                  }}
                />
              </div>
              <span
                className="mt-5 text-small uppercase tracking-button font-medium text-ink-soft group-hover:text-gold-deep transition-colors duration-300"
                style={{ letterSpacing: '0.14em' }}
              >
                Read the guide →
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Secondary row — 2 cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {secondary.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <Link href={`/journal/${a.slug}`} className="group block">
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden bg-bone-deep relative">
                  <Image
                    src={a.hero.src}
                    alt={a.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Hover overlay + "Read" label */}
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-500 flex items-center justify-center">
                    <span
                      className="text-bone translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        fontSize: 9.5,
                        letterSpacing: '0.20em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      Read Article →
                    </span>
                  </div>
                </div>

                <p className="mt-4 eyebrow">{a.category}</p>
                <h3 className="font-display text-h1 mt-2 leading-tight group-hover:text-gold-deep transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="text-body text-ink-soft mt-3">{a.excerpt}</p>
                <p className="text-small text-ink-muted mt-4">
                  {a.readMinutes} min read ·{' '}
                  <span className="group-hover:text-gold-deep transition-colors">Read this →</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
