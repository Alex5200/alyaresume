import { NextRequest, NextResponse } from "next/server";
import { uploadToS3, deleteFromS3, listS3Files, S3_BUCKET } from "@/lib/s3";

// POST - Upload file to S3
export async function POST(request: NextRequest) {
  console.log("=== S3 Upload POST ===");

  try {
    // Check S3 configuration
    if (!S3_BUCKET) {
      return NextResponse.json(
        { error: "S3 bucket not configured. Set S3_BUCKET_NAME in .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Файл не предоставлен" }, { status: 400 });
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Разрешены только PDF файлы" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Файл слишком большой (макс 10MB)" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe filename
    const timestamp = Date.now();
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "_")
      .replace(/_{2,}/g, "_");
    const key = `portfolio/${timestamp}_${safeName}`;

    console.log("Uploading to S3:", key);

    // Upload to S3
    const url = await uploadToS3(buffer, key, file.type);

    console.log("✅ Uploaded to S3:", url);

    return NextResponse.json({
      success: true,
      url: url,
      key: key,
      filename: file.name,
    });
  } catch (error) {
    console.error("❌ S3 Upload error:", error);
    return NextResponse.json(
      {
        error: "Не удалось загрузить файл в S3",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET - List files from S3
export async function GET() {
  try {
    if (!S3_BUCKET) {
      return NextResponse.json(
        { error: "S3 not configured" },
        { status: 500 }
      );
    }

    const files = await listS3Files("portfolio/");

    return NextResponse.json({
      success: true,
      files: files.map((file) => ({
        key: file.Key,
        filename: file.Key?.split("/").pop(),
        url: `${process.env.PUBLIC_S3_ENDPOINT}/${file.Key}`,
        size: file.Size,
        lastModified: file.LastModified,
      })),
      count: files.length,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=21600, stale-while-revalidate=21600', // 6 часов
        'CDN-Cache-Control': 'public, max-age=21600',
        'Vercel-CDN-Cache-Control': 'public, max-age=21600'
      }
    });
  } catch (error) {
    console.error("S3 List error:", error);
    return NextResponse.json(
      { error: "Не удалось получить список файлов из S3" },
      { status: 500 }
    );
  }
}

// DELETE - Delete file from S3
export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json(
        { error: "Key обязателен" },
        { status: 400 }
      );
    }

    await deleteFromS3(key);

    console.log("🗑️ File deleted from S3:", key);

    return NextResponse.json({
      success: true,
      message: "Файл успешно удален из S3",
    });
  } catch (error) {
    console.error("S3 Delete error:", error);
    return NextResponse.json(
      { error: "Не удалось удалить файл из S3" },
      { status: 500 }
    );
  }
}
