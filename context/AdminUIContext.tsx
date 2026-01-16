"use client";

import { createContext, useContext, useState } from "react";

type AdminUIContextType = {
    isZonesOpen: boolean;
    openZones: () => void;
    closeZones: () => void;
};

const AdminUIContext = createContext<AdminUIContextType | null>(null);

export function AdminUIProvider({ children }: { children: React.ReactNode }) {
    const [isZonesOpen, setIsZonesOpen] = useState(false);

    return (
        <AdminUIContext.Provider
            value={{
                isZonesOpen,
                openZones: () => setIsZonesOpen(true),
                closeZones: () => setIsZonesOpen(false),
            }}
        >
            {children}
        </AdminUIContext.Provider>
    );
}

export function useAdminUI() {
    const ctx = useContext(AdminUIContext);
    if (!ctx) throw new Error("useAdminUI must be used inside AdminUIProvider");
    return ctx;
}
