import { NextResponse, NextRequest } from "next/server";
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
    const kategoriArtikel = await KategoriArtikelService.getKategoriArtikelById(
      id
    );
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

export async function PUT(
  req: NextRequest,
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
    const body = await req.json();
    const { nama, kecamatan_id } = body;
    if (!nama || !kecamatan_id) {
      return NextResponse.json(
        { error: "Missing required field: nama" },
        { status: 400 }
      );
    }
    const updatedKategori = await KategoriArtikelService.updateKategoriArtikel(
      id,
      {
        kecamatan_id,
        nama,
      }
    );
    return NextResponse.json(updatedKategori);
  } catch (error: any) {
    console.error("PUT /api/articles/kategori/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
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
    const result = await KategoriArtikelService.deleteKategoriArtikel(id);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("DELETE /api/articles/kategori/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
