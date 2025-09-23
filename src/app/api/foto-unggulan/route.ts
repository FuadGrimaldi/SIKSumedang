import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { FrontImageCreate } from "@/types/frontImage";
import { NextRequest, NextResponse } from "next/server";
import { FrontImageService } from "@/lib/prisma-service/frontImageService";

export async function GET(req: NextRequest) {
  try {
    const frontImages = await FrontImageService.getAllFrontImages();
    return NextResponse.json(frontImages, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/foto-unggulan error:", error);
    return NextResponse.json(
      { error: "Failed to fetch foto unggulan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Extract form fields
    const kecamatan_id = formData.get("kecamatan_id") as string;
    const title = formData.get("title") as string;
    const lokasi = formData.get("lokasi") as string;
    const gambar_path = formData.get("gambar_path") as File | null;
    // Validation
    if (!kecamatan_id || !title || !lokasi || !gambar_path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let imagePath: string | undefined;
    // Handle file upload
    if (gambar_path && gambar_path.size > 0) {
      try {
        const bytes = await gambar_path.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(gambar_path.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;
        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "foto-unggulan");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Write file to the upload directory
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        imagePath = `/uploads/foto-unggulan/${fileName}`;
      } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json(
          { error: "File upload failed" },
          { status: 500 }
        );
      }
    }
    const newFrontImage: FrontImageCreate = {
      kecamatan_id: parseInt(kecamatan_id, 10),
      title,
      lokasi,
      gambar_path: imagePath || "/assets/default/image-not-available.png",
    };
    const createdFrontImage = await FrontImageService.createFrontImage(
      newFrontImage
    );
    return NextResponse.json(createdFrontImage, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/foto-unggulan error:", error);
    return NextResponse.json(
      { error: "Failed to create foto unggulan" },
      { status: 500 }
    );
  }
}
