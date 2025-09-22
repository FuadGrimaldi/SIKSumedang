import { NextRequest, NextResponse } from "next/server";
import { AcaraKecamatanService } from "@/lib/prisma-service/acaraKecamatanService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { UpdateAcaraData, StatusAcara } from "@/types/Acara";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid acara ID" }, { status: 400 });
    }

    const acara = await AcaraKecamatanService.getAcaraById(id);
    if (!acara) {
      return NextResponse.json({ error: "acara not found" }, { status: 404 });
    }

    return NextResponse.json(acara);
  } catch (error: any) {
    console.error("GET /api/acara/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid acara ID" }, { status: 400 });
    }
    const existingAcara = await AcaraKecamatanService.getAcaraById(id);
    if (!existingAcara) {
      return NextResponse.json({ error: "acara not found" }, { status: 404 });
    }

    const formData = await req.formData();
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

    let posterPath: string | undefined = existingAcara.poster || undefined;

    // Handle file upload
    if (poster && poster.size > 0) {
      const defaultImages = [
        "/assets/default/image-not-available.png",
        "/assets/default/default.jpg",
      ];
      try {
        if (
          existingAcara.poster &&
          !defaultImages.includes(existingAcara.poster)
        ) {
          // Delete old image if it exists
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingAcara.poster
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
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
    const updateData: UpdateAcaraData = {
      kecamatan_id: parseInt(kecamatan_id),
      user_id: parseInt(user_id),
      judul,
      slug,
      deskripsi,
      lokasi,
      waktu: new Date(waktu).toISOString(),
      penyelenggara,
      poster: posterPath,
      status_acara: status_acara as StatusAcara,
    };
    const updatedacara = await AcaraKecamatanService.updateAcara(
      id,
      updateData
    );
    return NextResponse.json(updatedacara);
  } catch (error: any) {
    console.error("PUT /api/acara/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid acara ID" }, { status: 400 });
    }

    const existingAcara = await AcaraKecamatanService.getAcaraById(id);
    if (!existingAcara) {
      return NextResponse.json({ error: "acara not found" }, { status: 404 });
    }
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    // Delete poster if it exists
    if (existingAcara.poster && !defaultImages.includes(existingAcara.poster)) {
      const posterPath = path.join(
        process.cwd(),
        "public",
        existingAcara.poster
      );
      if (fs.existsSync(posterPath)) {
        fs.unlinkSync(posterPath);
      }
    }
    await AcaraKecamatanService.deleteAcara(id);
    return NextResponse.json({ message: "acara deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/acara/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
