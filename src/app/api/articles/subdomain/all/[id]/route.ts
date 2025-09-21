import { NextRequest, NextResponse } from "next/server";
import { ArticlesKecamatanService } from "@/lib/prisma-service/articleskecamatanService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kecamatanId = parseInt(params.id);
    if (isNaN(kecamatanId)) {
      return NextResponse.json(
        { error: "Invalid kecamatan ID" },
        { status: 400 }
      );
    }

    // Ambil query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const desa_id = searchParams.get("desa_id")
      ? parseInt(searchParams.get("desa_id")!)
      : undefined;

    const kategori_id = searchParams.get("kategori_id")
      ? parseInt(searchParams.get("kategori_id")!)
      : undefined;

    const sub_kategori_id = searchParams.get("sub_kategori_id")
      ? parseInt(searchParams.get("sub_kategori_id")!)
      : undefined;

    const articles = await ArticlesKecamatanService.getArticlesAllByKecamatanId(
      kecamatanId,
      {
        desa_id,
        kategori_id,
        sub_kategori_id,
      }
    );
    const filterArticles = articles.filter(
      (articles) => articles.kategori_id !== 1 && articles.kategori_id !== 8
    );
    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = filterArticles.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      {
        items: paginatedItems,
        total: filterArticles.length,
        page,
        limit,
        totalPages: Math.ceil(filterArticles.length / limit),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /api/articles/kecamatan/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
