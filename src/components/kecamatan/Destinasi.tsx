"use client";
import React, { useState, useEffect, useCallback } from "react";
import CardArtikel from "../Card/ArticleCard";
import { Article } from "@/types/article";

interface AllArticlesProps {
  kecamatanId: number;
}

const DestinasiKuliner = ({ kecamatanId }: AllArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles by kecamatanId
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/articles/subdomain/${kecamatanId}?page=1&limit=100`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setArticles([]);
      } else {
        // Sort by waktu descending
        const sortedArticles = data.items
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .filter(
            (item: Article) =>
              item.status === ("published" as Article["status"]) &&
              item.kategori_article?.nama.toLowerCase() !== "berita" &&
              item.kategori_article?.nama.toLowerCase() !== "pengumuman" &&
              item.kategori_article?.nama.toLowerCase() !== "organisasi" &&
              item.kategori_article?.nama.toLowerCase() !== "seni budaya" &&
              item.kategori_article?.nama.toLowerCase() !== "ekraf" &&
              item.kategori_article?.nama.toLowerCase() !== "akomodasi"
          );

        setArticles(sortedArticles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Gagal memuat artikel");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  useEffect(() => {
    if (kecamatanId) {
      fetchArticles();
    } else {
      setLoading(false);
    }
  }, [kecamatanId, fetchArticles]);

  // Loading state
  if (loading) {
    return (
      <section className="pb-16">
        <div className="container mx-auto">
          <div className="text-center mb-6 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Destinasi Wisata & Kuliner Terbaru di Kecamatan Rancakalong
            </h2>
            <p className="text-base text-gray-600">
              Temukan berbagai pilihan destinasi wisata dan kuliner terbaik
              untuk pengalaman tak terlupakan
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-500">Memuat Artikel...</span>
          </div>
        </div>
      </section>
    );
  }

  const displayedArticles = articles.slice(0, 4);

  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center mb-6 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Destinasi Wisata & Kuliner Terbaru di Kecamatan Rancakalong
          </h2>
          <p className="text-base text-gray-600">
            Temukan berbagai pilihan destinasi wisata dan kuliner terbaik untuk
            pengalaman tak terlupakan
          </p>
        </div>

        {!loading && displayedArticles.length === 0 ? (
          <div className="text-center py-4">
            <div className="w-full bg-gray-50 rounded-lg p-8 inline-block">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 00-2-2H9m10 13a2 2 0 01-2-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 01-2 2h10z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Belum Ada Destinasi dan Kuliner
              </h2>
              <p className="text-gray-500">
                Tidak ada artikel yang tersedia untuk kecamatan ini saat ini.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full mb-0 space-y-6 bg-white p-4 rounded-t-2xl border border-gray-200">
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {displayedArticles.map((article) => (
                    <CardArtikel
                      key={article.id}
                      id={article.id}
                      slug={article.slug}
                      date={article.created_at}
                      CardTitle={article.title}
                      CardDescription={article.content}
                      image={article.featured_image}
                      category={article.kategori_article?.nama}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinasiKuliner;
