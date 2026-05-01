import SubscriptionSuccessPage from "@/components/user/subscribe/Success";
import { Suspense } from "react";

export default function SubscriptionSuccess() {
    return (
        <Suspense fallback={null}>
            <SubscriptionSuccessPage />
        </Suspense>
    );
}