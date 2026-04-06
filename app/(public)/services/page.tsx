import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import AddOnsSection from "@/components/user/services/AddOns";
import ServicesList from "@/components/user/services/List";
import PricingSection from "@/components/user/services/Pricing";
import OurPromiseSection from "@/components/user/services/Promise";

export const metadata = {
  title: "Mobile Car Wash Services & Pricing Southampton | Zerava",
  description:
    "Explore Zerava’s mobile car wash and eco-friendly vehicle detailing services in Southampton. Transparent pricing, premium service, and sustainable cleaning.",
  keywords: [
    "Mobile car wash Southampton",
    "Car detailing Southampton",
    "Eco car wash Southampton",
    "Waterless car cleaning",
    "Car wash pricing Southampton",
    "Zerava services",
  ],
  robots: {
    index: true,
    follow: true,
  },
};


export default function ServicesAndPricing() {
    return (
        <div>
            <PageHero
                badge="Services & Pricing"
                title="Premium care,"
                highlight="zero compromise"
                description="From quick exterior refreshes to complete valet packages, every service uses our signature waterless, biodegradable formula — with simple, transparent pricing and no hidden fees."
                buttons={[
                    {
                        label: "Book Now",
                        href: "/booking",
                        variant: "primary",
                    },
                    {
                        label: "View Packages",
                        href: "/services#pricing",
                        variant: "secondary",
                    },
                ]}
            />
            <ServicesList />
            <AddOnsSection />
            <PricingSection />
            <OurPromiseSection />
            <FinalCTA
                title="Questions about pricing?"
                description="Get in touch and we'll help you find the perfect package for your needs."
                buttons={[
                    {
                        label: "Book Now",
                        href: "/booking",
                        variant: "primary",
                    },
                    {
                        label: "Contact Us",
                        href: "/contact",
                        variant: "secondary",
                    },
                ]}
            />
        </div>
    )
}