import { prisma } from "./prisma";
import {
  KategoriArtikel,
  CreateKategoriArtikel,
  UpdateKategoriArtikel,
} from "@/types/kategoriArtikel";

export class KategoriArtikelService {
  // Get all kategori artikel
  static async getAllKategoriArtikel() {
    return prisma.kategori_article.findMany({
      orderBy: { id: "desc" },
    });
  }
  // Create a new kategori artikel
  static async createKategoriArtikel(data: CreateKategoriArtikel) {
    try {
      const createData: any = {
        nama: data.nama,
      };
      const kategoriArtikel = await prisma.kategori_article.create({
        data: createData,
      });
      return kategoriArtikel;
    } catch (error) {
      console.error("❌ Prisma createKategoriArtikel error:", error);
      throw error;
    }
  }
  // Update an existing kategori artikel
  static async updateKategoriArtikel(id: number, data: UpdateKategoriArtikel) {
    try {
      const updateData: any = {};
      if (data.nama !== undefined) updateData.nama = data.nama;
      const kategoriArtikel = await prisma.kategori_article.update({
        where: { id },
        data: updateData,
      });
      return kategoriArtikel;
    } catch (error) {
      console.error("❌ Prisma updateKategoriArtikel error:", error);
      throw error;
    }
  }
  // Delete a kategori artikel
  static async deleteKategoriArtikel(id: number) {
    try {
      await prisma.kategori_article.delete({
        where: { id },
      });
      return { message: "Kategori artikel deleted successfully" };
    } catch (error) {
      console.error("❌ Prisma deleteKategoriArtikel error:", error);
      throw error;
    }
  }
  // Get kategori artikel by ID
  static async getKategoriArtikelById(id: number) {
    return prisma.kategori_article.findUnique({
      where: { id },
    });
  }
  // get kategori by kec id
  static async getKategoriByKecamatanId(kecamatanId: number) {
    return prisma.kategori_article.findMany({
      where: { kecamatan_id: kecamatanId },
      orderBy: { id: "desc" },
    });
  }
}
