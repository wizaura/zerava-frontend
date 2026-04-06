import BookingPage from "@/components/user/booking/Call";

export const metadata = {
  title: "Book Mobile Car Wash in Southampton | Zerava",
  description:
    "Book your mobile car wash in Southampton with Zerava. Premium eco-friendly waterless car cleaning and detailing services at your location.",
  keywords: [
    "Book car wash Southampton",
    "Mobile car wash Southampton booking",
    "Eco car wash booking",
    "Waterless car wash Southampton",
    "Car detailing booking Southampton",
    "Zerava booking",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Booking() {
    return (
        <div>
            <BookingPage />
        </div>
    )
}