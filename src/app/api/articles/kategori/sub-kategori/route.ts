import { NextRequest, NextResponse } from "next/server";
import { KategoriArtikelService } from "@/lib/prisma-service/kategoriArtikel";

export async function GET() {
  try {
    // Fetch all kategori artikel
    const kategoriArtikel =
      await KategoriArtikelService.getAllSubKategoriArtikel();
    return NextResponse.json(kategoriArtikel);
  } catch (error: any) {
    console.error("GET /api/articles/kategori error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sub_nama, kecamatan_id, kategori_id } = body;
    if (!sub_nama) {
      return NextResponse.json(
        { error: "Missing required field: sub_nama" },
        { status: 400 }
      );
    }
    const newKategori = await KategoriArtikelService.createSubKategoriArtikel({
      kecamatan_id,
      kategori_id,
      sub_nama,
    });
    return NextResponse.json(newKategori, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/articles/kategori error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
