'use client';

import { useState } from 'react';
import type { ImageRef } from '@/lib/data/types';

export function PieceGallery({ images, title }: { images: ImageRef[]; title: string }) {
  const [active, setActive] = useState(0);
  const main = images[active];
  if (!main) return null;
  return (
    <div>
      <div className="aspect-[4/5] bg-bone-deep overflow-hidden">
        <img
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 md:gap-3 mt-3 md:mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${title}`}
              className={`aspect-square overflow-hidden bg-bone-deep border-2 ${
                i === active ? 'border-gold' : 'border-transparent hover:border-line'
              } transition-colors`}
            >
              <img
                src={img.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
