import Link from 'next/link';
import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { MEDIA } from '@/lib/placeholder-media';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story | A Small Family Boutique in Swaroop Nagar',
  description:
    'Solitaire opened in Swaroop Nagar, Kanpur in 2018 with one idea: put the person wearing the jewellery first. Certified, honest, and made to be kept.',
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
            <p className="eyebrow mb-4">Our story</p>
            <h1 className="display-page leading-tight">
              We opened a small boutique, on purpose.
            </h1>
          </Reveal>

          <Reveal className="mt-12 prose-lg">
            <p className="font-display text-h1 leading-snug text-ink-soft">
              Solitaire opened in Swaroop Nagar in 2018, on a street that has sold
              jewellery in Kanpur for over a hundred years. We are younger than our
              neighbours, and we wanted to do one thing differently: put the person
              wearing the jewellery back at the centre of it.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2 hidden md:block" />
            <Reveal className="md:col-span-10 text-body text-ink-soft space-y-6 max-w-content">
              <p>
                The boutique is small, and we like it that way. We carry fewer
                pieces than a big showroom, so that when you walk in for a choker,
                you see four good ones, not forty, and you can actually decide.
                Choosing should feel calm, not crowded.
              </p>
              <p>
                We are a family, and a small team. We answer our own phone. We
                answer our own WhatsApp. When a piece needs a clean six months
                later, you bring it in and we do it ourselves. When a stone needs
                re-setting, we send it to the workshop and bring it back to you.
                This is simply how a boutique should work.
              </p>
            </Reveal>
          </div>

          <Reveal className="my-20">
            <div className="aspect-[16/9] bg-bone-deep overflow-hidden">
              <img
                src={MEDIA.boutique}
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
              Our Polki comes from two workshops in Jaipur we have known for over
              ten years. Our diamonds are GIA or IGI certified, and we explain the
              report before you decide anything. Our gold is hallmarked. The
              certificate always goes home with the piece.
            </p>
          </Reveal>

          <Reveal className="my-20 grid md:grid-cols-2 gap-6">
            <div className="aspect-[4/5] overflow-hidden bg-bone-deep">
              <img
                src={MEDIA.gold}
                alt="A craftsman setting a Polki stone in the Solitaire atelier"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-bone-deep mt-12 md:mt-24">
              <img
                src={MEDIA.solitaire}
                alt="A loose certified solitaire on cream cloth, ready for inspection"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="text-center mt-20">
            <p className="font-display text-h1 max-w-2xl mx-auto leading-snug">
              That, in short, is who we are. The rest, we would rather tell you in
              person.
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
