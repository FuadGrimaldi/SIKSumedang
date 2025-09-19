import { VideoService } from "@/lib/prisma-service/videoService";
import { NextResponse, NextRequest } from "next/server";

// GET /api/videos
export async function GET(request: NextRequest) {
  try {
    const videos = await VideoService.getAllVideos();
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/videos error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// POST /api/videos
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newVideo = await VideoService.createVideo(data);
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/videos error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
