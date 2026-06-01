import Link from 'next/link';
import type { Metadata } from 'next';
import { ARTICLES } from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'The Journal | How to Choose Jewellery Well',
  description:
    'Honest, simple guides on Polki, diamonds, certificates, and bridal planning, written to help you buy well, not to sell to you.',
  path: '/journal',
});

export default function JournalPage() {
  const sorted = [...ARTICLES].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Journal', href: '/journal' },
        ])}
      />

      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">The journal</p>
            <h1 className="display-page">
              How to choose well, from people who do it every day.
            </h1>
            <p className="body-lead mt-6">
              No sales talk. Just honest, simple guides on diamonds, gold, and the
              pieces that matter most.
            </p>
          </Reveal>

          {featured && (
            <Reveal>
              <Link
                href={`/journal/${featured.slug}`}
                className="group block mb-20"
              >
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="aspect-[4/3] overflow-hidden bg-bone-deep order-2 md:order-1">
                    <img
                      src={featured.hero.src}
                      alt={featured.hero.alt}
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <p className="eyebrow">{featured.category} · Featured</p>
                    <h2 className="font-display text-display mt-4 leading-tight group-hover:text-gold-deep transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-body text-ink-soft mt-6 max-w-md">
                      {featured.excerpt}
                    </p>
                    <p className="text-small text-ink-muted mt-6">
                      {featured.readMinutes} min read
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-bone-deep">
                    <img
                      src={a.hero.src}
                      alt={a.hero.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mt-5">{a.category}</p>
                  <h3 className="font-display text-h1 mt-3 leading-tight group-hover:text-gold-deep transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-body text-ink-soft mt-3">{a.excerpt}</p>
                  <p className="text-small text-ink-muted mt-4">
                    {a.readMinutes} min read · Read →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
