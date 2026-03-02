"use client";

import { useEffect, useState } from "react";
import { Search, Droplet, Calendar, Wallet, Leaf, Info, ChevronDown } from "lucide-react";
import api from "@/lib/user/axios";

const ICON_MAP: Record<string, any> = {
    droplet: Droplet,
    calendar: Calendar,
    wallet: Wallet,
    leaf: Leaf,
    info: Info,
};

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const [catRes, faqRes] = await Promise.all([
                    api.get("/faq-categories/public"),
                    api.get("/faqs/public"),
                ]);

                const categoriesData = catRes.data;
                const faqData = faqRes.data;

                setCategories(categoriesData.filter((c: any) => c.isActive));
                setFaqs(faqData.filter((f: any) => f.isActive));

            } catch (err) {
                console.error("Failed to load FAQs", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const visibleGroups = categories
        .map((cat) => ({
            category: cat.name,
            icon: ICON_MAP[cat.icon],
            items: faqs.filter(
                (f) =>
                    f.categoryId === cat.id &&
                    (f.question.toLowerCase().includes(search.toLowerCase()) ||
                        f.answer.toLowerCase().includes(search.toLowerCase()))
            ),
        }))
        .filter(
            (g) =>
                (activeCategory === "All" || g.category === activeCategory) &&
                g.items.length > 0
        );

    return (
        <section className="bg-white py-20 px-6">
            <div className="mx-auto max-w-3xl">

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                        placeholder="Search for answers..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full rounded-full border border-gray-200 py-3 pl-12 pr-4 text-sm focus:border-electric-teal focus:outline-none"
                    />
                </div>

                {/* Categories */}
                <div className="mb-12 flex flex-wrap gap-3">
                    <button
                        key="All"
                        onClick={() => {
                            setActiveCategory("All");
                            setOpenIndex(null);
                        }}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
    ${activeCategory === "All"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        All Questions
                    </button>

                    {categories.map((cat) => {
                        const Icon = ICON_MAP[cat.icon];

                        return (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.name);
                                    setOpenIndex(null);
                                }}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
        ${activeCategory === cat.name
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {Icon && <Icon size={14} />}
                                {cat.name}
                            </button>
                        );
                    })}
                </div>

                {/* FAQ Groups */}
                <div className="space-y-12">
                    {visibleGroups.map(group => {
                        const Icon = group.icon;
                        return (
                            <div key={group.category}>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-teal/10 text-electric-teal">
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="text-2xl font-light text-gray-900">
                                        {group.category}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {group.items.map((f, i) => {
                                        const key = `${group.category}-${i}`;
                                        return (
                                            <div key={key} className="rounded-xl border border-gray-200 bg-white">
                                                <button
                                                    onClick={() =>
                                                        setOpenIndex(openIndex === key ? null : key)
                                                    }
                                                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                                                >
                                                    <span className="font-medium text-sm text-gray-900">{f.question}</span>
                                                    <ChevronDown
                                                        className={`transition text-gray-500 ${openIndex === key ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>

                                                {openIndex === key && (
                                                    <div className="px-6 pb-4 text-sm text-gray-600">
                                                        {f.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {visibleGroups.length === 0 && (
                        <p className="text-center text-sm text-gray-500">
                            No matching questions found.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
