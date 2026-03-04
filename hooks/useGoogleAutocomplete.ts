"use client";

import { useEffect, useState } from "react";

declare global {
    interface Window {
        google: any;
    }
}

export function usePostcodeAddressSuggestions(input: string) {
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
        if (!window.google || !input || input.length < 3) {
            setSuggestions([]);
            return;
        }

        const debounce = setTimeout(() => {

            const service =
                new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input,
                    componentRestrictions: { country: "gb" },
                },
                (predictions: any[]) => {

                    if (predictions) {
                        setSuggestions(predictions.slice(0, 6));
                    } else {
                        setSuggestions([]);
                    }

                }
            );

        }, 300);

        return () => clearTimeout(debounce);

    }, [input]);

    return suggestions;
}