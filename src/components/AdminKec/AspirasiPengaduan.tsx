"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, Search, MessageSquare } from "lucide-react";
import {
  Status,
  PengaduanAspirasi,
  PengaduanAspirasiKategori,
} from "@/types/pengaduanAspirasi";

interface AspirasiPengaduanManagerKecProps {
  kecamatanId: number;
}

export default function AspirasiPengaduanManagerKec({
  kecamatanId,
}: AspirasiPengaduanManagerKecProps) {
  const [data, setData] = useState<PengaduanAspirasi[]>([]);
  const [filteredData, setFilteredData] = useState<PengaduanAspirasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<PengaduanAspirasi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/pengaduan-aspirasi/subdomain/${kecamatanId}`
      );
      const result = await res.json();
      setData(result || []);
      setFilteredData(result || []);
    } catch (error) {
      setData([]);
      setFilteredData([]);
      Swal.fire("Error", "Gagal memuat data pengaduan/aspirasi", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item: PengaduanAspirasi) => {
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
      const res = await fetch(`/api/pengaduan-aspirasi/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
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

    const payload = {
      kecamatan_id: kecamatanId,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      no_telp: formData.get("no_telp") as string,
      pesan: formData.get("pesan") as string,
      kategori: formData.get("kategori") as PengaduanAspirasiKategori,
      status: formData.get("status") as Status,
    };

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/pengaduan-aspirasi/${editData.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...payload, updated_at: new Date() }),
        });
      } else {
        res = await fetch("/api/pengaduan-aspirasi", {
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
        fetchData();
        Swal.fire(
          "Berhasil",
          `Data ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (d) =>
            d.name.toLowerCase().includes(value) ||
            d.email.toLowerCase().includes(value) ||
            d.pesan.toLowerCase().includes(value)
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Manajemen Pengaduan & Aspirasi
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data pengaduan dan aspirasi
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2 hidden"
        >
          <Plus className="w-5 h-5" /> Tambah Data
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama, email atau pesan..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Form Inline */}
      {formOpen && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 hidden">
              <div>
                <label className="block mb-2 text-sm font-medium">Nama *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editData?.name || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editData?.email || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  No. Telepon
                </label>
                <input
                  type="text"
                  name="no_telp"
                  defaultValue={editData?.no_telp || ""}
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Kategori *
                </label>
                <select
                  name="kategori"
                  defaultValue={
                    editData?.kategori || PengaduanAspirasiKategori.pengaduan
                  }
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value={PengaduanAspirasiKategori.pengaduan}>
                    Pengaduan
                  </option>
                  <option value={PengaduanAspirasiKategori.aspirasi}>
                    Aspirasi
                  </option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Pesan *
                </label>
                <textarea
                  name="pesan"
                  rows={5}
                  defaultValue={editData?.pesan || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Status *</label>
              <select
                name="status"
                defaultValue={editData?.status || Status.pending}
                required
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value={Status.approved}>Approved</option>
                <option value={Status.pending}>Pending</option>
                <option value={Status.rejected}>Rejected</option>
              </select>
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
      ) : filteredData.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Nama</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Pesan</th>
                  <th className="px-6 py-4 text-left">Kategori</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((d, index) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{d.name}</td>
                    <td className="px-6 py-4">{d.email}</td>
                    <td className="px-6 py-4">{d.pesan}</td>
                    <td className="px-6 py-4 capitalize">{d.kategori}</td>
                    <td className="px-6 py-4 capitalize">{d.status}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="p-2 bg-yellow-500 text-white rounded-lg flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
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
