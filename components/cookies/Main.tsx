"use client";

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

/* ---------------- COOKIE TYPES ---------------- */

const cookieTypes = [
    {
        title: "Essential Cookies",
        description:
            "These cookies are necessary for the website to function properly. They enable core features such as security, booking functionality, and account access.",
        points: [
            "Required for the website to function",
            "Enable security and booking features",
            "Cannot be disabled through our cookie settings",
        ],
    },
    {
        title: "Performance / Analytics Cookies",
        description:
            "These cookies help us understand how visitors interact with our website by collecting information anonymously.",
        points: [
            "Used to analyse website traffic",
            "Helps improve website performance and usability",
            "Only used where permitted by your cookie preferences",
        ],
    },
    {
        title: "Functionality Cookies",
        description:
            "These cookies allow the website to remember choices you make and provide enhanced, more personalised features.",
        points: [
            "Remember preferred location",
            "Remember vehicle details",
            "Improve personalised user experience",
        ],
    },
    {
        title: "Marketing Cookies",
        description:
            "Marketing cookies may be used to display content or advertisements that are relevant to you.",
        points: [
            "Are optional",
            "Are only used with your consent",
            "May track browsing activity across websites",
            "You can accept or reject marketing cookies at any time through our cookie settings",
        ],
    },
];

/* ---------------- THIRD PARTY ---------------- */

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
        name: "Customer support or chat services",
        description: "To provide customer assistance",
    },
];

/* ---------------- PAGE SECTIONS ---------------- */

const cookiePolicySections: CookiePolicySection[] = [
    {
        title: "What Are Cookies",
        type: "text",
        content:
            "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.",
    },

    {
        title: "How We Use Cookies",
        type: "intro-list",
        intro: "Zerava uses cookies to:",
        content: [
            "Enable core website functionality",
            "Keep you signed in where applicable",
            "Remember your preferences and settings",
            "Understand how visitors use our website",
            "Improve our services and user experience",
        ],
    },

    {
        title: "Cookies and Personal Identification",
        type: "text",
        content:
            "Cookies are not used to identify you personally unless you have provided consent.",
    },

    {
        title: "Types of Cookies We Use",
        type: "cards",
    },

    {
        title: "Third-Party Cookies",
        type: "third-party",
        intro:
            "We may use trusted third-party services that set their own cookies, including:",
    },

    {
        title: "Third-Party Policies",
        type: "text",
        content:
            "These providers have their own privacy and cookie policies which you should review for further information.",
    },

    {
        title: "Managing Cookies",
        type: "intro-list",
        intro: "You can manage cookies in the following ways:",
        content: [
            "Cookie banner: When you first visit our website, you can accept or customise your cookie preferences.",
            "Browser settings: Most browsers allow you to refuse or delete cookies. Please note that disabling cookies may affect website functionality.",
        ],
    },

    {
        title: "Cookie Retention",
        type: "multi-text",
        content: [
            {
                label: null,
                text: "Session cookies are deleted when you close your browser.",
            },
            {
                label: null,
                text:
                    "Persistent cookies remain for a set period or until deleted.",
            },
            {
                label: null,
                text:
                    "Cookies are retained for no longer than 12 months unless otherwise stated.",
            },
        ],
    },

    {
        title: "Updates to This Policy",
        type: "text",
        content:
            "We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our practices. Please review this page periodically.",
    },

    {
        title: "Contact Us",
        type: "multi-text",
        content: [
            {
                label: null,
                text:
                    "If you have any questions about our use of cookies, please contact us at:",
            },
            {
                label: "Email",
                text: "hello@zerava.uk",
            },
        ],
    },
];

/* ---------------- PAGE ---------------- */

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
                                    {section.content.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* COOKIE CARDS */}
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

                                        {cookie.points && (
                                            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                                                {cookie.points.map((p) => (
                                                    <li key={p}>{p}</li>
                                                ))}
                                            </ul>
                                        )}
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
                                {section.content.map((item, idx) => (
                                    <p key={idx}>
                                        {item.label && (
                                            <span className="font-medium text-gray-900">
                                                {item.label}:{" "}
                                            </span>
                                        )}
                                        {item.text}
                                    </p>
                                ))}
                            </div>
                        )}

                    </section>
                ))}

            </div>
        </main>
    );
}