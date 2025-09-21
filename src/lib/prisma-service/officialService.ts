import { prisma } from "./prisma";
import { CreateOfficialData, UpdateOfficialData } from "@/types/official";

export class OfficialsService {
  // Get all officials
  static async getAllOfficials() {
    try {
      const officials = await prisma.officials.findMany({
        include: {
          profile_kecamatan: {
            select: {
              id: true,
              nama_kecamatan: true,
            },
          },
        },
      });
      return officials;
    } catch (error) {
      throw new Error(`Failed to fetch officials: ${error}`);
    }
  }

  // Get officials by kecamatan_id
  static async getOfficialsByKecamatanId(kecamatan_id: number) {
    try {
      const officials = await prisma.officials.findMany({
        where: {
          kecamatan_id: kecamatan_id,
        },
        include: {
          profile_kecamatan: {
            select: {
              id: true,
              nama_kecamatan: true,
            },
          },
        },
      });
      return officials;
    } catch (error) {
      throw new Error(`Failed to fetch officials by kecamatan_id: ${error}`);
    }
  }

  // Get single official by id
  static async getOfficialById(id: number) {
    try {
      const official = await prisma.officials.findUnique({
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
      return official;
    } catch (error) {
      throw new Error(`Failed to fetch official: ${error}`);
    }
  }

  // Create new official - Fixed
  static async createOfficial(data: CreateOfficialData) {
    try {
      // Handle optional photo field
      const createData: any = {
        kecamatan_id: data.kecamatan_id,
        name: data.name,
        position: data.position,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Only add photo if it exists and is not undefined
      if (
        data.photo !== undefined &&
        data.photo !== null &&
        data.photo.trim() !== ""
      ) {
        createData.photo = data.photo;
      }

      const official = await prisma.officials.create({
        data: createData,
        include: {
          profile_kecamatan: {
            select: {
              id: true,
              nama_kecamatan: true,
            },
          },
        },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to create official: ${error}`);
    }
  }

  // Update official - Fixed
  static async updateOfficial(data: UpdateOfficialData) {
    try {
      const { id, ...updateData } = data;

      if (!data.name || !data.position || !data.kecamatan_id) {
        throw new Error(
          "Missing required fields: name, position, kecamatan_id, display_order"
        );
      }

      // Handle optional photo field
      const finalUpdateData: any = {
        kecamatan_id: updateData.kecamatan_id,
        name: updateData.name,
        position: updateData.position,
        updated_at: new Date(),
      };

      if (updateData.photo !== undefined) {
        if (updateData.photo === null || updateData.photo === "") {
          // Remove photo if explicitly set to null or empty
          finalUpdateData.photo = null;
        } else {
          finalUpdateData.photo = updateData.photo;
        }
      }

      const official = await prisma.officials.update({
        where: { id },
        data: finalUpdateData,
        include: {
          profile_kecamatan: {
            select: {
              id: true,
              nama_kecamatan: true,
            },
          },
        },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to update official: ${error}`);
    }
  }

  // Delete official
  static async deleteOfficial(id: number) {
    try {
      const official = await prisma.officials.delete({
        where: { id },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to delete official: ${error}`);
    }
  }
}
