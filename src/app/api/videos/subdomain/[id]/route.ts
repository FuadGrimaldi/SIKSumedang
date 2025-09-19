import { VideoService } from "@/lib/prisma-service/videoService";
import { NextResponse, NextRequest } from "next/server";

// get video by id desa
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kecamatanId = parseInt(params.id, 10);
    const videos = await VideoService.getVideosByKecamatanId(kecamatanId);
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/videos/subdomain/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
