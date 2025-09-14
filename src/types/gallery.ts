// src/types/gallery.ts
export interface GalleryItem {
  id: number; // kombinasi dari type dan id asli
  title: string;
  image_url: string;
}

export interface GalleryResponse {
  items: GalleryItem[];
  total: number;
}
