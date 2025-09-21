export interface FrontImage {
  id: number;
  kecamatan_id: number;
  title: string;
  lokasi: string;
  gambar_path: string;
  created_at: string;
  updated_at: string;
}

export interface FrontImageCreate {
  kecamatan_id: number;
  title: string;
  lokasi: string;
  gambar_path: string;
}
export interface FrontImageUpdate {
  kecamatan_id?: number;
  title?: string;
  lokasi?: string;
  gambar_path?: string;
}
