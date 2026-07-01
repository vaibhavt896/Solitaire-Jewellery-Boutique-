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

  const siblings = Object.values(LEGAL).filter((d) => d.slug !== doc.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Legal', href: '/legal/privacy' },
          { name: doc.title, href: `/legal/${slug}` },
        ])}
      />

      {/* All CSS for this page — hover states, layout, responsive grid */}
      <style>{`
        .legal-toc-link {
          display: flex;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          line-height: 1.45;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .legal-toc-link:hover { color: var(--aged-gold); }

        .legal-sibling-link {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
        }
        .legal-sibling-link:hover { color: var(--aged-gold); }

        @media (min-width: 900px) {
          .legal-layout {
            display: grid !important;
            grid-template-columns: 220px minmax(0, 1fr) !important;
            gap: 4rem !important;
          }
          .legal-toc { display: block !important; }
        }
      `}</style>

      {/* ── Page header ── */}
      <header
        style={{
          background: 'var(--ivory-smoke)',
          borderBottom: '1px solid var(--line)',
          padding: 'clamp(4rem,10vh,7rem) 0 clamp(2.5rem,6vh,4rem)',
        }}
      >
        <div className="container-content">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6"
              style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
            >
              <Link href="/" className="link-underline">Home</Link>
              <span className="mx-2" style={{ color: 'var(--aged-gold)' }}>·</span>
              <span>Legal</span>
              <span className="mx-2" style={{ color: 'var(--aged-gold)' }}>·</span>
              <span style={{ color: 'var(--ink)' }}>{doc.title}</span>
            </nav>

            <p className="eyebrow mb-4">Legal</p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem,5vw,3.5rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--obsidian)',
                margin: 0,
              }}
            >
              {doc.title}
            </h1>

            {/* Thin gold rule */}
            <div
              aria-hidden
              style={{
                width: 48,
                height: 2,
                background: 'var(--gold-metallic)',
                borderRadius: 1,
                margin: '1.5rem 0',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--ink-muted)',
              }}
            >
              <span>
                <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Effective:</strong>{' '}
                {doc.lastUpdated}
              </span>
              <span>
                <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Jurisdiction:</strong>{' '}
                Kanpur, Uttar Pradesh, India
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Body — sticky TOC sidebar on desktop ── */}
      <div className="bg-bone" style={{ paddingBottom: 'clamp(4rem,8vh,6rem)' }}>
        <div
          className="legal-layout container-wide"
          style={{ paddingTop: 'clamp(2.5rem,6vh,4rem)' }}
        >
          {/* Sticky TOC — hidden on mobile */}
          <aside className="legal-toc" style={{ display: 'none' }}>
            <div style={{ position: 'sticky', top: '6rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--aged-gold)',
                  marginBottom: '1rem',
                }}
              >
                Contents
              </p>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {doc.body.map((section, i) => (
                  <li key={section.heading} style={{ marginBottom: '0.5rem' }}>
                    <a href={`#section-${i + 1}`} className="legal-toc-link">
                      <span
                        aria-hidden
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 9.5,
                          color: 'var(--aged-gold)',
                          opacity: 0.65,
                          fontWeight: 600,
                          flexShrink: 0,
                          paddingTop: '0.1em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>

              {/* Cross-links to other legal docs */}
              {siblings.length > 0 && (
                <div
                  style={{
                    marginTop: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: 'var(--aged-gold)',
                      marginBottom: '1rem',
                    }}
                  >
                    Other Documents
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {siblings.map((d) => (
                      <li key={d.slug} style={{ marginBottom: '0.5rem' }}>
                        <Link href={`/legal/${d.slug}`} className="legal-sibling-link">
                          {d.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* Main article */}
          <article>
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {doc.body.map((section, si) => (
                  <section
                    key={section.heading}
                    id={`section-${si + 1}`}
                    style={{
                      paddingBottom: '3rem',
                      borderBottom:
                        si < doc.body.length - 1 ? '1px solid var(--line)' : 'none',
                    }}
                  >
                    {/* Numbered heading */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem,2.5vw,1.65rem)',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: 'var(--obsidian)',
                        margin: '0 0 1.25rem',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 10,
                          letterSpacing: '0.16em',
                          color: 'var(--aged-gold)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          flexShrink: 0,
                          paddingTop: '0.35em',
                        }}
                      >
                        {String(si + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </h2>

                    {/* Content blocks — paragraphs and lists */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {section.blocks.map((block, bi) =>
                        block.kind === 'p' ? (
                          <p
                            key={bi}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '1rem',
                              lineHeight: 1.78,
                              color: 'var(--ink-soft)',
                              margin: 0,
                            }}
                          >
                            {block.text}
                          </p>
                        ) : (
                          <ul
                            key={bi}
                            style={{
                              listStyle: 'none',
                              padding: 0,
                              margin: '0.25rem 0',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.65rem',
                            }}
                          >
                            {block.items.map((item, ii) => (
                              <li
                                key={ii}
                                style={{
                                  display: 'flex',
                                  gap: '0.85rem',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '1rem',
                                  lineHeight: 1.72,
                                  color: 'var(--ink-soft)',
                                }}
                              >
                                <span
                                  aria-hidden
                                  style={{
                                    color: 'var(--aged-gold)',
                                    fontSize: 7,
                                    flexShrink: 0,
                                    marginTop: '0.56em',
                                    opacity: 0.75,
                                  }}
                                >
                                  ◆
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </Reveal>

            {/* Bottom cross-navigation */}
            <Reveal>
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--line)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--ink-muted)',
                    margin: 0,
                  }}
                >
                  Last updated {doc.lastUpdated}
                </p>
                {siblings.length > 0 && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'var(--ink-muted)',
                      margin: 0,
                    }}
                  >
                    {siblings.map((d, i) => (
                      <span key={d.slug}>
                        <Link
                          href={`/legal/${d.slug}`}
                          className="link-underline"
                          style={{ color: 'var(--ink)' }}
                        >
                          {d.title}
                        </Link>
                        {i < siblings.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </Reveal>
          </article>
        </div>
      </div>
    </>
  );
}
