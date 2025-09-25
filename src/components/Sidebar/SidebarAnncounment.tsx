import React from "react";
import { Article } from "@/types/article";
// Updated SidebarNews component
interface SidebarNewsProps {
  articles: Article[];
}

const SidebarPengumumanLanding = ({ articles }: SidebarNewsProps) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fallback items if no articles available
  const fallbackItems = [
    {
      title: "Informasi akan segera tersedia",
      link: "#",
      date: formatDate(new Date()),
    },
  ];

  const displayItems = articles.length > 0 ? articles : fallbackItems;

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div className="lg:text-2xl text-xl font-bold text-white bg-blue-500 p-4 rounded-t-xl">
        Pengumuman
      </div>
      <div className="px-4 py-4">
        <ul className="space-y-4">
          {displayItems.slice(0, 1).map((item, idx) => (
            <li
              key={idx}
              className="border-b pb-3 shadow-md p-3 rounded-lg bg-white hover:bg-blue-50 transition-colors"
            >
              <a
                href={
                  articles.length > 0
                    ? `/berita/${(item as Article).slug}`
                    : "#"
                }
                className="block text-md font-medium text-black hover:underline line-clamp-2"
              >
                {articles.length > 0 ? (item as Article).title : item.title}
              </a>
              <span className="text-xs text-gray-500">
                {articles.length > 0
                  ? formatDate((item as Article).created_at)
                  : item.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarPengumumanLanding;
