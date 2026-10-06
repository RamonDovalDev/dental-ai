import CTA from "@/components/landing-page/CTA";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import PricingSection from "@/components/landing-page/PricingSection";
import WhatToAsk from "@/components/landing-page/WhatToAsk";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
