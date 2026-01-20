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
        title: "Introduction",
        type: "text",
        content:
            "Zerava Mobility Ltd (“we”, “us”, “our”) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
    },
    {
        title: "1. Information We Collect",
        type: "list",
        content: [
            "Name, email address, phone number",
            "Vehicle and booking details",
            "Payment and transaction information",
            "Technical data such as IP address, browser type, and usage data",
        ],
    },
    {
        title: "2. How We Use Your Information",
        type: "list",
        content: [
            "Provide and manage our services",
            "Process bookings and payments",
            "Communicate with you regarding your services",
            "Improve our website and customer experience",
            "Comply with legal obligations",
        ],
    },
    {
        title: "3. Legal Basis for Processing",
        type: "list",
        content: [
            "Contractual necessity",
            "Legal obligation",
            "Legitimate business interests",
            "Your consent (where applicable)",
        ],
    },
    {
        title: "4. Data Sharing",
        type: "intro-list",
        intro: "We do not sell your data. We may share it with:",
        content: [
            "Payment providers",
            "IT and hosting providers",
            "Legal and regulatory authorities where required",
        ],
    },
    {
        title: "5. Data Retention",
        type: "text",
        content:
            "We retain data only for as long as necessary to fulfil the purposes outlined in this policy or as required by law.",
    },
    {
        title: "6. Your Rights",
        type: "list",
        content: [
            "Access your data",
            "Request correction or deletion",
            "Restrict or object to processing",
            "Data portability",
            "Withdraw consent at any time",
        ],
    },
    {
        title: "7. Security",
        type: "text",
        content:
            "We apply appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse.",
    },
    {
        title: "8. Contact",
        type: "text",
        content:
            "For data protection queries, please contact us at support@zerava.co. Our registered address is in the United Kingdom.",
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
