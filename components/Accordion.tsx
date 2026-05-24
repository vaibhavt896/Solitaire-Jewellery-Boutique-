'use client';

import { useState, type ReactNode } from 'react';
import { IconMinus, IconPlus } from '@/components/icons/Icon';

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-display text-h2">{title}</span>
        <span aria-hidden className="text-gold-deep">
          {open ? <IconMinus /> : <IconPlus />}
        </span>
      </button>
      {open && <div className="pb-6 text-body text-ink-soft">{children}</div>}
    </div>
  );
}
