import FinalCTA from "@/components/common/FinalCTA";
import FleetStatsSection from "@/components/fleet/Stats";
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
      <FleetPreview />
      <TestimonialsSection />
      <FleetStatsSection />
      <GalleryPreview />
      <FAQsPreview />
      <FinalCTA
        title="Ready to discuss your fleet needs?"
        description="Get a tailored quote for your organisation. We'll design a solution that fits your requirements and budget."
        buttons={[
          {
            label: "Request a Quote",
            href: "/contact?type=fleet",
            variant: "primary",
          },
          {
            label: "Email Us",
            href: "mailto:fleet@zerava.co.uk",
            variant: "secondary",
          },
        ]}
      />
    </div>
  );
}
