export default function TermsPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl text-gray-800">

                <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">
                    Terms & Conditions
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    These Terms govern your use of Zerava’s services and website.
                </p>

                <section className="space-y-6">

                    <div>
                        <h2 className="text-lg font-semibold">1. Services</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            We provide eco-friendly mobile vehicle cleaning and maintenance services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">2. Bookings</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            All bookings are subject to availability and confirmation.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">3. Pricing & Payments</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Prices are displayed at time of booking. Payments must be made as agreed.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">4. Cancellations</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Cancellations must be made within the stated cancellation period.
                            Late cancellations may incur charges.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">5. Liability</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            We are not liable for indirect or consequential losses.
                            Our liability is limited to the service value except where prohibited by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">6. User Responsibilities</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Customers must ensure vehicle accessibility and remove personal belongings.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">7. Governing Law</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            These Terms are governed by the laws of England and Wales.
                        </p>
                    </div>

                </section>
            </div>
        </main>
    );
}
