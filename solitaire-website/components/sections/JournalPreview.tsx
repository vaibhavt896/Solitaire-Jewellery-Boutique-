import Link from 'next/link';
import { getRecentArticles } from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';

export function JournalPreview() {
  const articles = getRecentArticles(3);
  return (
    <section className="section-pad bg-bone-deep">
      <div className="container-wide">
        <Reveal className="flex items-end justify-between gap-8 mb-12 md:mb-16 flex-wrap">
          <div>
            <p className="eyebrow">From The Journal</p>
            <h2 className="display-page mt-3 max-w-2xl">
              On certification, craft, and the moments between.
            </h2>
          </div>
          <Link href="/journal" className="btn-ghost shrink-0">
            View All Articles
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-bone-deep">
                  <img
                    src={a.hero.src}
                    alt={a.hero.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-5 eyebrow">{a.category}</p>
                <h3 className="font-display text-h1 mt-3 leading-tight group-hover:text-gold-deep transition-colors">
                  {a.title}
                </h3>
                <p className="text-body text-ink-soft mt-3">{a.excerpt}</p>
                <p className="text-small text-ink-muted mt-4">{a.readMinutes} min read · Read →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
