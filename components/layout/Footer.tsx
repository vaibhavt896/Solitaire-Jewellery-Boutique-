'use client';

/* ──────────────────────────────────────────────────────────
   Footer, "inside back cover of a magazine"
   Dark Mahogany background. Newsletter hero at top.
   4 editorial columns. Generous vertical space.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';

/* ── Newsletter form ── */
function NewsletterForm() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setMessage('Thank you. The next letter will arrive on the first Saturday of next month.');
    setEmail('');
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start pb-20"
      style={{ borderBottom: '1px solid rgba(244,239,227,0.10)' }}>

      {/* Left: editorial heading */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,227,0.35)',
            marginBottom: '0.75rem',
          }}
        >
          A Quiet Note
        </p>
        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--ivory)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            marginBottom: '1.25rem',
          }}
        >
          A quiet note, now and then.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.75,
            color: 'rgba(244,239,227,0.55)',
            maxWidth: 380,
          }}
        >
          New pieces, the festival edits, and a little on how to choose well.
          No noise.
        </p>
      </div>

      {/* Right: form */}
      <div className="md:pt-8">
        {status === 'success' ? (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.0625rem',
              fontStyle: 'italic',
              color: 'var(--aged-gold)',
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex gap-0">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(244,239,227,0.20)',
                  borderRight: 'none',
                  padding: '13px 16px',
                  color: 'var(--ivory)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.4s ease',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(184,146,58,0.6)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(244,239,227,0.20)'; }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'var(--aged-gold)',
                  color: 'var(--ivory)',
                  border: 'none',
                  padding: '13px 22px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.4s ease',
                  whiteSpace: 'nowrap',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.background = 'var(--mahogany)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--aged-gold)'; }}
              >
                {status === 'loading' ? '…' : 'Keep Me Posted'}
              </button>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                color: 'rgba(244,239,227,0.28)',
                marginTop: '0.75rem',
                letterSpacing: '0.04em',
              }}
            >
              We don&rsquo;t sell your email, and we don&rsquo;t write more than once a month.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Footer column ── */
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--aged-gold)',
          marginBottom: '1.25rem',
          opacity: 0.8,
        }}
      >
        {title}
      </p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const style: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: 'rgba(244,239,227,0.55)',
    transition: 'color 0.4s ease',
    display: 'block',
  };
  const onEnter = (e: React.SyntheticEvent<HTMLElement>) => { e.currentTarget.style.color = 'var(--ivory)'; };
  const onLeave = (e: React.SyntheticEvent<HTMLElement>) => { e.currentTarget.style.color = 'rgba(244,239,227,0.55)'; };

  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" style={style}
          onMouseEnter={onEnter} onMouseLeave={onLeave}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </Link>
    </li>
  );
}

/* ── Main Footer ── */
export function Footer() {
  return (
    <footer style={{ background: 'var(--mahogany)', color: 'var(--ivory)' }}>
      <div className="container-wide" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>

        {/* Newsletter, hero at top */}
        <NewsletterForm />

        {/* Brand + four columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mt-16">

          {/* Brand column (3 cols) */}
          <div className="col-span-2 md:col-span-3">
            <span
              className="font-display block"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                color: 'var(--ivory)',
                letterSpacing: '0.04em',
                marginBottom: '0.35rem',
              }}
            >
              Solitaire
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  background: 'var(--aged-gold)',
                  borderRadius: '50%',
                  margin: '0 0.4rem',
                  verticalAlign: 'middle',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--aged-gold)',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              Jewellery Boutique
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'rgba(244,239,227,0.45)',
                maxWidth: 200,
              }}
            >
              {SITE.address.full}
              <br />{SITE.hours.weekdays}
              <br />{SITE.phoneDisplay}
            </p>
          </div>

          {/* Col 1, The Boutique */}
          <div className="col-span-1 md:col-span-2 md:col-start-5">
            <FooterCol title="The Boutique">
              <FooterLink href="/story">Our Story</FooterLink>
              <FooterLink href="/craftsmanship">Craftsmanship</FooterLink>
              <FooterLink href="/trust">Trust & Certification</FooterLink>
              <FooterLink href="/bridal">Bridal</FooterLink>
            </FooterCol>
          </div>

          {/* Col 2, Collections */}
          <div className="col-span-1 md:col-span-2">
            <FooterCol title="Collections">
              <FooterLink href="/collections/polki">Polki</FooterLink>
              <FooterLink href="/collections/solitaires">Certified Solitaires</FooterLink>
              <FooterLink href="/collections/antique-gold">Antique Gold</FooterLink>
              <FooterLink href="/collections/diamond">Diamond</FooterLink>
              <FooterLink href="/collections/temple">Temple</FooterLink>
              <FooterLink href="/collections/bridal">Bridal Sets</FooterLink>
              <FooterLink href="/collections/dubai-gold-bangles">Gold Bangles</FooterLink>
            </FooterCol>
          </div>

          {/* Col 3, Visit */}
          <div className="col-span-1 md:col-span-2">
            <FooterCol title="Visit">
              <FooterLink href="/visit">Swaroop Nagar Boutique</FooterLink>
              <FooterLink href={SITE.mapsDirectionsUrl} external>Get Directions</FooterLink>
              <FooterLink href="/bridal/book">Book a Private Sitting</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCol>
          </div>

          {/* Col 4, Read */}
          <div className="col-span-1 md:col-span-3">
            <FooterCol title="Read">
              <FooterLink href="/journal">The Journal</FooterLink>
              <FooterLink href="/journal/polki-vs-kundan-a-buyers-guide">Polki vs Kundan</FooterLink>
              <FooterLink href="/journal/how-to-verify-a-gia-certified-solitaire">Verify a GIA certificate</FooterLink>
              <FooterLink href="/journal/wedding-jewellery-checklist-up-bride">The bridal checklist</FooterLink>
              <FooterLink href="/journal">All articles →</FooterLink>
            </FooterCol>
          </div>

        </div>

        {/* Trust line */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(244,239,227,0.08)' }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(244,239,227,0.25)',
            }}
          >
            Trusted by Kanpur families · GIA & IGI certified diamonds · BIS hallmarked gold
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: '1px solid rgba(244,239,227,0.06)', paddingTop: '1.5rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'rgba(244,239,227,0.28)',
            }}
          >
            &copy; Solitaire Jewellery Boutique, Kanpur. Made to be kept.
          </p>

          <ul
            className="flex flex-wrap gap-6"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
          >
            {[
              { href: '/legal/privacy',  label: 'Privacy' },
              { href: '/legal/terms',    label: 'Terms' },
              { href: '/legal/cookies',  label: 'Cookies' },
              { href: '/legal/returns',  label: 'Boutique Policy' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{ color: 'rgba(244,239,227,0.28)', transition: 'color 0.4s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.65)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.28)'; }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--aged-gold)', transition: 'color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivory)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
