export interface KategoriArtikel {
  id: number;
  kecamatan_id: number;
  nama: string;
  created_at: string;
  updated_at: string;
}

export interface SubKategoriArtikel {
  id: number;
  kecamatan_id: number;
  kategori_id: number;
  nama_sub: string;
  created_at: string;
  updated_at: string;
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
  nama_sub: string;
}

export interface UpdateSubKategoriArtikel {
  kecamatan_id?: number;
  kategori_id?: number;
  nama_sub?: string;
}
