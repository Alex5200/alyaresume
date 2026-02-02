// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Проверяем тип файла
        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
        }

        // Создаем уникальное имя файла
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${timestamp}-${originalName}`;

        // Путь к папке public/pdf
        const uploadDir = path.join(process.cwd(), "public", "pdf");

        // Создаем папку если её нет
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Папка уже существует
        }

        // Конвертируем файл в Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Сохраняем файл
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Возвращаем URL файла
        const fileUrl = `/pdf/${fileName}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            fileName: fileName,
            size: file.size
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
