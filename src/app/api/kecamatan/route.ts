import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { NextResponse, NextRequest } from "next/server";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import { CreateKecamatan, UpdateKecamatan } from "@/types/kecamatan";

export async function GET() {
  try {
    const profiles = await ProfileKecamatanService.getAllKecamatanProfile();
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching profiles", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {}
