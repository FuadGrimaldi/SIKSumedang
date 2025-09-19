import { NextResponse } from "next/server";
import { DesaKecamatanService } from "@/lib/prisma-service/desaKecamatan";

// get by id kec
export async function GET(
  request: Request,
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
    const data = await DesaKecamatanService.getAllDesaByKecamatanId(
      kecamatanId
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
