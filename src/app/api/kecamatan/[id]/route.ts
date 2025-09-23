import { NextResponse, NextRequest } from "next/server";
import { ProfileKecamatanService } from "@/lib/prisma-service/profilekecamatanService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { CreateKecamatan, UpdateKecamatan } from "@/types/kecamatan";

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

export async function PUT(
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
    const existingProfile =
      await ProfileKecamatanService.getKecamatanProfileById(kecamatanId);
    if (!existingProfile) {
      return NextResponse.json(
        { error: "Kecamatan profile not found" },
        { status: 404 }
      );
    }
    const formData = await req.formData();
    const nama_kecamatan = formData.get("nama_kecamatan") as string;
    const alamat = formData.get("alamat") as string;
    const telepon = formData.get("telepon") as string;
    const email = formData.get("email") as string;
    const subdomain = formData.get("subdomain") as string;
    const website = formData.get("website") as string | null;
    const foto_kantor = formData.get("foto_kantor") as File | null;
    const visi = formData.get("visi") as string;
    const misi = formData.get("misi") as string;
    const sejarah = formData.get("sejarah") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const gmaps_embed_url = formData.get("gmaps_embed_url") as string;

    // Validation
    if (!nama_kecamatan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined =
      existingProfile.foto_kantor || undefined;

    if (foto_kantor && foto_kantor.size > 0) {
      const defaultImages = [
        "/assets/default/image-not-available.png",
        "/assets/default/default.jpg",
      ];
      try {
        if (
          existingProfile.foto_kantor &&
          !defaultImages.includes(existingProfile.foto_kantor)
        ) {
          let imagePath: string;

          if (existingProfile.foto_kantor.startsWith("/assets/")) {
            // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
            imagePath = path.join(
              process.cwd(),
              "public",
              existingProfile.foto_kantor
            );
          } else if (existingProfile.foto_kantor.startsWith("/uploads/")) {
            // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
            imagePath = path.join(process.cwd(), existingProfile.foto_kantor);
          } else {
            imagePath = "";
          }

          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        const bytes = await foto_kantor.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(foto_kantor.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "profile");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        imagePath = `/uploads/profile/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const updateData: UpdateKecamatan = {
      subdomain,
      nama_kecamatan,
      alamat,
      telepon,
      email,
      website: website || null,
      foto_kantor: imagePath,
      visi,
      misi,
      sejarah,
      deskripsi,
      gmaps_embed_url,
    };
    const updatedProfile = await ProfileKecamatanService.updateKecamatanProfile(
      kecamatanId,
      updateData
    );
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Error updating profile", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const existingProfile =
      await ProfileKecamatanService.getKecamatanProfileById(kecamatanId);
    if (!existingProfile) {
      return NextResponse.json(
        { error: "Kecamatan profile not found" },
        { status: 404 }
      );
    }

    // Delete the profile
    await ProfileKecamatanService.deleteKecamatanProfile(kecamatanId);

    // Optionally delete the featured image if it exists
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    if (
      existingProfile.foto_kantor &&
      !defaultImages.includes(existingProfile.foto_kantor)
    ) {
      let imagePath: string;

      if (existingProfile.foto_kantor.startsWith("/assets/")) {
        // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
        imagePath = path.join(
          process.cwd(),
          "public",
          existingProfile.foto_kantor
        );
      } else if (existingProfile.foto_kantor.startsWith("/uploads/")) {
        // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), existingProfile.foto_kantor);
      } else {
        imagePath = "";
      }

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    return NextResponse.json(
      { message: "Kecamatan profile deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { message: "Error deleting profile", error },
      { status: 500 }
    );
  }
}
