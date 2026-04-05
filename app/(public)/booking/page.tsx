import BookingPage from "@/components/user/booking/Call";

export const metadata = {
  title: "Book Your Premium Car Care Service | Zerava Mobility",
  description:
    "Schedule your Zerava Mobility car care service in minutes. Choose your preferred date, time, and service package with our easy online booking system.",
};

export default async function Booking() {
    return (
        <div>
            <BookingPage />
        </div>
    )
}