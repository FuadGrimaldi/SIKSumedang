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
  MessageSquare,
} from "lucide-react";
import { Status, Komentar } from "@/types/komentar";

interface KomentarProps {
  kecamatanId: number;
}

export default function KomentarManagerKec({ kecamatanId }: KomentarProps) {
  const [komentars, setKomentars] = useState<Komentar[]>([]);
  const [filteredKomentars, setFilteredKomentars] = useState<Komentar[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Komentar | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchKomentars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/komentar/subdomain/${kecamatanId}`);
      const data = await res.json();
      setKomentars(data || []);
      setFilteredKomentars(data || []);
    } catch (error) {
      setKomentars([]);
      setFilteredKomentars([]);
      Swal.fire("Error", "Gagal memuat data komentar", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchKomentars();
  }, [fetchKomentars]);

  const handleOpenAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (komentar: Komentar) => {
    setEditData(komentar);
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
      const res = await fetch(`/api/komentar/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchKomentars();
        Swal.fire("Berhasil", "Komentar dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus komentar", "error");
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
      article_id: Number(formData.get("article_id")),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      no_telp: formData.get("no_telp") as string,
      pesan: formData.get("pesan") as string,
      status: formData.get("status") as Status,
    };

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/komentar/${editData.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...payload, updated_at: new Date() }),
        });
      } else {
        res = await fetch("/api/komentar", {
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
        fetchKomentars();
        Swal.fire(
          "Berhasil",
          `Komentar ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredKomentars(komentars);
    } else {
      setFilteredKomentars(
        komentars.filter(
          (k) =>
            k.name.toLowerCase().includes(value) ||
            k.email.toLowerCase().includes(value) ||
            k.pesan.toLowerCase().includes(value)
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
            Manajemen Komentar
          </h2>
          <p className="text-green-100 mt-1">Kelola data komentar kecamatan</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2 hidden"
        >
          <Plus className="w-5 h-5" /> Tambah Komentar
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700 bg-white"
          />
        </div>
      </div>

      {/* Form Inline */}
      {formOpen && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4 hidden">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nama *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editData?.name || ""}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editData?.email || ""}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    No. Telepon
                  </label>
                  <input
                    type="text"
                    name="no_telp"
                    defaultValue={editData?.no_telp || ""}
                    disabled={submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  name="status"
                  defaultValue={editData?.status || Status.Pending}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                >
                  <option value={Status.Approved}>Approved</option>
                  <option value={Status.Pending}>Pending</option>
                  <option value={Status.Rejected}>Rejected</option>
                </select>
              </div>
              <div className="space-y-4 hidden">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pesan *
                  </label>
                  <textarea
                    name="pesan"
                    rows={5}
                    defaultValue={editData?.pesan || ""}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ID Artikel *
                  </label>
                  <input
                    type="number"
                    name="article_id"
                    defaultValue={editData?.article_id || ""}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
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
      ) : filteredKomentars.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-gray-700 text-left">No</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Nama</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Email</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Pesan</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Status</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Artikel</th>
                  <th className="px-6 py-4 text-gray-700 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredKomentars.map((k, index) => (
                  <tr key={k.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{k.name}</td>
                    <td className="px-6 py-4 text-gray-700">{k.email}</td>
                    <td className="px-6 py-4 text-gray-700">{k.pesan}</td>
                    <td className="px-6 py-4 text-gray-700 capitalize">
                      {k.status}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {k.articles?.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(k)}
                          className="p-2 bg-yellow-500 text-white rounded-lg flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Approved
                        </button>
                        <button
                          onClick={() => handleDelete(k.id)}
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
