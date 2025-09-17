import { NextResponse } from "next/server";
import { KategoriArtikelService } from "@/lib/prisma-service/kategoriArtikel";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 }
      );
    }
    const kategoriArtikel =
      await KategoriArtikelService.getKategoriByKecamatanId(id);
    if (!kategoriArtikel) {
      return NextResponse.json(
        { error: "Kategori artikel not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(kategoriArtikel);
  } catch (error: any) {
    console.error("GET /api/articles/kategori/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
