'use client';

/* ──────────────────────────────────────────────────────────
   Footer — light, warm-beige editorial footer.
   Brand block + four columns (Collections · Quick Links ·
   Customer Care · Newsletter) and a bottom legal bar.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { SITE } from '@/lib/site';

const FOOT_BG = '#ECE4D3';

/* ── Social icons ── */
const sBase = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true } as const;
const IconIg = () => (
  <svg {...sBase} fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconFb = () => (
  <svg {...sBase} fill="currentColor">
    <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7H14v-7h2.2l.3-3H14V9.5c0-.3.2-.5.5-.5z" />
  </svg>
);

const SOCIALS = [
  { label: 'Instagram', href: SITE.instagram, Icon: IconIg },
  { label: 'Facebook',  href: SITE.facebook,  Icon: IconFb },
];

/* ── Column data ── */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Collections',
    links: [
      { label: 'Bridal Jewellery',   href: '/collections/bridal' },
      { label: 'Heritage Jewellery', href: '/collections/antique-gold' },
      { label: 'Diamond Jewellery',  href: '/collections/diamond' },
      { label: 'Polki Jewellery',    href: '/collections/polki' },
      { label: 'Temple Jewellery',   href: '/collections/temple' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Our Story',     href: '/story' },
      { label: 'Craftsmanship', href: '/craftsmanship' },
      { label: 'Private Viewing', href: '/visit' },
      { label: 'Appointments',  href: '/bridal/book' },
      { label: 'Visit Us',      href: '/visit' },
      { label: 'Contact Us',    href: '/contact' },
    ],
  },
  {
    title: 'Visit & Care',
    links: [
      { label: 'Store FAQs',        href: '/trust' },
      { label: 'Boutique Policy',   href: '/legal/returns' },
      { label: 'Jewellery Care',    href: '/journal/caring-for-your-polki-pieces' },
      { label: 'Book Appointment',  href: '/bridal/book' },
      { label: 'Contact Us',        href: '/contact' },
    ],
  },
];

/* ── Newsletter (light) ── */
function NewsletterForm() {
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 700));
    setStatus('success');
    setEmail('');
  };

  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: 'var(--stone-600)',
          marginBottom: '1rem',
          maxWidth: 240,
        }}
      >
        Subscribe to receive updates on our latest collections and offers.
      </p>

      {status === 'success' ? (
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--gold-deep)' }}>
          Thank you — we&rsquo;ll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex">
          <label className="sr-only" htmlFor="footer-email">Email address</label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            style={{
              flex: 1,
              minWidth: 0,
              background: '#FFFFFF',
              border: '1px solid var(--ivory-smoke)',
              borderRight: 'none',
              borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
              padding: '11px 14px',
              color: 'var(--obsidian)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--aged-gold)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--ivory-smoke)'; }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: 'var(--aged-gold)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              padding: '11px 18px',
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s ease',
              opacity: status === 'loading' ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold-deep)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--aged-gold)'; }}
          >
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}

/* ── Footer link ── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: 'var(--stone-600)',
          transition: 'color 0.3s ease',
          display: 'block',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--stone-600)'; }}
      >
        {children}
      </Link>
    </li>
  );
}

/* ── Footer ── */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: FOOT_BG, color: 'var(--obsidian)', borderTop: '1px solid var(--ivory-smoke)' }}>
      <div className="container-wide pb-24 lg:pb-10" style={{ paddingTop: '4.5rem' }}>

        {/* Brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand block */}
          <div className="col-span-2 md:col-span-4 lg:pr-8">
            <Link href="/" aria-label="Solitaire, home" className="inline-block mb-5">
              <Logo />
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--stone-600)',
                maxWidth: 260,
                marginBottom: '1.5rem',
              }}
            >
              Crafting timeless jewellery that celebrates your most precious moments with elegance and trust.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center"
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid var(--ivory-smoke)',
                    background: '#FFFFFF',
                    color: 'var(--stone-600)',
                    transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'var(--aged-gold)'; e.currentTarget.style.borderColor = 'var(--aged-gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--stone-600)'; e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = 'var(--ivory-smoke)'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — last one spans full width on phones to avoid a lone half-cell */}
          {COLUMNS.map((col, ci) => (
            <div
              key={col.title}
              className={`${ci === COLUMNS.length - 1 ? 'col-span-2 md:col-span-2' : 'col-span-1'} md:col-span-2`}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--obsidian)',
                  marginBottom: '1.25rem',
                }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <FooterLink key={l.label + l.href} href={l.href}>{l.label}</FooterLink>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--obsidian)',
                marginBottom: '1.25rem',
              }}
            >
              Newsletter
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: '1px solid var(--ivory-smoke)' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
            &copy; {year} Solitaire Jewellery Boutique. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
            <Link
              href="/legal/privacy"
              style={{ color: 'var(--ink-muted)', transition: 'color 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-muted)'; }}
            >
              Privacy Policy
            </Link>
            <span aria-hidden style={{ color: 'var(--ivory-smoke)' }}>|</span>
            <Link
              href="/legal/terms"
              style={{ color: 'var(--ink-muted)', transition: 'color 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-muted)'; }}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
