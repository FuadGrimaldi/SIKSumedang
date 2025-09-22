"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  FileText,
  Calendar,
  ImageIcon,
  Building,
  MapPin,
  VideoIcon,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Eye,
  Clock,
  ArrowRight,
} from "lucide-react";

// publikasi
import { Video } from "@/types/video";
import { Article } from "@/types/article";
import { Infografis } from "@/types/infografis";
import { Acara } from "@/types/Acara";
// profile kecamatan
import { Kecamatan } from "@/types/kecamatan";
// struktur
import { Official } from "@/types/official";
// kategori artikel
import { KategoriArtikel } from "@/types/kategoriArtikel";
// partisipasi publik
import {
  PengaduanAspirasi,
  PengaduanAspirasiKategori,
} from "@/types/pengaduanAspirasi";
import { Komentar } from "@/types/komentar";
import Link from "next/link";

interface Props {
  kecamatanId: number;
}

interface DashboardStats {
  totalVideos: number;
  totalArticles: number;
  totalacaras: number;
  totalInfografis: number;
  totalOfficials: number;
  totalPengaduan: number;
  totalKomentar: number;
  totalBerita: number;
  totalPengumuman: number;
  recentActivity: any[];
  popularContent: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
export default function Dashboard({ kecamatanId }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [berita, setBerita] = useState<Article[]>([]);
  const [pengumunan, setPengumuman] = useState<Article[]>([]);
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [officials, setOfficials] = useState<Official[]>([]);
  const [acara, setAcara] = useState<Acara[]>([]);

  const [pengaduanAspirasis, setPengaduanAspirasis] = useState<
    PengaduanAspirasi[]
  >([]);
  const [komentars, setKomentars] = useState<Komentar[]>([]);
  const [kecamatan, setKecamatan] = useState<Kecamatan | null>(null);
  const [kategori, setKategori] = useState<KategoriArtikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const processChartData = useCallback(() => {
    if (!articles.length || !kategori.length) return;

    // Menghitung jumlah artikel per kategori, kecuali kategori_id 1 dan 8
    const categoryCount = {};

    // Inisialisasi semua kategori dengan 0, kecuali kategori_id 1 dan 8
    kategori.forEach((cat) => {
      if (cat.id !== 1 && cat.id !== 8) {
        categoryCount[cat.id] = {
          name: cat.nama,
          value: 0,
          id: cat.id,
        };
      }
    });

    // Menghitung artikel berdasarkan kategori_id
    articles.forEach((article) => {
      if (article.kategori_id && categoryCount[article.kategori_id]) {
        categoryCount[article.kategori_id].value++;
      }
    });

    // Convert ke array dan tambahkan warna
    const chartArray = Object.values(categoryCount).map((item, index) => ({
      ...(item as { name: string; value: number; id: number }),
      color: COLORS[index % COLORS.length],
    }));

    setChartData(chartArray);
  }, [articles, kategori]);

  useEffect(() => {
    processChartData();
  }, [articles, kategori, processChartData]);

  // Fetch functions
  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch(`/api/videos/subdomain/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch videos error:", error);
      setVideos([]);
    }
  }, [kecamatanId]);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/articles/subdomain/all/${kecamatanId}?page=1&limit=1000`
      );

      const res2 = await fetch(
        `/api/articles/kategori/subdomain/${kecamatanId}`
      );
      if (res.ok) {
        const data = await res.json();

        setArticles(Array.isArray(data.items) ? data.items : []);
      }
      if (res2.ok) {
        const data2 = await res2.json();
        setKategori(Array.isArray(data2) ? data2 : []);
      }
    } catch (error) {
      console.error("Fetch articles error:", error);
      setArticles([]);
      setKategori([]);
      setChartData([]);
    }
  }, [kecamatanId]);

  const fetchBeritaPengumuman = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/articles/berita/subdomain/${kecamatanId}?page=1&limit=100&kategori_id=1`
      );
      const res2 = await fetch(
        `/api/articles/berita/subdomain/${kecamatanId}?page=1&limit=100&kategori_id=8`
      );
      if (res.ok) {
        const data = await res.json();
        setBerita(Array.isArray(data.items) ? data.items : []);
      }
      if (res2.ok) {
        const data2 = await res2.json();
        setPengumuman(Array.isArray(data2.items) ? data2.items : []);
      }
    } catch (error) {
      console.error("Fetch articles error:", error);
      setBerita([]);
      setPengumuman([]);
    }
  }, [kecamatanId]);

  const fetchAcara = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/acara/subdomain/${kecamatanId}?page=1&limit=100`
      );
      if (res.ok) {
        const data = await res.json();
        setAcara(Array.isArray(data.items) ? data.items : []);
      }
    } catch (error) {
      console.error("Fetch acaras error:", error);
      setAcara([]);
    }
  }, [kecamatanId]);

  const fetchInfografis = useCallback(async () => {
    try {
      const res = await fetch(`/api/infografis/subdomain/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setInfografis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch infografis error:", error);
      setInfografis([]);
    }
  }, [kecamatanId]);

  const fetchOfficials = useCallback(async () => {
    try {
      const res = await fetch(`/api/officials/subdomain/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setOfficials(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch officials error:", error);
      setOfficials([]);
    }
  }, [kecamatanId]);

  const fetchPengaduanAspirasi = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/pengaduan-aspirasi/subdomain/${kecamatanId}`
      );
      if (res.ok) {
        const data = await res.json();
        setPengaduanAspirasis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch pengaduan aspirasi error:", error);
      setPengaduanAspirasis([]);
    }
  }, [kecamatanId]);

  const fetchKomentar = useCallback(async () => {
    try {
      const res = await fetch(`/api/komentar/subdomain/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setKomentars(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch komentar error:", error);
      setKomentars([]);
    }
  }, [kecamatanId]);

  const fetchKecamatan = useCallback(async () => {
    try {
      const res = await fetch(`/api/kecamatan/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setKecamatan(data);
      }
    } catch (error) {
      console.error("Fetch kecamatan error:", error);
      setKecamatan(null);
    }
  }, [kecamatanId]);

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchVideos(),
          fetchArticles(),
          fetchAcara(),
          fetchInfografis(),
          fetchOfficials(),
          fetchPengaduanAspirasi(),
          fetchBeritaPengumuman(),
          fetchKomentar(),
          fetchKecamatan(),
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (kecamatanId) {
      fetchAllData();
    }
  }, [
    kecamatanId,
    fetchVideos,
    fetchArticles,
    fetchAcara,
    fetchInfografis,
    fetchOfficials,
    fetchBeritaPengumuman,
    fetchPengaduanAspirasi,
    fetchKomentar,
    fetchKecamatan,
  ]);

  // Calculate dashboard statistics
  const getDashboardStats = (): DashboardStats => {
    const recentActivity = [
      ...articles.slice(0, 3).map((item) => ({
        type: "Article",
        title: item.title,
        date: item.created_at,
        icon: FileText,
      })),
      ...acara.slice(0, 2).map((item) => ({
        type: "acara",
        judul: item.judul,
        date: item.created_at,
        icon: Calendar,
      })),
      ...pengaduanAspirasis.slice(0, 2).map((item) => ({
        type: "Pengaduan",
        title: `Pengaduan dari ${item.name}`,
        date: item.created_at,
        icon: AlertCircle,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalVideos: videos.length,
      totalArticles: articles.length,
      totalacaras: acara.length,
      totalInfografis: infografis.length,
      totalOfficials: officials.length,
      totalPengaduan: pengaduanAspirasis.length,
      totalKomentar: komentars.length,
      totalBerita: berita.length,
      totalPengumuman: pengumunan.length,
      recentActivity,
      popularContent: articles.slice(0, 5),
    };
  };

  const stats = getDashboardStats();

  // Chart data
  const contentData = [
    { name: "Artikel", value: stats.totalArticles, color: "#0088FE" },
    { name: "Video", value: stats.totalVideos, color: "#00C49F" },
    { name: "acara", value: stats.totalacaras, color: "#FFBB28" },
    { name: "Infografis", value: stats.totalInfografis, color: "#FF8042" },
  ];

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard kecamatan
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard kecamatan {kecamatan?.nama_kecamatan}
          </h2>
          <p className="text-gray-600">
            kecamatan {kecamatan?.nama_kecamatan || "Loading..."} - Ringkasan
            Data dan Statistik
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("id-ID")}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Content Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Artikel</p>
              <p className="text-3xl font-bold">{stats.totalArticles}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Berita</p>
              <p className="text-3xl font-bold">{stats.totalBerita}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Pengumuman</p>
              <p className="text-3xl font-bold">{stats.totalPengumuman}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Video</p>
              <p className="text-3xl font-bold">{stats.totalVideos}</p>
            </div>
            <VideoIcon className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Total acara</p>
              <p className="text-3xl font-bold">{stats.totalacaras}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Infografis</p>
              <p className="text-3xl font-bold">{stats.totalInfografis}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        {/* Organization Stats */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Aparat kecamatan</p>
              <p className="text-3xl font-bold">{stats.totalOfficials}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Pengaduan</p>
              <p className="text-3xl font-bold">{stats.totalPengaduan}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Distribusi Konten</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Organization Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Distribusi Artikel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, "Jumlah Artikel"]}
                labelFormatter={(label) => `Kategori: ${label}`}
              />
              <Bar dataKey="value" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-4">
            {chartData.map((entry, index) => (
              <div key={entry.id} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Aktivitas Terbaru
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <IconComponent className="w-5 h-5 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {activity.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Pintasan Cepat
          </h3>
          <div className="space-y-4">
            <Link
              href={"/adminkec/acara"}
              className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <span className="text-sm font-medium">Buat Acara</span>
              <span className="text-lg font-bold text-yellow-600">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href={"/adminkec/artikel"}
              className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <span className="text-sm font-medium">Buat Artikel</span>
              <span className="text-lg font-bold text-yellow-600">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href={"/adminkec/berita"}
              className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <span className="text-sm font-medium">Buat Berita</span>
              <span className="text-lg font-bold text-yellow-600">
                <ArrowRight />
              </span>
            </Link>
            <Link
              href={"/adminkec/aspirasi-pengaduan"}
              className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <span className="text-sm font-medium">
                Cek Pengaduan dan Aspirasi
              </span>
              <span className="text-lg font-bold text-yellow-600">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Publikasi</h4>
          <p className="text-3xl font-bold">
            {stats.totalArticles +
              stats.totalVideos +
              stats.totalacaras +
              stats.totalInfografis}
          </p>
          <p className="text-cyan-100 text-sm">
            Artikel, Video, acara & Infografis
          </p>
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Partisipasi</h4>
          <p className="text-3xl font-bold">
            {stats.totalPengaduan + stats.totalKomentar}
          </p>
          <p className="text-violet-100 text-sm">Pengaduan & Komentar</p>
        </div>
      </div>
    </div>
  );
}
