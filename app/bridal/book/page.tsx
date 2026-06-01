import type { Metadata } from 'next';
import { BridalBookingForm } from '@/components/BridalBookingForm';
import { Reveal } from '@/components/Reveal';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Bridal Sitting',
  description:
    'Tell us a little about your wedding and we will have a curated selection ready. A free, private, no-pressure sitting in Swaroop Nagar, Kanpur.',
  path: '/bridal/book',
});

export default function BookPage() {
  return (
    <section className="section-pad bg-bone min-h-[80vh]">
      <div className="container-content">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">A free, private sitting</p>
          <h1 className="display-page">Let&rsquo;s plan your bridal jewellery.</h1>
          <p className="body-lead mt-6 max-w-xl mx-auto">
            A few quick questions, so your first sitting is time well spent. It
            takes about a minute.
          </p>
        </Reveal>

        <BridalBookingForm />
      </div>
    </section>
  );
}
