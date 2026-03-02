"use client";

import { useEffect, useState } from "react";

declare global {
    interface Window {
        google: any;
    }
}

export function usePostcodeAddressSuggestions(postcode: string) {
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
        if (!window.google || !postcode) {
            setSuggestions([]);
            return;
        }

        const service =
            new window.google.maps.places.AutocompleteService();

        service.getPlacePredictions(
            {
                input: postcode,
                types: ["address"],
                componentRestrictions: { country: "gb" },
            },
            (predictions: any[]) => {
                if (predictions) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            }
        );
    }, [postcode]);

    return suggestions;
}