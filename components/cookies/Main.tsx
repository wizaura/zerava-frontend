export default function CookiePolicyPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl text-gray-800">

                <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">
                    Cookie Policy
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    Our website uses cookies to enhance user experience and comply with the Privacy and
                    Electronic Communications Regulations (PECR) and the UK General Data Protection Regulation (UK GDPR).
                </p>

                <section className="space-y-6">

                    <div>
                        <h2 className="text-lg font-semibold">What Are Cookies?</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Cookies are small text files stored on your device when you visit a website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Types of Cookies We Use</h2>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li><strong>Essential Cookies:</strong> Required for site functionality.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand website usage.</li>
                            <li><strong>Marketing Cookies:</strong> Used for promotional purposes.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Managing Cookies</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            You can manage or disable cookies in your browser settings.
                            Non-essential cookies are only set with your consent.
                        </p>
                    </div>

                </section>
            </div>
        </main>
    );
}
