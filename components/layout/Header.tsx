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
  IconArrowRight,
  IconClose,
  IconMenu,
  IconMinus,
  IconPlus,
  IconSearch,
  IconUser,
  IconWhatsApp,
} from '@/components/icons/Icon';

gsap.config({ force3D: true });

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* Balanced split: 2 left, 2 right */
const leftNav  = NAV_PRIMARY.slice(0, 2);
const rightNav = NAV_PRIMARY.slice(2);

/* ─── Mobile drawer data (real routes only) ─── */
const SUBCOLLECTIONS: { title: string; href: string }[] = [
  { title: 'All Collections', href: '/collections' },
  ...COLLECTIONS.slice(0, 7).map((c) => ({ title: c.title, href: `/collections/${c.slug}` })),
];
const MENU_LINKS = [
  { label: 'Bridal',    href: '/bridal' },
  { label: 'Our Story', href: '/story' },
  { label: 'Visit Us',  href: '/visit' },
];
const SECONDARY = [
  { label: 'Search',  href: '/search',  icon: <IconSearch size={18} /> },
  { label: 'Account', href: '/contact', icon: <IconUser size={18} /> },
];
const primaryLabel: React.CSSProperties = {
  fontFamily:    'var(--font-body)',
  fontSize:      14,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight:    500,
  color:         'var(--obsidian)',
};

/* ─── Announcement icons — 13px, hairline gold ─── */
const annIcon = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
const MarkDiamond = () => (<svg {...annIcon}><path d="M6 3h12l3 6-9 12L3 9z" /><path d="M3 9h18M9 3l3 6 3-6M9 9l3 12 3-12" /></svg>);
const MarkShield  = () => (<svg {...annIcon}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>);
const MarkViewing = () => (<svg {...annIcon}><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></svg>);
const MarkBridal  = () => (<svg {...annIcon}><circle cx="12" cy="14" r="5.4" /><path d="M9 8.6l3-4 3 4M12 4.6V2" /></svg>);
const MarkOffer   = () => (<svg {...annIcon}><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z" /><circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" /></svg>);

/* Rotating announcements — value props today; to run a promotion,
   add an item with `pill: 'Offer'` (and an optional href) and it
   styles + links itself. The bar is built to carry offers. */
type Announce = { text: string; Icon: () => React.ReactElement; pill?: string; href?: string };
const ANNOUNCEMENTS: Announce[] = [
  { text: 'Every Diamond GIA or IGI Certified',      Icon: MarkDiamond },
  { text: 'BIS Hallmarked Gold · Certified Pure',    Icon: MarkShield  },
  { text: 'Complimentary Private Jewellery Viewing', Icon: MarkViewing },
  { text: 'Free Private Bridal Sittings',            Icon: MarkBridal  },
];

