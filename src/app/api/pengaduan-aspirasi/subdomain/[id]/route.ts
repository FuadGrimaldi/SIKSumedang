import { PengaduanAspirasiService } from "@/lib/prisma-service/pengaduanAspirasiService";
import { NextResponse } from "next/server";

// get by id desa
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const pengaduanAspirasis =
      await PengaduanAspirasiService.getPengaduanAspirasisByKecamatanId(id);
    return NextResponse.json(pengaduanAspirasis, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Failed to fetch pengaduan and aspirasi by kecamatan_id: ${error}`,
      },
      { status: 500 }
    );
  }
}
