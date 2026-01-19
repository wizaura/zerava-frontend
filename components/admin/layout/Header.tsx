import Link from "next/link";
import ZonesModal from "../zones/ZonesModal";
import { isAdminAuthenticated } from "@/app/lib/adminAuth";
import { useAdminUI } from "@/app/context/AdminUIContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const tabs = [
    { label: "Overview", href: "/admin" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Calendar", href: "/admin/calendar" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Subscriptions", href: "/admin/subscriptions" },
    { label: "Gallery", href: "/admin/gallery" },
    { label: "Customers", href: "/admin/customers" },
    { label: "Operator Slots", href: "/admin/slots" },
];

export default function AdminHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { openZones } = useAdminUI();

    useEffect(() => {
        (async () => {
            const ok = await isAdminAuthenticated();
            if (!ok) router.push("/admin/login");
        })();
    }, [router]);


    return (
        <>
            {/* ===== MAIN HEADER ===== */}
            <header className="w-full text-white">
                <div className="px-6 py-8 bg-eco-black">
                    <div className="mx-auto max-w-7xl flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-light pb-2">Admin Dashboard</h1>
                            <p className="text-md text-gray-400">
                                Manage bookings, subscriptions, and customers
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={openZones}
                                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:brightness-110"
                            >
                                Manage Zones
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("admin_token");
                                    router.push("/admin/login");
                                }}
                                className="rounded-full border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== TAB BAR ===== */}
                <div className="">
                    <div className="mx-auto max-w-4xl px-6 py-3">
                        <div className="flex flex-wrap items-center gap-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                            {tabs.map((tab) => {
                                const active =
                                    pathname === tab.href || pathname.startsWith(tab.href);

                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                      ${active
                                                ? "bg-emerald-500 text-black shadow"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </header>

            <ZonesModal />
        </>
    );
}