/* ─── Announcement Bar — deep, modern, gold-accented, offer-ready ─── */
function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const itemRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!itemRef.current) return;
      gsap.to(itemRef.current, {
        opacity: 0, y: -6, duration: 0.32, ease: 'power2.in',
        onComplete: () => {
          setIdx(i => (i + 1) % ANNOUNCEMENTS.length);
          gsap.fromTo(
            itemRef.current,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          );
        },
      });
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const a = ANNOUNCEMENTS[idx];

  return (
    <div
      style={{
        position:   'relative',
        height:     40,
        overflow:   'hidden',
        background: 'linear-gradient(90deg, #15100B 0%, #221710 50%, #15100B 100%)',
      }}
    >
      <style>{`
        @keyframes ann-sheen { 0% { transform: translateX(-160%) skewX(-18deg); } 100% { transform: translateX(160%) skewX(-18deg); } }
        @media (prefers-reduced-motion: reduce) { .ann-sheen { display: none; } }
      `}</style>

      {/* Slow sheen sweep — subtle sign of life */}
      <span
        aria-hidden
        className="ann-sheen"
        style={{
          position: 'absolute', top: 0, bottom: 0, width: 120,
          background: 'linear-gradient(90deg, transparent, rgba(255,240,210,0.07), transparent)',
          animation: 'ann-sheen 9s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Gold hairline at the base */}
      <span
        aria-hidden
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(189,154,69,0.55) 50%, transparent)',
        }}
      />

      <div className="container-wide" style={{ height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Centered rotating message — purely informational, no CTA here */}
        <div
          ref={itemRef}
          style={{ display: 'flex', alignItems: 'center', gap: 9, maxWidth: '92vw' }}
        >
          {a.pill && (
            <span
              style={{
                flexShrink: 0,
                fontFamily: 'var(--font-body)', fontSize: 8.5, fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#1A1410', background: 'linear-gradient(180deg, var(--gold-soft), var(--aged-gold))',
                padding: '3px 7px', borderRadius: 999,
              }}
            >
              {a.pill}
            </span>
          )}
          <span style={{ color: 'var(--gold-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <a.Icon />
          </span>
          <span
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      10.5,
              letterSpacing: '0.17em',
              textTransform: 'uppercase',
              fontWeight:    500,
              color:         'rgba(244,239,227,0.92)',
              whiteSpace:    'nowrap',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
            }}
          >
            {a.text}
          </span>
        </div>
      </div>
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
  const [hidden,    setHidden]    = useState(false);
  const [drawer,    setDrawer]    = useState(false);
  const [mega,      setMega]      = useState(false);
  const [bookOpen,  setBookOpen]  = useState(false);
  const [collOpen,  setCollOpen]  = useState(false);
  const megaTimer                  = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bookTimer                  = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drawerFirstRef             = useRef<HTMLButtonElement>(null);
  const headerRef                  = useRef<HTMLElement>(null);

  const openMega  = () => { clearTimeout(megaTimer.current); setMega(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMega(false), 160); };
  const openBook  = () => { clearTimeout(bookTimer.current); setBookOpen(true); };
  const closeBook = () => { bookTimer.current = setTimeout(() => setBookOpen(false), 160); };

  /* Scroll state: shadow past 64px; hide on scroll-down, reveal on scroll-up */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 64);
      const delta = y - lastY;
      if (y < 360 || delta < -4) setHidden(false);
      else if (delta > 4) setHidden(true);
      lastY = y;
    };
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
    if (!drawer) { setCollOpen(false); return; }
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
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform:  hidden ? 'translateY(-101%)' : 'translateY(0)',
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

          {/* CENTER LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
            <Link href="/" aria-label="Solitaire, home" className="flex items-center justify-center">
              <Logo light={false} />
            </Link>
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

            <NavIcon href="/search" ariaLabel="Search">
              <IconSearch size={17} />
            </NavIcon>

            <NavIcon href="/contact" ariaLabel="Your account">
              <IconUser size={17} />
            </NavIcon>

            {/* Book CTA — refined ivory/gold outlined button */}
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
                  display:       'inline-block',
                  fontFamily:    'var(--font-body)',
                  fontSize:      10,
                  letterSpacing: '0.2em',
                  fontWeight:    600,
                  textTransform: 'uppercase',
                  color:         'var(--aged-gold)',
                  background:    'var(--ivory)',
                  border:        '1px solid rgba(189,154,69,0.55)',
                  padding:       '10px 22px',
                  borderRadius:  'var(--radius-sm)',
                  whiteSpace:    'nowrap',
                  transition:    'color 0.28s ease, background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
                  boxShadow:     '0 1px 4px rgba(189,154,69,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color        = 'var(--ivory)';
                  e.currentTarget.style.background   = 'var(--aged-gold)';
                  e.currentTarget.style.borderColor  = 'var(--aged-gold)';
                  e.currentTarget.style.boxShadow    = '0 4px 16px rgba(189,154,69,0.28)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color        = 'var(--aged-gold)';
                  e.currentTarget.style.background   = 'var(--ivory)';
                  e.currentTarget.style.borderColor  = 'rgba(189,154,69,0.55)';
                  e.currentTarget.style.boxShadow    = '0 1px 4px rgba(189,154,69,0.08)';
                }}
              >
                Book Visit
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
              className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ width: 'min(100%, 440px)', background: 'var(--ivory-raised)', boxShadow: '0 0 80px rgba(26,20,16,0.22)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header — logo + close */}
                <div
                  className="flex items-center justify-between px-6"
                  style={{ height: 72, borderBottom: '1px solid rgba(184,146,58,0.16)', flexShrink: 0 }}
                >
                  <Link href="/" onClick={() => setDrawer(false)} aria-label="Solitaire, home">
                    <Logo light={false} />
                  </Link>
                  <button
                    ref={drawerFirstRef}
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setDrawer(false)}
                    style={{
                      color:      'var(--ink-soft)',
                      background: 'none',
                      border:     'none',
                      cursor:     'pointer',
                      padding:    8,
                      margin:     '0 -8px 0 0',
                      transition: 'color 0.22s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--obsidian)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; }}
                  >
                    <IconClose />
                  </button>
                </div>

                {/* Scrollable nav */}
                <nav className="flex-1 overflow-y-auto px-6 pt-3 pb-6" aria-label="Mobile navigation">

                  {/* Collections — expandable */}
                  <div style={{ borderBottom: '1px solid rgba(26,20,16,0.08)' }}>
                    <button
                      type="button"
                      onClick={() => setCollOpen(o => !o)}
                      aria-expanded={collOpen}
                      className="w-full flex items-center justify-between"
                      style={{ padding: '17px 0', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span style={primaryLabel}>Collections</span>
                      <span style={{ color: 'var(--aged-gold)', display: 'grid', placeItems: 'center' }}>
                        {collOpen ? <IconMinus size={15} /> : <IconPlus size={15} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {collOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingBottom: 12 }}>
                            {SUBCOLLECTIONS.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setDrawer(false)}
                                className="block"
                                style={{
                                  fontFamily:    'var(--font-body)',
                                  fontSize:      13,
                                  letterSpacing: '0.03em',
                                  color:         'var(--ink-soft)',
                                  padding:       '9px 0 9px 2px',
                                  transition:    'color 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-deep)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; }}
                              >
                                {c.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Primary links */}
                  {MENU_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawer(false)}
                      className="flex items-center justify-between"
                      style={{ padding: '17px 0', borderBottom: '1px solid rgba(26,20,16,0.08)' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.62'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                    >
                      <span style={primaryLabel}>{item.label}</span>
                      <span style={{ color: 'rgba(26,20,16,0.22)', display: 'grid', placeItems: 'center' }}>
                        <IconArrowRight size={15} />
                      </span>
                    </Link>
                  ))}

                  {/* Utilities — search / account */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(184,146,58,0.18)' }}>
                    {SECONDARY.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawer(false)}
                        className="flex items-center"
                        style={{ gap: 14, padding: '13px 0' }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.62'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                      >
                        <span style={{ color: 'var(--aged-gold)', display: 'grid', placeItems: 'center' }}>{item.icon}</span>
                        <span
                          style={{
                            fontFamily:    'var(--font-body)',
                            fontSize:      12.5,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            fontWeight:    500,
                            color:         'var(--ink)',
                          }}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Boutique info */}
                  <div className="mt-8 pt-6 space-y-2" style={{ borderTop: '1px solid rgba(26,20,16,0.07)' }}>
                    {[SITE.address.full, SITE.hours.weekdays, SITE.phoneDisplay].map((line) => (
                      <p
                        key={line}
                        style={{
                          fontFamily:    'var(--font-body)',
                          fontSize:      10,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color:         'var(--ink-muted)',
                          lineHeight:    1.6,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </nav>

                {/* Book Visit — pinned footer */}
                <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(184,146,58,0.18)', flexShrink: 0 }}>
                  <Link
                    href="/bridal/book"
                    onClick={() => setDrawer(false)}
                    className="flex items-center justify-center w-full"
                    style={{
                      gap:           10,
                      background:    'var(--aged-gold)',
                      color:         'var(--ivory)',
                      padding:       '15px 24px',
                      borderRadius:  'var(--radius-sm)',
                      fontFamily:    'var(--font-body)',
                      fontSize:      11.5,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight:    600,
                      boxShadow:     '0 12px 30px -10px rgba(189,154,69,0.6)',
                      transition:    'background 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-deep)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--aged-gold)'; }}
                  >
                    Book Visit
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
