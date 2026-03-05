"use client";

import { useState, useEffect } from "react";
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
    const [houseNumber, setHouseNumber] = useState("");
    const [baseAddress, setBaseAddress] = useState("");

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

                const components = place.address_components || [];

                const get = (type: string) =>
                    components.find((c: any) =>
                        c.types.includes(type)
                    )?.long_name || "";

                const street = get("route");
                const city = get("postal_town") || get("locality");
                const postcodeValue = get("postal_code");

                const addressWithoutHouse = [
                    street,
                    city,
                    postcodeValue,
                ]
                    .filter(Boolean)
                    .join(", ");

                setBaseAddress(addressWithoutHouse);

                if (postcodeValue) {
                    setPostcode(postcodeValue.toUpperCase());
                }

                setShowSuggestions(false);
            }
        );
    };

    // Build full address whenever house number changes
    useEffect(() => {
        const fullAddress = [
            houseNumber,
            baseAddress
        ].filter(Boolean).join(" ");

        setAddress(fullAddress);
    }, [houseNumber, baseAddress]);

    const highlightPostcode = (text: string) => {
        const match = text.match(/[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/i);
        if (!match) return text;

        const postcodeMatch = match[0];
        const parts = text.split(postcodeMatch);

        return (
            <>
                {parts[0]}
                <strong className="font-semibold">{postcodeMatch}</strong>
                {parts[1]}
            </>
        );
    };

    return (
        <div className="rounded-2xl border p-6 space-y-5">

            {/* POSTCODE INPUT */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="space-y-2 w-full relative">

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

                {/* HOUSE NUMBER */}
                <div className="space-y-2">

                    <label className="text-sm font-medium">
                        House / Flat Number
                    </label>

                    <input
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal"
                        placeholder="e.g. 221B"
                    />

                </div>
            </div>

            {/* ADDRESS FIELD */}
            <div className="space-y-2">

                <label className="text-sm font-medium">
                    Full Address
                </label>

                <input
                    value={address ?? ""}
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