export type Infografis = {
  id: number;
  kecamatan_id: number;
  title: string;
  gambar_path: string;
  created_at: string;
  updated_at: string;
};
export type InfografisCreate = {
  kecamatan_id: number;
  title: string;
  gambar_path: string;
};
export type InfografisUpdate = {
  title?: string;
  gambar_path?: string;
};
