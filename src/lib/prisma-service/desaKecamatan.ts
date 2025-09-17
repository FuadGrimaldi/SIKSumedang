import { prisma } from "./prisma";
import { Desa, CreateDesa, UpdateDesa } from "@/types/desa";

export class DesaKecamatanService {
  // Get all desa by kecamatan_id
  static async getAllDesaByKecamatanId(kecamatan_id: number) {
    return prisma.desa.findMany({
      where: { kecamatan_id },
      orderBy: { nama_desa: "asc" },
    });
  }

  // Get all desa
  static async getAllDesa() {
    return prisma.desa.findMany({
      orderBy: { nama_desa: "asc" },
    });
  }

  // Get desa by id
  static async getDesaById(id: number) {
    return prisma.desa.findUnique({
      where: { id },
    });
  }

  // Create a new desa
  static async createDesa(data: CreateDesa) {
    return prisma.desa.create({
      data,
    });
  }

  // Update desa by id
  static async updateDesa(id: number, data: UpdateDesa) {
    return prisma.desa.update({
      where: { id },
      data,
    });
  }

  // Delete desa by id
  static async deleteDesa(id: number) {
    return prisma.desa.delete({
      where: { id },
    });
  }
}
