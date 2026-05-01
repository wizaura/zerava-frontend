import api from "@/lib/user/axios";

export const SubscriptionsAPI = {
    /* ==============================
       STEP 1: Create Setup Intent
    ============================== */

    createCheckoutSession: async (payload: { draftId: string }) => {
        const res = await api.post("/payments/subscriptions/checkout", payload);
        return res.data as { url: string };
    },

    /* ==============================
       STEP 2: Create Subscription
    ============================== */

    createDraft: async (payload: any) => {
        const res = await api.post("/subscriptions/init", payload);
        return res.data;
    }
};
