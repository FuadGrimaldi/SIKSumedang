import { NextRequest, NextResponse } from "next/server";
import { KategoriArtikelService } from "@/lib/prisma-service/kategoriArtikel";

export async function GET() {
  try {
    // Fetch all kategori artikel
    const kategoriArtikel =
      await KategoriArtikelService.getAllKategoriArtikel();
    return NextResponse.json(kategoriArtikel);
  } catch (error: any) {
    console.error("GET /api/articles/kategori error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama } = body;
    if (!nama) {
      return NextResponse.json(
        { error: "Missing required field: nama" },
        { status: 400 }
      );
    }
    const newKategori = await KategoriArtikelService.createKategoriArtikel({
      nama,
    });
    return NextResponse.json(newKategori, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/articles/kategori error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
