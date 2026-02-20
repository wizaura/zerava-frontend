import BookingSuccessPage from "@/components/user/account/bookings/success/Main";
import { Suspense } from "react";

export default function BookingSuccess() {
    return (
        <div>
            <Suspense fallback={null}>
                <BookingSuccessPage />
            </Suspense>
        </div>
    )
}