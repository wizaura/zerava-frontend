import { useState } from "react";
import { MapPin } from "lucide-react";
import { usePostcodeAddressSuggestions } from "@/hooks/useGoogleAutocomplete";

export function PostcodeSection({
    postcode,
    address,
    setPostcode,
    setAddress,
    loading,
    error,
}: any) {

    const suggestions = usePostcodeAddressSuggestions(postcode);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const handleSelect = (placeId: string) => {
        const service =
            new window.google.maps.places.PlacesService(
                document.createElement("div")
            );

        service.getDetails(
            {
                placeId,
                fields: ["formatted_address", "address_components"],
            },
            (place: any) => {
                if (!place) return;

                if (place.formatted_address) {
                    setAddress(place.formatted_address);
                }

                // extract postcode
                const postcodeComponent =
                    place.address_components?.find((c: any) =>
                        c.types.includes("postal_code")
                    );

                if (postcodeComponent) {
                    setPostcode(postcodeComponent.long_name.toUpperCase());
                }

                setShowSuggestions(false);
            }
        );
    };

    const highlightPostcode = (text: string) => {
        const match = text.match(/[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/i);
        if (!match) return text;

        const postcode = match[0];

        const parts = text.split(postcode);

        return (
            <>
                {parts[0]}
                <strong className="font-semibold">{postcode}</strong>
                {parts[1]}
            </>
        );
    };

    return (
        <div className="rounded-2xl border p-6 space-y-5">

            {/* POSTCODE INPUT */}
            <div className="space-y-2 relative">

                <label className="text-sm font-medium">
                    Your Postcode
                </label>

                <input
                    value={postcode}
                    onChange={(e) => {
                        setPostcode(e.target.value.toUpperCase());
                        setShowSuggestions(true);
                    }}
                    className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal"
                    placeholder="Enter postcode (e.g. SO16 0YS)"
                />

                {/* SUGGESTIONS */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">

                        {suggestions.map((item) => (
                            <div
                                key={item.place_id}
                                onClick={() => handleSelect(item.place_id)}
                                className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 flex items-start gap-2"
                            >
                                <MapPin size={14} className="mt-1 text-gray-400" />

                                <span>
                                    {highlightPostcode(item.description)}
                                </span>

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
                    placeholder="Select address from suggestions"
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