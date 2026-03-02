import { usePostcodeAddressSuggestions } from "@/hooks/useGoogleAutocomplete";

export function PostcodeSection({
    postcode,
    address,
    setPostcode,
    setAddress,
    loading,
    error,
}: any) {
    const suggestions =
        usePostcodeAddressSuggestions(postcode);

    const handleSelect = (placeId: string) => {
        const service =
            new window.google.maps.places.PlacesService(
                document.createElement("div")
            );

        service.getDetails(
            {
                placeId,
                fields: ["formatted_address"],
            },
            (place: any) => {
                if (place?.formatted_address) {
                    setAddress(place.formatted_address);
                }
            }
        );
    };

    return (
        <div className="rounded-2xl border p-6 space-y-5">

            {/* POSTCODE */}
            <div className="space-y-2 relative">
                <label className="text-sm font-medium">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) =>
                        setPostcode(e.target.value.toUpperCase())
                    }
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    placeholder="Enter postcode"
                />

                {/* 🔥 DROPDOWN */}
                {suggestions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                        {suggestions.map((item) => (
                            <div
                                key={item.place_id}
                                onClick={() =>
                                    handleSelect(item.place_id)
                                }
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                            >
                                {item.description}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ADDRESS FIELD */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Full Address
                </label>

                <input
                    value={address}
                    readOnly
                    className="w-full rounded-xl border px-4 py-3 text-sm bg-gray-50"
                />
            </div>

            {loading && (
                <p className="text-sm text-gray-500">
                    Checking postcode...
                </p>
            )}

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}