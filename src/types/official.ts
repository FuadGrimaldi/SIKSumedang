// types/officials.ts
export interface Official {
  id: number;
  kecamatan_id: number;
  name: string;
  position: string;
  photo: string;

  created_at: Date;
  updated_at: Date;
  profile_desa?: {
    id: number;
    nama_desa: string;
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
  display_order?: number;
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
