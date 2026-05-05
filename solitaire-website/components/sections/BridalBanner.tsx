import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export function BridalBanner() {
  return (
    <section className="bg-rose-soft">
      <div className="container-wide grid md:grid-cols-2 gap-0 items-stretch">
        <Reveal>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80"
              alt="A bride wearing a Solitaire Polki bridal set in Kanpur"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="px-6 md:px-16 py-16 md:py-32 flex flex-col justify-center max-w-xl">
            <p className="eyebrow text-rose mb-4" style={{ color: 'var(--rose)' }}>
              For The Bride
            </p>
            <h2 className="display-page leading-[1.05]">The Bridal Consultation.</h2>
            <p className="text-body text-ink-soft mt-6">
              A private 45-minute appointment to curate the pieces of your day. Bring
              your mother, your sister, the lehenga reference. We bring the pieces.
            </p>
            <Link href="/bridal/book" className="btn-primary self-start mt-10">
              Book Consultation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
