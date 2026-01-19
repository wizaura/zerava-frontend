import { MessageCircle, Mail, Phone } from "lucide-react";

export default function ContactMethods() {
    return (
        <section className="bg-white py-12 px-6">
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 text-center sm:grid-cols-3">

                {/* WhatsApp */}
                <div className="group flex flex-col items-center rounded-2xl p-8 transition hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-teal/10 text-electric-teal transition group-hover:scale-110">
                        <MessageCircle size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
                    <p className="mt-1 text-sm text-gray-600">+44 7000 000000</p>
                    <a
                        href="https://wa.me/447000000000"
                        className="mt-3 text-sm font-semibold text-electric-teal hover:underline"
                    >
                        Message us →
                    </a>
                </div>

                {/* Email */}
                <div className="group flex flex-col items-center rounded-2xl p-8 transition hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-teal/10 text-electric-teal transition group-hover:scale-110">
                        <Mail size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="mt-1 text-sm text-gray-600">hello@zerava.co.uk</p>
                    <a
                        href="mailto:hello@zerava.co.uk"
                        className="mt-3 text-sm font-semibold text-electric-teal hover:underline"
                    >
                        Send email →
                    </a>
                </div>

                {/* Phone */}
                <div className="group flex flex-col items-center rounded-2xl p-8 transition hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-teal/10 text-electric-teal transition group-hover:scale-110">
                        <Phone size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="mt-1 text-sm text-gray-600">+44 7000 000000</p>
                    <a
                        href="tel:+447000000000"
                        className="mt-3 text-sm font-semibold text-electric-teal hover:underline"
                    >
                        Call us →
                    </a>
                </div>

            </div>
        </section>
    );
}
