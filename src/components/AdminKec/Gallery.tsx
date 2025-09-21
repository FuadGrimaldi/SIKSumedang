import { Video as VideoIcon, ImageIcon } from "lucide-react";
import GalleryCard from "../Card/GalleryCard";

interface VideoProps {
  kecamatanId: number;
}

export default function GalleryManagerKec({ kecamatanId }: VideoProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Gallery
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <GalleryCard kecamatanId={kecamatanId} />
        </div>
      </div>
    </div>
  );
}
