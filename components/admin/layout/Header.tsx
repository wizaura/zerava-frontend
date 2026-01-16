import Link from "next/link";
import ZonesModal from "../zones/ZonesModal";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { useAdminUI } from "@/context/AdminUIContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const tabs = [
    { label: "Overview", href: "/admin" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Pricing", href: "/admin/pricing" },
    { label: "Slots", href: "/admin/slots" },
    { label: "Subscriptions", href: "/admin/subscriptions" },
    { label: "Gallery", href: "/admin/gallery" },
    { label: "Customers", href: "/admin/customers" },
];

export default function LayoutInner({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { openZones } = useAdminUI();

    useEffect(() => {
        if (!isAdminAuthenticated()) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100 mt-20 pt-20">
            {/* Header */}
            <header className="fixed top-16 w-full bg-black text-white z-40">
                <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">
                            Admin Dashboard
                        </h1>
                        <p className="text-xs text-gray-300">
                            Manage bookings, subscriptions, and customers
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={openZones}
                            className="rounded-full bg-green-500 px-4 py-1 text-sm font-medium text-black"
                        >
                            Manage Zones
                        </button>

                        <button
                            onClick={() => {
                                localStorage.removeItem("admin_token");
                                router.push("/admin/login");
                            }}
                            className="rounded-full border border-gray-600 px-4 py-2 text-xs"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-800">
                    <div className="mx-auto max-w-7xl px-6 py-3 flex gap-2">
                        {tabs.map((tab) => {
                            const active =
                                pathname === tab.href ||
                                pathname.startsWith(tab.href);

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                                        active
                                            ? "bg-green-500 text-black"
                                            : "text-gray-300 hover:bg-gray-800"
                                    }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-6">
                {children}
            </main>

            {/* Modals */}
            <ZonesModal />
        </div>
    );
}