import { prisma } from "./prisma";
import {
  KategoriArtikel,
  CreateKategoriArtikel,
  UpdateKategoriArtikel,
  CreateSubKategoriArtikel,
  UpdateSubKategoriArtikel,
} from "@/types/kategoriArtikel";

export class KategoriArtikelService {
  // Get all kategori artikel
  static async getAllSubKategoriArtikel() {
    return prisma.sub_kategori_article.findMany({
      orderBy: { id: "desc" },
      include: {
        kategori_article: {
          select: { id: true, nama: true },
        },
        profile_kecamatan: { select: { id: true, nama_kecamatan: true } },
      },
    });
  }
  // Get all kategori artikel
  static async getAllKategoriArtikel() {
    return prisma.kategori_article.findMany({
      orderBy: { id: "desc" },
      include: {
        profile_kecamatan: { select: { id: true, nama_kecamatan: true } },
      },
    });
  }
  // Create a new kategori artikel
  static async createKategoriArtikel(data: CreateKategoriArtikel) {
    try {
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
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
      if (data.kecamatan_id !== undefined)
        updateData.kecamatan_id = data.kecamatan_id;
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
  // get all sub_kategori by kategori_id
  static async getAllSubKategoriByKategoriId(kategoriId: number) {
    return prisma.sub_kategori_article.findMany({
      where: { kategori_id: kategoriId },
      include: {
        kategori_article: {
          select: { id: true, nama: true },
        },
        profile_kecamatan: { select: { id: true, nama_kecamatan: true } },
      },
      orderBy: { id: "desc" },
    });
  }

  // get sub_kategori by id
  static async getSubKategoriById(id: number) {
    return prisma.sub_kategori_article.findUnique({
      where: { id },
      include: {
        kategori_article: {
          select: { id: true, nama: true },
        },
        profile_kecamatan: { select: { id: true, nama_kecamatan: true } },
      },
    });
  }

  // create sub_kategori
  static async createSubKategoriArtikel(data: CreateSubKategoriArtikel) {
    try {
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
        kategori_id: data.kategori_id,
        sub_nama: data.sub_nama,
      };
      const subKategoriArtikel = await prisma.sub_kategori_article.create({
        data: createData,
      });
      return subKategoriArtikel;
    } catch (error) {
      console.error("❌ Prisma createSubKategoriArtikel error:", error);
      throw error;
    }
  }

  // update sub_kategori
  static async updateSubKategoriArtikel(
    id: number,
    data: UpdateSubKategoriArtikel
  ) {
    try {
      const updateData: any = {};
      if (data.kecamatan_id !== undefined)
        updateData.kecamatan_id = data.kecamatan_id;
      if (data.kategori_id !== undefined)
        updateData.kategori_id = data.kategori_id;
      if (data.sub_nama !== undefined) updateData.sub_nama = data.sub_nama;
      const subKategoriArtikel = await prisma.sub_kategori_article.update({
        where: { id },
        data: updateData,
      });
      return subKategoriArtikel;
    } catch (error) {
      console.error("❌ Prisma updateSubKategoriArtikel error:", error);
      throw error;
    }
  }
  // delete sub_kategori
  static async deleteSubKategoriArtikel(id: number) {
    try {
      await prisma.sub_kategori_article.delete({
        where: { id },
      });
      return { message: "Sub kategori artikel deleted successfully" };
    } catch (error) {
      console.error("❌ Prisma deleteSubKategoriArtikel error:", error);
      throw error;
    }
  }

  // get all sub_kategori by kecamatan_id
  static async getAllSubKategoriByKecamatanId(kecamatanId: number) {
    return prisma.sub_kategori_article.findMany({
      where: { kecamatan_id: kecamatanId },
      include: {
        kategori_article: {
          select: { id: true, nama: true },
        },
        profile_kecamatan: { select: { id: true, nama_kecamatan: true } },
      },
      orderBy: { id: "desc" },
    });
  }
}
