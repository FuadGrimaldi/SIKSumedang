export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}
export enum Roles {
  admin_kecamatan = "admin_kecamatan",
  admin_kabupaten = "admin_kab",
  user = "masyarakat",
}
export interface User {
  id: number;
  kecamatan_id: number | null;
  nik: string;
  username: string;
  email: string;
  full_name: string;
  role: Roles;
  status: Status;
  profile_kecamatan?: {
    id: number;
    nama_kecamatan: string;
  } | null; // optional, for include
}

export interface UserCreate {
  kecamatan_id?: number | null; // optional, bisa null
  nik: string;
  full_name: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  status: Status; // optional, default "active"
}

export interface UserUpdate {
  kecamatan_id?: number | null; // optional, bisa null
  nik?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Roles;
  full_name?: string;
  status?: Status; // optional, default "active"
}
