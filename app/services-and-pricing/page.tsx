import AddOnsSection from "@/components/services-and-pricing/AddOns";
import ServicesFinalCTA from "@/components/services-and-pricing/CTA";
import ServicesPricingHero from "@/components/services-and-pricing/Hero";
import ServicesList from "@/components/services-and-pricing/List";
import PricingSection from "@/components/services-and-pricing/Pricing";
import WhySubscribe from "@/components/services-and-pricing/Why";

export default function ServicesAndPricing() {
    return (
        <div>
            <ServicesPricingHero />
            <ServicesList />
            <AddOnsSection />
            <PricingSection />
            <WhySubscribe />
            <ServicesFinalCTA />
        </div>
    )
}