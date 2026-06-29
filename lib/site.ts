export const SITE = {
  name: 'Solitaire Jewellery Boutique',
  shortName: 'Solitaire',
  url: 'https://solitairejewelleryboutique.com',
  description:
    'A small family jewellery boutique in Swaroop Nagar, Kanpur. Polki, antique gold, temple jewellery, and GIA/IGI certified diamonds, chosen by hand, kept for life.',
  tagline: 'Worn for your big day. Kept for hers.',
  phoneRaw: '+918957804161',
  phoneDisplay: '+91 8957 804 161',
  whatsappRaw: '918957804161',
  whatsappUrl: 'https://wa.me/918957804161',
  /* No public email: per the copy revamp we lead with WhatsApp so no
     enquiry lands in an unwatched inbox. */
  instagram: 'https://www.instagram.com/solitairejewelleryboutique/?hl=en',
  instagramHandle: '@solitairejewelleryboutique',
  facebook: 'https://www.facebook.com/solitairejewelleryboutique',
  address: {
    street: 'Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line',
    locality: 'Swaroop Nagar, Kanpur',
    region: 'Uttar Pradesh',
    postalCode: '208002',
    country: 'IN',
    full: 'Lane of Skin Mantraa, 113/65B, Behind Hotel Royal Cliff, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002',
  },
  geo: {
    latitude: 26.4778,
    longitude: 80.3221,
  },
  hours: {
    weekdays: 'Mon–Sat · 12 noon – 8 PM',
    sunday: 'Sunday · By appointment',
  },
  hoursSpec: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '12:00',
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
  { label: 'Bridal',      href: '/bridal' },
  { label: 'Our Story',   href: '/story' },
  { label: 'Visit Us',    href: '/visit' },
];

export function whatsappLinkFor(message: string): string {
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/* Pre-filled WhatsApp openers, start the message so the visitor never
   has to think "what do I even say". */
export const WHATSAPP_MESSAGES = {
  general:
    'Hello Solitaire, I would like to ask about a few pieces. When is a good time to visit?',
  bridal:
    'Hello Solitaire, I am planning my wedding jewellery and would like to book a private sitting.',
  piece: (name: string, sku: string) =>
    `Hello Solitaire, I saw the ${name} (code ${sku}) on your website and would like to know more.`,
} as const;
