import { NextRequest, NextResponse } from "next/server";
import { OfficialsService } from "@/lib/prisma-service/officialService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const officials = await OfficialsService.getAllOfficials();
    return NextResponse.json(officials);
  } catch (error: any) {
    console.error("GET /api/officials error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const kecamatan_id = formData.get("kecamatan_id") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const photoFile = formData.get("photo") as File | null;

    // Validation
    if (!name || !position || !kecamatan_id) {
      console.error("Missing required fields:", {
        name,
        position,
        kecamatan_id,
      });
      return NextResponse.json(
        {
          error: "Missing required fields: name, position, kecamatan_id",
        },
        { status: 400 }
      );
    }

    // Parse numbers
    const parseKecId = parseInt(kecamatan_id);

    if (isNaN(parseKecId)) {
      console.error("Invalid number fields:", { kecamatan_id });
      return NextResponse.json(
        { error: "kecamatan_id must be valid numbers" },
        { status: 400 }
      );
    }

    let photoPath: string | undefined;

    // Handle file upload
    if (photoFile && photoFile.size > 0) {
      try {
        const bytes = await photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(photoFile.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "officials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        photoPath = `/uploads/officials/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    const officialData = {
      kecamatan_id: parseKecId,
      name,
      position,
      photo: photoPath || "/assets/default/default.png",
    };

    const official = await OfficialsService.createOfficial(officialData);
    return NextResponse.json(official, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/officials error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
