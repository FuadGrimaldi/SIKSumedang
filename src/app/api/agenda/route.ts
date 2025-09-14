import { NextRequest, NextResponse } from "next/server";
import { AgendaKecamatanService } from "@/lib/prisma-service/agendaKecamatanService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { CreateAgendaData, AgendaKategori, Status } from "@/types/agenda";

export async function GET() {
  try {
    const agendas = await AgendaKecamatanService.getAllAgendas();
    return NextResponse.json(agendas);
  } catch (error: any) {
    console.error("GET /api/agenda error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const kecamatan_id = formData.get("kecamatan_id") as string;
    const judul = formData.get("judul") as string;
    const slug = formData.get("slug") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lokasi = formData.get("lokasi") as string;
    const waktu = formData.get("waktu") as string;
    const poster = formData.get("poster") as File | null;
    const created_by = formData.get("created_by") as string;
    const status = formData.get("status") as string;

    // Validation
    if (!kecamatan_id || !judul || !slug || !kategori || !deskripsi || !waktu) {
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
          "agenda"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file to disk
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        posterPath = `/assets/uploads/agenda/${fileName}`;
      } catch (error) {
        console.error("Error uploading poster:", error);
        return NextResponse.json(
          { error: "Failed to upload poster" },
          { status: 500 }
        );
      }
    }

    // Prepare data for creation
    const createData: CreateAgendaData = {
      kecamatan_id: parseInt(kecamatan_id),
      judul,
      slug,
      kategori: kategori as AgendaKategori,
      deskripsi,
      lokasi,
      waktu: new Date(waktu).toISOString(),
      poster: posterPath ?? "/assets/default/image-not-available.png",
      created_by: parseInt(created_by),
      status: status as Status,
    };
    const agenda = await AgendaKecamatanService.createAgenda(createData);
    return NextResponse.json(agenda, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/agenda error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
