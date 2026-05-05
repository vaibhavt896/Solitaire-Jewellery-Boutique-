import Link from 'next/link';
import { SITE } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-ink text-bone mt-16">
      <div className="container-wide py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="text-bone">
              <span
                className="font-display text-h2 font-medium tracking-wide block"
                style={{ color: 'var(--bone)' }}
              >
                Solitaire
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    background: 'var(--gold-soft)',
                    borderRadius: '50%',
                    margin: '0 0.5rem',
                    verticalAlign: 'middle',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--gold-soft)',
                  }}
                >
                  Jewellery Boutique
                </span>
              </span>
            </div>
            <p className="mt-6 text-small text-bone/70 max-w-xs leading-relaxed">
              An ultimate destination for intricate jewellery. Swaroop Nagar, Kanpur.
            </p>
            <p className="mt-6 text-small text-bone/70">
              {SITE.address.full}
              <br />
              {SITE.hours.weekdays}
              <br />
              {SITE.phoneDisplay}
            </p>
          </div>

          <FooterColumn title="Collections">
            {COLLECTIONS.slice(0, 7).map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Visit">
            <FooterLink href="/visit">Swaroop Nagar</FooterLink>
            <FooterLink href={SITE.mapsDirectionsUrl} external>
              Get Directions
            </FooterLink>
            <FooterLink href="/visit">Hours</FooterLink>
            <FooterLink href="/bridal/book">Book Appointment</FooterLink>
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href={SITE.instagram} external>
              Instagram
            </FooterLink>
            <FooterLink href={SITE.whatsappUrl} external>
              WhatsApp
            </FooterLink>
            <FooterLink href={`mailto:${SITE.email}`}>Email</FooterLink>
            <FooterLink href="/journal">Journal</FooterLink>
          </FooterColumn>

          <FooterColumn title="The Boutique">
            <FooterLink href="/story">Our Story</FooterLink>
            <FooterLink href="/craftsmanship">Craftsmanship</FooterLink>
            <FooterLink href="/trust">Trust & Certification</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-16 pt-10 border-t border-bone/15">
          <form className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="md:flex-1">
              <p className="font-display text-h2" style={{ color: 'var(--bone)' }}>
                A monthly note from the boutique
              </p>
              <p className="text-small text-bone/70 mt-2 max-w-md">
                New pieces, occasional notes on craftsmanship, and a heads-up before each
                Akshaya Tritiya and Dhanteras. No more than once a month.
              </p>
            </div>
            <div className="flex gap-3 md:max-w-md md:w-full">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                className="flex-1 bg-transparent border border-bone/30 px-4 py-3 text-bone placeholder:text-bone/50 focus:border-gold-soft focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-gold-soft text-ink px-6 py-3 text-small uppercase tracking-button font-medium hover:bg-bone transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 pt-8 border-t border-bone/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-micro text-bone/60">
          <p>© 2026 Solitaire Jewellery Boutique. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/legal/privacy" className="hover:text-bone transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-bone transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="hover:text-bone transition-colors">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/legal/returns" className="hover:text-bone transition-colors">
                Boutique Policy
              </Link>
            </li>
            <li>
              Designed by{' '}
              <a
                href="https://wingsmedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-soft hover:text-bone transition-colors"
              >
                Wings Media
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2">
      <p className="text-micro uppercase tracking-eyebrow text-gold-soft mb-5">
        {title}
      </p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-small text-bone/80 hover:text-gold-soft transition-colors"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={href}
        className="text-small text-bone/80 hover:text-gold-soft transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
