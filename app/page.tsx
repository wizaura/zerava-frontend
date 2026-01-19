import FinalCTA from "@/components/common/FinalCTA";
import FleetStatsSection from "@/components/user/fleet/Stats";
import FAQsPreview from "@/components/user/home/FAQs";
import FleetPreview from "@/components/user/home/Fleet";
import GalleryPreview from "@/components/user/home/Gallery";
import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/How";
import PricingPreview from "@/components/user/home/Pricing";
import ServiceHighlights from "@/components/user/home/Services";
import TestimonialsSection from "@/components/user/home/Testimonials";
import WhyZerava from "@/components/user/home/Why";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ServiceHighlights />
      {/* <PricingPreview /> */}
      <FleetPreview />
      <WhyZerava />
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
