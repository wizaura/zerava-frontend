import api from "@/lib/user/axios";

export const SubscriptionsAPI = {
    /* ==============================
       STEP 1: Create Setup Intent
    ============================== */

    createSetupIntent: async () => {
        const res = await api.post("/subscriptions/setup-intent");
        return res.data as {
            clientSecret: string;
        };
    },

    /* ==============================
       STEP 2: Create Subscription
    ============================== */

    createSubscription: async (payload: {
        paymentMethodId: string;
        subscriptionData: {
            servicePriceId: string | null;
            stripePriceId: string | null;
            postcode: string | null;
            address: string | null;
            preferredDay: number | null;
            templateId: string | null;
            timeFrom: string | null;
            timeTo: string | null;

            /* NEW SNAPSHOT FIELDS */
            name: string | null;
            email: string | null;
            phone: string | null;
            make?: string | null;
            model?: string | null;
            registrationNumber?: string | null;
            parkingInstructions?: string | null;
        };
    }) => {
        const res = await api.post("/subscriptions/create", payload);
        return res.data;
    },
};
