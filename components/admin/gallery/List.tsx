import { Image } from "lucide-react";

type GalleryItem = {
    id: string;
    title: string;
    afterImage: string;
};

export default function GalleryList({ items }: { items: GalleryItem[] }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl justify-center gap-3 py-20 text-gray-400">
                <Image className="h-14 w-14" />
                <p>No gallery items yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="rounded-xl border p-3 bg-white"
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/gallery/${item.afterImage}`}
                        className="h-48 w-full object-cover rounded-lg"
                    />
                    <p className="mt-2 font-medium">{item.title}</p>
                </div>
            ))}
        </div>
    );
}
