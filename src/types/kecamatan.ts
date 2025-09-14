export interface Kecamatan {
  id: number;
  nama_kecamatan: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string | null;
  foto_kantor: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat: number | null;
  lng: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateKecamatan {
  nama_kecamatan: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string | null;
  foto_kantor: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat?: number | null;
  lng?: number | null;
}

export interface UpdateKecamatan {
  nama_kecamatan?: string;
  alamat?: string;
  telepon?: string;
  email?: string;
  website?: string | null;
  foto_kantor?: string;
  visi?: string;
  misi?: string;
  tujuan?: string;
  sejarah?: string;
  gmaps_embed_url?: string;
  lat?: number | null;
  lng?: number | null;
}
