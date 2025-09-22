"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import { User, Status, Roles } from "@/types/user";

export default function UserManagerKab() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [kecamatan, setKecamatan] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/`);
      const data = await res.json();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      setUsers([]);
      setFilteredUsers([]);
      Swal.fire("Error", "Gagal memuat data user", "error");
    }
    setLoading(false);
  }, []);

  const fetchKecamatan = useCallback(async () => {
    try {
      const res = await fetch(`/api/kecamatan/`);
      const data = await res.json();
      setKecamatan(data || []);
    } catch (error) {
      setKecamatan([]);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchKecamatan();
  }, [fetchUsers, fetchKecamatan]);

  const handleOpenAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditData(user);
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
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchUsers();
        Swal.fire("Berhasil", "User dihapus", "success");
      } else {
        Swal.fire("Error", "Gagal menghapus user", "error");
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
      kecamatan_id: Number(formData.get("kecamatan_id")),
      nik: formData.get("nik") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      full_name: formData.get("full_name") as string,
      role: formData.get("role") as Roles,
      status: formData.get("status") as Status,
    };

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/users/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, updated_at: new Date() }),
        });
      } else {
        res = await fetch("/api/users/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
          }),
        });
      }

      // Cek jika response bukan ok, ambil pesan error dari response body
      if (!res.ok) {
        let errMsg = "Terjadi kesalahan";
        try {
          const err = await res.json();
          errMsg = err.error || err.message || errMsg;
        } catch {
          // jika response bukan json, gunakan pesan default
        }
        Swal.fire("Error", errMsg, "error");
        return;
      }

      handleCloseForm();
      fetchUsers();
      Swal.fire(
        "Berhasil",
        `User ${editData ? "diperbarui" : "ditambahkan"}`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan jaringan/server", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((u) => u.full_name.toLowerCase().includes(value))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            👤 Manajemen User Kecamatan
          </h2>
          <p className="text-blue-100 mt-1">Kelola user di kecamatan ini</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari user..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          />
        </div>
      </div>

      {/* Form Inline */}
      {formOpen && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Kecamatan *
              </label>
              <select
                name="kecamatan_id"
                defaultValue={editData?.kecamatan_id || ""}
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
              >
                <option value="">-- Pilih Kecamatan --</option>
                {kecamatan.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama_kecamatan}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                NIK *
              </label>
              <input
                type="text"
                name="nik"
                defaultValue={editData?.nik || ""}
                required
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username *
              </label>
              <input
                type="text"
                name="username"
                defaultValue={editData?.username || ""}
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
            {!editData && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue=""
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                />
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="full_name"
                defaultValue={editData?.full_name || ""}
                required
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                name="role"
                defaultValue={editData?.role || Roles.user}
                required
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
              >
                <option value={Roles.admin_kecamatan}>Admin Kecamatan</option>
                <option value={Roles.admin_kabupaten}>Admin Kabupaten</option>
                <option value={Roles.user}>Masyarakat</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status *
              </label>
              <select
                name="status"
                defaultValue={editData?.status || Status.pending}
                required
                disabled={submitting}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
              >
                <option value={Status.pending}>Pending</option>
                <option value={Status.approved}>Approved</option>
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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">Belum ada data</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-24 px-6 py-4 text-gray-700 text-left">No</th>
                  <th className="px-6 py-4 text-gray-700 text-left">NIK</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Nama</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Email</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Role</th>
                  <th className="px-6 py-4 text-gray-700 text-left">Status</th>
                  <th className="px-6 py-4 text-gray-700 text-left">
                    Kecamatan
                  </th>
                  <th className="px-6 py-4 text-gray-700 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{u.nik}</td>
                    <td className="px-6 py-4 text-gray-700">{u.full_name}</td>
                    <td className="px-6 py-4 text-gray-700">{u.email}</td>
                    <td className="px-6 py-4 text-gray-700">{u.role}</td>
                    <td className="px-6 py-4 text-gray-700">{u.status}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {u.profile_kecamatan?.nama_kecamatan}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-2 bg-yellow-500 text-white rounded-lg flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
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
