export type SubscriptionDraft = {
    /* ==============================
       PLAN SELECTION
    ============================== */

    plan: "FORTNIGHTLY" | "MONTHLY" | null;
    stripePriceId: string | null;
    vehicleCategoryId: string | null;
    vehicleCategory: string | null;
    servicePriceId: string | null;

    /* ==============================
       DERIVED DISPLAY
    ============================== */

    serviceName?: string;
    basePrice?: number;      // in pence
    durationMin?: number;

    /* ==============================
       SCHEDULE (RECURRING RULE)
    ============================== */

    postcode: string | null;
    address: string | null;

    preferredDay: number | null;   // 0–6 (Sunday–Saturday)
    templateId: string | null;

    timeFrom: string | null;
    timeTo: string | null;

    /* ==============================
       AVAILABILITY
    ============================== */

    serviceable: boolean | null;

    /* ==============================
       PRICING
    ============================== */

    pricePerClean?: number; // in pence
};
