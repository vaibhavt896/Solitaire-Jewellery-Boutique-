'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';

export function Footer() {
  return (
    <footer className="bg-ink text-bone mt-16">
      <div className="container-wide py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-3">
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

          {/* Collections column */}
          <FooterColumn title="Collections">
            {COLLECTIONS.slice(0, 6).map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.title}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Learn column — surfaces journal content */}
          <FooterColumn title="Learn">
            <FooterLink href="/journal/polki-vs-kundan-a-buyers-guide">
              Polki vs Kundan Guide
            </FooterLink>
            <FooterLink href="/journal/how-to-verify-a-gia-certified-solitaire">
              Verify a GIA Certificate
            </FooterLink>
            <FooterLink href="/journal/wedding-jewellery-checklist-up-bride">
              Bridal Checklist
            </FooterLink>
            <FooterLink href="/trust">Trust & Certification</FooterLink>
            <FooterLink href="/craftsmanship">Craftsmanship</FooterLink>
            <FooterLink href="/journal">All Articles</FooterLink>
          </FooterColumn>

          {/* Visit column */}
          <FooterColumn title="Visit">
            <FooterLink href="/visit">Swaroop Nagar</FooterLink>
            <FooterLink href={SITE.mapsDirectionsUrl} external>
              Get Directions
            </FooterLink>
            <FooterLink href="/visit">Hours</FooterLink>
            <FooterLink href="/bridal/book">Book Appointment</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterColumn>

          {/* Connect column */}
          <FooterColumn title="Connect">
            <FooterLink href={SITE.instagram} external>
              Instagram
            </FooterLink>
            <FooterLink href={SITE.whatsappUrl} external>
              WhatsApp
            </FooterLink>
            <FooterLink href={`mailto:${SITE.email}`}>Email</FooterLink>
            <FooterLink href="/story">Our Story</FooterLink>
            <FooterLink href="/journal">Journal</FooterLink>
          </FooterColumn>

        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-bone/15">
          <NewsletterForm />
        </div>

        {/* Social proof trust line */}
        <div className="mt-12 pt-8 border-t border-bone/15">
          <p
            className="text-center text-bone/50"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Trusted by 500+ families in Kanpur · Certified by GIA & IGI · BIS Hallmarked
          </p>
        </div>

        {/* Copyright bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-micro text-bone/60">
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

function NewsletterForm() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    /* Placeholder: replace with real email service call */
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setMessage('Thank you. We will be in touch.');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="md:flex-1">
          <p className="font-display text-h2" style={{ color: 'var(--bone)' }}>
            A monthly note from the boutique
          </p>
        </div>
        <p className="text-small text-gold-soft md:max-w-md">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col md:flex-row md:items-center gap-4"
    >
      <div className="md:flex-1">
        <p className="font-display text-h2" style={{ color: 'var(--bone)' }}>
          A monthly note from the boutique
        </p>
        <p className="text-small text-bone/70 mt-2 max-w-md">
          New pieces, occasional notes on craftsmanship, and a heads-up before each
          Akshaya Tritiya and Dhanteras. No more than once a month.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:max-w-md md:w-full">
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            placeholder="Your email"
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            aria-invalid={status === 'error'}
            disabled={status === 'loading'}
            className="flex-1 bg-transparent border border-bone/30 px-4 py-3 text-bone placeholder:text-bone/50 focus:border-gold-soft focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-gold-soft text-ink px-6 py-3 text-small uppercase tracking-button font-medium hover:bg-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </div>
        {status === 'error' && (
          <p id="newsletter-error" role="alert" className="text-micro text-rose">
            {message || 'Something went wrong. Please try again.'}
          </p>
        )}
      </div>
    </form>
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
      <p className="text-micro uppercase tracking-eyebrow text-gold-soft mb-5">{title}</p>
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
      <Link href={href} className="text-small text-bone/80 hover:text-gold-soft transition-colors">
        {children}
      </Link>
    </li>
  );
}
