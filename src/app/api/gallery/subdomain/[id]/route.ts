// src/app/api/gallery/subdomain/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ArticlesKecamatanService } from "@/lib/prisma-service/articleskecamatanService";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";
import { InfografisKecamatanService } from "@/lib/prisma-service/infografisKecamatanService";
import { GalleryItem } from "@/types/gallery";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kecamatanId = parseInt(params.id);
    if (isNaN(kecamatanId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    // Fetch published articles with images
    const articles = await ArticlesKecamatanService.getArticlesByKecamatanId(
      kecamatanId
    );

    // Fetch published acara with posters
    const acara = await AcaraKecamatanService.getAcaraByKecamatanId(
      kecamatanId
    );

    const infographics =
      await InfografisKecamatanService.getInfografisByKecamatan(kecamatanId);

    // Convert articles to gallery items
    const articleGalleryItems: GalleryItem[] = articles
      .filter((article) => article.featured_image) // Only articles with images
      .map((article) => ({
        id: article.id,
        title: article.title,
        image_url: article.featured_image!,
        created_at: article.created_at.toISOString(),
        updated_at: article.updated_at.toISOString(),
      }));

    // Convert acara to gallery items
    const acaraGalleryItems: GalleryItem[] = acara
      .filter((agenda) => agenda.poster) // Only published acara with posters
      .map((agenda) => ({
        id: agenda.id,
        title: agenda.judul,
        image_url: agenda.poster!,
        created_at: agenda.created_at.toISOString(),
        updated_at: agenda.updated_at.toISOString(),
      }));

    // Convert infographics to gallery items
    const infographicGalleryItems: GalleryItem[] = infographics
      .filter((infographic) => infographic.gambar_path) // Only infographics with images
      .map((infographic) => ({
        id: infographic.id,
        title: infographic.title,
        image_url: infographic.gambar_path,
        created_at: infographic.created_at.toISOString(),
        updated_at: infographic.updated_at.toISOString(),
      }));

    // Combine and sort by published date (newest first)
    const allGalleryItems = [
      ...articleGalleryItems,
      ...acaraGalleryItems,
      ...infographicGalleryItems,
    ]; // Assuming higher ID means newer

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = allGalleryItems.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json({
      items: paginatedItems,
      total: allGalleryItems.length,
      page,
      limit,
      totalPages: Math.ceil(allGalleryItems.length / limit),
    });
  } catch (error: any) {
    console.error("GET /api/gallery/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
