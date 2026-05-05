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
              <Reveal key={c.slug} delay={i * 0.06}>
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
                  </div>
                  <p className="font-display text-h2 mt-4 group-hover:text-gold-deep transition-colors">
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
