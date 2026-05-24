import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ARTICLES,
  getArticle,
  getRelatedArticles,
} from '@/lib/data/journal';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article not found' };
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/journal/${slug}`,
    image: article.hero.src,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelatedArticles(article);

  const date = new Date(article.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Journal', href: '/journal' },
          { name: article.title, href: `/journal/${slug}` },
        ])}
      />

      <article className="bg-bone">
        <div className="container-content pt-12 md:pt-20 pb-8">
          <nav aria-label="Breadcrumb" className="text-small text-ink-muted mb-12">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2 text-gold">·</span>
            <Link href="/journal" className="link-underline">
              Journal
            </Link>
            <span className="mx-2 text-gold">·</span>
            <span className="text-ink">{article.category}</span>
          </nav>

          <Reveal>
            <p className="text-mono text-micro uppercase tracking-eyebrow text-gold-deep mb-6">
              {article.category} · {article.readMinutes} min read · {date}
            </p>
            <h1 className="font-display text-display leading-tight">
              {article.title}
            </h1>
            <p className="body-lead mt-6 max-w-content">{article.excerpt}</p>
          </Reveal>
        </div>

        <Reveal className="container-wide">
          <div className="aspect-[16/9] overflow-hidden bg-bone-deep">
            <img
              src={article.hero.src}
              alt={article.hero.alt}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <div className="container-content py-16 md:py-20">
          <Reveal className="prose-lg space-y-6">
            {article.body.map((p, i) => {
              if (
                article.pullQuote &&
                i === Math.floor(article.body.length / 2)
              ) {
                return (
                  <div key={i}>
                    <p className="text-body text-ink-soft">{p}</p>
                    <blockquote className="my-12 border-l-2 border-gold pl-8 py-2">
                      <p className="font-display text-h1 leading-snug text-ink">
                        {article.pullQuote}
                      </p>
                    </blockquote>
                  </div>
                );
              }
              return (
                <p key={i} className="text-body text-ink-soft">
                  {p}
                </p>
              );
            })}
          </Reveal>

          <Reveal className="mt-16 pt-12 border-t border-line text-center">
            <p className="eyebrow mb-4">Ready to see these in person?</p>
            <h2 className="display-page max-w-2xl mx-auto leading-tight">
              Visit Solitaire in Swaroop Nagar.
            </h2>
            <Link href="/visit" className="btn-primary mt-8 inline-flex">
              Plan Your Visit
            </Link>
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad bg-bone-deep">
          <div className="container-wide">
            <Reveal className="mb-12">
              <p className="eyebrow">Related Reading</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.05}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-bone">
                      <img
                        src={a.hero.src}
                        alt={a.hero.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="eyebrow mt-4">{a.category}</p>
                    <h3 className="font-display text-h2 mt-2 leading-tight group-hover:text-gold-deep transition-colors">
                      {a.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
