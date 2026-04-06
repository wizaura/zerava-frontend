import TermsPage from "@/components/terms/Main";

export const metadata = {
  title: "Terms & Conditions | Zerava",
  description:
    "Review Zerava’s terms and conditions for using our eco-friendly vehicle cleaning and subscription services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditions() {
    return (
        <div>
            <TermsPage />
        </div>
    )
}