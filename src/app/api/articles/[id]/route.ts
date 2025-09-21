import { NextRequest, NextResponse } from "next/server";
import { ArticlesKecamatanService } from "@/lib/prisma-service/articleskecamatanService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { ArticleStatus, ArticleUpdate } from "@/types/article";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const article = await ArticlesKecamatanService.getArticleById(id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error: any) {
    console.error("GET /api/articles/[id] error:", error);
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
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }
    const existingArticle = await ArticlesKecamatanService.getArticleById(id);
    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const desa_id = formData.get("desa_id") as string;
    const kategori_id = formData.get("kategori_id") as string;
    const sub_kategori_id = formData.get("sub_kategori_id") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const featured_image = formData.get("featured_image") as File | null;
    const waktu_kegiatan = formData.get("waktu_kegiatan") as string;
    const lokasi_kegiatan = formData.get("lokasi_kegiatan") as string;
    const status = formData.get("status") as string;
    const published_at = formData.get("published_at") as string;

    // Validation
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined =
      existingArticle.featured_image || undefined;

    if (featured_image && featured_image.size > 0) {
      const defaultImages = [
        "/assets/default/image-not-available.png",
        "/assets/default/default.jpg",
      ];
      try {
        if (
          existingArticle.featured_image &&
          !defaultImages.includes(existingArticle.featured_image)
        ) {
          // Delete old image if it exists
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingArticle.featured_image
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        const bytes = await featured_image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(featured_image.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "articles"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        imagePath = `/assets/uploads/articles/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const updateData: ArticleUpdate = {
      desa_id: desa_id ? parseInt(desa_id) : null,
      kategori_id: kategori_id ? parseInt(kategori_id) : null,
      sub_kategori_id: sub_kategori_id ? parseInt(sub_kategori_id) : null,
      title,
      slug,
      content,
      featured_image: imagePath,
      waktu_kegiatan: new Date(waktu_kegiatan).toISOString() || null,
      lokasi_kegiatan,
      status: status as ArticleStatus,
      published_at:
        new Date(published_at).toISOString() || new Date().toISOString(),
    };
    if (!updateData) {
      return NextResponse.json(
        { error: "Failed to update article" },
        { status: 500 }
      );
    }
    const updatedArticle = await ArticlesKecamatanService.updateArticle(
      id,
      updateData
    );
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/articles/[id] error:", error);
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
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const existingArticle = await ArticlesKecamatanService.getArticleById(id);
    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Delete the article
    await ArticlesKecamatanService.deleteArticle(id);

    // Optionally delete the featured image if it exists
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    if (
      existingArticle.featured_image &&
      !defaultImages.includes(existingArticle.featured_image)
    ) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        existingArticle.featured_image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/articles/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
