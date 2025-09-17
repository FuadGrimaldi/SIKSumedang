import { NextRequest, NextResponse } from "next/server";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { CreateAcaraData, StatusAcara } from "@/types/Acara";

export async function GET() {
  try {
    const acaras = await AcaraKecamatanService.getAllAcara();
    return NextResponse.json(acaras);
  } catch (error: any) {
    console.error("GET /api/acara error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const kecamatan_id = formData.get("kecamatan_id") as string;
    const user_id = formData.get("user_id") as string;
    const judul = formData.get("judul") as string;
    const slug = formData.get("slug") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lokasi = formData.get("lokasi") as string;
    const waktu = formData.get("waktu") as string;
    const poster = formData.get("poster") as File | null;
    const penyelenggara = formData.get("penyelenggara") as string;
    const status_acara = formData.get("status_acara") as string;

    // Validation
    if (
      !kecamatan_id ||
      !judul ||
      !slug ||
      !penyelenggara ||
      !deskripsi ||
      !waktu
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let posterPath: string | undefined;

    // Handle file upload
    if (poster && poster.size > 0) {
      try {
        const bytes = await poster.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(poster.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "acara"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file to disk
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        posterPath = `/assets/uploads/acara/${fileName}`;
      } catch (error) {
        console.error("Error uploading poster:", error);
        return NextResponse.json(
          { error: "Failed to upload poster" },
          { status: 500 }
        );
      }
    }

    // Prepare data for creation
    const createData: CreateAcaraData = {
      kecamatan_id: parseInt(kecamatan_id),
      user_id: parseInt(user_id),
      judul,
      slug,
      deskripsi,
      lokasi,
      waktu: new Date(waktu).toISOString(),
      penyelenggara,
      poster: posterPath ?? "/assets/default/image-not-available.png",
      status_acara: status_acara as StatusAcara,
    };
    const acara = await AcaraKecamatanService.createAcara(createData);
    return NextResponse.json(acara, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/acara error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
