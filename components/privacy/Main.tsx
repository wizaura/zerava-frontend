type TextSection = {
    title: string;
    type: "text";
    content: string;
};

type ListSection = {
    title: string;
    type: "list";
    content: string[];
};

type IntroListSection = {
    title: string;
    type: "intro-list";
    intro: string;
    content: string[];
};

type PrivacySection =
    | TextSection
    | ListSection
    | IntroListSection;


const privacySections: PrivacySection[] = [
    {
        title: "1. Introduction",
        type: "text",
        content:
            "Zerava Mobility Ltd (“Zerava”, “we”, “us”, “our”) is committed to protecting your privacy and handling your personal data responsibly. This Privacy Policy explains how we collect, use, store, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
    },

    {
        title: "2. Who We Are",
        type: "list",
        content: [
            "Company name: Zerava Mobility Ltd",
            "Registered office: 71–75 Shelton Street, London, WC2H 9JQ, United Kingdom",
            "ICO registration: Registered with the UK Information Commissioner’s Office",
            "Contact email: hello@zerava.uk",
        ],
    },

    {
        title: "3. What Personal Data We Collect",
        type: "list",
        content: [
            "Name",
            "Email address",
            "Telephone number",
            "Service address or location",
            "Vehicle details (such as make, model, registration, where provided)",
            "Booking and service history",
            "Subscription status",
            "Communications with us",
            "Payment confirmations (we do not store full card details)",
        ],
    },

    {
        title: "4. How We Collect Your Data",
        type: "intro-list",
        intro: "We collect personal data when you:",
        content: [
            "Book a service or subscription",
            "Contact us via our website, email, phone, or messaging platforms",
            "Interact with our website",
            "Receive services from us",
        ],
    },

    {
        title: "5. Lawful Basis for Processing",
        type: "intro-list",
        intro: "We process personal data under the following lawful bases:",
        content: [
            "Contract – to provide booked services or subscriptions",
            "Legitimate interests – scheduling, service communication, quality control",
            "Legal obligation – accounting, tax, and regulatory compliance",
        ],
    },

    {
        title: "6. How We Use Your Data",
        type: "intro-list",
        intro: "We use your personal data to:",
        content: [
            "Deliver and manage vehicle care services",
            "Communicate booking details, updates, and reminders",
            "Process payments via secure third-party providers",
            "Maintain internal records",
            "Improve our services and customer experience",
        ],
    },

    {
        title: "7. Sharing Your Data",
        type: "intro-list",
        intro: "We may share your data with:",
        content: [
            "Payment processors (e.g. Stripe)",
            "Booking or scheduling platforms",
            "Professional advisers (accountants, insurers)",
        ],
    },

    {
        title: "8. Photos & Documentation",
        type: "text",
        content:
            "We may take photos or videos of vehicles before, during, and after service for condition records, quality control, and dispute resolution. Images will only be used for marketing purposes where the vehicle cannot be identified or where you have provided explicit consent.",
    },

    {
        title: "9. Data Storage & Security",
        type: "list",
        content: [
            "Secure systems and password protection",
            "Restricted access to personal data",
            "Use of reputable third-party service providers",
        ],
    },

    {
        title: "10. Data Retention",
        type: "list",
        content: [
            "Customer and booking records: up to 6 years",
            "Enquiries with no booking: up to 12 months",
            "Marketing communications: until you opt out",
        ],
    },

    {
        title: "11. Your Rights",
        type: "list",
        content: [
            "Access your personal data",
            "Request correction or deletion",
            "Object to processing",
            "Request data portability",
        ],
    },

    {
        title: "12. Changes to This Policy",
        type: "text",
        content:
            "We may update this Privacy Policy from time to time. The latest version will always be published on our website.",
    },
];


export default function PrivacyPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl text-gray-800 space-y-10">

                {privacySections.map((section) => (
                    <section key={section.title}>
                        <h2 className="text-3xl font-light mb-3">
                            {section.title}
                        </h2>

                        {/* TEXT */}
                        {section.type === "text" && (
                            <p className="text-md text-gray-700">
                                {section.content}
                            </p>
                        )}

                        {/* LIST */}
                        {section.type === "list" && (
                            <ul className="list-disc pl-5 text-md text-gray-700 space-y-1">
                                {section.content.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}

                        {/* INTRO + LIST */}
                        {section.type === "intro-list" && (
                            <>
                                <p className="text-md text-gray-700 mb-2">
                                    {section.intro}
                                </p>
                                <ul className="list-disc pl-5 text-md text-gray-700 space-y-1">
                                    {section.content.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </section>
                ))}

            </div>
        </main>
    );
}
