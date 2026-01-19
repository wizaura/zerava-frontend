import ContactForm from "./Form";
import { Clock, MapPin } from "lucide-react";

export default function ContactMain() {
    return (
        <section className="bg-gray-50 py-20 px-6">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Form */}
                <div>
                    <ContactForm />
                </div>

                {/* Right Side */}
                <div className="space-y-4">

                    {/* Service Area + Map */}
                    <div className="px-4">
                        <h3 className="text-3xl font-light text-gray-900 mb-3">
                            Service Area
                        </h3>
                        <p className="text-md text-gray-600 mb-4">
                            We currently serve Southampton and surrounding areas within a 15-mile radius.
                        </p>

                        <div className="overflow-hidden rounded-xl">
                            <iframe
                                src="https://www.google.com/maps?q=Southampton,UK&output=embed"
                                className="w-full h-[280px] border-0"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">

                        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock size={18} className="text-electric-teal" />
                                <h4 className="font-semibold text-gray-900">Operating Hours</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Monday - Saturday: 8am - 7pm<br />
                                Sunday: 9am - 5pm
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6 bg-mint-glow/40 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin size={18} className="text-electric-teal" />
                                <h4 className="font-semibold text-gray-900">Prefer Whatsapp?</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Quick questions? Chat with us instantly on WhatsApp.
                            </p>
                            <a
                                href="https://wa.me/447000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-electric-teal transition hover:gap-3"
                            >
                                Open WhatsApp →
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
