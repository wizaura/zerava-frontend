import adminApi from "./axios";

/* =========================================================
   TYPES
========================================================= */

/* ---------- VEHICLE CATEGORY ---------- */

export type VehicleCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    isActive: boolean;
};

/* ---------- SERVICE ---------- */

export type Service = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    isMaintenance: boolean;
    durationMin: number;
    isActive: boolean;
    prices: ServicePrice[];
};

/* ---------- PRICE ---------- */

export type PricingMode = "ONE_OFF" | "SUBSCRIPTION";
export type BillingCycle = "MONTHLY";

export type ServicePrice = {
    id: string;
    serviceId: string;
    vehicleCategoryId: string;
    pricingMode: PricingMode;
    billingCycle?: BillingCycle | null;
    price: number;
    isActive: boolean;
    vehicleCategory: VehicleCategory;
};

/* ---------- ADD-ON ---------- */

export type AddOn = {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    durationMin: number;
    isActive: boolean;
};

/* ---------- ADMIN OVERVIEW ---------- */

export type ServicePricingOverview = {
    services: Service[];
    vehicleCategories: VehicleCategory[];
    addOns: AddOn[];
};




/* =========================================================
   ADMIN - OVERVIEW
========================================================= */

export async function getServicePricingOverview(): Promise<ServicePricingOverview> {
    const res = await adminApi.get("/admin/service-pricing");
    return res.data;
}



/* =========================================================
   VEHICLE CATEGORIES
========================================================= */

export async function createVehicleCategory(data: {
    name: string;
    slug?: string;
    description?: string;
}) {
    const res = await adminApi.post(
        "/admin/service-pricing/categories",
        data
    );
    return res.data;
}

export async function updateVehicleCategory(
    id: string,
    data: {
        name?: string;
        slug?: string;
        description?: string;
    }
) {
    const res = await adminApi.patch(
        `/admin/service-pricing/categories/${id}`,
        data
    );
    return res.data;
}

export async function toggleVehicleCategory(id: string) {
    const res = await adminApi.patch(
        `/admin/service-pricing/categories/${id}/toggle`
    );
    return res.data;
}



/* =========================================================
   SERVICES
========================================================= */

export async function upsertService(data: {
    id?: string;
    name: string;
    slug: string;
    description?: string;

    durationMin: number;

    isPopular: boolean;
    badgeLabel?: string;

    vehicleConditionNote?: string;
    highlightNote?: string;

    icon?: string;
    displayOrder?: number;
    waterSavedLitres?: number;

    features?: {
        text: string;
        order: number;
    }[];
}) {
    const res = await adminApi.post(
        "/admin/service-pricing/service",
        data
    );

    return res.data;
}

export async function toggleService(id: string) {
    const res = await adminApi.patch(
        `/admin/service-pricing/service/${id}/toggle`
    );
    return res.data;
}



/* =========================================================
   PRICES
========================================================= */

export async function upsertServicePrice(data: {
    id?: string;
    serviceId: string;
    vehicleCategoryId: string;
    pricingMode: PricingMode;
    billingCycle?: BillingCycle;
    price: number; // in pence
}) {
    const res = await adminApi.post(
        "/admin/service-pricing/price",
        data
    );
    return res.data;
}

export async function toggleServicePrice(id: string) {
    const res = await adminApi.patch(
        `/admin/service-pricing/price/${id}/toggle`
    );
    return res.data;
}



/* =========================================================
   ADD-ONS
========================================================= */

export async function getAddOns(): Promise<AddOn[]> {
    const res = await adminApi.get(
        "/admin/service-pricing/add-ons"
    );
    return res.data;
}

export async function createAddOn(data: {
    name: string;
    description?: string;
    price: number; // in pence
    durationMin: number;
}) {
    const res = await adminApi.post(
        "/admin/service-pricing/add-ons",
        data
    );
    return res.data;
}

export async function updateAddOn(
    id: string,
    data: {
        name?: string;
        description?: string;
        price?: number;
        durationMin?: number;
    }
) {
    const res = await adminApi.patch(
        `/admin/service-pricing/add-ons/${id}`,
        data
    );
    return res.data;
}

export async function toggleAddOn(id: string) {
    const res = await adminApi.patch(
        `/admin/service-pricing/add-ons/${id}/toggle`
    );
    return res.data;
}



/* =========================================================
   PUBLIC
========================================================= */

export async function getPublicServices() {
    const res = await adminApi.get("/services");
    return res.data;
}
