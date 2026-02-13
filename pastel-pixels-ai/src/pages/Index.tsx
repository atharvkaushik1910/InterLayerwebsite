import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { BridgingSection } from "@/components/sections/BridgingSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

import { PalsGallerySection } from "@/components/sections/PalsGallerySection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ModelsSection } from "@/components/sections/ModelsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FooterCTA } from "@/components/sections/FooterCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>InterLayer - The Human Computing Company | AI That Sees, Hears & Understands</title>
        <meta
          name="description"
          content="Meet PALs - AI companions that can see, hear, act, and actually understand you. InterLayer pioneers human computing with real-time, face-to-face AI interactions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://interlayer.ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <LogoStrip />
          <BridgingSection />
          <FeaturesSection />

          <PalsGallerySection />
          <ProductsSection />
          <ModelsSection />
          <AboutSection />
          <FooterCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
