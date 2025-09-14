import { prisma } from "./prisma";
import { CreateKecamatan, UpdateKecamatan } from "@/types/kecamatan";

export class ProfileKecamatanService {
  static async getAllKecamatanProfile() {
    const profile = await prisma.profile_kecamatan.findMany();
    return profile;
  }
  static async getKecamatanProfileById(id: number) {
    const profile = await prisma.profile_kecamatan.findUnique({
      where: { id },
    });
    return profile;
  }
  static async getKecamatanProfileBySubdomain(subdomain: string) {
    const profile = await prisma.profile_kecamatan.findFirst({
      where: { subdomain },
    });
    return profile;
  }
  static async updateKecamatanProfile(id: number, data: UpdateKecamatan) {
    const updatedProfile = await prisma.profile_kecamatan.update({
      where: { id },
      data,
    });
    return updatedProfile;
  }
  static async createKecamatanProfile(data: CreateKecamatan) {
    try {
      const createData: any = {
        ...data,
        lat: data.lat || null,
        lng: data.lng || null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      if (
        data.foto_kantor !== undefined &&
        data.foto_kantor !== null &&
        data.foto_kantor.trim() !== ""
      ) {
        createData.foto_kantor = data.foto_kantor;
      }
      const newProfile = await prisma.profile_kecamatan.create({
        data: createData,
      });
      return newProfile;
    } catch (error) {
      throw error;
    }
  }
  static async deleteKecamatanProfile(id: number) {
    const deletedProfile = await prisma.profile_kecamatan.delete({
      where: { id },
    });
    return deletedProfile;
  }
}
