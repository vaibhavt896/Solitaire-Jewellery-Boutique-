'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { NAV_PRIMARY, SITE, whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';
import { COLLECTIONS } from '@/lib/data/collections';
import { Logo } from '@/components/Logo';
import {
  IconClose,
  IconMenu,
  IconSearch,
  IconWhatsApp,
} from '@/components/icons/Icon';

gsap.config({ force3D: true });

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

const ANNOUNCEMENTS = [
  'Swaroop Nagar, Kanpur  ·  Open Monday to Saturday  ·  Visits by appointment welcome',
  'Every diamond GIA or IGI certified  ·  Gold hallmarked  ·  The certificate goes home with you',
  'Free private bridal sittings  ·  45 minutes  ·  No pressure to buy',
];

/* Balanced split: 2 left, 2 right */
const leftNav  = NAV_PRIMARY.slice(0, 2);
const rightNav = NAV_PRIMARY.slice(2);

/* ─── Announcement Bar ─── */
function AnnouncementBar() {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);
  const textRef               = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (!textRef.current) return;
      gsap.to(textRef.current, {
        opacity: 0, y: -5, duration: 0.28, ease: 'power2.in',
        onComplete: () => {
          setIdx(i => (i + 1) % ANNOUNCEMENTS.length);
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    }, 5200);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        background:   'var(--ink)',
        height:       34,
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      <p
        ref={textRef}
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:         'rgba(244,239,227,0.50)',
          maxWidth:      'calc(100% - 52px)',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          whiteSpace:    'nowrap',
          userSelect:    'none',
        }}
      >
        {ANNOUNCEMENTS[idx]}
      </p>

      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        style={{
          position:  'absolute',
          right:     16,
          top:       '50%',
          transform: 'translateY(-50%)',
          color:     'rgba(244,239,227,0.22)',
          background: 'none',
          border:    'none',
          cursor:    'pointer',
          padding:   6,
          lineHeight: 1,
          transition: 'color 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.22)'; }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Book Dropdown (dark) ─── */
function BookDropdown({ onClose }: { onClose: () => void }) {
  const items = [
    { label: 'Book a Private Sitting', sub: '45 minutes · free and unhurried',    href: '/bridal/book' },
    { label: 'For an Engagement',      sub: 'Certified solitaires, chosen with care', href: '/bridal/book?type=engagement' },
    { label: 'Visit the Boutique',     sub: 'Swaroop Nagar, Kanpur',              href: '/visit' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background:  'var(--ink)',
        border:      '1px solid rgba(184,146,58,0.22)',
        boxShadow:   '0 28px 72px rgba(0,0,0,0.36)',
        overflow:    'hidden',
      }}
    >
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group block px-5 py-4"
          style={{
            borderBottom: i < items.length - 1 ? '1px solid rgba(244,239,227,0.06)' : 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,239,227,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.8125rem',
              color:         'rgba(244,239,227,0.78)',
              letterSpacing: '0.02em',
              transition:    'color 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-soft)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.78)'; }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      10,
              letterSpacing: '0.06em',
              color:         'rgba(244,239,227,0.26)',
              marginTop:     3,
            }}
          >
            {item.sub}
          </p>
        </Link>
      ))}
    </motion.div>
  );
}

