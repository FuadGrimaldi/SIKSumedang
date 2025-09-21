import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { FrontImageUpdate } from "@/types/frontImage";
import { NextRequest, NextResponse } from "next/server";
import { FrontImageService } from "@/lib/prisma-service/frontImageService";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const existingFrontImage = await FrontImageService.getFrontImageById(id);
    if (!existingFrontImage) {
      return NextResponse.json(
        { error: "Foto unggulan not found" },
        { status: 404 }
      );
    }
    const formData = await req.formData();
    // Extract form fields
    const kecamatan_id = formData.get("kecamatan_id") as string;
    const title = formData.get("title") as string;
    const lokasi = formData.get("lokasi") as string;
    const gambar_path = formData.get("gambar_path") as File | null;
    // Validation
    if (!kecamatan_id || !title || !lokasi) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    // Handle file upload
    if (gambar_path && gambar_path.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];
        if (
          existingFrontImage.gambar_path &&
          !defaultImages.includes(existingFrontImage.gambar_path)
        ) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingFrontImage.gambar_path
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        const bytes = await gambar_path.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(gambar_path.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;
        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "foto-unggulan"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Write file to the upload directory
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        imagePath = `/assets/uploads/foto-unggulan/${fileName}`;
      } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json(
          { error: "File upload failed" },
          { status: 500 }
        );
      }
    }
    const updatedFrontImage: FrontImageUpdate = {
      kecamatan_id: parseInt(kecamatan_id, 10),
      title,
      lokasi,
      gambar_path: imagePath || existingFrontImage.gambar_path,
    };
    const result = await FrontImageService.updateFrontImage(
      id,
      updatedFrontImage
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ PUT /api/foto-unggulan/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update foto unggulan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const existingFrontImage = await FrontImageService.getFrontImageById(id);
    if (!existingFrontImage) {
      return NextResponse.json(
        { error: "Foto unggulan not found" },
        { status: 404 }
      );
    }
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    if (
      existingFrontImage.gambar_path &&
      !defaultImages.includes(existingFrontImage.gambar_path)
    ) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        existingFrontImage.gambar_path
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await FrontImageService.deleteFrontImage(id);
    return NextResponse.json(
      { message: "Foto unggulan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ DELETE /api/foto-unggulan/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete foto unggulan" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const frontImage = await FrontImageService.getFrontImageById(id);
    if (!frontImage) {
      return NextResponse.json(
        { error: "Foto unggulan not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(frontImage, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/foto-unggulan/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch foto unggulan" },
      { status: 500 }
    );
  }
}
