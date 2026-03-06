"use client"

import api from "@/lib/user/axios";
import { useEffect, useState } from "react";

type Section = {
    id: string;
    heading: string;
    description: string;
    order: number;
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

    if (loading) return null;
    return (
        <main className="bg-white px-6 py-20">
            <div className="mx-auto max-w-3xl text-gray-800 space-y-8">
                {sections.map((section) => (
                    <section key={section.id}>
                        <h2 className="text-3xl font-light">
                            {section.order}. {section.heading}
                        </h2>

                        <div
                            className="mt-4 text-md text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                    </section>
                ))}
            </div>
        </main>
    );
}
