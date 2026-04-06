import CookieHeader from "@/components/cookies/Header";
import CookiePolicyPage from "@/components/cookies/Main";

export const metadata = {
  title: "Cookie Policy | Zerava",
  description:
    "Learn how Zerava uses cookies to improve website functionality, analyse traffic, and enhance user experience.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Cookies() {
    return (
        <div>
            <CookieHeader />
            <CookiePolicyPage />
        </div>
    )
}