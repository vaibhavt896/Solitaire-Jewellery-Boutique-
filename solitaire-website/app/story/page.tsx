import Link from 'next/link';
import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story',
  description:
    'Solitaire is a family-led jewellery boutique in Swaroop Nagar, Kanpur. Polki, antique gold, and certified solitaires — curated by hand, not by the catalogue.',
  path: '/story',
});

export default function StoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Story', href: '/story' },
        ])}
      />

      <article className="bg-bone">
        <div className="container-content py-20 md:py-32">
          <Reveal>
            <p className="eyebrow mb-4">Our Story</p>
            <h1 className="display-page leading-tight">
              Solitaire began with a single observation.
            </h1>
          </Reveal>

          <Reveal className="mt-12 prose-lg">
            <p className="font-display text-h1 leading-snug text-ink-soft">
              That a great deal of fine jewellery in this country is sold the
              way appliances are sold — by feature, by weight, by carat — and
              the woman wearing it is rarely the centre of the conversation.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2 hidden md:block" />
            <Reveal className="md:col-span-10 text-body text-ink-soft space-y-6 max-w-content">
              <p>
                Solitaire opened in Swaroop Nagar in 2018, on the same street
                that has held Kanpur's jewellery houses for more than a
                century. We are newer than our neighbours by design — we
                wanted to begin with a different conversation.
              </p>
              <p>
                The boutique is small. We carry fewer pieces than a department
                store and more pieces than an atelier. The format is
                deliberate. A woman who walks in for a Polki choker should be
                able to see four chokers, not forty, and feel like she is
                deciding rather than narrowing.
              </p>
            </Reveal>
          </div>

          <Reveal className="my-20">
            <div className="aspect-[16/9] bg-bone-deep overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620794108219-aedbaded4eea?auto=format&fit=crop&w=2000&q=80"
                alt="The interior of the Solitaire boutique in Swaroop Nagar, Kanpur"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="prose-lg max-w-content space-y-6">
            <p className="font-display text-h1 leading-snug">
              We are a boutique. Not a chain. Not an aggregator. That decision
              shapes everything we do.
            </p>
            <p className="text-body text-ink-soft">
              Our Polki comes from two ateliers in Jaipur we have known for a
              decade. Our diamonds are GIA or IGI certified — we walk you
              through the report before you decide. Our gold is hallmarked to
              BIS standard. The certificate goes home with the piece.
            </p>
            <p className="text-body text-ink-soft">
              We are a small team. We answer the phone. We answer WhatsApp.
              When a piece needs a six-month polish, you bring it in and we
              do it ourselves. When a piece needs to come back to the atelier
              for a re-set, we send it and we send it back. This is how a
              boutique works, and this is the boutique we wanted in Kanpur.
            </p>
          </Reveal>

          <Reveal className="my-20 grid md:grid-cols-2 gap-6">
            <div className="aspect-[4/5] overflow-hidden bg-bone-deep">
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80"
                alt="A craftsman setting a Polki stone in the Solitaire atelier"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-bone-deep mt-12 md:mt-24">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
                alt="A loose certified solitaire on cream cloth, ready for inspection"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="text-center mt-20">
            <p className="font-display text-h1 max-w-2xl mx-auto leading-snug">
              That, in a paragraph, is who we are. The rest of it, we'd rather
              tell you in person.
            </p>
            <Link href="/visit" className="btn-primary mt-10 inline-flex">
              Visit Us in Swaroop Nagar
            </Link>
          </Reveal>
        </div>
      </article>
    </>
  );
}
