'use client';

/* ──────────────────────────────────────────────────────────
   VisitPreview, Section 10
   "Swaroop Nagar. The one boutique."
   Map left (tabbed display), editorial info right.
────────────────────────────────────────────────────────── */

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { CopyAddressButton } from '@/components/CopyAddressButton';
import { SITE } from '@/lib/site';

const GALLERY_IMAGES = [
  {
    src: '/bridal-consultation-boutique.avif',
    title: 'The Bridal Lounge',
    description: 'An intimate, private salon designed for absolute comfort and personalized bridal style consultations.'
  },
  {
    src: '/Homepage images/Polki homee.avif',
    title: 'Heirloom Displays',
    description: 'Our physical showcases feature curated gold, polki, and diamond jewels crafted for families.'
  },
  {
    src: '/Homepage images/Bridal Jewellery.avif',
    title: 'Private Viewing',
    description: 'Bespoke customer sittings where heritage sets are presented for selection.'
  }
];

const ATELIER_SERVICES = [
  {
    title: 'Private Salon Sitting',
    description: 'Reserve a secluded bridal room for a personal, distraction-free bridal styling session with our founders.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Bespoke Heirlooms',
    description: 'Collaborate with our design director to sketch, detail, and craft custom bridal pieces tailored to your style.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  {
    title: 'Polki Spa & Care',
    description: 'Enjoy lifetime complimentary ultrasonic deep cleaning and integrity checks for your Solitaire jewels.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: 'Heritage Certification',
    description: 'Every diamond and gold article is accompanied by individual GIA, IGI, or HUID hallmarking verification.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export function VisitPreview() {
  const [activeTab, setActiveTab] = useState<'map' | 'gallery' | 'services'>('map');
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <section style={{ background: 'var(--ivory)' }} className="section-pad">
      <div className="container-wide">

        {/* Header */}
        <Reveal className="mb-14">
          <p className="eyebrow mb-4">09 — The Boutique</p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.022em',
              fontStyle: 'italic',
            }}
          >
            Swaroop Nagar. The one boutique.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-stretch">

          {/* ── Interactive Dashboard Container (left) ── */}
          <Reveal>
            <div
              className="flex flex-col overflow-hidden relative group"
              style={{
                aspectRatio: '4/3',
                background: 'var(--stone-100)',
                border: '1px solid var(--ivory-smoke)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 28px 70px -6px rgba(26,20,16,0.14), 0 8px 24px rgba(26,20,16,0.07)',
              }}
            >
              {/* Premium Tab Selector Bar */}
              <div className="flex border-b border-[var(--ivory-smoke)] bg-[var(--stone-50)] z-20 relative">
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex-1 py-3.5 text-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 font-body ${
                    activeTab === 'map'
                      ? 'border-b-2 border-[var(--aged-gold)] text-[var(--obsidian)] font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--obsidian)]'
                  }`}
                >
                  Boutique Map
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex-1 py-3.5 text-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 font-body ${
                    activeTab === 'gallery'
                      ? 'border-b-2 border-[var(--aged-gold)] text-[var(--obsidian)] font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--obsidian)]'
                  }`}
                >
                  Interior View
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex-1 py-3.5 text-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 font-body ${
                    activeTab === 'services'
                      ? 'border-b-2 border-[var(--aged-gold)] text-[var(--obsidian)] font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--obsidian)]'
                  }`}
                >
                  Atelier Services
                </button>
              </div>

              {/* Tab Content Areas */}
              <div className="relative flex-1 w-full overflow-hidden bg-[var(--stone-100)]">
                
                {/* 1. Real Live Map Tab View */}
                {activeTab === 'map' && (
                  <div className="relative w-full h-full">
                    <iframe
                      title="Solitaire Jewellery Boutique Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        display: 'block',
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* Vignette overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 40px rgba(26,20,16,0.12)',
                        zIndex: 2,
                      }}
                    />

                    {/* Floating Maps link in corner */}
                    <a
                      href={SITE.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 left-4 transition-all duration-300 hover:scale-105 hover:bg-obsidian hover:text-ivory shadow-md z-[10]"
                      style={{
                        background: 'var(--ivory)',
                        border: '1px solid var(--ivory-smoke)',
                        padding: '10px 16px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--obsidian)',
                        borderRadius: '4px',
                        fontWeight: 500,
                      }}
                    >
                      Open in Maps →
                    </a>
                  </div>
                )}

                {/* 2. Gallery Tab View */}
                {activeTab === 'gallery' && (
                  <div className="relative w-full h-full overflow-hidden group">
                    <img 
                      src={GALLERY_IMAGES[galleryIndex].src} 
                      alt={GALLERY_IMAGES[galleryIndex].title} 
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out scale-100 group-hover:scale-105" 
                    />

                    {/* Gradient Cover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,20,16,0.85)] via-[rgba(26,20,16,0.25)] to-transparent" />

                    {/* Copy and description overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-[var(--ivory)] z-10">
                      <h3 className="font-display italic text-lg text-white mb-1.5">
                        {GALLERY_IMAGES[galleryIndex].title}
                      </h3>
                      <p className="font-body text-xs leading-relaxed text-white/85 max-w-[85%]">
                        {GALLERY_IMAGES[galleryIndex].description}
                      </p>
                    </div>

                    {/* Carousel Nav Indicator Dots */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      {GALLERY_IMAGES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGalleryIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === galleryIndex ? 'w-5 bg-[var(--aged-gold)]' : 'w-2 bg-white/50 hover:bg-white/85'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Concierge Services Tab View */}
                {activeTab === 'services' && (
                  <div className="grid grid-cols-2 gap-4 p-5 h-full overflow-y-auto bg-[var(--stone-50)]">
                    {ATELIER_SERVICES.map((s, idx) => (
                      <div 
                        key={idx}
                        className="p-4 border border-[var(--ivory-smoke)] bg-[var(--stone-100)] rounded-xl flex flex-col justify-start transition-all duration-300 hover:border-[var(--aged-gold)] group"
                      >
                        <div className="text-[var(--aged-gold)] mb-2.5 transition-transform duration-300 group-hover:scale-105 w-fit">
                          {s.icon}
                        </div>
                        <h4 className="font-body font-semibold text-[11px] uppercase tracking-wider text-[var(--obsidian)] mb-1">
                          {s.title}
                        </h4>
                        <p className="font-body text-[10.5px] leading-relaxed text-[var(--ink-soft)]">
                          {s.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
              
              {/* Inset gold outline frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(184,146,58,0.20)',
                  borderRadius: 'var(--radius-lg)',
                  zIndex: 25,
                }}
              />
            </div>
          </Reveal>

          {/* ── Address + info card (right) ── */}
          <Reveal delay={0.1}>
            <div
              style={{
                background: 'var(--stone-100)',
                border: '1px solid var(--ivory-smoke)',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                height: '100%',
              }}
            >
              {/* Boutique name */}
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.5rem',
                }}
              >
                Solitaire Jewellery Boutique
              </p>

              {/* Address in clean luxury body & display typography */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: 'var(--ink-soft)',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid var(--ivory-smoke)',
                  marginBottom: '1.5rem',
                }}
              >
                {/* Address block */}
                <div className="mb-5">
                  <p 
                    style={{ 
                      color: 'var(--aged-gold)', 
                      letterSpacing: '0.18em', 
                      fontSize: 10, 
                      fontWeight: 600,
                      textTransform: 'uppercase', 
                      marginBottom: 6,
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Address
                  </p>
                  <p className="font-display text-[15px] italic text-[var(--obsidian)] leading-relaxed">
                    {SITE.address.full}
                  </p>
                </div>

                {/* Hours block */}
                <div className="mb-5">
                  <p 
                    style={{ 
                      color: 'var(--aged-gold)', 
                      letterSpacing: '0.18em', 
                      fontSize: 10, 
                      fontWeight: 600,
                      textTransform: 'uppercase', 
                      marginBottom: 6,
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Hours
                  </p>
                  <div className="text-[13px] text-[var(--ink-soft)] font-body font-medium">
                    <p>{SITE.hours.weekdays}</p>
                    <p>{SITE.hours.sunday}</p>
                  </div>
                </div>

                {/* Contact block */}
                <div>
                  <p 
                    style={{ 
                      color: 'var(--aged-gold)', 
                      letterSpacing: '0.18em', 
                      fontSize: 10, 
                      fontWeight: 600,
                      textTransform: 'uppercase', 
                      marginBottom: 6,
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Contact & Appointments
                  </p>
                  <div className="flex flex-col gap-1.5 font-body text-[13px] mt-1">
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[var(--aged-gold)] w-fit group"
                    >
                      <span className="font-medium text-[var(--obsidian)] group-hover:text-[var(--aged-gold)] transition-colors duration-300">
                        {SITE.phoneDisplay}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-[var(--aged-gold)]">
                        · Call Us
                      </span>
                    </a>
                    <a
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--aged-gold)] w-fit group"
                    >
                      <span className="font-medium text-[var(--obsidian)] group-hover:text-[var(--aged-gold)] transition-colors duration-300">
                        WhatsApp Boutique Manager
                      </span>
                      <span className="text-[var(--aged-gold)] group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Redesigned Signature "Only One" Quote block */}
              <div
                style={{
                  borderLeft: '2px solid var(--aged-gold)',
                  paddingLeft: '1.25rem',
                  marginTop: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: 'var(--ink-muted)',
                  }}
                >
                  &ldquo;We don&rsquo;t have a second location. We don&rsquo;t have an outlet.
                  The boutique is on Swaroop Nagar, and it&rsquo;s the only one.&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 10, letterSpacing: '0.14em' }}
                >
                  Get directions →
                </a>
                <CopyAddressButton />
                <a
                  href="/visit"
                  className="btn-secondary"
                  style={{ fontSize: 10, letterSpacing: '0.14em' }}
                >
                  Plan your visit →
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
