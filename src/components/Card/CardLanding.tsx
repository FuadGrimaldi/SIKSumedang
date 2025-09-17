import Image from "next/image";
import { Article } from "@/types/article";
import { PencilIcon } from "lucide-react";

// Updated BlogCard component to use Article data
interface BlogCardProps {
  article: Article;
}

const BlogCardSingle = ({ article }: BlogCardProps) => {
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group">
      <div className="flex flex-col md:flex-row h-[400px]">
        {/* Image Section */}
        <div className="relative md:w-1/2 w-full h-48 md:h-auto overflow-hidden">
          <Image
            src={article.featured_image || "/images/default-article.jpg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={320}
            height={240}
          />

          {/* Dark overlay yang hilang saat hover */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center text-white text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-black/50">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clipRule="evenodd"
                />
              </svg>
              {article.kategori_article?.nama || "Berita"}
            </span>
          </div>

          {/* Date badge di pojok kiri bawah */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {new Date(article.published_at).getDate()}
                </div>
                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                  {new Date(article.published_at).toLocaleDateString("id-ID", {
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Published date badge */}
            <div className="flex flex-row mb-2">
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
                {formatDate(article.published_at)}
              </span>
              <div>
                <span className="inline-flex items-center px-3 py-1 ml-3 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-lg">
                  <PencilIcon className="w-3 h-3 mr-1" />
                  {article.users?.full_name || "Admin"}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
              <a
                href={`/artikel/${article.title}`}
                className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                {article.title}
              </a>
            </h3>

            {/* Content Preview */}
            <p className="text-gray-600 mb-2 line-clamp-1 leading-relaxed">
              {truncateContent(article.content)}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            {/* Read More Button */}
            <a
              href={`/berita/${article.id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/btn"
            >
              Baca Selengkapnya
              <svg
                className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Share Button */}
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ article }: BlogCardProps) => {
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white group hover:bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      <div className="relative lg:block hidden">
        <Image
          src={article.featured_image || "/images/default-article.jpg"}
          alt={article.title}
          className="w-full h-48 object-cover "
          width={400}
          height={200}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-article.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
        <div className="absolute top-0 right-0 text-white text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-black/50">
          {article.kategori_article?.nama || "Berita"}
        </div>
      </div>

      <div className="p-5">
        {/* Published date badge */}
        <div className="flex flex-row mb-4">
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
            {formatDate(article.published_at)}
          </span>
          <div>
            <span className="inline-flex items-center px-3 py-1 ml-3 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-lg">
              <PencilIcon className="w-3 h-3 mr-1" />
              {article.users?.full_name || "Admin"}
            </span>
          </div>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <a href={`/artikel/${article.title}`} className="line-clamp-2">
            {article.title}
          </a>
        </h3>
        <p className=" text-sm text-gray-700 line-clamp-3">
          {truncateContent(article.content)}
        </p>
      </div>
    </div>
  );
};
export { BlogCard, BlogCardSingle };
