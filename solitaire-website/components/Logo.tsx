type Props = { className?: string };

export function Logo({ className }: Props) {
  return (
    <span
      className={className}
      aria-label="Solitaire Jewellery Boutique"
      style={{
        fontFamily: 'var(--font-display), Garamond, serif',
        fontWeight: 500,
        fontSize: '1.35rem',
        letterSpacing: '0.04em',
        lineHeight: 1,
        color: 'var(--ink)',
      }}
    >
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        Solitaire
      </span>
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          background: 'var(--gold)',
          borderRadius: '50%',
          margin: '0 0.5rem',
          verticalAlign: 'middle',
        }}
      />
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontWeight: 500,
          color: 'var(--ink-soft)',
          verticalAlign: 'middle',
        }}
      >
        Jewellery Boutique
      </span>
    </span>
  );
}
