"use client"

import api from "@/lib/user/axios";
import { useEffect, useState } from "react";
import TermsHeader from "./Header";

type Section = {
    id: string;
    heading: string;
    description: string;
    order: number;
    lastUpdated: string;
};

export default function TermsPage() {

    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTerms() {
            try {
                const res = await api.get("/terms/public");
                setSections(res.data);
            } catch (err) {
                console.error("Failed to load terms");
            } finally {
                setLoading(false);
            }
        }

        fetchTerms();
    }, []);

    const latestUpdate =
        sections.length > 0
            ? new Date(
                Math.max(
                    ...sections.map((s) => new Date(s.lastUpdated).getTime())
                )
            )
            : null;

    if (loading) return null;
    return (
        <main className="bg-white py-14">
            <TermsHeader lastUpdated={latestUpdate} />
            <div className="mx-auto max-w-3xl text-gray-800 space-y-8 px-6 mt-12">
                {sections.map((section) => (
                    <section key={section.id}>
                        <h2 className="text-3xl font-light">
                            {section.order}. {section.heading}
                        </h2>

                        <div
                            className="whitespace-pre-line mt-4 text-md text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                    </section>
                ))}
            </div>
        </main>
    );
}
