import { NextRequest, NextResponse } from "next/server";
import { DesaKecamatanService } from "@/lib/prisma-service/desaKecamatan";

// get all
export async function GET(request: NextRequest) {
  try {
    const data = await DesaKecamatanService.getAllDesa();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// create new
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_desa, kecamatan_id } = body;
    if (!nama_desa || !kecamatan_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newDesa = await DesaKecamatanService.createDesa({
      nama_desa,
      kecamatan_id,
    });
    return NextResponse.json(newDesa, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
