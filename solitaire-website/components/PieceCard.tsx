import Link from 'next/link';
import type { Piece } from '@/lib/data/types';

export function PieceCard({ piece }: { piece: Piece }) {
  const primary = piece.images[0];
  const secondary = piece.images.length > 1 ? piece.images[1] : undefined;
  if (!primary) return null;

  const cert = piece.certification;
  const certLabel =
    cert?.type === 'GIA' || cert?.type === 'IGI' ? cert.type : null;

  return (
    <Link href={`/piece/${piece.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
        {/* Certification badge */}
        {certLabel && (
          <span
            className="absolute top-3 left-3 z-10"
            style={{
              fontSize: 8.5,
              letterSpacing: '0.18em',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--gold-deep)',
              border: '1px solid rgba(166,124,44,0.35)',
              padding: '3px 7px',
              background: 'rgba(251,247,238,0.92)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {certLabel}
          </span>
        )}

        {/* Primary image — fades out on hover when secondary exists */}
        <img
          src={primary.src}
          alt={primary.alt}
          loading="lazy"
          width={primary.width}
          height={primary.height}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            secondary ? 'group-hover:opacity-0' : ''
          }`}
        />

        {/* Secondary image — crossfades in on hover */}
        {secondary && (
          <img
            src={secondary.src}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
      </div>

      <div className="mt-4">
        <p className="text-micro uppercase tracking-eyebrow text-gold-deep mb-1.5">
          {piece.collectionLabel}
          {certLabel && (
            <span className="ml-2 text-ink-muted">· {certLabel} Certified</span>
          )}
        </p>
        <p className="font-display text-h3 text-ink group-hover:text-gold-deep transition-colors leading-snug">
          {piece.title}
        </p>
        <p className="mt-2 text-small text-ink-muted">View Piece →</p>
      </div>
    </Link>
  );
}
