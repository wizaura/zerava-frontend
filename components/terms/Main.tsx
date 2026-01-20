const termsSections = [
    {
        title: "1. Introduction",
        content: (
            <p>
                Welcome to Zerava. These terms and conditions outline the rules and regulations
                for the use of our waterless car cleaning services. By booking our services,
                you accept these terms in full. If you disagree with any part of these terms,
                please do not use our services.
            </p>
        ),
    },
    {
        title: "2. Services",
        content: (
            <p>
                Zerava provides mobile waterless car cleaning services in Southampton and
                surrounding areas. Our services include exterior cleaning, interior cleaning,
                and full valet packages. All services use our proprietary 99.78% readily
                biodegradable cleaning formula.
            </p>
        ),
    },
    {
        title: "3. Bookings",
        content: (
            <>
                <p>
                    Bookings can be made through our website or by contacting us directly.
                    By making a booking, you agree to:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                    <li>Provide accurate contact and location information</li>
                    <li>Ensure the vehicle is accessible at the agreed time</li>
                    <li>Remove valuable personal items from the vehicle</li>
                    <li>Inform us of any vehicle damage or issues prior to service</li>
                </ul>
            </>
        ),
    },
    {
        title: "4. Cancellation Policy",
        content: (
            <p>
                Cancellations made more than 24 hours before the scheduled appointment
                are free of charge. Cancellations within 24 hours may incur a cancellation
                fee of 50% of the service cost. No-shows will be charged the full service amount.
            </p>
        ),
    },
    {
        title: "5. Pricing & Payment",
        content: (
            <p>
                All prices are displayed in GBP and include VAT where applicable.
                Payment is due upon completion of the service unless otherwise agreed
                for subscription or corporate accounts. We accept all major credit and
                debit cards.
            </p>
        ),
    },
    {
        title: "6. Service Guarantee",
        content: (
            <p>
                We take pride in our work and offer a satisfaction guarantee. If you are
                not satisfied with our service, please contact us within 24 hours and
                we will arrange to rectify any issues at no additional cost.
            </p>
        ),
    },
    {
        title: "7. Liability",
        content: (
            <p>
                Zerava is fully insured for public liability. However, we are not responsible
                for pre-existing damage, damage caused by defects in the vehicle&apos;s paintwork,
                or items left in the vehicle. We recommend removing all valuables before
                your appointment.
            </p>
        ),
    },
    {
        title: "8. Subscriptions",
        content: (
            <p>
                Subscription plans are billed according to the selected frequency
                (weekly, fortnightly, or monthly). You may pause or cancel your
                subscription at any time through your account dashboard. Refunds
                for unused services will be processed within 14 days.
            </p>
        ),
    },
    {
        title: "9. Weather Conditions",
        content: (
            <p>
                In cases of severe weather (heavy rain, snow, or extreme temperatures),
                we may need to reschedule your appointment. We will contact you as soon
                as possible to arrange an alternative time at no additional cost.
            </p>
        ),
    },
    {
        title: "10. Privacy",
        content: (
            <p>
                We respect your privacy and handle your personal data in accordance
                with UK GDPR regulations. Please refer to our Privacy Policy for more
                information on how we collect, use, and protect your data.
            </p>
        ),
    },
    {
        title: "11. Changes to Terms",
        content: (
            <p>
                We reserve the right to modify these terms at any time. Changes will
                be effective immediately upon posting on our website. Continued use
                of our services constitutes acceptance of the modified terms.
            </p>
        ),
    },
    {
        title: "12. Contact",
        content: (
            <p>
                If you have any questions about these terms, please contact us at
                <span className="font-medium"> hello@zerava.co.uk</span> or via WhatsApp.
            </p>
        ),
    },
];

export default function TermsPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-3xl text-gray-800 space-y-8">
                {termsSections.map((section) => (
                    <section key={section.title}>
                        <h2 className="text-3xl font-light">{section.title}</h2>
                        <div className="mt-4 text-md text-gray-700">
                            {section.content}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
