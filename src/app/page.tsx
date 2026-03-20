"use client";

import { AnimatePresence } from "framer-motion";
import { useIntroSeen } from "@/hooks/useIntroSeen";
import IntroOverlay from "@/components/intro/IntroOverlay";
import LandingHero from "@/components/landing/LandingHero";
import ProcessSection from "@/components/landing/ProcessSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ImpactSection from "@/components/landing/ImpactSection";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function Home() {
  const { seen, loaded, markSeen } = useIntroSeen();

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-forest-dark">
        <div className="text-4xl">🌾</div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {!seen && <IntroOverlay onComplete={markSeen} />}
      </AnimatePresence>

      <Header />
      <LandingHero />
      <ProcessSection />
      <BenefitsSection />
      <ImpactSection />
      <Footer />
    </>
  );
}
