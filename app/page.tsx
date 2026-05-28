import { Hero }                from '@/components/sections/Hero';
import { TrustMarquee }        from '@/components/TrustMarquee';
import { BoutiqueWord }        from '@/components/sections/BoutiqueWord';
import { BoutiqueReels }       from '@/components/sections/BoutiqueReels';
import { SignatureCategories } from '@/components/sections/SignatureCategories';
import { FeaturedPiece }       from '@/components/sections/FeaturedPiece';
import { TheAtelier }          from '@/components/sections/TheAtelier';
import { TrustNumbers }        from '@/components/sections/TrustNumbers';
import { BridalBanner }        from '@/components/sections/BridalBanner';
import { JournalPreview }      from '@/components/sections/JournalPreview';
import { VisitPreview }        from '@/components/sections/VisitPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <BoutiqueWord />
      <BoutiqueReels />
      <SignatureCategories />
      <FeaturedPiece />
      <TheAtelier />
      <TrustNumbers />
      <BridalBanner />
      <JournalPreview />
      <VisitPreview />
    </>
  );
}
