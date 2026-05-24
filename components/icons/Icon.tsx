import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function IconSearch({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconWhatsApp({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function IconPhone({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconPin({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconCalendar({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function IconMenu({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

export function IconClose({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconCheck({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconCert({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8 14.5V21l4-2 4 2v-6.5" />
      <path d="M9 9l2 2 4-4" />
    </svg>
  );
}

export function IconCurate({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 6h18M5 12h14M8 18h8" />
    </svg>
  );
}

export function IconHeritage({ size = 32, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 21V10l9-7 9 7v11" />
      <path d="M9 21V14h6v7" />
    </svg>
  );
}

export function IconPlus({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconMinus({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
