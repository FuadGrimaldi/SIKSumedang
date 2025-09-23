"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import RichTextEditor from "../Editor/RichTextEditor";
import { Plus, Edit3, Trash2, Search, Eye, Camera, Globe } from "lucide-react";

export enum ArticleStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export interface Article {
  id: number;
  user_id: number;
  kecamatan_id: number;
  desa_id: number | null;
  kategori_id: number | null;
  sub_kategori_id: number | null;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  waktu_kegiatan: string | null;
  lokasi_kegiatan: string | null;
  status: ArticleStatus;
  published_at: string;
  created_at: string;
  updated_at: string;
  profile_kecamatan?: { id: number; nama_kecamatan: string } | null;
  users?: { id: number; full_name: string } | null;
  desa?: { id: number; nama_desa: string } | null;
  kategori_article?: { id: number; nama: string } | null;
  sub_kategori_article?: { id: number; sub_nama: string } | null;
}

interface BeritaProps {
  kecamatanId: number;
  userId: number;
}

export default function BeritaManagerKec({ kecamatanId, userId }: BeritaProps) {
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Article | null>(null);
  const [viewData, setViewData] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown data
  const [desaList, setDesaList] = useState<any[]>([]);
  const [kategoriList, setKategoriList] = useState<any[]>([]);
  const [subKategoriList, setSubKategoriList] = useState<any[]>([]);
  const [selectedSubKategori, setSelectedSubKategori] = useState<string>("");
  function formatDatetimeLocal(dateString: string): string {
    // Accepts "YYYY-MM-DD HH:mm:ss" or ISO format, returns "YYYY-MM-DDTHH:mm"
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      // Try manual parsing for "YYYY-MM-DD HH:mm:ss"
      const [datePart, timePart] = dateString.split(" ");
      if (datePart && timePart) {
        return `${datePart}T${timePart.slice(0, 5)}`;
      }
      return "";
    }
    // ISO string: "YYYY-MM-DDTHH:mm:ss.sssZ"
    return d.toISOString().slice(0, 16);
  }

  /** ====================== FETCH DATA ====================== */
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/`);
      const data = await res.json();
      const filteredArticles = data.filter(
        (a: Article) =>
          a.kecamatan_id === kecamatanId &&
          (a.kategori_article?.nama.toLowerCase() === "berita" ||
            a.kategori_article?.nama.toLowerCase() === "pengumuman")
      );
      setArticles(filteredArticles || []);
      setFilteredArticles(filteredArticles || []);
    } catch {
      setArticles([]);
      setFilteredArticles([]);
      Swal.fire("Error", "Gagal memuat data artikel", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  const fetchDropdowns = useCallback(async () => {
    try {
      const [desaRes, kategoriRes] = await Promise.all([
        fetch(`/api/desa/subdomain/${kecamatanId}`),
        fetch(`/api/articles/kategori/subdomain/${kecamatanId}`),
      ]);
      setDesaList(await desaRes.json());
      const filterKategori = (await kategoriRes.json()).filter(
        (k: any) => k.kecamatan_id === kecamatanId && (k.id === 1 || k.id === 8)
      );
      setKategoriList(filterKategori);
    } catch {
      Swal.fire("Error", "Gagal memuat data dropdown", "error");
    }
  }, [kecamatanId]);

  useEffect(() => {
    fetchArticles();
    fetchDropdowns();
  }, [fetchArticles, fetchDropdowns]);

  /** ====================== HANDLERS ====================== */
  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setContent("");
    setFormOpen(true);
  };

  const handleOpenView = (article: Article) => {
    setViewData(article);
    setContent(article.content || "");
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditData(article);
    setContent(article.content || "");
    setViewData(null);
    setFormOpen(true);
    if (article.kategori_id) handleKategoriChange(article.kategori_id);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setViewData(null);
    setContent("");
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
        Swal.fire("Berhasil", "Artikel dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus artikel", "error");
      }
    } catch {
      Swal.fire("Error", "Terjadi kesalahan", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("content", content);
    formData.set("kecamatan_id", kecamatanId.toString());
    formData.set("user_id", userId.toString());

    if (!formData.get("slug")) {
      const title = (formData.get("title") as string) || "";
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      formData.set("slug", slug);
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/articles/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/articles", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        handleCloseForm();
        setContent("");
        fetchArticles();
        Swal.fire(
          "Berhasil",
          `Artikel ${editData ? "diperbarui" : "ditambahkan"}`,
          "success"
        );
      } else {
        const err = await res.json();
        Swal.fire("Error", err.error || "Terjadi kesalahan", "error");
      }
    } catch {
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(
          (a) =>
            a.title.toLowerCase().includes(value) ||
            a.lokasi_kegiatan?.toLowerCase().includes(value) ||
            a.users?.full_name.toLowerCase().includes(value)
        )
      );
    }
  };

  const handleKategoriChange = async (kategoriId: number) => {
    try {
      const res = await fetch(
        `/api/articles/kategori/sub-kategori/${kategoriId}`
      );
      setSubKategoriList(await res.json());
    } catch {
      setSubKategoriList([]);
    }
  };
  useEffect(() => {
    if (editData?.sub_kategori_id) {
      setSelectedSubKategori(editData.sub_kategori_id.toString());
    } else {
      setSelectedSubKategori("");
    }
  }, [editData]);

  /** ====================== RENDER ====================== */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Manajemen Berita dan Pengumuman
          </h2>
          <p className="text-indigo-100 mt-1">
            Kelola data berita dan pengumuman di kecamatan ini
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Berita
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari judul, lokasi, atau penulis..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white"
          />
        </div>
      </div>

      {/* Form Inline */}
      {formOpen && (
        <div className="bg-white rounded-lg shadow p-6">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Judul *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={viewData?.title || editData?.title || ""}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Konten *
                  </label>
                  <RichTextEditor
                    initialData={content}
                    onChange={(data) => setContent(data)}
                    readOnly={!!viewData || submitting}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tanggal & Waktu *
                  </label>
                  <input
                    type="datetime-local"
                    name="waktu_kegiatan"
                    defaultValue={formatDatetimeLocal(
                      viewData?.waktu_kegiatan || editData?.waktu_kegiatan || ""
                    )}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-white bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Lokasi Kegiatan
                  </label>
                  <input
                    type="text"
                    name="lokasi_kegiatan"
                    defaultValue={
                      viewData?.lokasi_kegiatan ||
                      editData?.lokasi_kegiatan ||
                      ""
                    }
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Desa
                  </label>
                  <select
                    name="desa_id"
                    defaultValue={viewData?.desa_id || editData?.desa_id || ""}
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                    required
                  >
                    <option value="">Pilih Desa</option>
                    {desaList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nama_desa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Kategori
                  </label>
                  <select
                    name="kategori_id"
                    defaultValue={
                      viewData?.kategori_id || editData?.kategori_id || ""
                    }
                    onChange={(e) =>
                      handleKategoriChange(parseInt(e.target.value))
                    }
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                    required
                  >
                    <option value="">Pilih Kategori</option>

                    {kategoriList.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  name="sub_kategori_id"
                  value={selectedSubKategori}
                  onChange={(e) => setSelectedSubKategori(e.target.value)}
                  disabled={!!viewData || submitting}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  required
                >
                  <option value="">Pilih Sub Kategori</option>
                  {subKategoriList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.sub_nama}
                    </option>
                  ))}
                </select>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Status *
                  </label>
                  <select
                    name="status"
                    defaultValue={viewData?.status || editData?.status || ""}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  >
                    <option value="">Pilih status</option>
                    <option value={ArticleStatus.PUBLISHED}>Published</option>
                    <option value={ArticleStatus.DRAFT}>Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    name="featured_image"
                    accept="image/*"
                    disabled={!!viewData || submitting}
                  />
                  {(viewData?.featured_image || editData?.featured_image) && (
                    <div className="mt-3">
                      <Image
                        src={
                          viewData?.featured_image ||
                          editData?.featured_image ||
                          "/assets/default/default.png"
                        }
                        alt="Featured Image"
                        width={120}
                        height={120}
                        unoptimized
                        className="rounded-lg border object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                disabled={submitting}
              >
                Batal
              </button>
              {!viewData && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">Memuat data...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Scroll horizontal di layar kecil */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-24 px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    No
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    Featured
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    Judul
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    Kategori
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    Penulis
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-left text-sm md:text-base">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-center text-sm md:text-base">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((a, index) => (
                  <tr
                    key={a.id}
                    className="hover:bg-gray-50 border-b last:border-none"
                  >
                    <td className="px-6 md:px-6 py-3 md:py-4 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700">
                      {a.featured_image ? (
                        <Image
                          src={a.featured_image}
                          width={64}
                          height={64}
                          unoptimized
                          alt={a.title}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">
                      {a.title}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">
                      {a.kategori_article?.nama || "-"}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">
                      {a.users?.full_name || "-"}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">
                      {a.status || "-"}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenView(a)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(a)}
                          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
