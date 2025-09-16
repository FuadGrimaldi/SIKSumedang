import { NextResponse, NextRequest } from "next/server";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";

export async function GET(
  req: NextRequest,
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
    const profile = await ProfileKecamatanService.getKecamatanProfileById(
      kecamatanId
    );
    if (!profile) {
      return NextResponse.json(
        { error: "Kecamatan profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching profile", error },
      { status: 500 }
    );
  }
}
