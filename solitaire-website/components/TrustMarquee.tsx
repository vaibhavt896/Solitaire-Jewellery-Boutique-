const ITEMS_A = [
  'GIA CERTIFIED',
  'IGI CERTIFIED',
  'BIS HALLMARKED',
  'SWAROOP NAGAR · KANPUR',
  'BY APPOINTMENT',
  'CURATED BY HAND',
  'POLKI · DIAMOND · ANTIQUE',
];

const ITEMS_B = [
  'HERITAGE CRAFTSMANSHIP',
  'EST. KANPUR',
  'CERTIFIED SOLITAIRES',
  'ANTIQUE GOLD',
  'TEMPLE JEWELLERY',
  'KUNDAN · POLKI',
  'HANDCRAFTED PIECES',
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden group">
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ ['--marquee-pause' as string]: 'running' }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span
              className="text-mono text-micro uppercase tracking-eyebrow text-ink-soft group-hover:text-ink-muted transition-colors duration-500"
              style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.20em' }}
            >
              {item}
            </span>
            <span aria-hidden className="text-gold" style={{ fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TrustMarquee() {
  return (
    <div className="bg-bone-deep border-y border-line py-4 overflow-hidden flex flex-col gap-3">
      <MarqueeRow items={ITEMS_A} />
      <MarqueeRow items={ITEMS_B} reverse />
    </div>
  );
}
