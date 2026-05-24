import { Hero } from '@/components/sections/Hero';
import { SignatureCategories } from '@/components/sections/SignatureCategories';
import { Difference } from '@/components/sections/Difference';
import { TrustNumbers } from '@/components/sections/TrustNumbers';
import { FeaturedPiece } from '@/components/sections/FeaturedPiece';
import { OccasionGrid } from '@/components/sections/OccasionGrid';
import { BridalBanner } from '@/components/sections/BridalBanner';
import { TrustMarquee } from '@/components/TrustMarquee';
import { VisitPreview } from '@/components/sections/VisitPreview';
import { JournalPreview } from '@/components/sections/JournalPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <SignatureCategories />
      <Difference />
      <TrustNumbers />
      <FeaturedPiece />
      <OccasionGrid />
      <BridalBanner />
      <VisitPreview />
      <JournalPreview />
    </>
  );
}
