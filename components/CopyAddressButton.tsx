'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { IconCheck } from '@/components/icons/Icon';

export function CopyAddressButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.address.full);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore — clipboard API not available
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn-secondary inline-flex items-center gap-2"
    >
      {copied ? (
        <>
          <IconCheck size={16} /> Copied
        </>
      ) : (
        'Copy Address'
      )}
    </button>
  );
}
