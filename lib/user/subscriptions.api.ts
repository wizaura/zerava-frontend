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

            /* SCHEDULING */
            firstServiceDate: string; // 🔥 REQUIRED
            preferredDay: number;     // 🔥 REQUIRED
            templateId: string;
            timeFrom: string;
            timeTo: string;

            /* USER SNAPSHOT */
            name: string;
            email: string;
            phone: string;

            /* VEHICLE */
            make?: string;
            model?: string;
            colour?: string; // 🔥 ADDED
            registrationNumber?: string;

            /* OPTIONAL */
            parkingInstructions?: string;
        };
    }) => {
        const res = await api.post("/subscriptions/create", payload);
        return res.data;
    }
};
