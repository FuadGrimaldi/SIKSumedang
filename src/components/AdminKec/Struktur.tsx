"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
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
  View,
} from "lucide-react";

type Official = {
  id: number;
  kecamatan_id: number;
  name: string;
  position: string;
  photo?: string;
  profile_desa?: {
    nama_desa: string;
  };
};

interface officialProps {
  kecamatanId: number;
}

export default function OfficialManagerKec({ kecamatanId }: officialProps) {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [filteredOfficials, setFilteredOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Official | null>(null);
  const [viewData, setViewData] = useState<Official | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);

  //   const fetchDesaList = useCallback(async () => {
  //     try {
  //       const res = await fetch("/api/desa");
  //       const data = await res.json();
  //       setDesaList(data.data || []);
  //     } catch (error) {
  //       setDesaList([]);
  //       Swal.fire("Error", "Gagal memuat data desa", "error");
  //     }
  //   }, []);

  const fetchOfficials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/officials/subdomain/" + kecamatanId);
      const data = await res.json();
      setOfficials(data || []);
      setFilteredOfficials(data || []);
    } catch (error) {
      setOfficials([]);
      setFilteredOfficials([]);
      Swal.fire("Error", "Gagal memuat data officials", "error");
    }
    setLoading(false);
  }, [kecamatanId]);

  useEffect(() => {
    fetchOfficials();
    // fetchDesaList();
  }, [fetchOfficials]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setFormOpen(true);
  };

  const handleOpenView = (official: Official) => {
    setViewData(official);
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (official: Official) => {
    setEditData(official);
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
      const res = await fetch(`/api/officials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOfficials();
        Swal.fire("Berhasil", "Official dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus official", "error");
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
        res = await fetch(`/api/officials/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/officials", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        handleCloseForm();
        fetchOfficials();
        Swal.fire(
          "Berhasil",
          `Official ${editData ? "diperbarui" : "ditambahkan"}`,
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
      setFilteredOfficials(officials);
    } else {
      setFilteredOfficials(
        officials.filter(
          (o) =>
            o.name.toLowerCase().includes(value) ||
            o.position.toLowerCase().includes(value) ||
            o.profile_desa?.nama_desa.toLowerCase().includes(value)
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
            <Globe className="w-6 h-6" />
            Manajemen Officials
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data pejabat kecamatan di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah Official
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama, jabatan, atau desa..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white  text-gray-800"
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
                    Nama Official *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={viewData?.name || editData?.name || ""}
                    required
                    disabled={!!viewData || submitting}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Jabatan *
                  </label>
                  <input
                    type="text"
                    name="position"
                    defaultValue={
                      viewData?.position || editData?.position || ""
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
                    Foto
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    disabled={!!viewData || submitting}
                  />
                  {(viewData?.photo || editData?.photo) && (
                    <div className="mt-3">
                      <Image
                        src={
                          viewData?.photo ||
                          editData?.photo ||
                          "/assets/default/default.png"
                        }
                        alt="Foto Official"
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
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
      ) : filteredOfficials.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-24 px-6 py-4 text-gray-700 text-left">No</th>
                <th className="px-6 py-4 text-gray-700 text-left">Foto</th>
                <th className="px-6 py-4 text-gray-700 text-left">Nama</th>
                <th className="px-6 py-4 text-gray-700 text-left">Jabatan</th>
                <th className="px-6 py-4 text-gray-700 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficials.map((o, index) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {o.photo ? (
                      <Image
                        src={o.photo}
                        width={64}
                        height={64}
                        alt={o.name}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{o.name}</td>
                  <td className="px-6 py-4 text-gray-700">{o.position}</td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenView(o)}
                        className="p-2 bg-green-500 text-white rounded-lg"
                      >
                        <View className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(o)}
                        className="p-2 bg-yellow-500 text-white rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
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
      )}
    </div>
  );
}
