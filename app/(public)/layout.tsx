import Navbar from "@/components/user/layout/Navbar";
import Footer from "@/components/user/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <LoginModal />
            {children}
            <Footer />
        </>
    );
}
