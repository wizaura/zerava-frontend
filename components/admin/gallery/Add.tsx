"use client";

import { useState, useEffect } from "react";
import { createGalleryItem, GalleryItem } from "@/lib/admin/gallery.api";
import UploadBox from "@/components/ui/UploadBox";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import ImageCropModal from "@/components/ui/ImageCropModal";
import adminApi from "@/lib/admin/axios";

type Service = {
    id: string;
    name: string;
};

type Category = {
    id: string;
    name: string;
};

type Props = {
    onSuccess: (item: GalleryItem) => void;
    onCancel: () => void;
};

export default function GalleryAdd({ onSuccess, onCancel }: Props) {

    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [serviceId, setServiceId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [before, setBefore] = useState<File | null>(null);
    const [after, setAfter] = useState<File | null>(null);

    const [beforePreview, setBeforePreview] = useState<string | null>(null);
    const [afterPreview, setAfterPreview] = useState<string | null>(null);

    const [cropImage, setCropImage] = useState<string | null>(null);
    const [activeField, setActiveField] = useState<"before" | "after" | null>(null);
    const [rawFile, setRawFile] = useState<File | null>(null);

    const [title, setTitle] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

    const [loading, setLoading] = useState(false);

    /* ================================
       LOAD SERVICES + CATEGORIES
    ================================ */

    useEffect(() => {

        async function loadData() {
            try {

                const [servicesRes, categoriesRes] = await Promise.all([
                    adminApi.get("/gallery/services"),
                    adminApi.get("/gallery/categories"),
                ]);

                setServices(servicesRes.data);
                setCategories(categoriesRes.data);

            } catch {
                toast.error("Failed to load services or categories");
            }
        }

        loadData();

    }, []);

    /* ================================
       IMAGE PREVIEW
    ================================ */

    useEffect(() => {
        if (!before) {
            setBeforePreview(null);
            return;
        }

        const url = URL.createObjectURL(before);
        setBeforePreview(url);

        return () => URL.revokeObjectURL(url);

    }, [before]);

    useEffect(() => {
        if (!after) {
            setAfterPreview(null);
            return;
        }

        const url = URL.createObjectURL(after);
        setAfterPreview(url);

        return () => URL.revokeObjectURL(url);

    }, [after]);

    /* ================================
       FILE SELECT
    ================================ */

    function handleFileSelect(
        e: React.ChangeEvent<HTMLInputElement>,
        type: "before" | "after"
    ) {

        const file = e.target.files?.[0];
        if (!file) return;

        setRawFile(file);
        setActiveField(type);
        setCropImage(URL.createObjectURL(file));
    }

    /* ================================
       VALIDATION
    ================================ */

    function validate() {

        if (!before || !after) {
            toast.error("Both images are required");
            return false;
        }

        if (!title.trim()) {
            toast.error("Title is required");
            return false;
        }

        if (!serviceId) {
            toast.error("Select a service");
            return false;
        }

        if (!categoryId) {
            toast.error("Select a category");
            return false;
        }

        if (!vehicleType.trim()) {
            toast.error("Vehicle type is required");
            return false;
        }

        if (description.length > 500) {
            toast.error("Description must be under 500 characters");
            return false;
        }

        return true;
    }

    /* ================================
       SUBMIT
    ================================ */

    async function submit() {

        if (!validate()) return;

        setLoading(true);

        try {

            const item = await createGalleryItem({
                title,
                serviceId,
                categoryId,
                vehicleType,
                description,
                featured,
                beforeImage: before as File,
                afterImage: after as File,
            });

            onSuccess(item);

        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 bg-white p-4 border border-gray-200 rounded-xl">

            {/* IMAGE UPLOADS */}
            <div className="grid grid-cols-2 gap-8">

                <UploadBox
                    label="Before Image"
                    onChange={(e) => handleFileSelect(e, "before")}
                    preview={beforePreview}
                />

                <UploadBox
                    label="After Image"
                    onChange={(e) => handleFileSelect(e, "after")}
                    preview={afterPreview}
                />

            </div>

            {/* TITLE */}
            <TextInput
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* SERVICE + CATEGORY */}
            <div className="grid grid-cols-2 gap-6">

                <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">Select Service</option>

                    {services.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}

                </select>

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">Select Category</option>

                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}

                </select>

            </div>

            {/* VEHICLE TYPE */}
            <TextInput
                label="Vehicle Type"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
            />

            {/* DESCRIPTION */}
            <TextArea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* FEATURE */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                />
                Feature this item
            </label>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">

                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border px-6 py-2"
                >
                    Cancel
                </button>

                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-lg bg-emerald-500 px-6 py-2 text-white"
                >
                    {loading ? "Uploading..." : "Add to Gallery"}
                </button>

            </div>

            {/* CROP MODAL */}
            {cropImage && rawFile && (
                <ImageCropModal
                    image={cropImage}
                    aspect={4 / 3}
                    onClose={() => {
                        setCropImage(null);
                        setRawFile(null);
                    }}
                    onCropComplete={(file) => {
                        if (activeField === "before") setBefore(file);
                        if (activeField === "after") setAfter(file);
                        setCropImage(null);
                        setRawFile(null);
                    }}
                />
            )}

        </div>
    );
}