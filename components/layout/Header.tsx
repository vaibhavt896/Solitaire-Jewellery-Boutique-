'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_PRIMARY, SITE, whatsappLinkFor } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { Logo } from '@/components/Logo';
import {
  IconClose,
  IconMenu,
  IconSearch,
  IconWhatsApp,
} from '@/components/icons/Icon';

/* ─────────────────────────── constants ─── */
const ANNOUNCEMENTS = [
  'Boutique open Mon–Sat, 11 AM – 8 PM  ·  Swaroop Nagar, Kanpur',
  'Every piece curated by hand  ·  Every diamond certified',
  'Private bridal consultations available  ·  Book your appointment',
];

const leftNav  = NAV_PRIMARY.slice(0, 3);
const rightNav = NAV_PRIMARY.slice(3);

/* ─────────────────────────── Announcement Bar ─── */
function AnnouncementBar() {
  const [idx, setIdx]         = useState(0);
  const [fade, setFade]       = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % ANNOUNCEMENTS.length);
        setFade(false);
      }, 350);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'var(--ink)',
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(251,247,238,0.65)',
          transition: 'opacity 0.35s ease',
          opacity: fade ? 0 : 1,
          userSelect: 'none',
          maxWidth: 'calc(100% - 52px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {ANNOUNCEMENTS[idx]}
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(251,247,238,0.35)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 6,
          lineHeight: 1,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,247,238,0.7)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,247,238,0.35)'; }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─────────────────────────── Book dropdown ─── */
