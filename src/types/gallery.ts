// src/types/gallery.ts
export interface GalleryItem {
  id: number; // kombinasi dari type dan id asli
  title: string;
  image_url: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface GalleryResponse {
  items: GalleryItem[];
  total: number;
}
