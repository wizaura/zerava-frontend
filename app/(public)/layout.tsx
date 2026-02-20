import Navbar from "@/components/user/layout/Navbar";
import Footer from "@/components/user/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
