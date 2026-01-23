import BookingPage from "@/components/user/booking/Main";
import api from "../lib/axios";

async function getPrices() {
    const res = await api.get("/services/prices");

    return res.data;
}

export default async function Booking() {
    const prices = await getPrices();
    console.log(prices,'jj');
    return (
        <div>
            <BookingPage prices={prices} />
        </div>
    )
}