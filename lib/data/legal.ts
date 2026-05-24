type LegalDoc = {
  slug: 'privacy' | 'terms' | 'cookies' | 'returns';
  title: string;
  description: string;
  lastUpdated: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Solitaire Jewellery Boutique collects, uses, and protects your information — drafted to align with the Indian DPDPA, 2023.',
    lastUpdated: '1 May 2026',
    body: [
      {
        heading: 'Who we are',
        paragraphs: [
          'Solitaire Jewellery Boutique ("Solitaire", "we", "us") is a jewellery retailer operating from Swaroop Nagar, Kanpur, Uttar Pradesh. We process personal data in connection with the operation of our boutique, our website, and our customer service channels.',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'When you submit an enquiry, book a consultation, subscribe to our newsletter, or contact us via WhatsApp, we collect the information you provide — typically your name, phone number, email, wedding date (for bridal consultations), and the details of your enquiry.',
          'Our website uses privacy-first analytics (Plausible) by default. With your consent we also load Google Analytics and Meta Pixel for advertising attribution. You can withdraw consent at any time from the cookie banner.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use your information to respond to your enquiry, confirm your appointment, and follow up on the outcome. We do not sell your data. We share it with service providers (Cal.com for appointments, Resend for email, Vercel for hosting) only to the extent needed to operate the service.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right to access, correct, and delete the personal data we hold about you. You also have the right to withdraw consent and the right to grievance redressal. Email us at hello@solitairejewelleryboutique.com to exercise any of these rights — we will respond within 30 days.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description:
      'Terms governing the use of solitairejewelleryboutique.com and any services provided through it.',
    lastUpdated: '1 May 2026',
    body: [
      {
        heading: 'Use of the website',
        paragraphs: [
          'This website is provided as a digital storefront for the Solitaire Jewellery Boutique in Swaroop Nagar, Kanpur. It is for informational purposes — pieces shown here are not sold online; transactions take place in-store or via direct contact with our team.',
        ],
      },
      {
        heading: 'Pricing & availability',
        paragraphs: [
          'All prices are on enquiry. The pieces shown may not always be in stock; we will confirm availability when you contact us. Gold and certain stones are priced at the prevailing day rate, which may change without notice.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'All photographs, copy, and design elements on this site are the property of Solitaire Jewellery Boutique unless otherwise indicated. You may not reproduce them for commercial purposes without permission.',
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description:
      'How we use cookies and similar technologies on solitairejewelleryboutique.com.',
    lastUpdated: '1 May 2026',
    body: [
      {
        heading: 'What we use',
        paragraphs: [
          'We use a small number of cookies to operate the site: a session cookie for the cookie consent banner itself, and (with your consent) Google Analytics cookies for advertising attribution. Plausible, our default analytics, is cookieless.',
        ],
      },
      {
        heading: 'Your control',
        paragraphs: [
          'You can accept all cookies, reject non-essential cookies, or customise your choice from the banner that appears on your first visit. You can change your decision at any time by clearing your browser data and reloading the site.',
        ],
      },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Boutique Policy',
    description:
      'Our policy on authentication, after-sales service, exchange, and buy-back.',
    lastUpdated: '1 May 2026',
    body: [
      {
        heading: 'Authentication',
        paragraphs: [
          'Every piece sold by Solitaire comes with a Solitaire authentication card. Diamonds of significance carry a GIA or IGI certificate. Gold pieces carry the BIS hallmark. Keep these documents — they are required for resale, exchange, and insurance.',
        ],
      },
      {
        heading: 'After-sales service',
        paragraphs: [
          'Bring the piece in once a year for a complimentary check-up — we tighten settings, polish the gold, and re-foil any kundan that has loosened. This service is for the life of the piece.',
        ],
      },
      {
        heading: 'Exchange & buy-back',
        paragraphs: [
          'Pieces purchased from us are eligible for exchange against future purchases at the prevailing valuation. Gold is bought back at the day rate less making; diamonds at a percentage of the original price. Bring the piece, the certificate, and the authentication card.',
        ],
      },
      {
        heading: 'Returns',
        paragraphs: [
          'Made-to-order and personalised pieces are not returnable. Stock pieces may be exchanged within seven days of purchase, in original condition, against another piece of equal or greater value.',
        ],
      },
    ],
  },
};

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL[slug];
}
