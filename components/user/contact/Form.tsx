"use client";

import { userApi } from "@/lib/user/user.api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await userApi.contact(form);

            toast.success("Message sent successfully");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch {
            toast.error("Message sending failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-8 space-y-5"
        >
            <h3 className="text-3xl font-light text-gray-900 mb-4">
                Send us a message
            </h3>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        name="name"
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                     focus:border-electric-teal focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        name="phone"
                        placeholder="+44 7000 000000"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                     focus:border-electric-teal focus:outline-none"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:border-electric-teal focus:outline-none"
                />
            </div>

            {/* Message */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message / Enquiry
                </label>
                <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                    focus:border-electric-teal focus:outline-none"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-eco-black px-6 py-4 text-sm font-semibold
                    text-white transition hover:brightness-110"
            >
                {loading ? "Sending..." : "Send Enquiry"}
            </button>
        </form>
    );

}
