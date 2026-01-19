"use client";

import { useState } from "react";
import { Search, Droplet, Calendar, Wallet, Leaf, Info, ChevronDown } from "lucide-react";

type Category =
    | "All"
    | "Waterless Process"
    | "Booking & Scheduling"
    | "Pricing & Packages"
    | "Eco & Sustainability"
    | "Service Details";

const categories: { label: Category; icon: any }[] = [
    { label: "All", icon: null },
    { label: "Waterless Process", icon: Droplet },
    { label: "Booking & Scheduling", icon: Calendar },
    { label: "Pricing & Packages", icon: Wallet },
    { label: "Eco & Sustainability", icon: Leaf },
    { label: "Service Details", icon: Info },
];

const faqs = [
    {
        category: "Waterless Process",
        q: "How does waterless car cleaning work?",
        a: "Our waterless cleaning technology uses advanced, biodegradable formulas that encapsulate dirt particles and lift them away from your vehicle's surface. The solution creates a protective layer while cleaning, eliminating the need for water. Our trained technicians use premium microfiber cloths to safely remove dirt and polish your vehicle to a showroom shine.",
    },
    {
        category: "Waterless Process",
        q: "Is waterless cleaning safe for my car's paint?",
        a: "Absolutely! Our waterless formula is pH-balanced and specifically designed to be safe for all paint types, including ceramic coatings, wraps, and PPF (paint protection film). The solution lubricates the surface as it cleans, preventing scratches. We use professional-grade microfiber towels with proper technique to ensure a scratch-free finish.",
    },
    {
        category: "Waterless Process",
        q: "Can you clean heavily soiled vehicles?",
        a: "While our waterless method is effective for regular dirt, dust, and light mud, we recommend a pre-rinse for extremely muddy or heavily soiled vehicles. For most urban driving conditions, our waterless technology works perfectly. If your vehicle needs extra attention, our team will assess and advise the best approach.",
    },
    {
        category: "Waterless Process",
        q: "How much water does this actually save?",
        a: "Traditional car washes use 150-300 litres of water per wash. Our waterless method uses zero litres of fresh water. Over a year with monthly washes, that's saving up to 3,600 litres per vehicle - enough to provide drinking water for one person for over 4 years.",
    },
    {
        category: "Waterless Process",
        q: "What happens to the dirty water runoff?",
        a: "That's the beauty of our system - there is no dirty water runoff! Since we don't use water, there's no contaminated runoff entering storm drains or waterways. Our biodegradable solution breaks down naturally without harming the environment, and we dispose of used microfiber cloths responsibly.",
    },
    {
        category: "Booking & Scheduling",
        q: "How do I book a service?",
        a: "Booking is simple! Visit our booking page, select your service type and vehicle size, enter your postcode to check availability, choose your preferred date and time window, and provide your contact details. You'll receive instant confirmation via email with all the details.",
    },
    {
        category: "Booking & Scheduling",
        q: "What areas do you serve?",
        a: "We currently serve Southampton and surrounding areas including SO14-SO19, SO30-SO32, and SO50-SO53 postcodes. We operate zone-based scheduling, with specific service days for different areas to optimize efficiency and reduce our carbon footprint. Enter your postcode on the booking page to check availability.",
    },
    {
        category: "Booking & Scheduling",
        q: "How far in advance should I book?",
        a: "We recommend booking at least 3-5 days in advance to secure your preferred time slot, especially during peak periods. However, we often have same-week availability. Check our interactive calendar when booking to see real-time availability for your area.",
    },
    {
        category: "Booking & Scheduling",
        q: "Can I reschedule or cancel my booking?",
        a: "Yes! We understand plans change. You can reschedule or cancel up to 24 hours before your appointment at no charge. Contact us via email or phone with your booking reference. Cancellations within 24 hours may incur a £10 fee.",
    },
    {
        category: "Booking & Scheduling",
        q: "Do I need to be present during the service?",
        a: "Not necessarily! As long as we have access to your vehicle and any specific instructions (like parking bay number or access codes), you can leave us to work our magic. Many customers book while at work or home. We'll notify you when we arrive and when we've completed the service.",
    },
    {
        category: "Booking & Scheduling",
        q: "What if it rains on my booking day?",
        a: "We operate in light rain as our waterless formula works perfectly in damp conditions. However, for heavy rain or extreme weather, we may need to reschedule for your vehicle's safety and optimal results. We'll contact you in advance if weather affects your booking.",
    },
    {
        category: "Pricing & Packages",
        q: "How much does your service cost?",
        a: "Pricing varies by service type and vehicle size. Exterior Clean starts from £25 (small), £30 (medium), £40 (large). Interior Refresh from £40-£65. Full Valet from £60-£95. All services include our premium waterless cleaning, professional-grade products, and doorstep convenience.",
    },
    {
        category: "Pricing & Packages",
        q: "What's included in each service package?",
        a: "Exterior Clean: full body wash, wheels & tires, windows, trim restoration. Interior Refresh: thorough vacuuming, dashboard & console clean, seat treatment, air freshening. Full Valet: everything from both Exterior and Interior, plus engine bay wipe and protective sealant application.",
    },
    {
        category: "Pricing & Packages",
        q: "Do you offer subscriptions or regular cleaning plans?",
        a: "Yes! Our subscription plans offer discounted rates for regular maintenance. Choose from weekly, fortnightly, or monthly plans. Subscribers get priority booking, discounted pricing (up to 15% off), and flexible scheduling. Visit our pricing page to learn more.",
    },
    {
        category: "Pricing & Packages",
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, Apple Pay, Google Pay, and bank transfers. Payment is taken securely through our booking system. For subscription customers, we set up automatic billing for your convenience.",
    },
    {
        category: "Pricing & Packages",
        q: "Are there any additional fees?",
        a: "Our prices are transparent - what you see is what you pay. The only additional charges would be for optional add-ons (ceramic coating, leather conditioning, etc.) or if you request services outside our standard coverage areas, which may incur a small travel fee.",
    },
    {
        category: "Pricing & Packages",
        q: "Do you offer fleet or corporate discounts?",
        a: "Absolutely! We offer tailored packages for businesses with multiple vehicles. Fleet customers receive volume discounts, dedicated account management, and flexible scheduling. Contact us for a custom quote based on your fleet size and requirements.",
    },
    {
        category: "Eco & Sustainability",
        q: "Are your products really eco-friendly?",
        a: "Yes! Our products are 99.78% readily biodegradable, non-toxic, and free from harsh chemicals. They're safe for the environment, your vehicle, and your family. We use plant-based formulations that break down naturally without leaving harmful residues.",
    },
    {
        category: "Eco & Sustainability",
        q: "What does \"biodegradable\" actually mean?",
        a: "Biodegradable means the product breaks down naturally through biological processes into non-toxic components. Our 99.78% readily biodegradable rating means the product degrades quickly (within days, not months) into water, CO2, and natural minerals without harming ecosystems.",
    },
    {
        category: "Eco & Sustainability",
        q: "HHow do you minimize your carbon footprint?",
        a: "We use zone-based routing to reduce travel, operate fuel-efficient vehicles, and plan routes strategically to minimize emissions. Our waterless method eliminates energy needed for water heating and treatment. We're working toward a fully electric fleet by 2027.",
    },
    {
        category: "Eco & Sustainability",
        q: "What do you do with waste materials?",
        a: "We minimize waste wherever possible. Used microfiber cloths are laundered and reused hundreds of times. When they reach end-of-life, they're recycled through specialist textile programs. Product containers are recycled, and we avoid single-use plastics in our operations.",
    },
    {
        category: "Eco & Sustainability",
        q: "Can waterless cleaning be better than traditional washing?",
        a: "EIn many ways, yes! Beyond saving water, waterless cleaning doesn't require energy-intensive water treatment facilities, doesn't create chemical runoff into waterways, and reduces the carbon emissions associated with traditional car wash infrastructure. Plus, our formula leaves a protective layer that helps keep your car cleaner longer.",
    },
    {
        category: "Service Details",
        q: "How long does each service take?",
        a: "Exterior Clean takes approximately 40 minutes, Interior Refresh about 50 minutes, and Full Valet around 90 minutes. Times may vary slightly depending on vehicle size and condition. We pride ourselves on efficiency without compromising quality.",
    },
    {
        category: "Service Details",
        q: "What if I'm not satisfied with the results?",
        a: "Your satisfaction is our priority! If you're not completely happy with our service, let us know immediately and we'll return to address any concerns at no extra charge. We stand behind our work with a 100% satisfaction guarantee.",
    },
    {
        category: "Service Details",
        q: "Do you offer add-on services?",
        a: "Yes! Available add-ons include Ceramic Spray Coating (£25, 3-6 months protection), Leather Conditioning (£20), Odour Elimination (£15), and Headlight Restoration (£30). Add-ons can be selected during booking or requested on the day.",
    },
    {
        category: "Service Details",
        q: "Can you clean the inside of my windows?",
        a: "Interior Refresh and Full Valet packages include interior window cleaning. For Exterior Clean only, interior windows aren't included but can be added for a small fee. Just let us know your preference when booking.",
    },
    {
        category: "Service Details",
        q: "What about engine bay cleaning?",
        a: "Engine bay cleaning is included in our Full Valet package - we wipe down and degrease visible surfaces. For deep engine detailing, this is available as a premium add-on. We ensure all electrical components are protected during cleaning.",
    },
    {
        category: "Service Details",
        q: "Do you clean convertible soft tops?",
        a: "Yes! We have specialized products safe for fabric and vinyl convertible tops. The treatment cleans, protects, and helps prevent mold and mildew. This is included in exterior packages or available as an add-on for interior-only services.",
    },
];

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const visibleGroups = categories
        .filter(c => c.label !== "All")
        .map(c => ({
            category: c.label,
            icon: c.icon,
            items: faqs.filter(f =>
                f.category === c.label &&
                (f.q.toLowerCase().includes(search.toLowerCase()) ||
                    f.a.toLowerCase().includes(search.toLowerCase()))
            ),
        }))
        .filter(g =>
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
                    {categories.map(c => {
                        const Icon = c.icon;
                        return (
                            <button
                                key={c.label}
                                onClick={() => {
                                    setActiveCategory(c.label);
                                    setOpenIndex(null);
                                }}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
                  ${activeCategory === c.label
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {Icon && <Icon size={14} />}
                                {c.label === "All" ? "All Questions" : c.label}
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
                                                    <span className="font-medium text-sm text-gray-900">{f.q}</span>
                                                    <ChevronDown
                                                        className={`transition text-gray-500 ${openIndex === key ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>

                                                {openIndex === key && (
                                                    <div className="px-6 pb-4 text-sm text-gray-600">
                                                        {f.a}
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
