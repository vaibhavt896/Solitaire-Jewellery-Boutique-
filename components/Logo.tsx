import Image from 'next/image';

/* Logo, Solitaire wordmark using the provided brand asset.
   We use a whitespace-trimmed copy (the supplied PNG was a 2000×2000
   square with ~690px of transparent padding top & bottom, which made
   the mark render tiny in an 80px navbar). The trimmed file is a tight
   1776×684 crop (≈2.6:1), so it fills the bar at a legible size.
   `light` inverts the mark to near-white for dark backgrounds. */

type Props = { className?: string; light?: boolean };

export function Logo({ className, light }: Props) {
  return (
    <Image
      src="/solitaire-logo-trimmed.png"
      alt="Solitaire Jewellery Boutique"
      width={1776}
      height={684}
      priority
      className={className}
      style={{
        height: 42,
        width: 'auto',
        filter: light ? 'brightness(0) invert(1)' : undefined,
      }}
    />
  );
}
