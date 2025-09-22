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
    const kategoriArtikel =
      await KategoriArtikelService.getAllSubKategoriByKategoriId(id);
    if (!kategoriArtikel) {
      return NextResponse.json(
        { error: "Sub Kategori artikel not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(kategoriArtikel);
  } catch (error: any) {
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
    const { sub_nama, kategori_id, kecamatan_id } = body;
    if (!sub_nama || !kecamatan_id) {
      return NextResponse.json(
        { error: "Missing required field: sub_nama" },
        { status: 400 }
      );
    }
    const updatedKategori =
      await KategoriArtikelService.updateSubKategoriArtikel(id, {
        kecamatan_id,
        sub_nama,
        kategori_id,
      });
    return NextResponse.json(updatedKategori);
  } catch (error: any) {
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
    const result = await KategoriArtikelService.deleteSubKategoriArtikel(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
