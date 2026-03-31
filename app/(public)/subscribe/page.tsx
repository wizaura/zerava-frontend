import SubscribeCall from "@/components/user/subscribe/Call";

export default function SubscribePage() {
    return (
        <div>
            <div className="min-h-[70vh] flex items-center justify-center px-6">
                <div className="max-w-xl w-full text-center border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-10">

                    <h1 className="text-2xl font-semibold text-white">
                        Zerava Membership
                    </h1>

                    <p className="text-white/70 mt-3">
                        Our membership plans are launching soon.
                        Get regular vehicle care, priority booking, and exclusive member pricing.
                    </p>

                    <div className="mt-6 text-sm text-white/60">
                        Coming Soon
                    </div>

                    <div className="mt-6">
                        <a
                            href="/"
                            className="inline-block bg-electric-teal text-[#0B2E28] px-6 py-3 rounded-lg font-medium"
                        >
                            Back to Home
                        </a>
                    </div>

                </div>
            </div>
            {/* <SubscribeCall /> */}
        </div>
    )
}