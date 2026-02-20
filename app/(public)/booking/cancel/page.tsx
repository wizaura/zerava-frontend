import BookingCancelPage from "@/components/user/account/bookings/Cancel/page";
import { Suspense } from "react";

export default function BookingCancel() {
    return (
        <div>
            <Suspense fallback={null}>
                <BookingCancelPage />
            </Suspense>
        </div>
    )
}