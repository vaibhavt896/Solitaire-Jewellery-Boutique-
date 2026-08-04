'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE, whatsappLinkFor, WHATSAPP_MESSAGES } from '@/lib/site';
import {
  IconCalendar,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from '@/components/icons/Icon';

export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      /* inert prevents hidden bar from receiving keyboard focus */
      inert={!show || undefined}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{
        background: 'rgba(22, 16, 12, 0.93)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(189, 154, 69, 0.30)',
        boxShadow: '0 -12px 36px rgba(0, 0, 0, 0.38)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 6px)',
      }}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-4 h-14 items-center px-1">
        <a
          href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 h-full touch-scale text-[rgba(244,239,227,0.85)] hover:text-white"
        >
          <span style={{ color: '#25D366' }}>
            <IconWhatsApp size={18} />
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.16em] font-medium">
            WhatsApp
          </span>
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex flex-col items-center justify-center gap-1 h-full touch-scale text-[rgba(244,239,227,0.85)] hover:text-white border-l border-[rgba(244,239,227,0.08)]"
        >
          <span style={{ color: 'var(--gold-soft)' }}>
            <IconPhone size={18} />
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.16em] font-medium">
            Call
          </span>
        </a>
        <a
          href={SITE.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 h-full touch-scale text-[rgba(244,239,227,0.85)] hover:text-white border-l border-[rgba(244,239,227,0.08)]"
        >
          <span style={{ color: 'var(--gold-soft)' }}>
            <IconPin size={18} />
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.16em] font-medium">
            Directions
          </span>
        </a>
        <Link
          href="/bridal/book"
          className="flex flex-col items-center justify-center gap-1 h-11 my-auto mx-1 rounded touch-scale text-bone font-medium"
          style={{
            background: 'linear-gradient(135deg, #C59F45 0%, #9A7A2E 100%)',
            boxShadow: '0 4px 16px rgba(189, 154, 69, 0.35)',
            border: '1px solid rgba(244, 239, 227, 0.2)',
          }}
        >
          <IconCalendar size={17} />
          <span className="text-[0.6rem] uppercase tracking-[0.18em] font-semibold text-white">
            Book
          </span>
        </Link>
      </div>
    </div>
  );
}

