export function PostcodeSection({
    postcode,
    address,
    setPostcode,
    addressRef,
    loading,
    error,
}: any) {
    const handlePostcodeChange = (value: string) => {
        setPostcode(value.toUpperCase());
    };

    return (
        <div className="rounded-2xl border p-6 space-y-5">

            {/* POSTCODE */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) => handlePostcodeChange(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    placeholder="Enter postcode"
                />
            </div>

            {/* ADDRESS INPUT (Google attaches here) */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Full Address
                </label>

                <input
                    ref={addressRef}
                    defaultValue={address}
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    placeholder="Start typing your address..."
                />
            </div>

            {loading && (
                <p className="text-sm text-gray-500">Checking postcode...</p>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}