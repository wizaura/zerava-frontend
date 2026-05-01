import SubscriptionCancelPage from "@/components/user/subscribe/Cancel";
import { Suspense } from "react";

export default function SubscriptionCancel() {
    return (
        <Suspense fallback={null}>
            <SubscriptionCancelPage />
        </Suspense>
    );
}