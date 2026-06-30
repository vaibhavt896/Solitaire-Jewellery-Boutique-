import { Hero }                from '@/components/sections/Hero';
import { TrustBadges }          from '@/components/sections/TrustBadges';
import { CollectionsShowcase }  from '@/components/sections/CollectionsShowcase';
import { BoutiqueReels }        from '@/components/sections/BoutiqueReels';
import { BangleShowcase }       from '@/components/sections/BangleShowcase';
import { InstagramReelEmbed }   from '@/components/sections/InstagramReelEmbed';
import { StorySplit }           from '@/components/sections/StorySplit';
import { BridalBanner }         from '@/components/sections/BridalBanner';
import { ArticlesGrid }         from '@/components/sections/ArticlesGrid';

/* Heart cradled in open hands — the "crafted for forever" mark */
const HandsHeart = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 8.6c.9-1.6 3.3-1.4 3.9.3.4 1.1-.3 2.2-1.1 3L12 14.7l-2.8-2.8c-.8-.8-1.5-1.9-1.1-3 .6-1.7 3-1.9 3.9-.3z" />
    <path d="M3.6 13.8l3.1 2.6c.5.4 1.1.6 1.7.6h7.2c.6 0 1.2-.2 1.7-.6l3.1-2.6" />
    <path d="M3.6 13.8v2.4M20.4 13.8v2.4" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      <Hero />

      <TrustBadges variant="promise" />

      <CollectionsShowcase />

      <BoutiqueReels />

      {/* Image left / content right */}
      <StorySplit
        flip
        eyebrow="Crafted for Forever"
        title="Where Every Detail Tells a Story"
        body="Each creation is handcrafted by skilled artisans using the finest materials and time-honoured techniques, ensuring unmatched quality and beauty in every piece we make."
        ctaLabel="Explore Craftsmanship"
        ctaHref="/craftsmanship"
        ctaVariant="fill"
        icon={HandsHeart}
        image={{ src: '/Crafted for Forever.webp', alt: 'The craftsmanship behind every Solitaire piece' }}
      />

      {/* Full-bleed cinematic — craftsmanship in motion */}
      <BangleShowcase />

      <TrustBadges variant="service" />

      <BridalBanner />

      <ArticlesGrid />

      {/* Closing Instagram moment — reel rail + follow card, before footer */}
      <InstagramReelEmbed />
    </>
  );
}
