import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const OCCASIONS = [
  {
    label: 'For the Bride',
    eyebrow: 'Polki · Kundan · Bridal Sets',
    href: '/collections/bridal',
    image:
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'For the Engagement',
    eyebrow: 'GIA & IGI Certified Solitaires',
    href: '/collections/solitaires',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'For a Gift',
    eyebrow: 'Pieces That Last Forever',
    href: '/collections',
    image:
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'For Every Day',
    eyebrow: 'Antique Gold · Light Wear',
    href: '/collections/antique-gold',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
  },
];

export function OccasionGrid() {
  return (
    <section className="bg-ink">
      {/* Section header */}
      <div className="container-wide pt-16 pb-10 md:pt-20 md:pb-12">
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-soft)',
              marginBottom: '0.75rem',
            }}
          >
            Shop by Occasion
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: 'var(--bone)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            Find the right piece for the right moment.
          </h2>
        </Reveal>
      </div>

      {/* 4-tile grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((tile, i) => (
          <Reveal key={tile.label} delay={i * 0.07}>
            <Link
              href={tile.href}
              className="group relative overflow-hidden bg-ink flex items-end"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background image */}
              <img
                src={tile.image}
                alt={tile.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: 0.28 }}
              />
              {/* Hover brightens image */}
              <img
                src={tile.image}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-[0.48] transition-opacity duration-700"
              />

              {/* Bottom gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(14,11,8,0.90) 0%, rgba(14,11,8,0.30) 50%, transparent 75%)',
                }}
              />

              {/* Gold bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ height: 1, background: 'var(--gold-soft)' }}
              />

              {/* Text content */}
              <div className="relative p-6 md:p-8 pb-8 md:pb-10">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 8.5,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-soft)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {tile.eyebrow}
                </p>
                <h3
                  className="font-display text-bone leading-tight group-hover:text-gold-soft transition-colors duration-400"
                  style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)' }}
                >
                  {tile.label}
                </h3>
                <span
                  className="mt-3 inline-block text-bone/40 group-hover:text-gold-soft/80 transition-colors duration-400 translate-y-1 group-hover:translate-y-0"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)',
                    display: 'block',
                    transition: 'color 0.4s ease, transform 0.4s ease',
                  }}
                >
                  Explore →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
