import api from "@/lib/user/axios";
import { SubscriptionDraft } from "@/components/user/subscribe/types";

export const SubscriptionsAPI = {
    // STEP 1: get setup intent
    createSetupIntent: async () => {
        const res = await api.post("/subscriptions/setup-intent");
        return res.data as {
            clientSecret: string;
            customerId: string;
        };
    },

    // STEP 2: create subscription
    createSubscription: async (payload: {
        paymentMethodId: string;
        draft: SubscriptionDraft;
    }) => {
        const res = await api.post("/subscriptions/create", payload);
        return res.data;
    },
};
