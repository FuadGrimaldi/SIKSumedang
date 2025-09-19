import { NextResponse } from "next/server";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";

export async function GET(
  request: Request,
  { params }: { params: { title: string } }
) {
  const { title } = params;
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  try {
    const acara = await AcaraKecamatanService.getAcaraBySlug(title);
    if (!acara) {
      return NextResponse.json({ error: "Acara not found" }, { status: 404 });
    }
    return NextResponse.json(acara);
  } catch (error) {
    console.error("Error fetching acara by title:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
