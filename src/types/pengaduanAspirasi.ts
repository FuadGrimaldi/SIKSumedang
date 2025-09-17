export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum PengaduanAspirasiKategori {
  pengaduan = "pengaduan",
  aspirasi = "aspirasi",
}

export interface PengaduanAspirasi {
  id: number;
  kecamatan_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: PengaduanAspirasiKategori;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface PengaduanAspirasiCreate {
  kecamatan_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: PengaduanAspirasiKategori;
  status?: Status; // default to Pending if not provided
}

export interface PengaduanAspirasiUpdate {
  kecamatan_id?: number;
  name?: string;
  email?: string;
  no_telp?: string;
  pesan?: string;
  kategori?: PengaduanAspirasiKategori;
  status?: Status; // default to Pending if not provided
}

export interface PengaduanAspirasiUpdateStatus {
  status: Status;
}
