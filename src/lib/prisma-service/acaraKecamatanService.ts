import { prisma } from "./prisma";
import { Acara, CreateAcaraData, UpdateAcaraData } from "@/types/Acara";

export class AcaraKecamatanService {
  // Get all Acara
  static async getAllAcara() {
    return prisma.acara.findMany({
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
        users: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }

  // Get Acara by title (slug)
  static async getAcaraBySlug(title: string) {
    return prisma.acara.findUnique({
      where: { slug: title },
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
        users: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  // Create a new Acara
  static async createAcara(data: CreateAcaraData) {
    try {
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
        user_id: data.user_id,
        judul: data.judul,
        slug: data.slug,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        waktu: new Date(data.waktu),
        poster: data.poster,
        penyelenggara: data.penyelenggara,
        status_acara: data.status_acara,
        created_at: new Date(),
        updated_at: new Date(),
      };
      if (
        data.poster !== undefined &&
        data.poster !== null &&
        data.poster.trim() !== ""
      ) {
        createData.poster = data.poster;
      }

      const Acara = await prisma.acara.create({ data: createData });
      return Acara;
    } catch (error) {
      console.error("❌ Prisma create Acara error:", error);
      throw error;
    }
  }

  // Get Acaras by kecamatan_id
  static async getAcaraPublishByKecamatanId(
    kecamatan_id: number,
    options?: {
      page?: number;
      limit?: number;
    }
  ) {
    const { page = 1, limit = 100 } = options || {};
    const skip = (page - 1) * limit;

    return prisma.acara.findMany({
      where: {
        kecamatan_id,
        status_acara: "published",
      },
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
        users: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
      orderBy: { waktu: "desc" },
      skip,
      take: limit,
    });
  }
  // Get Acaras by kecamatan_id
  static async getAcaraAllByKecamatanId(
    kecamatan_id: number,
    options?: {
      page?: number;
      limit?: number;
    }
  ) {
    const { page = 1, limit = 100 } = options || {};
    const skip = (page - 1) * limit;

    return prisma.acara.findMany({
      where: {
        kecamatan_id,
      },
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
        users: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });
  }
  // Update an existing Acara
  static async updateAcara(id: number, data: UpdateAcaraData) {
    try {
      const updateData: any = {
        kecamatan_id: data.kecamatan_id,
        user_id: data.user_id,
        judul: data.judul,
        slug: data.slug,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        waktu: data.waktu ? new Date(data.waktu) : undefined,
        poster: data.poster,
        penyelenggara: data.penyelenggara,
        status_acara: data.status_acara,
        updated_at: new Date(),
      };

      if (
        data.poster !== undefined &&
        data.poster !== null &&
        data.poster.trim() !== ""
      ) {
        updateData.poster = data.poster;
      }

      const Acara = await prisma.acara.update({
        where: { id },
        data: updateData,
      });
      return Acara;
    } catch (error) {
      console.error("❌ Prisma updateAcara error:", error);
      throw error;
    }
  }
  // Delete an Acara
  static async deleteAcara(id: number) {
    try {
      return await prisma.acara.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ Prisma deleteAcara error:", error);
      throw error;
    }
  }
  // Get a single Acara by id
  static async getAcaraById(id: number) {
    return prisma.acara.findUnique({
      where: { id },
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
        users: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
    });
  }
}
