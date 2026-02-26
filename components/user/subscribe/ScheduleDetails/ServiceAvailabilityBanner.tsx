import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { MapPin } from "lucide-react";
import { useState } from "react";
import api from "@/lib/user/axios";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ServiceAvailabilityBanner({
    postcode,
    serviceDays,
}: {
    postcode: string;
    serviceDays: number[] | null;
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    /* ================= WAITLIST SUBMIT ================= */

    async function handleWaitlist() {
        if (!name || !email) return;

        try {
            setLoading(true);

            await api.post("/waitlist", {
                name,
                email,
                postcode,
            });

            setSubmitted(true);

        } catch {
            // optional error handling
        } finally {
            setLoading(false);
        }
    }

    /* ================= AVAILABLE ================= */

    if (serviceDays && serviceDays.length > 0) {
        return (
            <div className="flex gap-4 rounded-2xl border border-electric-teal bg-electric-teal/10 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                </div>

                <div className="text-sm">
                    <p className="font-medium">
                        Great! We serve your area
                    </p>
                    <p>
                        Zerava cleans in{" "}
                        <span className="font-medium">{postcode}</span>{" "}
                        on{" "}
                        <span className="font-medium text-electric-teal">
                            {serviceDays.map((d) => WEEKDAYS[d % 7]).join(", ")}
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    /* ================= NOT AVAILABLE ================= */

    return (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 space-y-4">

            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400">
                    <MapPin size={18} className="text-white" />
                </div>

                <div>
                    <p className="font-medium text-amber-800">
                        We’re not in your area yet
                    </p>
                    <p className="text-sm text-amber-700">
                        But we’re expanding soon
                    </p>
                </div>
            </div>

            {submitted ? (
                <p className="text-sm text-green-600">
                    Thanks! We'll notify you when we launch in {postcode}.
                </p>
            ) : (
                <div className="space-y-3">
                    <p className="text-sm text-amber-800">
                        Join the waitlist and be the first to know.
                    </p>

                    <div className="grid md:grid-cols-3 gap-3">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="rounded-xl border px-4 py-2 text-sm"
                        />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            type="email"
                            className="rounded-xl border px-4 py-2 text-sm"
                        />

                        <button
                            onClick={handleWaitlist}
                            disabled={loading}
                            className="rounded-xl bg-black text-white text-sm px-4 py-2 hover:bg-gray-800"
                        >
                            {loading ? "Joining..." : "Join Waitlist"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}