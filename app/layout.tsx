import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter_Tight, DM_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { JsonLd } from '@/components/JsonLd';
import { jewelryStoreSchema } from '@/lib/seo/schema';
import { SITE } from '@/lib/site';
import { CustomCursor } from '@/components/CustomCursor';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Polki, Diamond & Solitaires, Swaroop Nagar Kanpur`,
    template: `%s | ${SITE.name}, Kanpur`,
  },
  description: SITE.description,
  keywords: [
    'jewellery shop Swaroop Nagar Kanpur',
    'jewellery showroom Kanpur',
    'Polki jewellery Kanpur',
    'GIA certified solitaire Kanpur',
    'bridal jewellery Kanpur',
    'antique gold Kanpur',
    'Dubai gold bangles Kanpur',
    'diamond jewellery Lucknow',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Polki & Certified Diamonds, Kanpur`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4EFE3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <JsonLd data={jewelryStoreSchema()} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-ink text-bone px-4 py-2 z-50"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
