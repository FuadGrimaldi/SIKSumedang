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
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { Kecamatan, CreateKecamatan, UpdateKecamatan } from "@/types/kecamatan";

export default function ProfileKabManager() {
  const [kecamatanList, setKecamatanList] = useState<Kecamatan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchKecamatan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kecamatan");
      const data = await res.json();
      if (Array.isArray(data)) {
        setKecamatanList(data);
      } else {
        setKecamatanList([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire("Error", "Gagal memuat data kecamatan", "error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchKecamatan();
  }, [fetchKecamatan]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id?: number
  ) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const url = id ? `/api/kecamatan/${id}` : "/api/kecamatan";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        await fetchKecamatan();
        setEditingId(null);
        setAdding(false);
        Swal.fire("Berhasil", "Data berhasil disimpan", "success");
      } else {
        const errorData = await res.json();
        Swal.fire("Error", errorData.error || "Gagal menyimpan data", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Hapus Kecamatan?",
      text: "Data akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/kecamatan/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchKecamatan();
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus data", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus data", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Manajemen Kecamatan
          </h2>
          <p className="text-green-100 mt-1">
            Kelola daftar kecamatan di kabupaten Anda
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="px-6 py-3 bg-white text-green-600 rounded-lg shadow flex items-center gap-2 hover:bg-gray-50"
        >
          <Plus className="w-5 h-5" /> Tambah Kecamatan
        </button>
      </div>

      {loading ? (
        <p className="text-center">Memuat data...</p>
      ) : (
        <div className="space-y-6">
          <div className="space-y-6">
            {/* Tambah Form */}
            {adding && (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="bg-white rounded-lg shadow p-6"
                encType="multipart/form-data"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Tambah Kecamatan
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <label className="text-gray-700">
                    Subdomain
                    <input
                      type="text"
                      name="subdomain"
                      placeholder="Subdomain"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="text-gray-700">
                    Nama Kecamatan
                    <input
                      type="text"
                      name="nama_kecamatan"
                      placeholder="Nama Kecamatan"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Alamat
                    <textarea
                      name="alamat"
                      placeholder="Alamat"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="text-gray-700">
                    Telepon
                    <input
                      type="tel"
                      name="telepon"
                      placeholder="Telepon"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="text-gray-700">
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="text-gray-700">
                    Website
                    <input
                      type="url"
                      name="website"
                      placeholder="Website"
                      className="border rounded p-2 w-full bg-white text-black"
                    />
                  </label>
                  <label className="text-gray-700">
                    Foto Kantor
                    <input type="file" name="foto_kantor" accept="image/*" />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Visi
                    <textarea
                      name="visi"
                      placeholder="Visi"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Misi
                    <textarea
                      name="misi"
                      placeholder="Misi"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Sejarah
                    <textarea
                      name="sejarah"
                      placeholder="Sejarah"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Deskripsi
                    <textarea
                      name="deskripsi"
                      placeholder="Deskripsi"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                  <label className="lg:col-span-2 text-gray-700">
                    Google Maps Embed URL
                    <input
                      type="url"
                      name="gmaps_embed_url"
                      placeholder="Gmaps Embed URL"
                      className="border rounded p-2 w-full bg-white text-black"
                      required
                    />
                  </label>
                </div>
                <div className="flex justify-end gap-3 mt-4 ">
                  <button
                    type="button"
                    onClick={() => setAdding(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    disabled={submitting}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    disabled={submitting}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}

            {/* List Kecamatan */}
            {kecamatanList.map((kec) => (
              <div
                key={kec.id}
                className="bg-white rounded-lg shadow p-6 space-y-4"
              >
                {editingId === kec.id ? (
                  <form
                    onSubmit={(e) => handleSubmit(e, kec.id)}
                    encType="multipart/form-data"
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <label className="text-gray-700">
                        Subdomain
                        <input
                          type="text"
                          name="subdomain"
                          defaultValue={kec.subdomain || ""}
                          placeholder="Subdomain"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="text-gray-700">
                        Nama Kecamatan
                        <input
                          type="text"
                          name="nama_kecamatan"
                          placeholder="Nama Kecamatan"
                          defaultValue={kec.nama_kecamatan || ""}
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Alamat
                        <textarea
                          name="alamat"
                          defaultValue={kec.alamat || ""}
                          placeholder="Alamat"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="text-gray-700">
                        Telepon
                        <input
                          type="tel"
                          name="telepon"
                          defaultValue={kec.telepon || ""}
                          placeholder="Telepon"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="text-gray-700">
                        Email
                        <input
                          type="email"
                          name="email"
                          defaultValue={kec.email || ""}
                          placeholder="Email"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="text-gray-700">
                        Website
                        <input
                          type="url"
                          name="website"
                          defaultValue={kec.website || ""}
                          placeholder="Website"
                          className="border rounded p-2 w-full bg-white text-black"
                        />
                      </label>
                      <label className="text-gray-700">
                        Foto Kantor
                        <input
                          type="file"
                          name="foto_kantor"
                          accept="image/*"
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Visi
                        <textarea
                          name="visi"
                          placeholder="Visi"
                          defaultValue={kec.visi || ""}
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Misi
                        <textarea
                          name="misi"
                          defaultValue={kec.misi || ""}
                          placeholder="Misi"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Sejarah
                        <textarea
                          name="sejarah"
                          placeholder="Sejarah"
                          defaultValue={kec.sejarah || ""}
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Deskripsi
                        <textarea
                          name="deskripsi"
                          defaultValue={kec.deskripsi || ""}
                          placeholder="Deskripsi"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                      <label className="lg:col-span-2 text-gray-700">
                        Google Maps Embed URL
                        <input
                          type="url"
                          name="gmaps_embed_url"
                          defaultValue={kec.gmaps_embed_url || ""}
                          placeholder="Gmaps Embed URL"
                          className="border rounded p-2 w-full bg-white text-black"
                          required
                        />
                      </label>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                        disabled={submitting}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        disabled={submitting}
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {kec.foto_kantor ? (
                          <Image
                            src={kec.foto_kantor}
                            alt="Foto Kantor"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border"
                            unoptimized
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg border">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-600">
                          {kec.nama_kecamatan}
                        </h4>
                        <p className="text-gray-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {kec.alamat}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" /> {kec.telepon}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> {kec.email}
                        </p>
                        {kec.website && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <a
                              href={kec.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {kec.website}
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setEditingId(kec.id)}
                          className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 flex items-center gap-1"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(kec.id)}
                          className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
