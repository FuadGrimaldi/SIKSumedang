export interface Desa {
  id: number;
  kecamatan_id: number;
  nama_desa: string;
  created_at: string;
  updated_at: string;
}
export interface CreateDesa {
  nama_desa: string;
  kecamatan_id: number;
}
export interface UpdateDesa {
  nama_desa?: string;
  kecamatan_id?: number;
}
