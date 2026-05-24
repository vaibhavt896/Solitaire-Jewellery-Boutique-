import type { Metadata } from 'next';
import { BridalBookingForm } from '@/components/BridalBookingForm';
import { Reveal } from '@/components/Reveal';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Bridal Consultation',
  description:
    'Reserve a private 45-minute bridal consultation at the Solitaire boutique in Swaroop Nagar, Kanpur.',
  path: '/bridal/book',
});

export default function BookPage() {
  return (
    <section className="section-pad bg-bone min-h-[80vh]">
      <div className="container-content">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">Bridal Consultation</p>
          <h1 className="display-page">A private 45 minutes, curated for you.</h1>
          <p className="body-lead mt-6 max-w-xl mx-auto">
            Tell us about your day. We'll have a curation ready when you arrive
            at the boutique.
          </p>
        </Reveal>

        <BridalBookingForm />
      </div>
    </section>
  );
}
