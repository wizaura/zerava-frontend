import PrivacyHeader from "@/components/privacy/Header";
import PrivacyPage from "@/components/privacy/Main";

export const metadata = {
  title: "Privacy Policy | Zerava",
  description:
    "Read Zerava’s privacy policy to understand how we collect, use, and protect your personal information when using our vehicle care services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
    return (
        <div>
            <PrivacyHeader />
            <PrivacyPage />
        </div>
    )
}