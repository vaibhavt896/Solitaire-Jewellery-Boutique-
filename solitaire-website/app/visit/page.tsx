import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, jewelryStoreSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { IconPin } from '@/components/icons/Icon';
import { CopyAddressButton } from '@/components/CopyAddressButton';

export const metadata: Metadata = buildMetadata({
  title: 'Visit Us — Swaroop Nagar, Kanpur',
  description:
    'Solitaire Jewellery Boutique is on Swaroop Nagar, Kanpur. Open Mon–Sat, 11 AM – 8 PM. By appointment on Sunday. WhatsApp +91 8957 804 161.',
  path: '/visit',
});

const GALLERY = [
  'https://images.unsplash.com/photo-1620794108219-aedbaded4eea?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
];

export default function VisitPage() {
  return (
    <>
      <JsonLd data={jewelryStoreSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Visit', href: '/visit' },
        ])}
      />

      {/* Map */}
      <section className="relative bg-bone-deep">
        <a
          href={SITE.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-[60vh] min-h-[420px] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#F2EAD0_0%,#FBF7EE_50%,#E8DCC0_100%)]" />
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full opacity-50"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
          >
            <g stroke="var(--line)" strokeWidth="1.2" fill="none">
              <path d="M0 100 Q300 80 600 130 T1200 110" />
              <path d="M0 220 Q300 200 600 240 T1200 230" />
              <path d="M0 340 Q300 320 600 360 T1200 350" />
              <path d="M0 460 Q300 440 600 480 T1200 470" />
              <path d="M200 0 Q220 200 180 400 T160 600" />
              <path d="M500 0 Q520 200 480 400 T460 600" />
              <path d="M800 0 Q820 200 780 400 T760 600" />
              <path d="M1080 0 Q1100 200 1060 400 T1040 600" />
            </g>
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-ink rounded-full p-4 text-bone shadow-2xl">
              <IconPin size={28} />
            </div>
            <div className="mt-4 bg-paper px-5 py-3 border border-line shadow-md">
              <p className="font-display text-h2">Solitaire Jewellery Boutique</p>
              <p className="text-small text-ink-muted mt-1">
                {SITE.address.full}
              </p>
            </div>
          </div>
          <div className="absolute bottom-6 right-6">
            <span className="bg-ink text-bone px-5 py-3 text-small uppercase tracking-button group-hover:bg-gold-deep transition-colors">
              Open in Google Maps →
            </span>
          </div>
        </a>
      </section>

      {/* Visit info */}
      <section className="section-pad bg-bone">
        <div className="container-wide">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow">Visit Solitaire</p>
            <h1 className="display-page mt-3">Find us, before you find a piece.</h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
            <Reveal>
              <h2 className="eyebrow mb-3">The Boutique</h2>
              <p className="font-display text-h1 leading-snug">
                Swaroop Nagar
                <br />
                Kanpur, UP 208002
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get Directions
                </a>
                <CopyAddressButton />

              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="eyebrow mb-3">Hours</h2>
              <p className="text-body">
                {SITE.hours.weekdays}
                <br />
                {SITE.hours.sunday}
              </p>
              <h2 className="eyebrow mb-3 mt-8">Phone & WhatsApp</h2>
              <p className="text-body">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="link-underline text-ink"
                >
                  {SITE.phoneDisplay}
                </a>
                <br />
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  Tap to message us on WhatsApp
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Boutique gallery */}
      <section className="section-pad bg-bone-deep">
        <div className="container-wide">
          <Reveal className="mb-16">
            <p className="eyebrow">Inside the Boutique</p>
            <h2 className="display-page mt-3">A small room, considered carefully.</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((src, i) => (
              <Reveal
                key={src}
                delay={i * 0.04}
                className={i === 0 || i === 4 ? 'md:row-span-2' : ''}
              >
                <div
                  className={`overflow-hidden bg-bone ${
                    i === 0 || i === 4 ? 'aspect-[3/5]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Inside the Solitaire boutique, Kanpur — view ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coming from Lucknow */}
      <section className="section-pad bg-bone">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Coming from Lucknow?</p>
            <h2 className="display-page mt-3">90 minutes on the Agra Expressway.</h2>
            <p className="body-lead mt-6">
              Many of our customers visit on a half-day trip — a morning
              appointment, lunch in Civil Lines, and home by evening. Schedule
              a Bridal Consultation in advance and we'll have your curation
              ready when you arrive.
            </p>
            <Link href="/bridal/book" className="btn-primary mt-10 inline-flex">
              Plan Your Lucknow Visit
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Walk-ins */}
      <section className="section-pad bg-bone-deep">
        <div className="container-content">
          <Reveal>
            <p className="eyebrow">Walk-ins Welcome</p>
            <h2 className="display-page mt-3">No appointment needed for browsing.</h2>
            <p className="body-lead mt-6">
              For solitaire consultations, bridal sets, or large-set viewings,
              an appointment ensures your pieces are ready when you arrive.
            </p>
            <Link href="/bridal/book" className="btn-secondary mt-10 inline-flex">
              Book an Appointment
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
