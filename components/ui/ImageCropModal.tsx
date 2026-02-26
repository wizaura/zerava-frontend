"use client";

import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import getCroppedImg from "../../lib/cropImage";

type Props = {
    image: string;
    aspect?: number;
    onClose: () => void;
    onCropComplete: (file: File) => void;
};

export default function ImageCropModal({
    image,
    aspect = 4 / 3,
    onClose,
    onCropComplete,
}: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const handleCropComplete = useCallback((_: any, croppedPixels: any) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    async function handleSave() {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onCropComplete(croppedImage);
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[600px] space-y-4">
                <div className="relative h-96">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                </div>

                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                />

                <div className="flex justify-end gap-3">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={handleSave}
                        className="bg-emerald-500 text-white px-4 py-2 rounded"
                    >
                        Crop & Save
                    </button>
                </div>
            </div>
        </div>
    );
}