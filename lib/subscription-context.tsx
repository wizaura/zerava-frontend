"use client";

import { createContext, useContext, useState } from "react";

type Plan = "WEEKLY" | "FORTNIGHTLY" | "MONTHLY";
type VehicleSize = "SMALL" | "MEDIUM" | "LARGE";
type ServiceType = "EXTERIOR" | "INTERIOR" | "FULL_VALET";

type Schedule = {
    dayOfWeek: string;
    timeWindow: string;
};

type SubscriptionState = {
    plan?: Plan;
    vehicleSize?: VehicleSize;
    service?: ServiceType;
    pricePerClean?: number;
    postcode?: string;
    schedule?: Schedule;
};

type SubscriptionContextType = {
    state: SubscriptionState;
    setPlan: (plan: Plan, price: number) => void;
    setVehicleSize: (size: VehicleSize) => void;
    setService: (service: ServiceType, price: number) => void;
    setSchedule: (schedule: Schedule) => void;
    setPostcode: (postcode: string) => void;
    reset: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<SubscriptionState>({});

    const setPlan = (plan: Plan, price: number) =>
        setState((s) => ({ ...s, plan, pricePerClean: price }));

    const setVehicleSize = (vehicleSize: VehicleSize) =>
        setState((s) => ({ ...s, vehicleSize }));

    const setService = (service: ServiceType, price: number) =>
        setState((s) => ({ ...s, service, pricePerClean: price }));

    const setSchedule = (schedule: Schedule) =>
        setState((s) => ({ ...s, schedule }));

    const setPostcode = (postcode: string) =>
        setState((s) => ({ ...s, postcode }));

    const reset = () => setState({});

    return (
        <SubscriptionContext.Provider
            value={{
                state,
                setPlan,
                setVehicleSize,
                setService,
                setSchedule,
                setPostcode,
                reset,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const ctx = useContext(SubscriptionContext);
    if (!ctx) {
        throw new Error("useSubscription must be used inside SubscriptionProvider");
    }
    return ctx;
}
