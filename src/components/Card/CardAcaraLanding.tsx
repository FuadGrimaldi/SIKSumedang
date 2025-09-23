import Image from "next/image";
import { Acara } from "@/types/Acara";
import { ArrowBigRight, ArrowRight, LinkIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  acara: Acara;
}

const BlogCard = ({ acara }: BlogCardProps) => {
  // Format tanggal Masehi
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format ke kalender Hijriah
  const formatHijriDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Tentukan status acara
  const getEventStatus = (dateString: string | Date) => {
    const eventDate = new Date(dateString);
    const today = new Date();

    // Samakan ke YYYY-MM-DD untuk perbandingan tanpa jam
    const toDateOnly = (d: Date) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const eventDay = toDateOnly(eventDate).getTime();
    const todayDay = toDateOnly(today).getTime();

    if (eventDay > todayDay) return "Akan datang";
    if (eventDay === todayDay) return "Terlaksana";
    return "Terlaksana";
  };

  // Truncate deskripsi
  const truncateContent = (content: string, maxLength: number = 50) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // hapus tag HTML
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white group hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      {/* Poster */}
      <div className="relative">
        <div className="flex flex-row bg-white p-3 w-full"></div>
        <div className="relative">
          <Image
            src={acara.poster || "/images/default-article.jpg"}
            alt={acara.judul}
            className="w-full h-48 object-cover"
            width={400}
            height={200}
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/default-article.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
        </div>
        <div
          className={`absolute top-0 text-white text-xs px-3 py-1 m-2 rounded backdrop-blur-xl ${
            getEventStatus(acara.waktu) === "Terlaksana"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          <p>{getEventStatus(acara.waktu)}</p>
        </div>
        <div className="absolute top-0 right-0 text-white text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-black/50">
          <p>Acara</p>
        </div>
      </div>

      <div className="p-5">
        {/* Published date & Hijriah */}
        <div className="flex flex-col mb-4 space-y-1">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-lg">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(acara.waktu)} / {formatHijriDate(acara.waktu)}
          </span>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Bagian Judul + Deskripsi */}
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition line-clamp-2">
                {acara.judul}
              </h3>

              <p className="text-sm text-gray-700 line-clamp-3">
                {truncateContent(acara.deskripsi)}
              </p>
            </div>

            {/* Icon Link */}
            <Link
              href={`/acara/${acara.slug}`}
              className="ml-3 p-2 rounded-full hover:bg-blue-100 transition"
              title="Lihat detail acara"
            >
              <ArrowRight className="w-6 h-6 text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogCard };
