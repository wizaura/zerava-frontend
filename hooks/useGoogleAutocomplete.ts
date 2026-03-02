"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

type Params = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    postcode: string;
    setPostcode: (value: string) => void;
    setBookingDraft: React.Dispatch<React.SetStateAction<any>>;
    setError: (value: string) => void;
};

export function useGoogleAutocomplete({
    inputRef,
    postcode,
    setPostcode,
    setBookingDraft,
    setError,
}: Params) {
    useEffect(() => {
        if (!inputRef.current) return;

        const initAutocomplete = () => {
            if (!window.google?.maps?.places) {
                setTimeout(initAutocomplete, 300);
                return;
            }

            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current!,
                {
                    types: ["address"],
                    componentRestrictions: { country: "gb" },
                    fields: ["formatted_address", "address_components"],
                }
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.formatted_address) return;

                setBookingDraft((d: any) => ({
                    ...d,
                    address: place.formatted_address,
                }));
            });
        };

        initAutocomplete();
    }, [inputRef]);
}