import FinalCTA from "@/components/common/FinalCTA";
import PageHero from "@/components/common/PageHero";
import ContactMain from "@/components/user/contact/Main";
import ContactMethods from "@/components/user/contact/Methods";

export const metadata = {
  title: "Contact Zerava | Book or Enquire",
  description:
    "Contact Zerava for bookings, fleet enquiries, or support. Premium eco-friendly vehicle care services in Southampton.",
  keywords: [
    "Contact Zerava",
    "Car wash Southampton contact",
    "Book car wash Southampton",
  ],
};

export default function Contact() {
    return (
        <div>
            <PageHero
                badge="Contact Us"
                title="Let's talk"
                description="Have a question or ready to book? We're here to help."
            />
            <ContactMethods />
            <ContactMain />
            <FinalCTA
                title="Ready to Experience Zerava?"
                description="Book your eco-friendly clean today or speak with our team for fleet solutions."
                buttons={[
                    {
                        label: "Book Now",
                        href: "/book",
                        variant: "primary",
                    },
                    {
                        label: "Fleet Enquiry",
                        href: "/fleet",
                        variant: "secondary",
                    },
                ]}
            />
        </div>
    )
}