"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  Share2,
  TimerIcon,
  CalendarCheck,
  ViewIcon,
  MapPinHouse,
} from "lucide-react";
import { Article } from "@/types/article";
import Swal from "sweetalert2";
import Breadcrumb from "../Breadchumb/Breadchumb";
import Link from "next/link";
import CommentSection from "./Comment";

interface ArtikelDetailsProps {
  title: string;
  nama_kecamatan?: string;
}

const BeritaDetailComp = ({ title }: ArtikelDetailsProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onBack = () => {
    window.history.back();
  };

  // Fetch artikel detail
  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/articles/detail/${title}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setArticle(data);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Gagal memuat Artikel");
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    if (title) {
      fetchArticle();
    }
  }, [title, fetchArticle]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatHijriDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Link Artikel disalin ke clipboard",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="relative bg-white">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: "450px",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Breadcrumb */}
          <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
            {/* Header */}
            <div className="relative mb-12">
              <h1 className="text-2xl lg:text-4xl font-bold text-white"></h1>
            </div>
          </div>
        </div>

        {/* Floating Content */}
        <div className="relative -mt-56 px-[31px] lg:px-[100px] py-2">
          <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
            <div className="w-full mx-auto">
              <div>
                <div className="min-h-screen bg-gray-50">
                  <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="animate-pulse">
                        <div className="h-64 bg-gray-300 rounded mb-6"></div>
                        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-400">
                  <div className="w-8 h-px bg-gray-600"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="relative bg-white">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: "450px",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Breadcrumb */}
          <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
            {/* Header */}
            <div className="relative mb-12">
              <h1 className="text-2xl lg:text-4xl font-bold text-white"></h1>
            </div>
          </div>
        </div>

        {/* Floating Content */}
        <div className="relative -mt-56 px-[31px] lg:px-[100px] py-2">
          <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
            <div className="w-full mx-auto">
              <div>
                <div className="text-center">
                  <div className="text-6xl mb-4">😞</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {error || "Artikel tidak ditemukan"}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Maaf, artikel yang Anda cari tidak tersedia.
                  </p>
                  <button
                    onClick={onBack}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Kembali
                  </button>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-400">
                  <div className="w-8 h-px bg-gray-600"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "450px",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Breadcrumb */}
        <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
          <Breadcrumb
            links={[
              { to: "/", label: "Home" },
              { to: "/artikel", label: "Artikel" },
              { to: "#", label: article.title },
            ]}
          />

          {/* Info Cards */}
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4 lg:mt-4 mt-0">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Penulis */}
                <div className="flex-1 lg:flex-none min-w-[200px] flex items-center lg:bg-white/20 bg-white/50 px-3 py-2 rounded-lg backdrop-blur-xl">
                  <MapPinHouse className="w-8 h-8 mr-2 text-gray-800 shrink-0" />
                  <div>
                    <h3 className="text-sm md:text-base font-bold lg:text-gray-700 text-gray-900">
                      {article.kategori_article?.nama || "Artikel"}
                    </h3>
                    <div className="lg:text-gray-700 text-gray-900 text-xs md:text-sm break-words">
                      {article.sub_kategori_article?.sub_nama ||
                        "Tidak diketahui"}
                    </div>
                  </div>
                </div>

                {/* Waktu Kegiatan */}
                {article.waktu_kegiatan && (
                  <div className="flex-1 lg:flex-none min-w-[200px] flex items-center bg-white/20 px-3 py-2 rounded-lg backdrop-blur-xl">
                    <Calendar className="w-8 h-8 mr-2 text-gray-800 shrink-0" />
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-gray-700">
                        Waktu Kegiatan
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-gray-700 text-xs md:text-sm">
                          {formatHijriDate(article.waktu_kegiatan)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap lg:block hidden"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative lg:-mt-64 -mt-56 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border py-12 px-3 lg:px-8">
          <div className="w-full mx-auto">
            <div>
              <div className="min-h-screen">
                <div className="container mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white overflow-hidden"
                  >
                    {/* Featured Image */}
                    {article.featured_image && (
                      <div className="relative w-full h-[300px] md:h-[600px]">
                        <Image
                          src={article.featured_image}
                          alt={article.title}
                          fill
                          className="object-cover w-full h-full rounded-xl"
                          style={{ objectPosition: "center" }}
                          priority
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    )}

                    <div className="px-4">
                      <h1 className="text-2xl lg:text-4xl font-bold text-black mt-6 mb-4">
                        {article.title}
                      </h1>
                    </div>

                    {/* Content */}
                    <div className="px-4">
                      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                        {parse(article.content)}
                      </div>

                      {/* Informasi Tambahan */}
                      {(article.waktu_kegiatan || article.lokasi_kegiatan) && (
                        <div className="mt-8 px-2 py-4 bg-gray-100 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Informasi Tambahan
                          </h3>

                          <div className="grid grid-rows-1 lg:grid-cols-4 gap-4">
                            {/* Detail Kegiatan */}
                            {article.waktu_kegiatan && (
                              <div className="bg-white p-4 rounded-lg shadow hover:bg-blue-50">
                                <div className="flex items-center">
                                  <CalendarCheck className="w-5 h-5 mr-2 text-blue-600" />
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      Detail Kegiatan
                                    </span>
                                    <div className="flex">
                                      <div className="text-gray-600 text-sm">
                                        {formatDate(article.waktu_kegiatan)}
                                      </div>
                                      <div className="text-gray-600 text-sm px-1">
                                        |
                                      </div>
                                      <div className="text-gray-600 text-sm">
                                        {formatTime(article.waktu_kegiatan)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Tanggal Publish */}
                            <div className="bg-white p-4 rounded-lg shadow hover:bg-blue-50">
                              <div className="flex items-center">
                                <TimerIcon className="w-5 h-5 mr-2 text-blue-600" />
                                <div>
                                  <span className="font-medium text-gray-700">
                                    Tanggal Publish
                                  </span>
                                  <div className="text-gray-600 text-sm">
                                    {formatDate(article.created_at)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Penulis */}
                            {article.users && (
                              <div className="bg-white p-4 rounded-lg shadow hover:bg-blue-50">
                                <div className="flex items-center">
                                  <User className="w-5 h-5 mr-2 text-blue-600" />
                                  <div>
                                    <span className="font-medium text-gray-700 text-left">
                                      Penulis
                                    </span>
                                    <div className="text-gray-600 text-sm">
                                      {article.users.full_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Lokasi Map */}
                            {article.kecamatan_id && (
                              <div className="bg-white p-4 rounded-lg shadow flex items-center hover:bg-blue-50 transition-colors">
                                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                <div>
                                  <span className="font-medium text-gray-700">
                                    Kecamatan{" "}
                                    {article.profile_kecamatan
                                      ?.nama_kecamatan ||
                                      "Kecamatan Tidak Diketahui"}
                                  </span>
                                  <br />
                                  <span className="text-gray-600 text-sm">
                                    Desa{" "}
                                    {article.desa?.nama_desa.toLowerCase() ||
                                      "Desa Tidak Diketahui"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <CommentSection
                      articleId={article.id}
                      kecamatanId={article.kecamatan_id}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-px bg-gray-600"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-px bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetailComp;
