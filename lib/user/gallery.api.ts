import api from "./axios";

export type GalleryItem = {
    id: string;
    title: string;
    serviceType: "Exterior" | "Interior" | "Full";
    beforeImage: string;
    afterImage: string;
    description: string;
    featured: boolean;
    vehicleType: string;
};

/* -------- GET GALLERY -------- */

export async function getGallery(
    serviceType?: "All" | "Exterior" | "Interior" | "Full"
): Promise<GalleryItem[]> {
    const res = await api.get("/gallery", {
        params:
            serviceType && serviceType !== "All"
                ? { serviceType }
                : {},
    });

    return res.data;
}
