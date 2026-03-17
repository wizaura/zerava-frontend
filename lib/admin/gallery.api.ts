import adminApi from "./axios";

export type GalleryItem = {
    id: string;
    title: string;
    vehicleType: string;
    description: string;
    afterImageUrl: string;
    beforeImageUrl: string;
    featured: boolean;

    service: {
        id: string;
        name: string;
    };

    vehicleCategory: {
        id: string;
        name: string;
    };
};

/* -------- GET GALLERY -------- */

export async function getGallery(): Promise<GalleryItem[]> {
    const res = await adminApi.get("/gallery");

    return res.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        vehicleType: item.vehicleType,
        afterImage: item.afterImage,
        featured: item.featured,

        service: item.service,
        vehicleCategory: item.vehicleCategory,
    }));
}

/* -------- CREATE GALLERY ITEM -------- */
export async function createGalleryItem(data: {
    title: string;
    serviceId: string;
    categoryId: string;
    vehicleType: string;
    description?: string;
    featured: boolean;
    beforeImage: File;
    afterImage: File;
}): Promise<GalleryItem> {

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("serviceId", data.serviceId);
    formData.append("categoryId", data.categoryId);
    formData.append("vehicleType", data.vehicleType);

    if (data.description) {
        formData.append("description", data.description);
    }

    formData.append("featured", String(data.featured));
    formData.append("beforeImage", data.beforeImage);
    formData.append("afterImage", data.afterImage);

    const res = await adminApi.post(
        "/admin/gallery",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;
}

export async function deleteGalleryItem(id: string) {
    return adminApi.delete(`/admin/gallery/${id}`);
}

