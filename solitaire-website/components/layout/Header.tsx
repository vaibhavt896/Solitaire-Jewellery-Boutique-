'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NAV_PRIMARY, SITE, whatsappLinkFor } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { Logo } from '@/components/Logo';
import {
  IconClose,
  IconMenu,
  IconSearch,
  IconWhatsApp,
} from '@/components/icons/Icon';

// Split the 6 nav items evenly around the centred logo
const leftNav  = NAV_PRIMARY.slice(0, 3); // Collections · Bridal · Story
const rightNav = NAV_PRIMARY.slice(3);    // Craftsmanship · Visit · Journal

/* ── Book appointment dropdown ───────────────────────────── */
function BookDropdown() {
  const items = [
    { label: 'Bridal Consultation',  sub: '45-minute private appointment',   href: '/bridal/book' },
    { label: 'Engagement Ring',      sub: 'For the solitaire selection',      href: '/bridal/book?type=engagement' },
    { label: 'Visit the Boutique',   sub: 'Swaroop Nagar, Kanpur',           href: '/visit' },
  ];
  return (
    <div
      style={{
        background: 'rgba(253,250,245,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(216,205,178,0.40)',
        boxShadow: '0 20px 48px rgba(26,20,16,0.12)',
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-5 py-4 hover:bg-bone-deep transition-colors border-b border-line/40 last:border-0"
        >
          <p className="text-small font-medium text-ink" style={{ letterSpacing: '0.02em' }}>
            {item.label}
          </p>
          <p className="mt-0.5 text-ink-muted" style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.03em' }}>
            {item.sub}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [drawer, setDrawer]         = useState(false);
  const [mega, setMega]             = useState(false);
  const [bookOpen, setBookOpen]     = useState(false);
  const megaTimer                   = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bookTimer                   = useRef<ReturnType<typeof setTimeout>>(undefined);

  const openMega  = () => { clearTimeout(megaTimer.current); setMega(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMega(false), 140); };
  const openBook  = () => { clearTimeout(bookTimer.current); setBookOpen(true); };
  const closeBook = () => { bookTimer.current = setTimeout(() => setBookOpen(false), 140); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 108);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  const glass = !scrolled;

  // Shared nav-link colour helpers (inline style = reacts to glass state at runtime)
  const linkColor  = glass ? 'rgba(251,247,238,0.68)' : 'var(--ink)';
  const hoverColor = glass ? 'var(--bone)'             : 'var(--gold-deep)';
  const lineColor  = glass ? 'var(--gold-soft)'        : 'var(--gold)';

  return (
    <>
      {/* ─────────────────────────────────────── HEADER ── */}
      <header
        className="sticky top-0 z-40"
        style={{
          height: 120,
          background: glass ? 'transparent' : 'rgba(251,247,238,0.97)',
          backdropFilter:         glass ? 'none' : 'blur(20px)',
          WebkitBackdropFilter:   glass ? 'none' : 'blur(20px)',
          borderBottom: glass
            ? '1px solid rgba(255,255,255,0.13)'
            : '1px solid rgba(216,205,178,0.40)',
          transition: 'background 0.65s ease, border-color 0.65s ease',
        }}
      >
        {/* ── Mobile row ─────────────────────────────── */}
        <div className="lg:hidden container-wide flex items-center justify-between h-full">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawer(true)}
            className="p-2 -ml-2"
            style={{ color: glass ? 'rgba(251,247,238,0.85)' : 'var(--ink)', transition: 'color 0.4s' }}
          >
            <IconMenu />
          </button>

          <Link href="/" aria-label="Solitaire — home">
            <Logo light={glass} />
          </Link>

          <a
            href={whatsappLinkFor(`Hello Solitaire — I'd like to enquire.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="p-2 -mr-2"
            style={{ color: glass ? 'rgba(251,247,238,0.85)' : 'var(--ink)', transition: 'color 0.4s' }}
          >
            <IconWhatsApp />
          </a>
        </div>

        {/* ── Desktop: 3-column split-logo grid ─────── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-full container-wide">

          {/* LEFT NAV */}
          <nav className="flex items-center gap-12" aria-label="Primary left">
            {leftNav.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() => item.hasMega ? openMega() : closeMega()}
                onMouseLeave={() => item.hasMega && closeMega()}
              >
                <NavLink href={item.href} linkColor={linkColor} hoverColor={hoverColor} lineColor={lineColor}>
                  {item.label}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* CENTRE LOGO */}
          <Link
            href="/"
            aria-label="Solitaire — home"
            className="flex items-center justify-center px-16"
          >
            <Logo light={glass} />
          </Link>

          {/* RIGHT NAV + UTILITIES */}
          <div className="flex items-center justify-end gap-8">
            <nav className="flex items-center gap-12" aria-label="Primary right">
              {rightNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  linkColor={linkColor}
                  hoverColor={hoverColor}
                  lineColor={lineColor}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Thin rule between nav and icons */}
            <span
              aria-hidden
              style={{
                display: 'block',
                width: 1,
                height: 16,
                background: glass ? 'rgba(251,247,238,0.22)' : 'rgba(216,205,178,0.70)',
                flexShrink: 0,
              }}
            />

            {/* Icon utilities */}
            <Link
              href="/search"
              aria-label="Search"
              style={{ color: glass ? 'rgba(251,247,238,0.60)' : 'var(--ink-soft)', transition: 'color 0.4s' }}
              onMouseEnter={e => { e.currentTarget.style.color = glass ? 'var(--bone)' : 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = glass ? 'rgba(251,247,238,0.60)' : 'var(--ink-soft)'; }}
            >
              <IconSearch size={17} />
            </Link>

            <a
              href={whatsappLinkFor(`Hello Solitaire — I'd like to know more about visiting your Swaroop Nagar boutique.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Solitaire"
              style={{ color: glass ? 'rgba(251,247,238,0.60)' : 'var(--ink-soft)', transition: 'color 0.4s' }}
              onMouseEnter={e => { e.currentTarget.style.color = glass ? 'var(--bone)' : 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = glass ? 'rgba(251,247,238,0.60)' : 'var(--ink-soft)'; }}
            >
              <IconWhatsApp size={17} />
            </a>

            {/* Book Appointment — always visible, ghost in glass mode */}
            <div
              className="relative"
              onMouseEnter={openBook}
              onMouseLeave={closeBook}
            >
              <Link
                href="/bridal/book"
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  letterSpacing: '0.20em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--bone)',
                  background: glass ? 'transparent' : 'var(--ink)',
                  border: glass ? '1px solid rgba(255,255,255,0.45)' : '1px solid transparent',
                  padding: '9px 17px',
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = glass
                    ? 'rgba(255,255,255,0.12)'
                    : 'var(--gold-deep)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = glass ? 'transparent' : 'var(--ink)';
                }}
              >
                Book
              </Link>

              {bookOpen && (
                <div
                  className="absolute top-full right-0 z-50 mt-2 min-w-[230px]"
                  onMouseEnter={openBook}
                  onMouseLeave={closeBook}
                >
                  <BookDropdown />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mega menu — full width, anchored below header ── */}
        {mega && (
          <div
            className="absolute top-full left-0 right-0 z-50"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <MegaMenu onClose={() => { setMega(false); }} />
          </div>
        )}
      </header>

      {/* ─────────────────────────────────── MOBILE DRAWER ── */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 bg-bone overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="container-wide flex items-center justify-between h-[120px] border-b border-line">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawer(false)}
              className="p-2 -mr-2 text-ink"
            >
              <IconClose />
            </button>
          </div>

          <nav className="container-wide py-10 flex flex-col" aria-label="Mobile">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawer(false)}
                className="font-display text-h1 py-4 border-b border-line/50 hover:text-gold-deep transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/bridal/book"
              onClick={() => setDrawer(false)}
              className="mt-10 self-start text-small uppercase tracking-button font-medium bg-ink text-bone px-7 py-4 hover:bg-gold-deep transition-colors"
            >
              Book Appointment
            </Link>

            <div className="mt-10 space-y-1.5 text-small text-ink-soft">
              <p>{SITE.address.full}</p>
              <p>{SITE.hours.weekdays}</p>
              <p>{SITE.phoneDisplay}</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/* ── Reusable nav link with animated gold underline ─────── */
function NavLink({
  href,
  children,
  linkColor,
  hoverColor,
  lineColor,
}: {
  href: string;
  children: React.ReactNode;
  linkColor: string;
  hoverColor: string;
  lineColor: string;
}) {
  return (
    <Link
      href={href}
      className="group relative"
      style={{
        fontSize: 12,
        letterSpacing: '0.14em',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: linkColor,
        transition: 'color 0.35s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = hoverColor; }}
      onMouseLeave={e => { e.currentTarget.style.color = linkColor; }}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-[3px] left-0 h-px w-full scale-x-0 origin-left group-hover:scale-x-100"
        style={{
          background: lineColor,
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </Link>
  );
}

/* ── Collections mega menu ───────────────────────────────── */
function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        background: 'rgba(253,250,245,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(216,205,178,0.40)',
        boxShadow: '0 24px 60px rgba(26,20,16,0.10)',
      }}
    >
      <div className="container-wide py-10">
        <div className="flex items-center gap-3 mb-7">
          <span
            aria-hidden
            style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)', opacity: 0.6 }}
          />
          <p className="eyebrow text-ink-muted">Collections</p>
        </div>
        <div className="grid grid-cols-4 gap-x-7 gap-y-2">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              onClick={onClose}
              className="group block pb-5"
            >
              <div className="aspect-[5/3] bg-bone-deep overflow-hidden mb-3.5">
                <img
                  src={c.hero.src}
                  alt={c.hero.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <p
                className="text-small font-medium transition-colors duration-300 group-hover:text-gold-deep"
                style={{ letterSpacing: '0.01em' }}
              >
                {c.title}
              </p>
              <p className="text-micro text-ink-muted mt-0.5" style={{ letterSpacing: '0.04em' }}>
                {c.pieceCount} pieces
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-line/40 flex items-center justify-between">
          <p className="text-small text-ink-muted">
            Polki · Solitaires · Antique Gold · Dubai · Kundan · More
          </p>
          <Link
            href="/collections"
            onClick={onClose}
            className="text-small uppercase tracking-button font-medium text-ink hover:text-gold-deep transition-colors"
            style={{ fontSize: 10.5, letterSpacing: '0.16em' }}
          >
            View All Collections →
          </Link>
        </div>
      </div>
    </div>
  );
}
