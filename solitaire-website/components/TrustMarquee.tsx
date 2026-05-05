const ITEMS = [
  'GIA CERTIFIED',
  'IGI CERTIFIED',
  'BIS HALLMARKED',
  'SWAROOP NAGAR · KANPUR',
  'BY APPOINTMENT',
  'CURATED BY HAND',
  'POLKI · DIAMOND · ANTIQUE',
];

export function TrustMarquee() {
  // duplicate the array so the loop is seamless
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-bone-deep border-y border-line py-5 overflow-hidden">
      <div className="marquee-track flex items-center gap-12 text-mono text-micro uppercase tracking-eyebrow text-ink-soft">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap font-mono"
          >
            <span>{item}</span>
            <span aria-hidden className="text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
