import adminApi from "./axios";

export type GalleryItem = {
    id: string;
    title: string;
    serviceType: "Exterior" | "Interior" | "Full";
    vehicleType: string;
    description?: string;
    featured: boolean;

    beforeImage: string;
    afterImage: string;

    createdAt: string;
};

/* -------- GET GALLERY -------- */

export async function getGallery(): Promise<GalleryItem[]> {
    const res = await adminApi.get("/gallery");
    
    return res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        afterImage: item.afterImage,
    }));
}

/* -------- CREATE GALLERY ITEM -------- */

export async function createGalleryItem(data: {
    title: string;
    serviceType: string;
    vehicleType: string;
    description?: string;
    featured: boolean;
    beforeImage: File;
    afterImage: File;
}): Promise<GalleryItem> {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("serviceType", data.serviceType);
    formData.append("vehicleType", data.vehicleType);
    if (data.description) {
        formData.append("description", data.description);
    }
    formData.append("featured", String(data.featured));
    formData.append("beforeImage", data.beforeImage);
    formData.append("afterImage", data.afterImage);

    const res = await adminApi.post("/admin/gallery", formData);

    return res.data;
}

export async function deleteGalleryItem(id: string) {
    return adminApi.delete(`/admin/gallery/${id}`);
}

