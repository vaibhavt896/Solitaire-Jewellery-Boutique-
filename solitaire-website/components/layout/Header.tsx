'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_PRIMARY, SITE, whatsappLinkFor } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { Logo } from '@/components/Logo';
import {
  IconClose,
  IconMenu,
  IconSearch,
  IconWhatsApp,
} from '@/components/icons/Icon';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-bone/95 backdrop-blur-md shadow-[0_1px_0_var(--line)]' : 'bg-bone'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20">
        {/* Mobile menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setDrawer(true)}
          className="lg:hidden p-2 -ml-2 text-ink"
        >
          <IconMenu />
        </button>

        {/* Logo */}
        <Link href="/" aria-label="Solitaire — home" className="flex items-center">
          <Logo />
        </Link>

        {/* Primary nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_PRIMARY.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.hasMega && setMega(true)}
              onMouseLeave={() => item.hasMega && setMega(false)}
            >
              <Link
                href={item.href}
                className="relative text-small uppercase tracking-button font-medium text-ink hover:text-gold-deep transition-colors"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100"
                />
              </Link>
              {item.hasMega && mega && <MegaMenu onClose={() => setMega(false)} />}
            </div>
          ))}
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden md:inline-flex p-2 text-ink hover:text-gold-deep transition-colors"
          >
            <IconSearch />
          </Link>
          <a
            href={whatsappLinkFor(`Hello Solitaire — I'd like to know more about visiting your Swaroop Nagar boutique.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Solitaire"
            className="p-2 text-ink hover:text-gold-deep transition-colors"
          >
            <IconWhatsApp />
          </a>
          <Link
            href="/bridal/book"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '0.75rem 1.25rem', minHeight: 40 }}
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 bg-bone overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="container-wide flex items-center justify-between h-20">
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
          <nav className="container-wide py-8 flex flex-col gap-1" aria-label="Mobile">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawer(false)}
                className="font-display text-h1 py-3 border-b border-line hover:text-gold-deep transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/bridal/book"
              onClick={() => setDrawer(false)}
              className="btn-primary mt-8 self-start"
            >
              Book Appointment
            </Link>
            <div className="mt-8 text-small text-ink-soft">
              <p>{SITE.address.full}</p>
              <p className="mt-1">{SITE.hours.weekdays}</p>
              <p className="mt-1">{SITE.phoneDisplay}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
      onMouseLeave={onClose}
    >
      <div className="w-[920px] max-w-[95vw] bg-paper border border-line shadow-[0_24px_48px_var(--shadow)] p-8">
        <p className="eyebrow mb-6">Collections</p>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              onClick={onClose}
              className="group block"
            >
              <div className="aspect-[5/4] bg-bone-deep overflow-hidden mb-3">
                <img
                  src={c.hero.src}
                  alt={c.hero.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="font-display text-h3 group-hover:text-gold-deep transition-colors">
                {c.title}
              </p>
              <p className="text-small text-ink-muted mt-0.5">{c.pieceCount} pieces</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
