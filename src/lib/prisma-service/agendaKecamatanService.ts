import { prisma } from "./prisma";
import { Agenda, CreateAgendaData, UpdateAgendaData } from "@/types/agenda";

export class AgendaKecamatanService {
  // Get all agendas
  static async getAllAgendas() {
    return prisma.agenda_kecamatan.findMany({
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }

  // Create a new agenda
  static async createAgenda(data: CreateAgendaData) {
    try {
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
        judul: data.judul,
        slug: data.slug,
        kategori: data.kategori,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        waktu: new Date(data.waktu),
        poster: data.poster,
        created_by: data.created_by,
        status: data.status,
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

      const agenda = await prisma.agenda_kecamatan.create({ data: createData });
      return agenda;
    } catch (error) {
      console.error("❌ Prisma createAgenda error:", error);
      throw error;
    }
  }

  // Get agendas by kecamatan_id
  static async getAgendasByKecamatanId(kecamatan_id: number) {
    return prisma.agenda_kecamatan.findMany({
      where: { kecamatan_id },
      orderBy: { created_at: "desc" },
    });
  }
  // Update an existing agenda
  static async updateAgenda(id: number, data: UpdateAgendaData) {
    try {
      const updateData: any = {
        kecamatan_id: data.kecamatan_id,
        judul: data.judul,
        slug: data.slug,
        kategori: data.kategori,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        waktu: data.waktu ? new Date(data.waktu) : undefined,
        poster: data.poster,
        created_by: data.created_by,
        status: data.status,
        updated_at: new Date(),
      };

      if (
        data.poster !== undefined &&
        data.poster !== null &&
        data.poster.trim() !== ""
      ) {
        updateData.poster = data.poster;
      }

      const agenda = await prisma.agenda_kecamatan.update({
        where: { id },
        data: updateData,
      });
      return agenda;
    } catch (error) {
      console.error("❌ Prisma updateAgenda error:", error);
      throw error;
    }
  }
  // Delete an agenda
  static async deleteAgenda(id: number) {
    try {
      return await prisma.agenda_kecamatan.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ Prisma deleteAgenda error:", error);
      throw error;
    }
  }
  // Get a single agenda by id
  static async getAgendaById(id: number) {
    return prisma.agenda_kecamatan.findUnique({
      where: { id },
      include: {
        profile_kecamatan: {
          select: {
            id: true,
            nama_kecamatan: true,
          },
        },
      },
    });
  }
}
