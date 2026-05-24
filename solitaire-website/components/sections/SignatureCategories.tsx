import Link from 'next/link';
import { COLLECTIONS } from '@/lib/data/collections';
import { Reveal } from '@/components/Reveal';

const FEATURED_SLUGS = ['polki', 'solitaires', 'antique-gold', 'bridal'] as const;

export function SignatureCategories() {
  const featured = FEATURED_SLUGS.map(
    (slug) => COLLECTIONS.find((c) => c.slug === slug)!,
  );

  return (
    <section className="section-pad-lg bg-bone">
      <div className="container-wide">
        <Reveal className="max-w-3xl mb-16 md:mb-24">
          <p className="eyebrow mb-4">The Collections</p>
          <h2 className="display-page">
            Pieces curated for the moments that matter.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((c, i) => {
            const tall = c.height === 'tall';
            return (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link href={`/collections/${c.slug}`} className="group block">
                  <div
                    className={`relative overflow-hidden bg-bone-deep ${
                      tall ? 'aspect-[3/5]' : 'aspect-[4/5]'
                    }`}
                  >
                    <img
                      src={c.hero.src}
                      alt={c.hero.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />

                    {/* Dark overlay that deepens on hover */}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-700" />

                    {/* Index number — top left */}
                    <span
                      className="absolute top-4 left-4 font-mono text-bone/50 group-hover:text-bone/80 transition-colors duration-500"
                      style={{ fontSize: 10, letterSpacing: '0.18em' }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* "View Collection" — slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <span
                        className="text-bone"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          fontWeight: 500,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        View Collection →
                      </span>
                    </div>
                  </div>

                  <p className="font-display text-h2 mt-4 group-hover:text-gold-deep transition-colors duration-300">
                    {c.title}
                  </p>
                  <p className="text-small text-ink-muted mt-1">
                    Explore <span className="text-gold-deep">→</span>
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
