"use client";
import React from "react";
import { Article } from "@/types/article";
import { Agenda } from "@/types/agenda";
import { Infografis } from "@/types/infografis";
import { useState, useEffect, useCallback } from "react";
import SidebarNewsLanding from "../Sidebar/SidebarNewsLanding";
import { BlogCard, BlogCardSingle } from "../Card/CardLanding";
import SidebarInfografisLanding from "../Sidebar/SidebarInfografisLanding";
import SidebarPengumumanLanding from "../Sidebar/SidebarAnncounment";

interface AllBeritaProps {
  kecamatanId: number;
}

const News = ({ kecamatanId }: AllBeritaProps) => {
  const [pengumaman, setPengumuman] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgenda = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/agenda/subdomain/${kecamatanId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch agenda");
      }
      const data = await res.json();
      setAgenda(data);
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setError("Gagal memuat agenda");
      setAgenda([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  const fetchInfografis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/infografis/subdomain/${kecamatanId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch agenda");
      }
      const data = await res.json();
      setInfografis(data);
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setError("Gagal memuat agenda");
      setInfografis([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  // Fetch articles by desa_id
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Gunakan endpoint khusus untuk desa dengan filter
      const res = await fetch(`/api/articles/subdomain/${kecamatanId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setArticles([]);
        setSidebarArticles([]);
        setPengumuman([]);
      } else {
        // Sort by published_at descending
        const sortedArticles = data
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .filter(
            (article: Article) =>
              article.tipe !== "pengumuman" && article.status === "published"
          );
        const pengumumanTerbaru = data
          .filter((a: Article) => a.tipe === "pengumuman")
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(0, 3);

        setPengumuman(pengumumanTerbaru);

        setArticles(sortedArticles);
        // Set different articles for sidebar (skip first 3 for main display)
        setSidebarArticles(sortedArticles.slice(3, 7));
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Gagal memuat artikel");
      setArticles([]);
      setSidebarArticles([]);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId]);

  // Fetch articles when kecamatanId changes
  useEffect(() => {
    if (kecamatanId) {
      fetchArticles();
      fetchAgenda();
      fetchInfografis();
    } else {
      setLoading(false);
    }
  }, [kecamatanId, fetchArticles, fetchAgenda, fetchInfografis]);

  // Loading state
  if (loading) {
    return (
      <section className="pb-16">
        <div className="container mx-auto">
          <div className="text-left mb-6 max-w-xl ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Berita dan Informasi
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-500">Memuat berita...</span>
          </div>
        </div>
      </section>
    );
  }
  // Get first 3 articles for main display
  const displayedNews = articles.slice(0, 3);

  return (
    <section>
      <div className="container mx-auto">
        <div className="text-left mb-6 max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Berita dan Informasi
          </h2>
          <p className="text-base text-gray-600">
            Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
            penting seputar kegiatan dan perkembangan di lingkungan kita.
          </p>
        </div>

        {!loading && displayedNews.length === 0 ? (
          // No articles state
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Belum Ada Berita
              </h3>
              <p className="text-gray-500">
                Tidak ada berita yang tersedia untuk kecamatan ini saat ini.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4 mb-0 space-y-6 bg-white p-4 rounded-t-2xl border border-gray-200">
                <div>
                  {displayedNews
                    .map((article) => (
                      <BlogCardSingle key={article.id} article={article} />
                    ))
                    .slice(0, 1)}
                  {/* Show All Button */}
                </div>
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {displayedNews.map((article) => (
                      <BlogCard key={article.id} article={article} />
                    ))}
                  </div>
                  {/* Read More Button */}
                  <div className="mt-8">
                    <a
                      href={`/berita/`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/btn"
                    >
                      Lihat Semua Berita
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
                  </div>
                  {/* Show All Button */}
                </div>
              </div>
              {/* Main Blog Cards */}
              <div className="flex flex-col w-full lg:w-1/4">
                {/* Sidebar */}
                <div className="mb-4">
                  <SidebarPengumumanLanding articles={pengumaman} />
                </div>
                {/* Sidebar */}
                <SidebarInfografisLanding infografis={infografis} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default News;
