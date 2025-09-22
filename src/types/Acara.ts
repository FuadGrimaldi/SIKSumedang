export enum StatusAcara {
  published = "published",
  draft = "draft",
}

export interface Acara {
  id: number;
  user_id: number;
  kecamatan_id: number;
  judul: string;
  slug: string;
  deskripsi: string;
  lokasi: string;
  waktu: string; // ISO date string, use Date if you prefer
  poster: string | null;
  penyelenggara: string;
  status_acara: StatusAcara;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  users?: {
    id: number;
    full_name: string;
    email: string;
  } | null; // Optional user relation
  profile_kecamatan?: {
    id: number;
    nama_kecamatan: string;
  } | null; // Optional kecamatan relation
}

export interface CreateAcaraData {
  user_id: number;
  kecamatan_id: number;
  judul: string;
  slug: string;
  deskripsi: string;
  lokasi: string;
  waktu: string; // ISO date string
  poster?: string | null;
  penyelenggara: string;
  status_acara?: StatusAcara; // default to Pending if not provided
}
export interface UpdateAcaraData {
  user_id?: number;
  kecamatan_id?: number;
  judul?: string;
  slug?: string;
  deskripsi?: string;
  lokasi?: string;
  waktu?: string; // ISO date string
  poster?: string | null;
  penyelenggara?: string;
  status_acara?: StatusAcara; // default to Pending if not provided
}
