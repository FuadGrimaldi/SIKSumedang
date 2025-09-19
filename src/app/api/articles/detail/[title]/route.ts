import { NextRequest, NextResponse } from "next/server";
import { ArticlesKecamatanService } from "@/lib/prisma-service/articleskecamatanService";

export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } }
) {
  try {
    const title = params.title;
    if (title == null || title.trim() === "") {
      return NextResponse.json(
        { error: "Invalid article title" },
        { status: 400 }
      );
    }

    const article = await ArticlesKecamatanService.getArticleBySlug(title);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error: any) {
    console.error("GET /api/articles/detail/[title] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
