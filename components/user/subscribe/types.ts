export type SubscriptionDraft = {
    plan: "WEEKLY" | "FORTNIGHTLY" | "MONTHLY" | null;
    vehicleSize: "SMALL" | "MEDIUM" | "LARGE" | null;
    serviceType: "EXTERIOR" | "INTERIOR" | "FULL_VALET" | null;
    pricePerClean: number | null;
    address: string | null;
    postcode: string | null;
    serviceable: boolean | null;
    subscriptionDay:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | null;
    timeWindow: "AM_8_10" | "AM_11_1" | "PM_2_4" | "PM_4_6" | null;
};
