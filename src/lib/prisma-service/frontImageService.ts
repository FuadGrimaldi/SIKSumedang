import { prisma } from "./prisma";
import {
  FrontImage,
  FrontImageCreate,
  FrontImageUpdate,
} from "@/types/frontImage";

export class FrontImageService {
  static async getFrontImageByKecamatanId(kecamatan_id: number) {
    return prisma.front_image.findMany({
      where: { kecamatan_id },
      include: {
        profile_kecamatan: {
          select: { id: true, nama_kecamatan: true },
        },
      },
      orderBy: { id: "desc" },
    });
  }

  //   get all
  static async getAllFrontImages() {
    return prisma.front_image.findMany({
      include: {
        profile_kecamatan: {
          select: { id: true, nama_kecamatan: true },
        },
      },
      orderBy: { id: "desc" },
    });
  }
  // create
  static async createFrontImage(data: FrontImageCreate) {
    try {
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
        title: data.title,
        lokasi: data.lokasi,
        gambar_path: data.gambar_path,
      };
      if (
        data.gambar_path !== undefined &&
        data.gambar_path !== null &&
        data.gambar_path.trim() !== ""
      ) {
        createData.gambar_path = data.gambar_path;
      }
      const frontImage = await prisma.front_image.create({ data: createData });
      return frontImage;
    } catch (error) {
      throw error;
    }
  }

  // update
  static async updateFrontImage(id: number, data: FrontImageUpdate) {
    try {
      const updateData: any = {
        kecamatan_id: data.kecamatan_id,
        title: data.title,
        lokasi: data.lokasi,
        gambar_path: data.gambar_path,
      };
      if (
        data.gambar_path !== undefined &&
        data.gambar_path !== null &&
        data.gambar_path.trim() !== ""
      ) {
        updateData.gambar_path = data.gambar_path;
      }
      return await prisma.front_image.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw error;
    }
  }

  // delete
  static async deleteFrontImage(id: number) {
    return prisma.front_image.delete({
      where: { id },
    });
  }

  //   get by id
  static async getFrontImageById(id: number) {
    return prisma.front_image.findUnique({
      where: { id },
    });
  }
}
