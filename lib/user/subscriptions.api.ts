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
            servicePriceId: string;
            stripePriceId: string;
            postcode: string;
            address: string;
            preferredDay: number;
            templateId: string;
            timeFrom: string;
            timeTo: string;

            /* NEW SNAPSHOT FIELDS */
            name: string;
            email: string;
            phone: string;
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
