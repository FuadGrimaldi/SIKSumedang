// Enums

export enum ArticleStatus {
  published = "published",
  draft = "draft",
}

// Main Article interface
export interface Article {
  id: number;
  user_id: number;
  kecamatan_id: number;
  desa_id: number | null; // nullable for subdomain
  kategori_id: number | null; // nullable if no category
  sub_kategori_id: number | null; // nullable if no sub-category
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  dokumen_terkait_path: string | null;
  waktu_kegiatan: string | null; // ISO date string
  lokasi_kegiatan: string | null;
  status: ArticleStatus; // pakai enum
  published_at: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null; // optional, for include
  users?: {
    id: number;
    full_name: string;
  } | null; // optional, for include
  desa?: {
    id: number;
    nama_desa: string;
  };
  kategori_article?: {
    id: number;
    nama: string;
  } | null; // optional, for include
  sub_kategori_article?: {
    id: number;
    sub_nama: string;
  } | null; // optional, for include
}

// Create
export interface ArticleCreate {
  user_id: number;
  kecamatan_id: number;
  desa_id?: number | null; // nullable for subdomain
  kategori_id?: number | null; // nullable if no category
  sub_kategori_id?: number | null; // nullable if no sub-category
  title: string;
  slug: string;
  content: string;
  featured_image?: string | null;
  dokumen_terkait_path?: string | null;
  waktu_kegiatan?: string | null;
  lokasi_kegiatan?: string | null;
  status?: ArticleStatus; // enum
  published_at: string; // ISO date string
}

// Update
export interface ArticleUpdate {
  desa_id?: number | null; // nullable for subdomain
  kategori_id?: number | null; // nullable if no category
  sub_kategori_id?: number | null; // nullable if no sub-category
  title?: string;
  slug?: string;
  content?: string;
  featured_image?: string | null;
  dokumen_terkait_path?: string | null;
  waktu_kegiatan?: string | null; // ISO date string
  lokasi_kegiatan?: string | null;
  status?: ArticleStatus;
  published_at?: string; // ISO date string
}
