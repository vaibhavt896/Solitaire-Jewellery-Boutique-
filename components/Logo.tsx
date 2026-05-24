import Image from 'next/image';

/*
 * Three logo variants, all 4004×1391px RGBA:
 *  NEW3 — black    → default, for cream/bone/light backgrounds
 *  NEW2 — white    → for dark backgrounds (bg-ink sections)
 *  NEW1 — purple   → brand color version (available if needed)
 *
 * Usage:
 *  <Logo />              → black logo  (light backgrounds)
 *  <Logo light />        → white logo  (dark backgrounds)
 */

type Props = { className?: string; light?: boolean };

export function Logo({ className, light }: Props) {
  const src = light
    ? '/SOLITAIRE LOGO/SOLI LOGO NEW2.png'
    : '/SOLITAIRE LOGO/SOLI LOGO NEW3.png';

  return (
    <Image
      src={src}
      alt="Solitaire Jewellery Boutique"
      width={4004}
      height={1391}
      priority
      className={className}
      style={{ height: 44, width: 'auto' }}
    />
  );
}
