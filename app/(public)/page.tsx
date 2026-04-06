import FinalCTA from "@/components/common/FinalCTA";
import FAQsPreview from "@/components/user/home/FAQs";
import FleetPreview from "@/components/user/home/Fleet";
import Hero from "@/components/user/home/Hero";
import HowItWorks from "@/components/user/home/How";
import ServiceHighlights from "@/components/user/home/Services";
import TestimonialsSection from "@/components/user/home/Testimonials";
import WhyZerava from "@/components/user/home/Why";

export const metadata = {
  title: "Mobile Car Wash Southampton | Zerava Eco Vehicle Care",
  description:
    "Zerava offers premium mobile car wash and eco-friendly vehicle cleaning services in Southampton. Book online for waterless car cleaning at your location.",
  keywords: [
    "Car wash Southampton",
    "Mobile car wash Southampton",
    "Eco car wash Southampton",
    "Waterless car wash Southampton",
    "Car detailing Southampton",
    "Fleet car cleaning Southampton",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

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