/* ─── Mega Menu — dark editorial ─── */
function MegaMenu({ onClose }: { onClose: () => void }) {
  const featured = COLLECTIONS[0];
  const grid     = COLLECTIONS.slice(1, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background:    'var(--ink)',
        borderBottom:  '1px solid rgba(184,146,58,0.16)',
        boxShadow:     '0 48px 96px rgba(0,0,0,0.38)',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* Film grain */}
      <div
        aria-hidden
        style={{
          position:          'absolute',
          inset:             0,
          backgroundImage:   GRAIN,
          backgroundRepeat:  'repeat',
          opacity:           0.045,
          pointerEvents:     'none',
          mixBlendMode:      'overlay',
          zIndex:            0,
        }}
      />

      <div className="container-wide py-12" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 56 }}>

          {/* LEFT: editorial featured collection */}
          <div>
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      10,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color:         'rgba(201,168,76,0.60)',
                marginBottom:  18,
              }}
            >
              Featured
            </p>

            <Link
              href={`/collections/${featured.slug}`}
              onClick={onClose}
              className="group block relative overflow-hidden"
            >
              <div
                style={{
                  aspectRatio: '3/4',
                  position:    'relative',
                  background:  'rgba(255,255,255,0.03)',
                }}
              >
                <Image
                  src={featured.hero.src}
                  alt={featured.hero.alt}
                  fill
                  sizes="240px"
                  loading="lazy"
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  style={{
                    position:   'absolute',
                    inset:       0,
                    background: 'linear-gradient(to top, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.08) 58%)',
                  }}
                />
                {/* Gold border reveal on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 border border-transparent transition-all duration-500"
                  style={{ borderColor: 'rgba(184,146,58,0)', transition: 'border-color 0.5s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,146,58,0.28)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,146,58,0)'; }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom:   0,
                  left:     0,
                  right:    0,
                  padding:  '20px 20px 24px',
                }}
              >
                <p
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      '1.2rem',
                    fontStyle:     'italic',
                    color:         'var(--ivory)',
                    lineHeight:    1.2,
                    letterSpacing: '-0.01em',
                    marginBottom:  10,
                  }}
                >
                  {featured.title}
                </p>
                <p
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      10,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color:         'rgba(201,168,76,0.52)',
                    transition:    'color 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-soft)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.52)'; }}
                >
                  Discover Collection →
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT: 3-col grid */}
          <div>
            <div
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        12,
                marginBottom: 24,
              }}
            >
              <span
                aria-hidden
                style={{ display: 'block', width: 22, height: 0.5, background: 'rgba(184,146,58,0.55)' }}
              />
              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      10,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color:         'rgba(244,239,227,0.32)',
                }}
              >
                Collections
              </p>
            </div>

            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap:                 '22px 28px',
              }}
            >
              {grid.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/collections/${c.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    <div
                      style={{
                        aspectRatio: '4/3',
                        position:    'relative',
                        overflow:    'hidden',
                        background:  'rgba(255,255,255,0.03)',
                        marginBottom: 10,
                      }}
                    >
                      <Image
                        src={c.hero.src}
                        alt={c.hero.alt}
                        fill
                        sizes="(max-width: 1280px) 22vw, 18vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />
                      <div
                        className="absolute inset-0 transition-colors duration-500"
                        style={{ background: 'rgba(0,0,0,0)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.18)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      '0.8125rem',
                        color:         'rgba(244,239,227,0.62)',
                        letterSpacing: '0.03em',
                        transition:    'color 0.22s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivory)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.62)'; }}
                    >
                      {c.title}
                    </p>
                    <p
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      10,
                        letterSpacing: '0.10em',
                        color:         'rgba(244,239,227,0.24)',
                        marginTop:     3,
                      }}
                    >
                      {c.pieceCount} pieces
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div
              style={{
                marginTop:    30,
                paddingTop:   22,
                borderTop:    '1px solid rgba(184,146,58,0.12)',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'space-between',
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      10,
                  letterSpacing: '0.06em',
                  color:         'rgba(244,239,227,0.20)',
                }}
              >
                Polki · Solitaires · Antique Gold · Temple · Bridal · Everyday
              </p>
              <Link
                href="/collections"
                onClick={onClose}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      10,
                  letterSpacing: '0.20em',
                  textTransform: 'uppercase',
                  fontWeight:    600,
                  color:         'var(--aged-gold)',
                  transition:    'color 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ivory)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--aged-gold)'; }}
              >
                View all collections →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── NavLink (GSAP hover: lift + underline sweep) ─── */
