export interface KategoriArtikel {
  id: number;
  kecamatan_id: number;
  nama: string;
  created_at: string;
  updated_at: string;
  profile_kecamatan?: {
    id: number;
    nama_kecamatan: string;
  } | null;
}

export interface SubKategoriArtikel {
  id: number;
  kecamatan_id: number;
  kategori_id: number;
  sub_nama: string;
  created_at: string;
  updated_at: string;
  kategori_article?: {
    id: number;
    nama: string;
  } | null;
  profile_kecamatan?: {
    id: number;
    nama_kecamatan: string;
  } | null;
}

export interface CreateKategoriArtikel {
  kecamatan_id: number;
  nama: string;
}
export interface UpdateKategoriArtikel {
  kecamatan_id?: number;
  nama?: string;
}

export interface CreateSubKategoriArtikel {
  kecamatan_id: number;
  kategori_id: number;
  sub_nama: string;
}

export interface UpdateSubKategoriArtikel {
  kecamatan_id?: number;
  kategori_id?: number;
  sub_nama?: string;
}
