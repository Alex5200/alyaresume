import { put, list, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// Проверяем окружение
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

export async function POST(request: NextRequest) {
    console.log("=== Upload POST (Vercel Blob) ===");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Is Production:", isProduction);

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Файл не предоставлен' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Разрешены только PDF файлы' }, { status: 400 });
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: 'Файл слишком большой (макс 10MB)' }, { status: 400 });
        }

        // Проверяем токен
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            console.error("BLOB_READ_WRITE_TOKEN not configured");
            return NextResponse.json(
                { error: 'Blob Storage не настроен. Добавьте BLOB_READ_WRITE_TOKEN' },
                { status: 500 }
            );
        }

        // Генерируем имя файла
        const timestamp = Date.now();
        const safeName = file.name
            .toLowerCase()
            .replace(/[^a-z0-9.-]/g, '_')
            .replace(/_{2,}/g, '_');
        const filename = `portfolio/${timestamp}_${safeName}`;

        console.log("Uploading to Vercel Blob:", filename);

        // Загружаем в Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
            token: token,
        });

        console.log("✅ Uploaded to Blob:", blob.url);

        return NextResponse.json({
            success: true,
            url: blob.url,
            filename: file.name,
            downloadUrl: blob.downloadUrl
        });

    } catch (error) {
        console.error("❌ Upload error:", error);
        return NextResponse.json(
            {
                error: 'Не удалось загрузить файл',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// GET - список файлов из Blob
export async function GET() {
    try {
        const { blobs } = await list({
            prefix: 'portfolio/',
            limit: 100,
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return NextResponse.json({
            success: true,
            files: blobs.map(blob => ({
                filename: blob.pathname.split('/').pop(),
                url: blob.url,
                size: blob.size,
                uploadedAt: blob.uploadedAt,
            })),
            count: blobs.length
        });

    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json({ error: 'Не удалось получить список файлов' }, { status: 500 });
    }
}

// DELETE - удалить из Blob
export async function DELETE(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL обязателен' }, { status: 400 });
        }

        await del(url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        console.log('🗑️ File deleted from Blob:', url);

        return NextResponse.json({
            success: true,
            message: 'Файл успешно удален'
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Не удалось удалить файл' }, { status: 500 });
    }
}
