import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import EnvironmentalImpactSection from "@/components/user/eco-method/Environment";
import InnovationSection from "@/components/user/eco-method/Main";
import ProcessSection from "@/components/user/eco-method/Process";

export default function EcoMethod() {
    return (
        <div>
            <PageHero
                badge="Eco Innovation"
                title="The science of"
                highlight="sustainable clean"
                description="Our waterless technology represents the future of vehicle care — combining cutting-edge chemistry with environmental responsibility."
            />
            <InnovationSection />
            <EnvironmentalImpactSection />
            <ProcessSection />
            <FinalCTA
                title="Experience the new difference"
                description="Join the sustainable vehicle care movement today."
                buttons={[
                    {
                        label: "Book Your Clean",
                        href: "/booking",
                        variant: "primary",
                    },
                ]}
            />
        </div>
    )
}