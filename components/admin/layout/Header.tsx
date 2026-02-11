import Link from "next/link";
import ZonesModal from "../zones/ZonesModal";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { useAdminUI } from "@/lib/AdminUIContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    LayoutGrid,
    BarChart3,
    CalendarDays,
    ClipboardList,
    CreditCard,
    Image,
    Users,
    Ban,
    UserCog,
} from "lucide-react";


const tabs = [
    { label: "Overview", href: "/admin", icon: LayoutGrid },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
    { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
    { label: "Services", href: "/admin/services", icon: ClipboardList },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Gallery", href: "/admin/gallery", icon: Image },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Block Slots", href: "/admin/block-slots", icon: Ban },
    { label: "Operator Slots", href: "/admin/slots", icon: UserCog },
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
                <div className="text-center">
                    <div className="mx-auto inline-flex max-w-7xl px-6 py-3">
                        <div className="flex flex-wrap items-center gap-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                            {tabs.map((tab) => {
                                const active =
                                    tab.href === "/admin"
                                        ? pathname === "/admin"
                                        : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

                                const Icon = tab.icon;

                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
            ${active
                                                ? "bg-emerald-500 text-black shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <Icon size={16} />
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
