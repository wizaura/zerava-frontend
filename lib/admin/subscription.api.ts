import adminApi from "./axios";

export type SubscriptionStatus =
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid"
    | "paused";

export type User = {
    fullName: string;
    email: string;
} 

export type AdminSubscription = {
    id: string;
    planName: string;
    serviceName: string;
    postcode: string;
    address: string;
    schedule: string;
    status: SubscriptionStatus;
    price: number;
    user: User;
    subscriptionId?: string;
    nextBillingDate?: string;
    createdAt: string;
};

export async function getAdminSubscriptions(params?: {
    search?: string;
}) {
    const res = await adminApi.get("/admin/subscriptions", {
        params,
    });

    return res.data as AdminSubscription[];
}

export async function updateAdminSubscription(
    id: string,
    payload: { status: string }
) {
    return adminApi.patch(`/admin/subscriptions/${id}`, payload);
}
