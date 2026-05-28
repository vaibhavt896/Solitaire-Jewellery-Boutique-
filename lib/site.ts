export const SITE = {
  name: 'Solitaire Jewellery Boutique',
  shortName: 'Solitaire',
  url: 'https://solitairejewelleryboutique.com',
  description:
    'Solitaire is a Kanpur boutique specialising in Polki, antique gold, and certified solitaires. Each piece is curated by hand. Visit us in Swaroop Nagar.',
  tagline: 'An ultimate destination for intricate jewellery',
  phoneRaw: '+918957804161',
  phoneDisplay: '+91 8957 804 161',
  whatsappRaw: '918957804161',
  whatsappUrl: 'https://wa.me/918957804161',
  email: 'hello@solitairejewelleryboutique.com',
  instagram: 'https://www.instagram.com/solitairejewelleryboutique/',
  instagramHandle: '@solitairejewelleryboutique',
  address: {
    street: 'Swaroop Nagar',
    locality: 'Kanpur',
    region: 'UP',
    postalCode: '208002',
    country: 'IN',
    full: 'Swaroop Nagar, Kanpur, UP 208002',
  },
  geo: {
    latitude: 26.4778,
    longitude: 80.3221,
  },
  hours: {
    weekdays: 'Mon–Sat · 11 AM – 8 PM',
    sunday: 'Sunday · By appointment',
  },
  hoursSpec: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '20:00',
    },
  ],
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Solitaire+Jewellery+Boutique+Swaroop+Nagar+Kanpur',
} as const;

export type NavItem = {
  label: string;
  href: string;
  hasMega?: boolean;
};

export const NAV_PRIMARY: readonly NavItem[] = [
  { label: 'Collections', href: '/collections', hasMega: true },
  { label: 'Bridal',    href: '/bridal' },
  { label: 'Journal',   href: '/journal' },
  { label: 'The Atelier', href: '/craftsmanship' },
  { label: 'Visit',     href: '/visit' },
];

export function whatsappLinkFor(message: string): string {
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
