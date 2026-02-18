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
                buttons={[
                    {
                        label: "Explore Our Technology",
                        href: "#innovation",
                        variant: "primary",
                    },
                    {
                        label: "Our Sustainability Promise",
                        href: "/about",
                        variant: "secondary",
                    },
                ]}
            />
            <InnovationSection />
            <EnvironmentalImpactSection />
            <ProcessSection />
            <FinalCTA
                title="Experience the eco difference"
                description="Join the sustainable car care movement today."
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