import PageHero from "@/components/common/PageHero";
import BeforeAfterSection from "@/components/user/gallery/Main";

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