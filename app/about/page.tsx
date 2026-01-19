import FutureVisionSection from "@/components/user/about/FutureVision";
import JourneySection from "@/components/user/about/Journey";
import OurStorySection from "@/components/user/about/Main";
import MissionVisionSection from "@/components/user/about/MissionVision";
import { ValuesSection } from "@/components/user/about/Values";
import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";

export default function About() {
    return (
        <div>
            <PageHero
                badge="About Zerava"
                title="Reimagining"
                highlight="mobility care"
                description="We're not just a car wash company. We're building the future of vehicle care — one that's sustainable, convenient, and designed for modern mobility."
            />
            <OurStorySection />
            <MissionVisionSection />
            <ValuesSection />
            <FutureVisionSection />
            <JourneySection />
            <FinalCTA
                title="Join the movement"
                description="Be part of the sustainable car care revolution."
                buttons={[
                    {
                        label: "Book Your First Clean",
                        href: "/booking",
                        variant: "primary",
                    },
                    {
                        label: "Get in Touch",
                        href: "/contact",
                        variant: "secondary",
                    },
                ]}
            />
        </div>
    )
}