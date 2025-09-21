import { NextRequest, NextResponse } from "next/server";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const kecamatanId = parseInt(params.id);
    if (isNaN(kecamatanId)) {
      return NextResponse.json({ error: "Invalid kec ID" }, { status: 400 });
    }

    const acara = await AcaraKecamatanService.getAcaraPublishByKecamatanId(
      kecamatanId
    );

    const startIndex = (page - 1) * limit;
    const paginatedItems = acara.slice(startIndex, startIndex + limit);
    return NextResponse.json(
      {
        items: paginatedItems,
        total: acara.length,
        page,
        limit,
        totalPages: Math.ceil(acara.length / limit),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /api/acara/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
