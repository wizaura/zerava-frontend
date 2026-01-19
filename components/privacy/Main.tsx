export default function PrivacyPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl text-gray-800">

                <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">
                    Privacy Policy
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    Zerava Mobility Ltd (“we”, “us”, “our”) is committed to protecting your privacy.
                    This policy explains how we collect, use, and protect your personal data in accordance
                    with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>

                <section className="space-y-6">

                    <div>
                        <h2 className="text-lg font-semibold">1. Information We Collect</h2>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>Name, email address, phone number</li>
                            <li>Vehicle and booking details</li>
                            <li>Payment and transaction information</li>
                            <li>Technical data such as IP address, browser type, and usage data</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>Provide and manage our services</li>
                            <li>Process bookings and payments</li>
                            <li>Communicate with you regarding your services</li>
                            <li>Improve our website and customer experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">3. Legal Basis for Processing</h2>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>Contractual necessity</li>
                            <li>Legal obligation</li>
                            <li>Legitimate business interests</li>
                            <li>Your consent (where applicable)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">4. Data Sharing</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            We do not sell your data. We may share it with:
                        </p>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>Payment providers</li>
                            <li>IT and hosting providers</li>
                            <li>Legal and regulatory authorities where required</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">5. Data Retention</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            We retain data only for as long as necessary to fulfil the purposes outlined
                            or as required by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">6. Your Rights</h2>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>Access your data</li>
                            <li>Request correction or deletion</li>
                            <li>Restrict or object to processing</li>
                            <li>Data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">7. Security</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            We apply appropriate technical and organisational measures to protect your data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">8. Contact</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            For data protection queries:<br />
                            Email: support@zerava.co<br />
                            Address: United Kingdom
                        </p>
                    </div>

                </section>
            </div>
        </main>
    );
}
