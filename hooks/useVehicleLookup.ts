import api from "@/lib/user/axios";
import { useState } from "react";

export function useVehicleLookup(setBookingDraft: any) {
    const [regLoading, setRegLoading] = useState(false);

    function isValidUKReg(reg: string) {
        const cleaned = reg.toUpperCase().replace(/\s/g, "");
        return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(cleaned);
    }

    async function lookupVehicle(reg: string) {
        if (!isValidUKReg(reg)) return;

        try {
            setRegLoading(true);
            const res = await api.post("/vehicle/lookup", {
                registrationNumber: reg,
            });

            setBookingDraft((d: any) => ({
                ...d,
                make: res.data.make,
                model: res.data.model,
            }));
        } finally {
            setRegLoading(false);
        }
    }

    return { regLoading, lookupVehicle, isValidUKReg };
}