function BookDropdown({ onClose }: { onClose: () => void }) {
  const items = [
    { label: 'Bridal Consultation',  sub: '45-minute private appointment',   href: '/bridal/book' },
    { label: 'Engagement Ring',      sub: 'For the solitaire selection',      href: '/bridal/book?type=engagement' },
    { label: 'Visit the Boutique',   sub: 'Swaroop Nagar, Kanpur',           href: '/visit' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(253,250,245,0.99)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(216,205,178,0.45)',
        boxShadow: '0 20px 56px rgba(26,20,16,0.14)',
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group block px-5 py-4 border-b border-line/40 last:border-0"
          style={{ transition: 'background 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bone-deep)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <p
            className="text-small font-medium text-ink group-hover:text-gold-deep"
            style={{ letterSpacing: '0.02em', transition: 'color 0.2s' }}
          >
            {item.label}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.04em', color: 'var(--ink-muted)', marginTop: 2 }}>
            {item.sub}
          </p>
        </Link>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────── Mega Menu ─── */
function MegaMenu({ onClose }: { onClose: () => void }) {
  const featured = COLLECTIONS[0];
  const grid     = COLLECTIONS.slice(1, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(253,250,245,0.99)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(216,205,178,0.38)',
        boxShadow: '0 28px 64px rgba(26,20,16,0.12)',
      }}
    >
      <div className="container-wide py-10">
        <div className="grid gap-10" style={{ gridTemplateColumns: '260px 1fr' }}>

          {/* LEFT: editorial feature */}
          <Link
            href={`/collections/${featured.slug}`}
            onClick={onClose}
            className="group relative overflow-hidden block"
            style={{ background: 'var(--bone-deep)' }}
          >
            <Image
              src={featured.hero.src}
              alt={featured.hero.alt}
              fill
              sizes="260px"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.82) 0%, rgba(26,20,16,0) 55%)' }}
            />
            <div className="relative" style={{ paddingTop: '130%' }} />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 5 }}>
                Featured
              </p>
              <p className="font-display text-bone leading-tight" style={{ fontSize: '1.25rem' }}>
                {featured.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(251,247,238,0.55)',
                  marginTop: 10,
                  transition: 'color 0.3s ease',
                }}
                className="group-hover:!text-gold-soft"
              >
                Discover Collection →
              </p>
            </div>
          </Link>

          {/* RIGHT: grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden style={{ display: 'block', width: 18, height: 1, background: 'var(--gold)', opacity: 0.55 }} />
              <p className="eyebrow text-ink-muted">All Collections</p>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-6">
              {grid.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/collections/${c.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="aspect-[4/3] bg-bone-deep overflow-hidden relative mb-3">
                      <Image
                        src={c.hero.src}
                        alt={c.hero.alt}
                        fill
                        sizes="(max-width: 1280px) 25vw, 20vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                    </div>
                    <p
                      className="text-small font-medium text-ink group-hover:text-gold-deep transition-colors duration-250"
                      style={{ letterSpacing: '0.02em' }}
                    >
                      {c.title}
                    </p>
                    <p className="text-micro text-ink-muted mt-0.5" style={{ letterSpacing: '0.04em' }}>
                      {c.pieceCount} pieces
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div
              className="mt-6 pt-5 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(216,205,178,0.35)' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                Polki · Solitaires · Antique Gold · Dubai · Kundan · More
              </p>
              <Link
                href="/collections"
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; }}
              >
                View All Collections →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── NavLink ─── */
function NavLink({
  href,
  children,
  hasMega,
  megaOpen,
}: {
  href: string;
  children: React.ReactNode;
  hasMega?: boolean;
  megaOpen?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1 active:opacity-60"
      style={{
        fontSize: 11,
        letterSpacing: '0.16em',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: 'var(--ink)',
        transition: 'color 0.3s ease, letter-spacing 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--gold-deep)';
        e.currentTarget.style.letterSpacing = '0.20em';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--ink)';
        e.currentTarget.style.letterSpacing = '0.16em';
      }}
      onFocus={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}
      onBlur={e => { e.currentTarget.style.color = 'var(--ink)'; }}
    >
      {children}
      {hasMega && (
        <svg
          width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden
          style={{
            transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s ease',
            opacity: 0.45,
            marginTop: 1,
            flexShrink: 0,
          }}
        >
          <path d="M0.5 2L3.5 5L6.5 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      )}
      <span
        aria-hidden
        className="absolute -bottom-[3px] left-0 h-px w-full scale-x-0 origin-left group-hover:scale-x-100 group-focus-within:scale-x-100"
        style={{
          background: 'var(--gold)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </Link>
  );
}

/* ─────────────────────────── NavIcon ─── */
function NavIcon({
  href,
  external,
  ariaLabel,
  children,
}: {
  href: string;
  external?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: '50%',
    color: 'var(--ink-soft)',
    background: 'transparent',
    transition: 'all 0.25s ease',
    flexShrink: 0,
  };
  const onEnter = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--ink)';
    e.currentTarget.style.background = 'rgba(168,132,28,0.10)';
  };
  const onLeave = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'var(--ink-soft)';
    e.currentTarget.style.background = 'transparent';
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        style={baseStyle}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={baseStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────── Header ─── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer]     = useState(false);
  const [mega, setMega]         = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const megaTimer               = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bookTimer               = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drawerFirstRef          = useRef<HTMLAnchorElement>(null);

  const openMega  = () => { clearTimeout(megaTimer.current); setMega(true); };
  const closeMega = () => { megaTimer.current  = setTimeout(() => setMega(false), 160); };
  const openBook  = () => { clearTimeout(bookTimer.current); setBookOpen(true); };
  const closeBook = () => { bookTimer.current  = setTimeout(() => setBookOpen(false), 160); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll + Escape + focus trap */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    if (!drawer) return;

    drawerFirstRef.current?.focus();

    const drawerEl = document.getElementById('mobile-drawer');
    const focusable = drawerEl?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last  = focusable?.[focusable.length - 1];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDrawer(false); return; }
      if (e.key !== 'Tab' || !first || !last) return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  return (
    <>
      <AnnouncementBar />

      {/* ───────────── DESKTOP + MOBILE HEADER ───────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          height: 80,
          background: 'rgba(251,247,238,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(216,205,178,0.38)',
          boxShadow: scrolled ? '0 4px 40px rgba(26,20,16,0.07)' : 'none',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* ── Mobile ─── */}
        <div className="lg:hidden container-wide flex items-center justify-between h-full">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
            onClick={() => setDrawer(true)}
            className="p-2 -ml-2"
            style={{ color: 'var(--ink)' }}
          >
            <IconMenu />
          </button>

          <Link href="/" aria-label="Solitaire — home">
            <Logo light={false} />
          </Link>

          <a
            href={whatsappLinkFor("Hello Solitaire — I'd like to enquire.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="p-2 -mr-2"
            style={{ color: 'var(--ink)' }}
          >
            <IconWhatsApp />
          </a>
        </div>

        {/* ── Desktop: 3-column split-logo ─── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-full container-wide">

          {/* LEFT NAV */}
          <nav className="flex items-center gap-10" aria-label="Primary left">
            {leftNav.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() => item.hasMega ? openMega() : closeMega()}
                onMouseLeave={() => item.hasMega && closeMega()}
                onFocus={() => item.hasMega ? openMega() : undefined}
                onBlur={() => item.hasMega ? closeMega() : undefined}
              >
                <NavLink href={item.href} hasMega={item.hasMega} megaOpen={mega && !!item.hasMega}>
                  {item.label}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* CENTRE LOGO */}
          <Link href="/" aria-label="Solitaire — home" className="flex items-center justify-center px-16">
            <Logo light={false} />
          </Link>

          {/* RIGHT NAV + UTILITIES */}
          <div className="flex items-center justify-end gap-8">
            <nav className="flex items-center gap-10" aria-label="Primary right">
              {rightNav.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <span
              aria-hidden
              style={{ display: 'block', width: 1, height: 16, background: 'rgba(216,205,178,0.70)', flexShrink: 0 }}
            />

            <NavIcon href="/search" ariaLabel="Search">
              <IconSearch size={16} />
            </NavIcon>

            <NavIcon
              href={whatsappLinkFor("Hello Solitaire — I'd like to know more about visiting your boutique.")}
              external
              ariaLabel="WhatsApp Solitaire"
            >
              <IconWhatsApp size={16} />
            </NavIcon>

            {/* Book Appointment */}
            <div
              className="relative"
              onMouseEnter={openBook}
              onMouseLeave={closeBook}
              onFocus={openBook}
              onBlur={closeBook}
            >
              <Link
                href="/bridal/book"
                aria-haspopup="true"
                aria-expanded={bookOpen}
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  letterSpacing: '0.20em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--gold-deep)',
                  background: 'transparent',
                  border: '1px solid var(--gold-deep)',
                  padding: '9px 18px',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--bone)';
                  e.currentTarget.style.background = 'var(--ink)';
                  e.currentTarget.style.borderColor = 'var(--ink)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--gold-deep)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--gold-deep)';
                }}
                onFocus={e => {
                  e.currentTarget.style.color = 'var(--bone)';
                  e.currentTarget.style.background = 'var(--ink)';
                  e.currentTarget.style.borderColor = 'var(--ink)';
                }}
                onBlur={e => {
                  e.currentTarget.style.color = 'var(--gold-deep)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--gold-deep)';
                }}
              >
                Book
              </Link>

              <AnimatePresence>
                {bookOpen && (
                  <div
                    className="absolute top-full right-0 z-50 mt-3 min-w-[240px]"
                    onMouseEnter={openBook}
                    onMouseLeave={closeBook}
                  >
                    <BookDropdown onClose={() => setBookOpen(false)} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Mega menu ─── */}
        <AnimatePresence>
          {mega && (
            <div
              className="absolute top-full left-0 right-0 z-50"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onFocus={openMega}
              onBlur={closeMega}
            >
              <MegaMenu onClose={() => setMega(false)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────────────────── MOBILE DRAWER ─────────────────────── */}
      <AnimatePresence>
        {drawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(26,20,16,0.5)', backdropFilter: 'blur(2px)' }}
              onClick={() => setDrawer(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 z-50 overflow-y-auto"
              style={{ width: 'min(85vw, 360px)', background: 'var(--ink)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 h-[80px]"
                style={{ borderBottom: '1px solid rgba(251,247,238,0.08)' }}
              >
                <Link href="/" onClick={() => setDrawer(false)}>
                  <Logo light />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawer(false)}
                  style={{
                    color: 'rgba(251,247,238,0.45)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 8,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,247,238,0.9)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,247,238,0.45)'; }}
                >
                  <IconClose />
                </button>
              </div>

              {/* Nav links — staggered in */}
              <nav className="px-6 pt-8 pb-6 flex flex-col" aria-label="Mobile navigation">
                {NAV_PRIMARY.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      ref={i === 0 ? drawerFirstRef : undefined}
                      onClick={() => setDrawer(false)}
                      className="block font-display py-[14px]"
                      style={{
                        fontSize: 'clamp(1.55rem, 5.5vw, 1.9rem)',
                        color: 'rgba(251,247,238,0.82)',
                        borderBottom: '1px solid rgba(251,247,238,0.07)',
                        transition: 'color 0.22s ease, padding-left 0.22s ease',
                        letterSpacing: '0.01em',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--gold-soft)';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(251,247,238,0.82)';
                        e.currentTarget.style.paddingLeft = '0px';
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Book CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + NAV_PRIMARY.length * 0.055, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href="/bridal/book"
                    onClick={() => setDrawer(false)}
                    className="mt-8 inline-block"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9.5,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: 'var(--gold-soft)',
                      border: '1px solid rgba(201,168,76,0.40)',
                      padding: '13px 24px',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(201,168,76,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.75)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.40)';
                    }}
                  >
                    Book Appointment
                  </Link>
                </motion.div>

                {/* Boutique info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-10 pt-6 space-y-2"
                  style={{ borderTop: '1px solid rgba(251,247,238,0.07)' }}
                >
                  {[SITE.address.full, SITE.hours.weekdays, SITE.phoneDisplay].map((line) => (
                    <p
                      key={line}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(251,247,238,0.28)',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
