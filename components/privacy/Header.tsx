"use client"

export default function PrivacyHeader() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const month = now.getMonth();

    const policyYear = month < 2 ? currentYear - 1 : currentYear;
    return (
        <div className="bg-eco-black mt-20 p-16">
            <h2 className="text-gray-200 text-light text-4xl">Privacy Policy</h2>
            <p className="text-gray-400 mt-3">Last updated: March {policyYear}</p>
        </div>
    )
}