import { Hero } from '@/components/sections/Hero';
import { SignatureCategories } from '@/components/sections/SignatureCategories';
import { Difference } from '@/components/sections/Difference';
import { FeaturedPiece } from '@/components/sections/FeaturedPiece';
import { BridalBanner } from '@/components/sections/BridalBanner';
import { TrustMarquee } from '@/components/TrustMarquee';
import { VisitPreview } from '@/components/sections/VisitPreview';
import { JournalPreview } from '@/components/sections/JournalPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureCategories />
      <Difference />
      <FeaturedPiece />
      <BridalBanner />
      <TrustMarquee />
      <VisitPreview />
      <JournalPreview />
    </>
  );
}
