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

