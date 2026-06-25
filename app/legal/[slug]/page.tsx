import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LEGAL, getLegalDoc } from '@/lib/data/legal';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return Object.keys(LEGAL).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: 'Not found' };
  return buildMetadata({
    title: doc.title,
    description: doc.description,
    path: `/legal/${slug}`,
  });
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Legal', href: '/legal/privacy' },
          { name: doc.title, href: `/legal/${slug}` },
        ])}
      />
      <article className="bg-bone py-20 md:py-32">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="display-page leading-tight">{doc.title}</h1>
            <p className="text-small text-ink-muted mt-4">
              Last updated {doc.lastUpdated}
            </p>
          </Reveal>

          <Reveal className="mt-12 space-y-12">
            {doc.body.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-h1 mb-4">{section.heading}</h2>
                <div className="space-y-4 text-body text-ink-soft">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </Reveal>

          <Reveal className="mt-16 pt-8 border-t border-line">
            <p className="text-small text-ink-muted">
              Other legal documents:{' '}
              {Object.values(LEGAL)
                .filter((d) => d.slug !== doc.slug)
                .map((d, i, arr) => (
                  <span key={d.slug}>
                    <Link href={`/legal/${d.slug}`} className="link-underline text-ink">
                      {d.title}
                    </Link>
                    {i < arr.length - 1 ? ' · ' : ''}
                  </span>
                ))}
            </p>
          </Reveal>
        </div>
      </article>
    </>
  );
}
