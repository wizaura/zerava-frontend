import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import EmployeeBenefitsSection from "@/components/fleet/Benefits";
import FleetStatsSection from "@/components/fleet/Stats";
import WhoWeServeSection from "@/components/fleet/WhoWeServe";
import WhyZeravaSection from "@/components/fleet/Why";

export default function Fleet() {
    return (
        <div>
            <PageHero
                badge="Fleet & Corporate"
                title="Sustainable fleet"
                highlight="care at scale"
                description="Keep your fleet spotless while achieving sustainability goals. Our on-site waterless cleaning services are designed for NHS trusts, councils, corporate campuses, and logistics companies."
                buttons={[
                    {
                        label: "Get a Quote",
                        href: "/contact?type=fleet",
                        variant: "primary",
                    },
                    {
                        label: "Call Us",
                        href: "tel:+44XXXXXXXXXX",
                        variant: "secondary",
                    },
                ]}
            />
            <FleetStatsSection />
            <WhoWeServeSection />
            <WhyZeravaSection />
            <EmployeeBenefitsSection />
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
    )
}