import { NextRequest, NextResponse } from "next/server";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kecamatanId = parseInt(params.id);
    if (isNaN(kecamatanId)) {
      return NextResponse.json({ error: "Invalid kec ID" }, { status: 400 });
    }
    const agenda = await AcaraKecamatanService.getAcaraByKecamatanId(
      kecamatanId
    );

    return NextResponse.json(agenda);
  } catch (error: any) {
    console.error("GET /api/acara/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
