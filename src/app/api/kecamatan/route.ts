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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const nama_kecamatan = formData.get("nama_kecamatan") as string;
    const subdomain = formData.get("subdomain") as string;
    const alamat = formData.get("alamat") as string;
    const telepon = formData.get("telepon") as string;
    const email = formData.get("email") as string;
    const website = formData.get("website") as string | null;
    const foto_kantor = formData.get("foto_kantor") as File | null;
    const visi = formData.get("visi") as string;
    const misi = formData.get("misi") as string;
    const sejarah = formData.get("sejarah") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const gmaps_embed_url = formData.get("gmaps_embed_url") as string;
    // validation
    if (!nama_kecamatan || !subdomain || !alamat || !telepon || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    let fotoKantorPath: string | undefined;
    // Handle file upload
    if (foto_kantor && foto_kantor.size > 0) {
      try {
        const bytes = await foto_kantor.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(foto_kantor.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;
        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "profile"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        fotoKantorPath = `/assets/uploads/kecamatan/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload file", error: uploadError },
          { status: 500 }
        );
      }
    }
    const newKecamatan: CreateKecamatan = {
      nama_kecamatan,
      subdomain,
      alamat,
      telepon,
      email,
      website: website || null,
      foto_kantor: fotoKantorPath || "/assets/default/image-not-available.png",
      visi: visi || "-",
      misi: misi || "-",
      sejarah: sejarah || "-",
      deskripsi: deskripsi || "-",
      gmaps_embed_url: gmaps_embed_url || "-",
    };
    const createdKecamatan =
      await ProfileKecamatanService.createKecamatanProfile(newKecamatan);
    return NextResponse.json(createdKecamatan, { status: 201 });
  } catch (error) {
    console.error("POST /api/kecamatan error:", error);
    return NextResponse.json(
      { message: "Error creating kecamatan profile", error },
      { status: 500 }
    );
  }
}