function NavLink({
  href,
  children,
  hasMega,
  megaOpen,
}: {
  href:      string;
  children:  React.ReactNode;
  hasMega?:  boolean;
  megaOpen?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const enter = () => {
    gsap.to(wrapRef.current, { y: -2, duration: 0.20, ease: 'power2.out' });
    if (lineRef.current) {
      gsap.set(lineRef.current, { transformOrigin: 'left center', scaleX: 0 });
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.44, ease: 'expo.out' });
    }
  };
  const leave = () => {
    gsap.to(wrapRef.current, { y: 0, duration: 0.30, ease: 'power2.out' });
    if (lineRef.current) {
      gsap.set(lineRef.current, { transformOrigin: 'right center' });
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.26, ease: 'power3.in' });
    }
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative' }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1"
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      11,
          letterSpacing: '0.18em',
          fontWeight:    500,
          textTransform: 'uppercase',
          color:         'var(--ink)',
          transition:    'color 0.28s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink)'; }}
        onFocus={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}
        onBlur={e => { e.currentTarget.style.color = 'var(--ink)'; }}
      >
        {children}
        {hasMega && (
          <svg
            width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden
            style={{
              transform:  megaOpen ? 'rotate(180deg)' : undefined,
              transition: 'transform 0.36s ease',
              opacity:    0.42,
              flexShrink: 0,
              marginTop:  1,
            }}
          >
            <path d="M0.5 1L3.5 4L6.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </Link>

      {/* Underline that sweeps from left */}
      <span
        ref={lineRef}
        aria-hidden
        style={{
          position:        'absolute',
          bottom:          -4,
          left:            0,
          right:           0,
          height:          1,
          background:      'var(--gold)',
          display:         'block',
          transform:       'scaleX(0)',
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
}

/* ─── NavIcon (GSAP scale + color) ─── */
function NavIcon({
  href,
  external,
  ariaLabel,
  children,
}: {
  href:      string;
  external?: boolean;
  ariaLabel: string;
  children:  React.ReactNode;
}) {
  const baseStyle: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    width:          34,
    height:         34,
    borderRadius:   '50%',
    color:          'var(--ink-soft)',
    background:     'transparent',
    transition:     'color 0.25s, background 0.25s',
    flexShrink:     0,
  };

  const onEnter = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color      = 'var(--ink)';
    e.currentTarget.style.background = 'rgba(168,132,28,0.10)';
    gsap.to(e.currentTarget, { scale: 1.12, duration: 0.18, ease: 'back.out(2.5)' });
  };
  const onLeave = (e: React.SyntheticEvent<HTMLElement>) => {
    e.currentTarget.style.color      = 'var(--ink-soft)';
    e.currentTarget.style.background = 'transparent';
    gsap.to(e.currentTarget, { scale: 1, duration: 0.22, ease: 'power2.out' });
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

/* ─── Header ─── */
export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [drawer,    setDrawer]    = useState(false);
  const [mega,      setMega]      = useState(false);
  const [bookOpen,  setBookOpen]  = useState(false);
  const megaTimer                  = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bookTimer                  = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drawerFirstRef             = useRef<HTMLAnchorElement>(null);
  const headerRef                  = useRef<HTMLElement>(null);
  const bookFillRef                = useRef<HTMLDivElement>(null);
  const bookLinkRef                = useRef<HTMLAnchorElement>(null);

  const openMega  = () => { clearTimeout(megaTimer.current); setMega(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMega(false), 160); };
  const openBook  = () => { clearTimeout(bookTimer.current); setBookOpen(true); };
  const closeBook = () => { bookTimer.current = setTimeout(() => setBookOpen(false), 160); };

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Entrance animation */
  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -14, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.05,
      });
    }
  }, []);

  /* Drawer lock + keyboard */
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

  /* Book CTA: GSAP ink-flood reveal */
  const bookEnter = () => {
    openBook();
    if (bookFillRef.current) {
      gsap.fromTo(
        bookFillRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.44, ease: 'expo.out' }
      );
    }
    if (bookLinkRef.current) bookLinkRef.current.style.color = 'var(--gold-soft)';
  };
  const bookLeave = () => {
    closeBook();
    if (bookFillRef.current) {
      gsap.to(bookFillRef.current, {
        clipPath: 'inset(0 0% 0 100%)', duration: 0.32, ease: 'power3.in',
      });
    }
    setTimeout(() => {
      if (bookLinkRef.current) bookLinkRef.current.style.color = 'var(--gold-deep)';
    }, 40);
  };

  return (
    <>
      {/* 1px gold accent line — signature luxury touch */}
      <div
        aria-hidden
        style={{
          height:     1,
          background: 'linear-gradient(to right, transparent 0%, rgba(184,146,58,0.40) 25%, rgba(201,168,76,0.70) 50%, rgba(184,146,58,0.40) 75%, transparent 100%)',
        }}
      />

      <AnnouncementBar />

      {/* ─────── MAIN HEADER ─────── */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40"
        style={{
          height:               80,
          background:           'rgba(244,239,227,0.91)',
          backdropFilter:       'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom:         scrolled
            ? '1px solid rgba(184,146,58,0.28)'
            : '1px solid rgba(216,205,178,0.30)',
          boxShadow: scrolled
            ? '0 4px 48px rgba(26,20,16,0.09)'
            : 'none',
          transition:  'box-shadow 0.5s ease, border-color 0.5s ease',
          position:    'relative',
          overflow:    'hidden',
        }}
      >
        {/* Film grain overlay */}
        <div
          aria-hidden
          style={{
            position:         'absolute',
            inset:             0,
            backgroundImage:  GRAIN,
            backgroundRepeat: 'repeat',
            opacity:          0.032,
            pointerEvents:    'none',
            mixBlendMode:     'multiply',
            zIndex:           0,
          }}
        />

        {/* ── Mobile ── */}
        <div
          className="lg:hidden container-wide flex items-center justify-between h-full"
          style={{ position: 'relative', zIndex: 1 }}
        >
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

          <Link href="/" aria-label="Solitaire, home">
            <Logo light={false} />
          </Link>

          <a
            href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="p-2 -mr-2"
            style={{ color: 'var(--ink)' }}
          >
            <IconWhatsApp />
          </a>
        </div>

        {/* ── Desktop: 3-column split-logo ── */}
        <div
          className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-full container-wide"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* LEFT NAV */}
          <nav className="flex items-center gap-9" aria-label="Primary left">
            {leftNav.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() => item.hasMega ? openMega() : closeMega()}
                onMouseLeave={() => item.hasMega && closeMega()}
                onFocus={()    => item.hasMega ? openMega() : undefined}
                onBlur={()     => item.hasMega ? closeMega() : undefined}
              >
                <NavLink href={item.href} hasMega={item.hasMega} megaOpen={mega && !!item.hasMega}>
                  {item.label}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* CENTER LOGO with gold decorative rules */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 40px' }}>
            <span
              aria-hidden
              style={{
                display:    'block',
                width:      1,
                height:     30,
                background: 'linear-gradient(to bottom, transparent, rgba(184,146,58,0.30) 40%, rgba(184,146,58,0.30) 60%, transparent)',
                flexShrink: 0,
                marginRight: 28,
              }}
            />
            <Link href="/" aria-label="Solitaire, home" className="flex items-center justify-center">
              <Logo light={false} />
            </Link>
            <span
              aria-hidden
              style={{
                display:    'block',
                width:      1,
                height:     30,
                background: 'linear-gradient(to bottom, transparent, rgba(184,146,58,0.30) 40%, rgba(184,146,58,0.30) 60%, transparent)',
                flexShrink: 0,
                marginLeft:  28,
              }}
            />
          </div>

          {/* RIGHT NAV + UTILITIES */}
          <div className="flex items-center justify-end gap-7">
            <nav className="flex items-center gap-9" aria-label="Primary right">
              {rightNav.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <span
              aria-hidden
              style={{
                display:    'block',
                width:      1,
                height:     16,
                background: 'rgba(216,205,178,0.65)',
                flexShrink: 0,
              }}
            />

            <NavIcon href="/search" ariaLabel="Search">
              <IconSearch size={16} />
            </NavIcon>

            <NavIcon
              href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
              external
              ariaLabel="WhatsApp Solitaire"
            >
              <IconWhatsApp size={16} />
            </NavIcon>

            {/* Book CTA — GSAP ink-flood on hover */}
            <div
              className="relative"
              style={{ overflow: 'hidden' }}
              onMouseEnter={bookEnter}
              onMouseLeave={bookLeave}
              onFocus={bookEnter}
              onBlur={bookLeave}
            >
              {/* Ink fill layer */}
              <div
                ref={bookFillRef}
                aria-hidden
                style={{
                  position:     'absolute',
                  inset:         0,
                  background:   'var(--ink)',
                  clipPath:     'inset(0 100% 0 0)',
                  pointerEvents: 'none',
                  zIndex:        0,
                }}
              />

              <Link
                ref={bookLinkRef as React.Ref<HTMLAnchorElement>}
                href="/bridal/book"
                aria-haspopup="true"
                aria-expanded={bookOpen}
                style={{
                  position:      'relative',
                  zIndex:        1,
                  display:       'inline-block',
                  fontSize:      10,
                  letterSpacing: '0.22em',
                  fontWeight:    600,
                  textTransform: 'uppercase',
                  color:         'var(--gold-deep)',
                  border:        '1px solid var(--gold-deep)',
                  padding:       '9px 20px',
                  transition:    'border-color 0.25s',
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

        {/* ── Mega menu ── */}
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

      {/* ─────────────── MOBILE DRAWER ─────────────── */}
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
              style={{ background: 'rgba(26,20,16,0.58)', backdropFilter: 'blur(3px)' }}
              onClick={() => setDrawer(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.44, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 z-50 overflow-y-auto"
              style={{ width: 'min(85vw, 360px)', background: 'var(--ink)', position: 'relative' }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Grain */}
              <div
                aria-hidden
                style={{
                  position:         'absolute',
                  inset:             0,
                  backgroundImage:  GRAIN,
                  backgroundRepeat: 'repeat',
                  opacity:          0.05,
                  pointerEvents:    'none',
                  mixBlendMode:     'overlay',
                  zIndex:           0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div
                  className="flex items-center justify-between px-6 h-[80px]"
                  style={{ borderBottom: '1px solid rgba(244,239,227,0.07)' }}
                >
                  <Link href="/" onClick={() => setDrawer(false)}>
                    <Logo light />
                  </Link>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setDrawer(false)}
                    style={{
                      color:      'rgba(244,239,227,0.32)',
                      background: 'none',
                      border:     'none',
                      cursor:     'pointer',
                      padding:    8,
                      transition: 'color 0.22s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.85)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,239,227,0.32)'; }}
                  >
                    <IconClose />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="px-6 pt-10 pb-6 flex flex-col" aria-label="Mobile navigation">
                  {NAV_PRIMARY.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.055, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        ref={i === 0 ? drawerFirstRef : undefined}
                        onClick={() => setDrawer(false)}
                        className="block font-display py-[13px]"
                        style={{
                          fontSize:      'clamp(1.6rem, 6vw, 2.1rem)',
                          color:         'rgba(244,239,227,0.75)',
                          borderBottom:  '1px solid rgba(244,239,227,0.06)',
                          transition:    'color 0.22s, padding-left 0.22s, letter-spacing 0.22s',
                          letterSpacing: '0.01em',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color         = 'var(--gold-soft)';
                          e.currentTarget.style.paddingLeft   = '8px';
                          e.currentTarget.style.letterSpacing = '0.03em';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color         = 'rgba(244,239,227,0.75)';
                          e.currentTarget.style.paddingLeft   = '0';
                          e.currentTarget.style.letterSpacing = '0.01em';
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Gold diamond divider */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 24px' }}
                  >
                    <span style={{ flex: 1, height: 0.5, background: 'rgba(184,146,58,0.30)' }} />
                    <svg width="5" height="5" viewBox="0 0 6 6" aria-hidden>
                      <rect
                        x="1" y="1" width="4" height="4"
                        transform="rotate(45 3 3)"
                        fill="none"
                        stroke="rgba(184,146,58,0.55)"
                        strokeWidth="0.8"
                      />
                    </svg>
                    <span style={{ flex: 1, height: 0.5, background: 'rgba(184,146,58,0.30)' }} />
                  </motion.div>

                  {/* Book CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + NAV_PRIMARY.length * 0.055, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href="/bridal/book"
                      onClick={() => setDrawer(false)}
                      className="inline-block"
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      10,
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        fontWeight:    600,
                        color:         'var(--gold-soft)',
                        border:        '1px solid rgba(201,168,76,0.35)',
                        padding:       '13px 24px',
                        transition:    'all 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background   = 'rgba(201,168,76,0.09)';
                        e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.65)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background   = 'transparent';
                        e.currentTarget.style.borderColor  = 'rgba(201,168,76,0.35)';
                      }}
                    >
                      Book a Private Sitting
                    </Link>
                  </motion.div>

                  {/* Boutique info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65, duration: 0.45 }}
                    className="mt-10 pt-6 space-y-2"
                    style={{ borderTop: '1px solid rgba(244,239,227,0.06)' }}
                  >
                    {[SITE.address.full, SITE.hours.weekdays, SITE.phoneDisplay].map((line) => (
                      <p
                        key={line}
                        style={{
                          fontFamily:    'var(--font-body)',
                          fontSize:      10,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color:         'rgba(244,239,227,0.20)',
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
