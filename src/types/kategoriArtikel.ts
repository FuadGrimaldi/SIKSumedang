export interface KategoriArtikel {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
}

export interface CreateKategoriArtikel {
  nama: string;
}
export interface UpdateKategoriArtikel {
  nama?: string;
}
