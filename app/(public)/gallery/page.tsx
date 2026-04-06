import PageHero from "@/components/common/PageHero";
import BeforeAfterSection from "@/components/user/gallery/Main";

export const metadata = {
  title: "Our Work & Results | Zerava",
  description:
    "See real results from Zerava’s premium eco-friendly car cleaning services. Before and after transformations and customer reviews.",
  keywords: [
    "Car detailing results",
    "Before and after car cleaning",
    "Car wash results Southampton",
    "Zerava gallery",
  ],
};

export default function Gallery() {
    return (
        <div>
            <PageHero
                badge="Our Work"
                title="Results & Reviews"
                description="See the transformation. Hear from our customers."
            />
            <BeforeAfterSection />
        </div>
    )
}