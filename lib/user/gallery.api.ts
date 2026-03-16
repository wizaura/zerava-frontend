import api from "./axios";

export type GalleryItem = {
    id: string;
    title: string;

    beforeImage: string;
    afterImage: string;

    vehicleType?: string;
    description?: string;
    featured?: boolean;

    service: {
        id: string;
        name: string;
    };

    vehicleCategory?: {
        id: string;
        name: string;
    };
};


/* -------- GET GALLERY -------- */

export async function getGallery(
    serviceId?: string
): Promise<GalleryItem[]> {

    const res = await api.get("/gallery", {
        params: serviceId ? { serviceId } : {},
    });

    return res.data;
}
