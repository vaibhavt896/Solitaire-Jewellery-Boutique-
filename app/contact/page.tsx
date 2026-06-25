import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';
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
  title: 'Contact Solitaire | Swaroop Nagar, Kanpur',
  description:
    'Message us on WhatsApp, call the boutique, book a private sitting, or get directions to Swaroop Nagar, Kanpur. We usually reply within the hour.',
  path: '/contact',
});

const ROUTES = [
  {
    Icon: IconWhatsApp,
    label: 'WhatsApp',
    helper: 'Within the hour',
    href: whatsappLinkFor("Hi Solitaire, I'd like to ask a question."),
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
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="display-page">Reach us the way that suits you.</h1>
            <p className="body-lead mt-6 max-w-xl mx-auto">
              Message, call, book a sitting, or simply drop by. Whatever is
              easiest, we are happy to hear from you.
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
              Prefer to write? The quickest way to reach us is{' '}
              <a
                href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink"
              >
                on WhatsApp
              </a>
              .
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
