import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import EmployeeBenefitsSection from "@/components/user/fleet/Benefits";
import FleetStatsSection from "@/components/user/fleet/Stats";
import { TrustStrip } from "@/components/user/fleet/Trust";
import WhoWeServeSection from "@/components/user/fleet/WhoWeServe";
import WhyZeravaSection from "@/components/user/fleet/Why";

export default function Fleet() {
    return (
        <div>
            <PageHero
                badge="Fleet & Corporate"
                title="Sustainable fleet care"
                highlight="designed for scale"
                description="Keep your fleet consistently clean while supporting sustainability goals - built for organisations managing vehicles at scale."
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
            <TrustStrip />
        </div>
    )
}