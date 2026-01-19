import BookingPage from "@/components/user/booking/Main";

async function getPrices() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/prices`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch prices');
    }

    return res.json();
}

export default async function Booking() {
    const prices = await getPrices();
    return (
        <div>
            <BookingPage prices={prices} />
        </div>
    )
}