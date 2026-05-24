import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, whatsappLinkFor } from '@/lib/site';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  IconCalendar,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from '@/components/icons/Icon';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'WhatsApp, call, email, or visit Solitaire Jewellery Boutique in Swaroop Nagar, Kanpur. We respond within the hour.',
  path: '/contact',
});

const ROUTES = [
  {
    Icon: IconWhatsApp,
    label: 'WhatsApp',
    helper: 'Within the hour',
    href: whatsappLinkFor("Hi Solitaire — I'd like to ask a question."),
    cta: 'Open WhatsApp',
    external: true,
  },
  {
    Icon: IconPhone,
    label: 'Call',
    helper: SITE.phoneDisplay,
    href: `tel:${SITE.phoneRaw}`,
    cta: 'Tap to Call',
    external: false,
  },
  {
    Icon: IconCalendar,
    label: 'Book Appointment',
    helper: 'A private 45 minutes',
    href: '/bridal/book',
    cta: 'Book Now',
    external: false,
  },
  {
    Icon: IconPin,
    label: 'Visit',
    helper: 'Swaroop Nagar, Kanpur',
    href: SITE.mapsDirectionsUrl,
    cta: 'Get Directions',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ])}
      />

      <section className="section-pad bg-bone">
        <div className="container-content">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="display-page">Let's talk on your channel.</h1>
            <p className="body-lead mt-6 max-w-xl mx-auto">
              We respond to WhatsApp within the hour. Call us at the boutique
              directly. Or visit us in Swaroop Nagar, where the conversation is
              best.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {ROUTES.map(({ Icon, label, helper, href, cta, external }, i) => (
              <Reveal key={label} delay={i * 0.05}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-paper border border-line p-8 md:p-10 hover:bg-gold-veil hover:border-gold transition-colors h-full"
                  >
                    <RouteContent
                      Icon={Icon}
                      label={label}
                      helper={helper}
                      cta={cta}
                    />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="group block bg-paper border border-line p-8 md:p-10 hover:bg-gold-veil hover:border-gold transition-colors h-full"
                  >
                    <RouteContent
                      Icon={Icon}
                      label={label}
                      helper={helper}
                      cta={cta}
                    />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <p className="text-small text-ink-muted">
              Or write to us at{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline text-ink"
              >
                {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function RouteContent({
  Icon,
  label,
  helper,
  cta,
}: {
  Icon: (p: { size?: number }) => React.ReactNode;
  label: string;
  helper: string;
  cta: string;
}) {
  return (
    <>
      <Icon size={28} />
      <p className="eyebrow mt-6">{label}</p>
      <p className="font-display text-h1 mt-2">{helper}</p>
      <p className="text-small text-ink-muted mt-6 group-hover:text-ink-soft">
        {cta} →
      </p>
    </>
  );
}
