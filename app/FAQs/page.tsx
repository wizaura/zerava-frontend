import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import FAQSection from "@/components/user/FAQs/Main";

export default function FAQs() {
    return (
        <div>
            <PageHero
                badge="Help Centre"
                title="Frequently Asked"
                highlight="Questions"
                description="Everything you need to know about our waterless car care services."
            />
            <FAQSection />
            <FinalCTA
                title="Still have questions?"
                description="Can't find what you're looking for? Our team is here to help."
                buttons={[
                    {
                        label: "Contact Us",
                        href: "/contact",
                        variant: "primary",
                    },
                    {
                        label: "Book a Service",
                        href: "/book",
                        variant: "secondary",
                    },
                ]}
            />
        </div>
    )
}