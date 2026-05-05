import Link from 'next/link';
import type { Piece } from '@/lib/data/types';

export function PieceCard({ piece }: { piece: Piece }) {
  const primary = piece.images[0];
  const hover = piece.images[1] ?? piece.images[0];
  if (!primary) return null;
  return (
    <Link
      href={`/piece/${piece.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
        <img
          src={primary.src}
          alt={primary.alt}
          loading="lazy"
          width={primary.width}
          height={primary.height}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        {hover && (
          <img
            src={hover.src}
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
        </p>
        <p className="font-display text-h3 text-ink group-hover:text-gold-deep transition-colors leading-snug">
          {piece.title}
        </p>
        <p className="mt-2 text-small text-ink-muted">View Piece →</p>
      </div>
    </Link>
  );
}
