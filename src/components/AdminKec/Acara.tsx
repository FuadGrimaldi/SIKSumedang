"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import RichTextEditor from "../Editor/RichTextEditor";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Search,
  Save,
  X,
  Eye,
} from "lucide-react";

export interface Acara {
  id: number;
  user_id: number;
  kecamatan_id: number;
  judul: string;
  slug: string;
  deskripsi: string;
  lokasi: string;
  waktu: string;
  poster: string | null;
  penyelenggara: string;
  status_acara: string;
  created_at: string;
  updated_at: string;
  users?: {
    id: number;
    full_name: string;
    email: string;
  } | null;
  kecamatan?: {
    id: number;
    nama_kecamatan: string;
  } | null;
}

interface AcaraProps {
  kecamatanId: number;
  userId: number;
}

export default function AcaraManagerKec({ kecamatanId, userId }: AcaraProps) {
  const [content, setContent] = useState(""); // For RichTextEditor

  const [acaras, setAcaras] = useState<Acara[]>([]);
  const [filteredAcaras, setFilteredAcaras] = useState<Acara[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Acara | null>(null);
  const [viewData, setViewData] = useState<Acara | null>(null);
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

  const fetchAcaras = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/acara/subdomain/all/${kecamatanId}`);
      const data = await res.json();
      setAcaras(data.items || []);
      setFilteredAcaras(data.items || []);
    } catch (error) {
      setAcaras([]);
      setFilteredAcaras([]);
      Swal.fire("Error", "Gagal memuat data acara", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchAcaras();
  }, [fetchAcaras]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setContent("");
    setFormOpen(true);
  };

  const handleOpenView = (acara: Acara) => {
    setViewData(acara);
    setContent(acara.deskripsi || ""); // Set content for RichTextEditor
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (acara: Acara) => {
    setEditData(acara);
    setContent(acara.deskripsi || ""); // Set content for RichTextEditor
    setViewData(null);
    setFormOpen(true);
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
      const res = await fetch(`/api/acara/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAcaras();
        Swal.fire("Berhasil", "Acara dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus acara", "error");
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
    formData.set("deskripsi", content); // Set deskripsi from RichTextEditor
    if (!formData.get("kecamatan_id")) {
      formData.set("kecamatan_id", kecamatanId.toString());
    }
    if (!formData.get("user_id")) {
      formData.set("user_id", userId.toString());
    }
    if (!formData.get("slug")) {
      const judul = (formData.get("judul") as string) || "";
      const slug = judul
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      formData.set("slug", slug);
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/acara/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/acara", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        handleCloseForm();
        setContent(""); // Reset content after submit
        fetchAcaras();
        Swal.fire(
          "Berhasil",
          `Acara ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredAcaras(acaras);
    } else {
      setFilteredAcaras(
        acaras.filter(
          (a) =>
            a.judul.toLowerCase().includes(value) ||
            a.lokasi.toLowerCase().includes(value) ||
            a.penyelenggara.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Manajemen Acara
          </h2>
          <p className="text-blue-100 mt-1">
            Kelola data acara di kecamatan ini
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Acara
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari judul, lokasi, atau penyelenggara..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  <label className="block mb-2 text-sm font-medium">
                    Judul Acara *
                  </label>
                  <input
                    type="text"
                    name="judul"
                    defaultValue={viewData?.judul || editData?.judul || ""}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Deskripsi *
                  </label>
                  <RichTextEditor
                    initialData={content}
                    onChange={(data) => setContent(data)}
                    readOnly={!!viewData || submitting}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Lokasi Maps *
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    defaultValue={viewData?.lokasi || editData?.lokasi || ""}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Tanggal & Waktu *
                  </label>
                  <input
                    type="datetime-local"
                    name="waktu"
                    defaultValue={formatDatetimeLocal(
                      viewData?.waktu || editData?.waktu || ""
                    )}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Penyelenggara *
                  </label>
                  <input
                    type="text"
                    name="penyelenggara"
                    defaultValue={
                      viewData?.penyelenggara || editData?.penyelenggara || ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Status *
                  </label>
                  <select
                    name="status_acara"
                    defaultValue={
                      viewData?.status_acara || editData?.status_acara || ""
                    }
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Pilih status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Poster
                  </label>
                  <input
                    type="file"
                    name="poster"
                    accept="image/*"
                    disabled={!!viewData || submitting}
                  />
                  {(viewData?.poster || editData?.poster) && (
                    <div className="mt-3">
                      <Image
                        src={
                          viewData?.poster ||
                          editData?.poster ||
                          "/assets/default/default.png"
                        }
                        alt="Poster Acara"
                        width={120}
                        height={120}
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
      ) : filteredAcaras.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Poster</th>
                  <th className="px-6 py-4 text-left">Judul</th>
                  <th className="px-6 py-4 text-left">tanggal acara</th>
                  <th className="px-6 py-4 text-left">Penyelenggara</th>
                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAcaras.map((a, index) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {a.poster ? (
                        <Image
                          src={a.poster}
                          width={64}
                          height={64}
                          alt={a.judul}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{a.judul}</td>
                    <td className="px-6 py-4">
                      {formatDatetimeLocal(a.waktu)}
                    </td>
                    <td className="px-6 py-4">{a.penyelenggara}</td>
                    <td className="px-6 py-4">{a.status_acara}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenView(a)}
                          className="p-2 bg-blue-500 text-white rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(a)}
                          className="p-2 bg-yellow-500 text-white rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
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
