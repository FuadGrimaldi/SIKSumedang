import { sub } from "framer-motion/client";
import { prisma } from "./prisma";
import { ArticleCreate, ArticleUpdate } from "@/types/article";

export class ArticlesKecamatanService {
  static async getArticleBySlug(slug: string) {
    return prisma.articles.findUnique({
      where: { slug },
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
        kategori_article: {
          select: {
            id: true,
            nama: true,
          },
        },
        sub_kategori_article: {
          select: {
            id: true,
            sub_nama: true,
          },
        },
      },
    });
  }
  static async getAllArticles() {
    return prisma.articles.findMany({
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
        kategori_article: {
          select: {
            id: true,
            nama: true,
          },
        },
        sub_kategori_article: {
          select: {
            id: true,
            sub_nama: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }
  // Create a new article
  static async createArticle(data: ArticleCreate) {
    try {
      const createData: any = {
        user_id: data.user_id,
        desa_id: data.desa_id,
        kategori_id: data.kategori_id,
        sub_kategori_id: data.sub_kategori_id,
        kecamatan_id: data.kecamatan_id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        featured_image: data.featured_image,
        dokumen_terkait_path: data.dokumen_terkait_path,
        waktu_kegiatan: data.waktu_kegiatan,
        lokasi_kegiatan: data.lokasi_kegiatan,
        status: data.status,
        published_at: data.published_at,
        created_at: new Date(),
        updated_at: new Date(),
      };

      if (
        data.featured_image !== undefined &&
        data.featured_image !== null &&
        data.featured_image.trim() !== ""
      ) {
        createData.featured_image = data.featured_image;
      }
      const article = await prisma.articles.create({ data: createData });
      return article;
    } catch (error) {
      console.error("❌ Prisma createArticle error:", error); // ✅ log error
      throw error; // jangan ditelan, biar balik ke API
    }
  }

  // Get a single article by id
  static async getArticleById(id: number) {
    return prisma.articles.findUnique({
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
        kategori_article: {
          select: {
            id: true,
            nama: true,
          },
        },
        sub_kategori_article: {
          select: {
            id: true,
            sub_nama: true,
          },
        },
      },
    });
  }

  // Update an article
  static async updateArticle(id: number, data: ArticleUpdate) {
    try {
      const updateData: any = {
        desa_id: data.desa_id,
        kategori_id: data.kategori_id,
        sub_kategori_id: data.sub_kategori_id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        featured_image: data.featured_image,
        dokumen_terkait_path: data.dokumen_terkait_path,
        waktu_kegiatan: data.waktu_kegiatan,
        lokasi_kegiatan: data.lokasi_kegiatan,
        status: data.status,
        published_at: data.published_at,
      };
      if (
        data.featured_image !== undefined &&
        data.featured_image !== null &&
        data.featured_image.trim() !== ""
      ) {
        updateData.featured_image = data.featured_image;
      }
      return await prisma.articles.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error("❌ Prisma updateArticle error:", error); // ✅ log error
      throw error; // jangan ditelan, biar balik ke API
    }
  }

  // Delete an article
  static async deleteArticle(id: number) {
    return prisma.articles.delete({
      where: { id },
    });
  }
  static async getArticlesByKecamatanId(
    kecamatan_id: number,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;
    return prisma.articles.findMany({
      where: { kecamatan_id },
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
        kategori_article: {
          select: {
            id: true,
            nama: true,
          },
        },
        sub_kategori_article: {
          select: {
            id: true,
            sub_nama: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });
  }

  // Ganti method searchArticles dengan versi yang lebih aman
  static async searchArticles(
    query: string,
    kecamatan_id: number,
    kategori?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    const whereClause: any = { kecamatan_id };

    if (query && query.trim() !== "") {
      whereClause.OR = [
        { title: { contains: query } },
        { content: { contains: query } },
      ];
    }

    if (kategori && kategori.trim() !== "") {
      whereClause.kategori = kategori;
    }

    return prisma.articles.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
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
        kategori_article: {
          select: {
            id: true,
            nama: true,
          },
        },
        sub_kategori_article: {
          select: {
            id: true,
            sub_nama: true,
          },
        },
      },
    });
  }
}
