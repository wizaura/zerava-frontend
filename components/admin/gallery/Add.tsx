"use client";

import { useState, useEffect } from "react";
import { createGalleryItem, GalleryItem } from "@/lib/admin/gallery.api";
import UploadBox from "@/components/ui/UploadBox";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import SelectInput from "@/components/ui/SelectInput";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/utils";
import ImageCropModal from "@/components/ui/ImageCropModal";

type Props = {
    onSuccess: (item: GalleryItem) => void;
    onCancel: () => void;
};

export default function GalleryAdd({ onSuccess, onCancel }: Props) {
    const [before, setBefore] = useState<File | null>(null);
    const [after, setAfter] = useState<File | null>(null);
    const [beforePreview, setBeforePreview] = useState<string | null>(null);
    const [afterPreview, setAfterPreview] = useState<string | null>(null);

    const [cropImage, setCropImage] = useState<string | null>(null);
    const [activeField, setActiveField] = useState<"before" | "after" | null>(null);
    const [rawFile, setRawFile] = useState<File | null>(null);

    const [title, setTitle] = useState("");
    const [serviceType, setServiceType] = useState("Exterior");
    const [vehicleType, setVehicleType] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

    const [loading, setLoading] = useState(false);

    function validate() {
        if (!before || !after) {
            toast.error("Both images are required");
            return false;
        }

        if (!title.trim()) {
            toast.error("Title is required");
            return false;
        }

        if (title.length < 5) {
            toast.error("Title must be at least 5 characters");
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

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(before.type) || !allowedTypes.includes(after.type)) {
            toast.error("Only JPG, PNG or WEBP images allowed");
            return false;
        }

        const maxSize = 5 * 1024 * 1024;

        if (before.size > maxSize || after.size > maxSize) {
            toast.error("Images must be under 5MB");
            return false;
        }

        return true;
    }

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

    function handleSelect(file: File, type: "before" | "after") {
        setActiveField(type);
        setCropImage(URL.createObjectURL(file));
    }

    useEffect(() => {
        if (!before) {
            setBeforePreview(null);
            return;
        }

        const url = URL.createObjectURL(before);
        setBeforePreview(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [before]);


    useEffect(() => {
        if (!after) {
            setAfterPreview(null);
            return;
        }

        const url = URL.createObjectURL(after);
        setAfterPreview(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [after]);


    async function submit() {

        if (!validate()) return;

        setLoading(true);
        try {
            const item = await createGalleryItem({
                title,
                serviceType,
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
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Before Image
                    </label>
                    <UploadBox
                        label="Click to upload"
                        onChange={(e) => handleFileSelect(e, "after")}
                        preview={afterPreview}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        After Image
                    </label>
                    <UploadBox
                        label="Click to upload"
                        onChange={(e) => handleFileSelect(e, "before")}
                        preview={beforePreview}
                    />
                </div>
            </div>

            {/* TITLE + SERVICE TYPE */}
            <div className="grid grid-cols-2 gap-6">
                <TextInput
                    label="Title"
                    placeholder="e.g., BMW 3 Series Transformation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <SelectInput
                    label="Service Type"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                >
                    <option>Exterior</option>
                    <option>Interior</option>
                    <option>Full</option>
                </SelectInput>
            </div>

            {/* VEHICLE TYPE */}
            <TextInput
                label="Vehicle Type"
                placeholder="e.g., BMW 3 Series, Mercedes GLC"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
            />

            {/* DESCRIPTION */}
            <TextArea
                label="Description"
                placeholder="Brief description of the work done..."
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
                    className="rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-lg bg-emerald-500 px-6 py-2.5 text-white hover:bg-emerald-600 disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Add to Gallery"}
                </button>
            </div>
            {cropImage && rawFile && (
                <ImageCropModal
                    image={cropImage}
                    aspect={4 / 3} // change ratio if you want
                    onClose={() => {
                        setCropImage(null);
                        setRawFile(null);
                    }}
                    onCropComplete={(croppedFile) => {
                        if (activeField === "before") setBefore(croppedFile);
                        if (activeField === "after") setAfter(croppedFile);

                        setCropImage(null);
                        setRawFile(null);
                    }}
                />
            )}
        </div>
    );
}
