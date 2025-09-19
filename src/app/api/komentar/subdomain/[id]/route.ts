import { KomentarArtikelService } from "@/lib/prisma-service/komentarArtikelService";
import { NextResponse } from "next/server";

// get by kecamatan_id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const kecamatanId = parseInt(params.id, 10);
    if (isNaN(kecamatanId)) {
      return NextResponse.json(
        { error: "Invalid kecamatan ID" },
        { status: 400 }
      );
    }

    const komentars = await KomentarArtikelService.getKomentarsByKecamatanId(
      kecamatanId
    );
    return NextResponse.json(komentars);
  } catch (error: any) {
    console.error(`GET /api/komentar/subdomain/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
