import { NextRequest, NextResponse } from "next/server";
import { FrontImageService } from "@/lib/prisma-service/frontImageService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const frontImage = await FrontImageService.getFrontImageByKecamatanId(id);
    return NextResponse.json(frontImage, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/foto-unggulan/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch foto unggulan" },
      { status: 500 }
    );
  }
}
