export interface Kecamatan {
  id: number;
  subdomain: string;
  nama_kecamatan: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string | null;
  foto_kantor: string;
  visi: string;
  misi: string;
  sejarah: string;
  deskripsi: string;
  gmaps_embed_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateKecamatan {
  nama_kecamatan: string;
  subdomain: string;
  alamat: string;
  telepon: string;
  email: string;
  website?: string | null;
  foto_kantor: string;
  visi: string;
  misi: string;
  sejarah: string;
  deskripsi: string;
  gmaps_embed_url: string;
}

export interface UpdateKecamatan {
  nama_kecamatan?: string;
  subdomain?: string;
  alamat?: string;
  telepon?: string;
  email?: string;
  website?: string | null;
  foto_kantor?: string;
  visi?: string;
  misi?: string;
  sejarah?: string;
  deskripsi?: string;
  gmaps_embed_url?: string;
}
