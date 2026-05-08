import { Reveal } from '@/components/Reveal';

const STATS = [
  { number: '500+', label: 'Families Served', sub: 'Kanpur & UP' },
  { number: '100%', label: 'Certified Pieces', sub: 'GIA · IGI · BIS' },
  { number: '45 min', label: 'Private Consultation', sub: 'By Appointment Only' },
];

export function TrustNumbers() {
  return (
    <section className="bg-bone">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line py-16 md:py-20">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.12}
              className="flex flex-col items-center text-center py-10 md:py-0 md:px-12"
            >
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                  color: 'var(--gold-deep)',
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                {stat.number}
              </span>
              <span className="mt-4 text-body font-medium text-ink">{stat.label}</span>
              <span
                className="mt-1.5"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.20em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                {stat.sub}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Thin gold gradient rule */}
        <div
          className="h-px mx-auto"
          style={{
            background:
              'linear-gradient(to right, transparent, var(--gold-soft), transparent)',
            opacity: 0.45,
          }}
        />
      </div>
    </section>
  );
}
