type TextSection = {
    title: string;
    type: "text";
    content: string;
};

type IntroListSection = {
    title: string;
    type: "intro-list";
    intro: string;
    content: string[];
};

type CardsSection = {
    title: string;
    type: "cards";
};

type ThirdPartySection = {
    title: string;
    type: "third-party";
    intro: string;
};

type MultiTextItem = {
    label: string | null;
    text: string;
};

type MultiTextSection = {
    title: string;
    type: "multi-text";
    content: MultiTextItem[];
};

type CookiePolicySection =
    | TextSection
    | IntroListSection
    | CardsSection
    | ThirdPartySection
    | MultiTextSection;

const cookieTypes = [
    {
        title: "Essential Cookies",
        description:
            "These cookies are necessary for the website to function properly. They enable core functionality such as security, account access, and booking management. You cannot opt out of these cookies.",
    },
    {
        title: "Performance Cookies",
        description:
            "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.",
    },
    {
        title: "Functionality Cookies",
        description:
            "These cookies allow the website to remember choices you make (such as your preferred location or vehicle size) and provide enhanced, more personalised features.",
    },
    {
        title: "Marketing Cookies",
        description:
            "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
    },
];

const thirdPartyCookies = [
    {
        name: "Google Analytics",
        description: "To analyse website traffic and usage patterns",
    },
    {
        name: "Stripe",
        description: "To process secure payments",
    },
    {
        name: "Intercom / Chat services",
        description: "To provide customer support",
    },
];

const cookiePolicySections: CookiePolicySection[] = [
    {
        title: "What Are Cookies",
        type: "text",
        content:
            "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.",
    },
    {
        title: "How We Use Cookies",
        type: "intro-list",
        intro: "Zerava uses cookies for the following purposes:",
        content: [
            "To keep you signed in to your account",
            "To remember your preferences and settings",
            "To understand how you use our website",
            "To improve our services and user experience",
            "To deliver relevant content and communications",
        ],
    },
    {
        title: "Types of Cookies We Use",
        type: "cards",
    },
    {
        title: "Third-Party Cookies",
        type: "third-party",
        intro: "We may use third-party services that set their own cookies, including:",
    },
    {
        title: "Managing Cookies",
        type: "multi-text",
        content: [
            {
                label: null,
                text:
                    "You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some functionality may no longer be available.",
            },
            {
                label: "Browser settings",
                text:
                    "Most browsers allow you to refuse or accept cookies, delete cookies, and be notified when a cookie is set. The settings are usually found in the 'Options' or 'Preferences' menu of your browser.",
            },
            {
                label: "Our cookie banner",
                text:
                    "When you first visit our website, you will see a cookie banner that allows you to accept or customise your cookie preferences.",
            },
        ],
    },
    {
        title: "Cookie Retention",
        type: "text",
        content:
            "Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. Our cookies are retained for no longer than 12 months unless otherwise stated.",
    },
    {
        title: "Updates to This Policy",
        type: "text",
        content:
            "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.",
    },
    {
        title: "Contact Us",
        type: "text",
        content:
            "If you have any questions about our use of cookies, please contact us at hello@zerava.co.uk.",
    },
];

export default function CookiePolicyPage() {
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-4xl text-gray-800 space-y-10">

                {cookiePolicySections.map((section) => (
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

                        {/* INTRO + LIST */}
                        {section.type === "intro-list" && (
                            <>
                                <p className="text-md text-gray-700 mb-3">
                                    {section.intro}
                                </p>
                                <ul className="list-disc pl-5 text-md text-gray-700 space-y-1">
                                    {section.content.map((item: string) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* CARDS */}
                        {section.type === "cards" && (
                            <div className="grid gap-4 sm:grid-cols-1">
                                {cookieTypes.map((cookie) => (
                                    <div
                                        key={cookie.title}
                                        className="rounded-lg bg-gray-50 p-5"
                                    >
                                        <h3 className="font-medium text-gray-900">
                                            {cookie.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-700">
                                            {cookie.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* THIRD PARTY */}
                        {section.type === "third-party" && (
                            <>
                                <p className="text-md text-gray-700 mb-3">
                                    {section.intro}
                                </p>
                                <ul className="space-y-2 text-md text-gray-700">
                                    {thirdPartyCookies.map((item) => (
                                        <li key={item.name}>
                                            <span className="font-medium text-gray-900">
                                                {item.name}
                                            </span>{" "}
                                            – {item.description}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* MULTI TEXT */}
                        {section.type === "multi-text" && (
                            <div className="space-y-3 text-md text-gray-700">
                                {section.content.map(
                                    (
                                        item: { label: string | null; text: string },
                                        idx: number
                                    ) => (
                                        <p key={idx}>
                                            {item.label && (
                                                <span className="font-medium text-gray-900">
                                                    {item.label}:{" "}
                                                </span>
                                            )}
                                            {item.text}
                                        </p>
                                    )
                                )}
                            </div>
                        )}

                    </section>
                ))}

            </div>
        </main>
    );
}
