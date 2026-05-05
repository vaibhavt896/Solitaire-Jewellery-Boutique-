type Props = { className?: string; light?: boolean };

export function Logo({ className, light }: Props) {
  return (
    <img
      src="/solitaire-logo.png"
      alt="Solitaire Jewellery Boutique"
      className={className}
      style={{
        height: 145,
        width: "auto",
        filter: light ? "brightness(0) invert(1)" : "none",
        transition: "filter 0.4s ease",
      }}
    />
  );
}
