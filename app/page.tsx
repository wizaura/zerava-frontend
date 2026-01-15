import FleetStatsSection from "@/components/fleet/Stats";
import FinalCTA from "@/components/home/CTA";
import FAQsPreview from "@/components/home/FAQs";
import FleetPreview from "@/components/home/Fleet";
import GalleryPreview from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/How";
import PricingPreview from "@/components/home/Pricing";
import ServiceHighlights from "@/components/home/Services";
import TestimonialsSection from "@/components/home/Testimonials";
import WhyZerava from "@/components/home/Why";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ServiceHighlights />
      <PricingPreview />
      <WhyZerava />
      <FleetStatsSection />
      <FleetPreview />
      <TestimonialsSection />
      <GalleryPreview />
      <FAQsPreview />
      <FinalCTA />
    </div>
  );
}
