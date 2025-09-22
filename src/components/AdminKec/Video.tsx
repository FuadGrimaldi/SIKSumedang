"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Save,
  X,
  Eye,
  Video as VideoIcon,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { json } from "stream/consumers";
import { VideoCreate, VideoUpdate } from "@/types/video";

export interface Video {
  id: number;
  kecamatan_id: number;
  title: string;
  deskripsi: string;
  embed_url: string;
  kategori: string;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
  thumbnail?: string;
}

interface VideoProps {
  kecamatanId: number;
}

export default function VideoManagerKec({ kecamatanId }: VideoProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Video | null>(null);
  const [viewData, setViewData] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const getYouTubeId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);

      // short link youtu.be
      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }

      // standard watch?v=
      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.searchParams.get("v")) {
          return parsedUrl.searchParams.get("v");
        }

        // embed link
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1];
        }
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/videos/subdomain/${kecamatanId}`);
      const data = await res.json();
      data.forEach((video: any) => {
        const youtubeId = getYouTubeId(video.embed_url || video.url);
        if (youtubeId && !video.thumbnail) {
          video.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        }
      });
      setVideos(data || []);
      setFilteredVideos(data || []);
    } catch (error) {
      setVideos([]);
      setFilteredVideos([]);
      Swal.fire("Error", "Gagal memuat data video", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setFormOpen(true);
  };

  const handleOpenView = (video: Video) => {
    setViewData(video);
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (video: Video) => {
    setEditData(video);
    setViewData(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setViewData(null);
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
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVideos();
        Swal.fire("Berhasil", "Video dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus video", "error");
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
    const title = formData.get("title") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const embed_url = formData.get("embed_url") as string;
    const kategori = formData.get("kategori") as string;
    const uploaded_at = formData.get("uploaded_at")
      ? new Date(formData.get("uploaded_at") as string)
      : undefined;

    try {
      let res;

      if (editData) {
        const payload: VideoUpdate = {
          title,
          deskripsi,
          embed_url,
          kategori,
          uploaded_at,
        };
        res = await fetch(`/api/videos/${editData.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...payload,
            updated_at: new Date(),
          }),
        });
      } else {
        const payload: VideoCreate = {
          kecamatan_id: kecamatanId,
          title,
          deskripsi,
          embed_url,
          kategori,
          uploaded_at,
        };
        res = await fetch("/api/videos", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
          }),
        });
      }

      if (res.ok) {
        handleCloseForm();
        fetchVideos();
        Swal.fire(
          "Berhasil",
          `Video ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter(
          (v) =>
            v.title.toLowerCase().includes(value) ||
            v.kategori.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <VideoIcon className="w-6 h-6" />
            Manajemen Video
          </h2>
          <p className="text-purple-100 mt-1">Kelola data video kecamatan</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Video
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari judul atau kategori..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700 bg-white"
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
                    Judul Video *
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
                    Deskripsi *
                  </label>
                  <textarea
                    name="deskripsi"
                    rows={5}
                    defaultValue={
                      viewData?.deskripsi || editData?.deskripsi || ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Embed URL *
                  </label>
                  <input
                    type="url"
                    name="embed_url"
                    defaultValue={
                      viewData?.embed_url || editData?.embed_url || ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                  {viewData?.embed_url || editData?.embed_url ? (
                    <div className="mt-3">
                      <Image
                        src={
                          viewData?.thumbnail ||
                          editData?.thumbnail ||
                          "/assets/default/image-not-available.png"
                        }
                        width={64}
                        height={64}
                        alt={viewData?.title || editData?.title || "Thumbnail"}
                        unoptimized
                        className="rounded-lg"
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Kategori *
                  </label>
                  <input
                    type="text"
                    name="kategori"
                    defaultValue={
                      viewData?.kategori || editData?.kategori || ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tanggal Upload *
                  </label>
                  <input
                    type="datetime-local"
                    name="uploaded_at"
                    defaultValue={
                      viewData?.uploaded_at
                        ? new Date(viewData.uploaded_at)
                            .toISOString()
                            .slice(0, 16)
                        : editData?.uploaded_at
                        ? new Date(editData.uploaded_at)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-white bg-gray-700"
                  />
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg"
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
      ) : filteredVideos.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-24 px-6 py-4 text-gray-700 text-left">No</th>
                  <th className="px-6 py-4 text-gray-700 text-left">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-gray-700 text-left">Judul</th>
                  <th className="px-6 py-4 text-gray-700 text-left">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-gray-700 text-left">
                    Tanggal Upload
                  </th>
                  <th className="px-6 py-4 text-gray-700 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((v, index) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {v.embed_url ? (
                        <Image
                          src={
                            v.thumbnail ||
                            "/assets/default/image-not-available.png"
                          }
                          width={64}
                          height={64}
                          alt={v.title}
                          unoptimized
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{v.title}</td>
                    <td className="px-6 py-4 text-gray-700">{v.kategori}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(v.uploaded_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenView(v)}
                          className="p-2 bg-blue-500 text-white rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(v)}
                          className="p-2 bg-yellow-500 text-white rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="p-2 bg-red-600 text-white rounded-lg"
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
