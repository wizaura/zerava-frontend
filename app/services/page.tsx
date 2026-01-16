import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import AddOnsSection from "@/components/services/AddOns";
import ServicesList from "@/components/services/List";
import PricingSection from "@/components/services/Pricing";
import WhySubscribe from "@/components/services/Why";

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
                        label: "View Packages",
                        href: "#pricing",
                        variant: "primary",
                    },
                    {
                        label: "Book Now",
                        href: "/booking",
                        variant: "secondary",
                    },
                ]}
            />
            <ServicesList />
            <AddOnsSection />
            <PricingSection />
            <WhySubscribe />
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