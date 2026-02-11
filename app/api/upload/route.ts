import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Проверка токена
        const token = process.env.BLOB_READ_WRITE_TOKEN;

        if (!token) {
            console.error('ERROR: BLOB_READ_WRITE_TOKEN not found');
            return NextResponse.json(
                {
                    error: 'Blob Storage не настроен. Проверьте BLOB_READ_WRITE_TOKEN',
                    details: 'Environment variable missing'
                },
                { status: 500 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Файл не предоставлен' },
                { status: 400 }
            );
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Разрешены только PDF файлы' },
                { status: 400 }
            );
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'Файл слишком большой (макс 10MB)' },
                { status: 400 }
            );
        }

        // Генерируем имя файла
        const timestamp = Date.now();
        const safeName = file.name
            .toLowerCase()
            .replace(/[^a-zа-я0-9.-]/g, '_')
            .replace(/_{2,}/g, '_');
        const filename = `portfolio/${timestamp}_${safeName}`;

        // Загрузка в Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: false,
            token: token,
        });

        return NextResponse.json({
            success: true,
            url: blob.url,
            pathname: blob.pathname,
            downloadUrl: blob.downloadUrl,
            filename: file.name
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                error: 'Не удалось загрузить файл',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
