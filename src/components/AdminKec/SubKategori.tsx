"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, Search, Layers } from "lucide-react";
import { SubKategoriArtikel } from "@/types/kategoriArtikel";
import { KategoriArtikel } from "@/types/kategoriArtikel";

interface SubKategoriProps {
  kecamatanId: number;
}

export default function SubKategoriManagerKec({
  kecamatanId,
}: SubKategoriProps) {
  const [subKategoris, setSubKategoris] = useState<SubKategoriArtikel[]>([]);
  const [filteredSubKategoris, setFilteredSubKategoris] = useState<
    SubKategoriArtikel[]
  >([]);
  const [kategoris, setKategoris] = useState<KategoriArtikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<SubKategoriArtikel | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch sub kategori
  const fetchSubKategoris = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/articles/kategori/sub-kategori/subdomain/${kecamatanId}`
      );
      const data = await res.json();
      setSubKategoris(data || []);
      setFilteredSubKategoris(data || []);
    } catch (error) {
      setSubKategoris([]);
      setFilteredSubKategoris([]);
      Swal.fire("Error", "Gagal memuat data sub kategori", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  // Fetch kategori untuk dropdown
  const fetchKategoris = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/articles/kategori/subdomain/${kecamatanId}`
      );
      const data = await res.json();
      setKategoris(data || []);
    } catch (error) {
      setKategoris([]);
    }
  }, [kecamatanId]);

  useEffect(() => {
    fetchSubKategoris();
    fetchKategoris();
  }, [fetchSubKategoris, fetchKategoris]);

  const handleOpenAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (sub: SubKategoriArtikel) => {
    setEditData(sub);
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
      const res = await fetch(`/api/articles/kategori/sub-kategori/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchSubKategoris();
        Swal.fire("Berhasil", "Sub kategori dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus sub kategori", "error");
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
      kategori_id: Number(formData.get("kategori_id")),
      sub_nama: formData.get("sub_nama") as string,
    };

    try {
      let res;
      if (editData) {
        res = await fetch(
          `/api/articles/kategori/sub-kategori/${editData.id}`,
          {
            method: "PUT",
            body: JSON.stringify({ ...payload, updated_at: new Date() }),
          }
        );
      } else {
        res = await fetch("/api/articles/kategori/sub-kategori", {
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
        fetchSubKategoris();
        Swal.fire(
          "Berhasil",
          `Sub kategori ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredSubKategoris(subKategoris);
    } else {
      setFilteredSubKategoris(
        subKategoris.filter((s) => s.sub_nama.toLowerCase().includes(value))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6" />
            Manajemen Sub Kategori
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data sub kategori artikel
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Sub Kategori
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari sub kategori..."
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Nama Sub Kategori *
                </label>
                <input
                  type="text"
                  name="sub_nama"
                  defaultValue={editData?.sub_nama || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Kategori *
                </label>
                <select
                  name="kategori_id"
                  defaultValue={editData?.kategori_id || ""}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategoris.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
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
      ) : filteredSubKategoris.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Nama Sub Kategori</th>
                  <th className="px-6 py-4 text-left">Kategori</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubKategoris.map((s, index) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{s.sub_nama}</td>
                    <td className="px-6 py-4">
                      {kategoris.find((k) => k.id === s.kategori_id)?.nama ||
                        "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-2 bg-yellow-500 text-white rounded-lg flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
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
