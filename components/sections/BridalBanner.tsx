'use client';

/* ──────────────────────────────────────────────────────────
   BridalBanner — Section 08
   "Bring your mother. We'll bring the pieces."
   Two-column: image left (60%), text right (40%).
   Rich editorial copy, consultation details, no urgency.
────────────────────────────────────────────────────────── */

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { whatsappLinkFor } from '@/lib/site';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function BridalBanner() {
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: 'var(--ivory)' }}
      className="overflow-hidden"
    >
      <div className="container-wide grid md:grid-cols-12 gap-0 items-stretch">

        {/* ── Image column (left, 7/12) ── */}
        <motion.div
          className="md:col-span-7 relative overflow-hidden"
          style={{ minHeight: 480, aspectRatio: '4/5' }}
          initial={reduce ? {} : { opacity: 0, x: -20 }}
          whileInView={reduce ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? {} : { scale: 1.06 }}
            whileInView={reduce ? {} : { scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.9, ease }}
          >
            <Image
              src="/bridal-consultation-boutique.avif"
              alt="A bridal consultation at Solitaire — pieces laid out on the boutique table"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>

          {/* Eyebrow overlay on image */}
          <div className="absolute top-8 left-8">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(244,239,227,0.6)',
                border: '1px solid rgba(244,239,227,0.2)',
                padding: '5px 12px',
                background: 'rgba(26,20,16,0.35)',
                backdropFilter: 'blur(4px)',
              }}
            >
              05 — FOR THE BRIDE
            </span>
          </div>
        </motion.div>

        {/* ── Text column (right, 5/12) ── */}
        <motion.div
          className="md:col-span-5 flex flex-col justify-center px-6 md:px-14 lg:px-20 py-16 md:py-24"
          initial={reduce ? {} : { opacity: 0, x: 24 }}
          whileInView={reduce ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            Bring your mother.<br />We&rsquo;ll bring the pieces.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--ink-soft)',
              marginBottom: '2rem',
            }}
          >
            The Solitaire Bridal Consultation is a private 45-minute appointment held in
            the boutique&rsquo;s back room. We close the door. We lay the pieces out on
            the table. You bring your mother, your sister, your husband-to-be — whoever
            you&rsquo;d like — and a reference image of the lehenga, if you have one.
          </p>

          {/* What to expect list */}
          <ul className="space-y-3 mb-10">
            {[
              'We pre-curate 12–18 pieces based on your lehenga colour and preferences',
              'We show you the certificates first, the pieces second',
              'We take photographs of you in the pieces, for your records',
              'We hold any piece for up to 14 days on a refundable token',
            ].map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={reduce ? {} : { opacity: 0, x: 12 }}
                whileInView={reduce ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease }}
              >
                <span
                  aria-hidden
                  style={{
                    display: 'block',
                    width: 16,
                    height: 1,
                    background: 'var(--aged-gold)',
                    flexShrink: 0,
                    marginTop: '0.7em',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/bridal/book" className="btn-primary">
              Book the consultation →
            </Link>
            <a
              href={whatsappLinkFor("Hello Solitaire — I'd like to enquire about the bridal consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Write on WhatsApp
            </a>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.875rem',
              fontStyle: 'italic',
              color: 'var(--ink-muted)',
              marginTop: '1.25rem',
            }}
          >
            The consultation is at no cost. Sundays by request.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
