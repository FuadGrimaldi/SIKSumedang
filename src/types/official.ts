// types/officials.ts
export interface Official {
  id: number;
  kecamatan_id: number;
  name: string;
  position: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
  profile_kecamatan?: {
    id: number;
    nama_kecamatan: string;
  };
}

export interface CreateOfficialData {
  kecamatan_id: number;
  name: string;
  position: string;
  photo?: string | null;
}

export interface UpdateOfficialData {
  id: number;
  kecamatan_id?: number;
  name?: string;
  position?: string;
  photo?: string | null;
}

export interface OfficialFormData {
  name: string;
  position: string;
  kecamatan_id: number;
  photo?: File | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
