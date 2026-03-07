export default function TermsHeader({ lastUpdated }: any) {
    return (
        <div className="bg-eco-black p-16">
            <h2 className="text-gray-200 text-light text-4xl">Terms & Condition</h2>
            <p className="text-gray-400 mt-3">
                Last updated:{" "}
                {lastUpdated
                    ? lastUpdated.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                    : "—"}
            </p>
        </div>
    )
}