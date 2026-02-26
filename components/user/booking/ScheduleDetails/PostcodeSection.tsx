export function PostcodeSection({
    postcode,
    setPostcode,
    loading,
    error,
}: any) {
    return (
        <div className="rounded-2xl border p-6 space-y-4">
            <label className="text-sm font-medium">
                Your Postcode
            </label>

            <input
                value={postcode}
                onChange={(e) =>
                    setPostcode(e.target.value.toUpperCase())
                }
                className="w-full rounded-xl border px-4 py-3 text-sm"
            />

            {loading && <p className="text-sm">Checking...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}