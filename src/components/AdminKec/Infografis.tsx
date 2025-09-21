"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, Camera, Search } from "lucide-react";

export type Infografis = {
  id: number;
  kecamatan_id: number;
  title: string;
  gambar_path: string;
  created_at: string;
  updated_at: string;
};

interface InfografisProps {
  kecamatanId: number;
}

export default function InfografisManagerKec({ kecamatanId }: InfografisProps) {
  const [infografisList, setInfografisList] = useState<Infografis[]>([]);
  const [filteredList, setFilteredList] = useState<Infografis[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Infografis | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInfografis = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/infografis/subdomain/${kecamatanId}`);
      const data = await res.json();
      setInfografisList(data || []);
      setFilteredList(data || []);
    } catch (error) {
      setInfografisList([]);
      setFilteredList([]);
      Swal.fire("Error", "Gagal memuat data infografis", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchInfografis();
  }, [fetchInfografis]);

  const handleOpenAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item: Infografis) => {
    setEditData(item);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
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
      const res = await fetch(`/api/infografis/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchInfografis();
        Swal.fire("Berhasil", "Infografis dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus data", "error");
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
    if (!formData.get("kecamatan_id")) {
      formData.set("kecamatan_id", kecamatanId.toString());
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/infografis/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/infografis", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        handleCloseForm();
        fetchInfografis();
        Swal.fire(
          "Berhasil",
          `Infografis ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredList(infografisList);
    } else {
      setFilteredList(
        infografisList.filter((i) => i.title.toLowerCase().includes(value))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            📊 Manajemen Infografis
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data infografis di kecamatan ini
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Infografis
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari judul infografis..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Judul Infografis *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editData?.title || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Gambar Infografis
                </label>
                <input
                  type="file"
                  name="gambar_path"
                  accept="image/*"
                  disabled={submitting}
                />
                {editData?.gambar_path && (
                  <div className="mt-3">
                    <Image
                      src={editData.gambar_path}
                      alt="Infografis"
                      width={120}
                      height={120}
                      className="rounded-lg border object-cover"
                    />
                  </div>
                )}
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
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                {submitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">Memuat data...</div>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Gambar</th>
                  <th className="px-6 py-4 text-left">Judul</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {i.gambar_path ? (
                        <Image
                          src={i.gambar_path}
                          width={64}
                          height={64}
                          alt={i.title}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{i.title}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(i)}
                          className="p-2 bg-yellow-500 text-white rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(i.id)}
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
