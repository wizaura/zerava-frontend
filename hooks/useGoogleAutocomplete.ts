"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

type Params = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    setBookingDraft: React.Dispatch<React.SetStateAction<any>>;
};

export function useGoogleAutocomplete({
    inputRef,
    setBookingDraft,
}: Params) {
    useEffect(() => {
        if (!window.google || !inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
                types: ["geocode"],
                componentRestrictions: { country: "gb" },
                fields: ["formatted_address", "address_components"],
            }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.formatted_address) return;

            const postcodeComp = place.address_components?.find(
                (c: any) => c.types.includes("postal_code")
            );

            setBookingDraft((d: any) => ({
                ...d,
                address: place.formatted_address,
            }));
        });

        return () => {
            window.google.maps.event.clearInstanceListeners(
                autocomplete
            );
        };
    }, [inputRef, setBookingDraft]);
}