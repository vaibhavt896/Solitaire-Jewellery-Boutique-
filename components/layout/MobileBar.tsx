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
      className={`lg:hidden fixed inset-x-0 bottom-0 z-30 bg-paper border-t border-line transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-4 h-14">
        <a
          href={whatsappLinkFor(WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 hover:bg-gold-veil transition-colors"
        >
          <IconWhatsApp size={18} />
          <span className="text-[0.625rem] uppercase tracking-eyebrow font-medium">
            WhatsApp
          </span>
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex flex-col items-center justify-center gap-1 hover:bg-gold-veil transition-colors border-l border-line"
        >
          <IconPhone size={18} />
          <span className="text-[0.625rem] uppercase tracking-eyebrow font-medium">
            Call
          </span>
        </a>
        <a
          href={SITE.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 hover:bg-gold-veil transition-colors border-l border-line"
        >
          <IconPin size={18} />
          <span className="text-[0.625rem] uppercase tracking-eyebrow font-medium">
            Directions
          </span>
        </a>
        <Link
          href="/bridal/book"
          className="flex flex-col items-center justify-center gap-1 bg-ink text-bone hover:bg-gold-deep transition-colors"
        >
          <IconCalendar size={18} />
          <span className="text-[0.625rem] uppercase tracking-eyebrow font-medium">
            Book
          </span>
        </Link>
      </div>
    </div>
  );
}
