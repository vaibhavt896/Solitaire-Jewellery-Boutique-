'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { PieceCard } from '@/components/PieceCard';
import { whatsappLinkFor } from '@/lib/site';
import type { Piece } from '@/lib/data/types';

const FILTER_TYPES = ['All', 'Necklace', 'Ring', 'Earrings', 'Bracelet'] as const;
type FilterType = (typeof FILTER_TYPES)[number];

function inferType(piece: Piece): FilterType {
  const t = piece.title.toLowerCase();
  if (t.includes('ring'))                                         return 'Ring';
  if (t.includes('earring') || t.includes('jhumka') || t.includes('stud')) return 'Earrings';
  if (t.includes('bracelet') || t.includes('bangle') || t.includes('kada')) return 'Bracelet';
  return 'Necklace';
}

export function CollectionPieces({
  pieces,
  collectionTitle,
}: {
  pieces: Piece[];
  collectionTitle: string;
}) {
  const [activeType, setActiveType] = useState<FilterType>('All');
  const [sort, setSort]             = useState<'featured' | 'newest'>('featured');

  // Which types actually exist in this collection
  const availableTypes = FILTER_TYPES.slice(1).filter((type) =>
    pieces.some((p) => inferType(p) === type),
  );

  const filtered = [...pieces]
    .filter((p) => activeType === 'All' || inferType(p) === activeType)
    .sort((a, b) => {
      if (sort === 'newest')
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      // featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

  if (pieces.length === 0) {
    return (
      <div className="container-wide">
        <Reveal className="bg-bone-deep border border-line p-10 md:p-16 text-center">
          <p className="font-display text-h1 mb-4">We're adding new pieces here.</p>
          <p className="text-body text-ink-soft max-w-xl mx-auto mb-8">
            Tell us what you're looking for in {collectionTitle}, and we'll send
            photographs within the day.
          </p>
          <a
            href={whatsappLinkFor(
              `Hi Solitaire, I'm browsing your ${collectionTitle} collection. Could you share what's currently in the boutique?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Speak to Us on WhatsApp
          </a>
        </Reveal>
      </div>
    );
  }

  return (
    <>
      {/* Filter + sort bar, sticky below header */}
      <div className="sticky top-[120px] z-20 bg-bone/95 backdrop-blur-md border-y border-line">
        <div className="container-wide flex items-center gap-3 py-4 overflow-x-auto">
          <span
            className="shrink-0 text-ink-muted"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Filter:
          </span>

          {/* Type pills, only show "All" + types that exist */}
          <div className="flex items-center gap-2">
            {(['All', ...availableTypes] as FilterType[]).map((type) => {
              const active = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className="whitespace-nowrap transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9.5,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    padding: '5px 13px',
                    border: '1px solid',
                    borderColor: active ? 'var(--ink)' : 'var(--line)',
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--bone)' : 'var(--ink-soft)',
                    cursor: 'pointer',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <span
              className="text-ink-muted"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Sort:
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent border border-line text-ink px-3 py-1.5 focus:outline-none focus:border-gold-deep cursor-pointer"
              style={{ fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.08em' }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pieces grid */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <p className="text-body text-ink-muted text-center py-20">
              No pieces match this filter, try{' '}
              <button
                type="button"
                className="underline hover:text-gold-deep transition-colors"
                onClick={() => setActiveType('All')}
              >
                All
              </button>
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filtered.map((p, i) => (
                <Fragment key={p.slug}>
                  <Reveal delay={(i % 4) * 0.06}>
                    <PieceCard piece={p} />
                  </Reveal>

                  {/* Editorial interrupt after 6th card */}
                  {i === 5 && (
                    <div
                      key="editorial"
                      className="col-span-2 md:col-span-3 lg:col-span-4 bg-ink my-4 py-14 px-8 md:px-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    >
                      <div>
                        <p
                          className="mb-3"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 9,
                            letterSpacing: '0.20em',
                            textTransform: 'uppercase',
                            color: 'var(--gold-soft)',
                          }}
                        >
                          Private Consultations
                        </p>
                        <p
                          className="font-display text-bone leading-tight"
                          style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)' }}
                        >
                          Every piece can be viewed in the boutique before you decide.
                        </p>
                      </div>
                      <Link
                        href="/bridal/book"
                        className="shrink-0 whitespace-nowrap text-bone transition-colors duration-300 hover:text-gold-soft"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 10,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          border: '1px solid rgba(255,255,255,0.30)',
                          padding: '11px 22px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--gold-soft)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)';
                        }}
                      >
                        Book an Appointment →
                      </Link>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
