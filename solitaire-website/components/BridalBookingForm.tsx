'use client';

import { useState } from 'react';
import { whatsappLinkFor } from '@/lib/site';
import { IconArrowRight, IconCheck } from '@/components/icons/Icon';

const TOTAL = 5;

const PIECE_OPTIONS = [
  'Polki',
  'Solitaire',
  'Diamond',
  'Antique Gold',
  'Bangles',
  'Earrings',
  'Other',
] as const;

const BUDGET_TIERS = [
  { label: 'Modest', sub: 'up to 2L' },
  { label: 'Traditional', sub: '2–5L' },
  { label: 'Heirloom', sub: '5–10L' },
  { label: 'Couture', sub: '10L+' },
] as const;

const TIME_SLOTS = [
  'Mon — 11:30 AM',
  'Mon — 4:00 PM',
  'Tue — 11:30 AM',
  'Wed — 4:00 PM',
  'Sat — 12:00 PM',
  'Sat — 5:30 PM',
];

type Form = {
  name: string;
  weddingDate: string;
  pieces: string[];
  budget: string;
  phone: string;
  slot: string;
};

export function BridalBookingForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Form>({
    name: '',
    weddingDate: '',
    pieces: [],
    budget: '',
    phone: '',
    slot: '',
  });

  const togglePiece = (p: string) => {
    setForm((f) => ({
      ...f,
      pieces: f.pieces.includes(p)
        ? f.pieces.filter((x) => x !== p)
        : [...f.pieces, p],
    }));
  };

  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  if (submitted) {
    return (
      <div className="bg-paper border border-line p-10 md:p-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald/10 text-emerald mb-6">
          <IconCheck size={26} />
        </div>
        <h2 className="font-display text-display mb-4">We've got it.</h2>
        <p className="text-body text-ink-soft">
          Aanya from Solitaire will reach out on WhatsApp within the hour to
          confirm your appointment and answer any questions.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappLinkFor(
              `Hi Solitaire — I just booked a bridal consultation. ${form.name}, ${form.slot}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open WhatsApp
          </a>
          <a href="/" className="btn-secondary">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const canAdvance = (() => {
    if (step === 1) return form.name.trim().length > 1;
    if (step === 2) return Boolean(form.weddingDate);
    if (step === 3) return form.pieces.length > 0;
    if (step === 4) return Boolean(form.budget);
    if (step === 5) return form.phone.trim().length >= 10 && Boolean(form.slot);
    return false;
  })();

  const handleSubmit = () => {
    if (!canAdvance) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-paper border border-line p-8 md:p-14 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-10 text-mono text-micro uppercase tracking-eyebrow text-ink-muted">
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 ${
                i + 1 <= step ? 'bg-gold' : 'bg-line'
              }`}
            />
          ))}
        </div>
        <span>
          Step {step} of {TOTAL}
        </span>
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 1 && (
          <div>
            <p className="eyebrow mb-3">Step 01</p>
            <h2 className="font-display text-display mb-8">
              Let's start with your name.
            </h2>
            <input
              type="text"
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full bg-transparent border-b-2 border-line focus:border-gold py-4 text-h2 font-display outline-none transition-colors"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="eyebrow mb-3">Step 02</p>
            <h2 className="font-display text-display mb-8">
              When is the wedding?
            </h2>
            <input
              type="date"
              value={form.weddingDate}
              onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
              className="w-full bg-transparent border-b-2 border-line focus:border-gold py-4 text-h2 font-display outline-none transition-colors"
            />
            <p className="mt-3 text-small text-ink-muted">
              An approximate date is fine. We'll fine-tune in the consultation.
            </p>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="eyebrow mb-3">Step 03</p>
            <h2 className="font-display text-display mb-8">
              What pieces are you considering?
            </h2>
            <div className="flex flex-wrap gap-3">
              {PIECE_OPTIONS.map((p) => {
                const active = form.pieces.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePiece(p)}
                    className={`px-5 py-3 text-small uppercase tracking-button border transition-colors ${
                      active
                        ? 'bg-ink text-bone border-ink'
                        : 'bg-transparent text-ink border-line hover:border-gold hover:bg-gold-veil'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="eyebrow mb-3">Step 04</p>
            <h2 className="font-display text-display mb-8">
              An indicative budget?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {BUDGET_TIERS.map((b) => {
                const active = form.budget === b.label;
                return (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setForm({ ...form, budget: b.label })}
                    className={`px-5 py-5 border text-left transition-colors ${
                      active
                        ? 'bg-ink text-bone border-ink'
                        : 'bg-transparent text-ink border-line hover:border-gold hover:bg-gold-veil'
                    }`}
                  >
                    <p className="font-display text-h2">{b.label}</p>
                    <p
                      className={`text-mono text-micro uppercase tracking-eyebrow mt-1 ${
                        active ? 'text-bone/70' : 'text-ink-muted'
                      }`}
                    >
                      {b.sub}
                    </p>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-small text-ink-muted">
              We use this only to prepare the right pieces. Nothing is final until
              you decide.
            </p>
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="eyebrow mb-3">Step 05</p>
            <h2 className="font-display text-display mb-8">
              And finally, your number and a slot.
            </h2>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 phone number"
              className="w-full bg-transparent border-b-2 border-line focus:border-gold py-4 text-h2 font-display outline-none transition-colors mb-8"
            />
            <p className="eyebrow mb-3">Pick a preferred slot</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {TIME_SLOTS.map((s) => {
                const active = form.slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, slot: s })}
                    className={`px-3 py-3 text-small border transition-colors ${
                      active
                        ? 'bg-ink text-bone border-ink'
                        : 'bg-transparent text-ink border-line hover:border-gold hover:bg-gold-veil'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 1}
          className="text-small uppercase tracking-button text-ink-muted disabled:opacity-30 hover:text-ink"
        >
          ← Back
        </button>

        {step < TOTAL ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            Continue <IconArrowRight />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance}
            className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        )}
      </div>

      <p className="mt-8 text-center text-small text-ink-muted">
        Or{' '}
        <a
          href={whatsappLinkFor(
            `Hi Solitaire — I'd like to book a bridal consultation.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-ink"
        >
          message us on WhatsApp
        </a>{' '}
        directly.
      </p>
    </div>
  );
}
