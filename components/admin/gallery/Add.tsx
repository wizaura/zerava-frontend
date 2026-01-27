"use client";

import { useState } from "react";
import { createGalleryItem, GalleryItem } from "@/lib/admin/gallery.api";
import UploadBox from "@/components/ui/UploadBox";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import SelectInput from "@/components/ui/SelectInput";

type Props = {
    onSuccess: (item: GalleryItem) => void;
    onCancel: () => void;
};

export default function GalleryAdd({ onSuccess, onCancel }: Props) {
    const [before, setBefore] = useState<File | null>(null);
    const [after, setAfter] = useState<File | null>(null);

    const [title, setTitle] = useState("");
    const [serviceType, setServiceType] = useState("Exterior");
    const [vehicleType, setVehicleType] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

    const [loading, setLoading] = useState(false);

    async function submit() {
        if (!before || !after) {
            alert("Both images are required");
            return;
        }

        setLoading(true);
        try {
            const item = await createGalleryItem({
                title,
                serviceType,
                vehicleType,
                description,
                featured,
                beforeImage: before,
                afterImage: after,
            });

            onSuccess(item);
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
                        onChange={(e) => setBefore(e.target.files?.[0] ?? null)}
                        preview={before ? URL.createObjectURL(before) : null}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        After Image
                    </label>
                    <UploadBox
                        label="Click to upload"
                        onChange={(e) => setAfter(e.target.files?.[0] ?? null)}
                        preview={after ? URL.createObjectURL(after) : null}
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
        </div>
    );
}
