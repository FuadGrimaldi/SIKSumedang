import { NextRequest, NextResponse } from "next/server";
import { DesaKecamatanService } from "@/lib/prisma-service/desaKecamatan";

// get by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }
    const data = await DesaKecamatanService.getDesaById(desaId);
    if (!data) {
      return NextResponse.json({ error: "Desa not found" }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// update by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }
    const body = await request.json();
    const { nama_desa, kecamatan_id } = body;
    if (!nama_desa || !kecamatan_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const updatedDesa = await DesaKecamatanService.updateDesa(desaId, {
      nama_desa,
      kecamatan_id,
    });
    if (!updatedDesa) {
      return NextResponse.json({ error: "Desa not found" }, { status: 404 });
    }
    return NextResponse.json(updatedDesa, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// delete by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }
    const deletedDesa = await DesaKecamatanService.deleteDesa(desaId);
    if (!deletedDesa) {
      return NextResponse.json({ error: "Desa not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Desa deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/desa/[id] error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
