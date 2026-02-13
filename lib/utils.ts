import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiError(err: any): string {
    if (err?.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
            return err.response.data.message.join(", ");
        }
        return err.response.data.message;
    }

    return err?.message || "Something went wrong";
}


export function formatDate(value: string | Date, locale = "en-GB") {
    if (!value) return "-";

    const date = typeof value === "string" ? new Date(value) : value;

    return date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

