import FinalCTA from "@/components/common/FinalCTA";
import FAQsPreview from "@/components/user/home/FAQs";
import FleetPreview from "@/components/user/home/Fleet";
import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/How";
import ServiceHighlights from "@/components/user/home/Services";
import TestimonialsSection from "@/components/user/home/Testimonials";
import WhyZerava from "@/components/user/home/Why";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyZerava />
      <ServiceHighlights />
      <TestimonialsSection />
      <FleetPreview />
      <FAQsPreview />
      {/* <GalleryPreview /> */}
      <FinalCTA
        title="Ready for a cleaner drive?"
        description="Professional vehicle care delivered where your car is parked — without water waste or 
inconvenience."
        buttons={[
          {
            label: "Book Now",
            href: "/booking",
            variant: "primary",
          },
          {
            label: "View Services",
            href: "/services",
            variant: "secondary",
          },
        ]}
      />
    </div>
  );
}
