import { put, list, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// POST - загрузка файла
export async function POST(request: NextRequest) {
    try {
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

        const MAX_SIZE = 20 * 1024 * 1024; // 20MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'Файл слишком большой (макс 20MB)' },
                { status: 400 }
            );
        }

        // Генерируем уникальное имя
        const timestamp = Date.now();
        const safeName = file.name
            .replace(/[^a-zA-Zа-яА-Я0-9.-]/g, '_')
            .replace(/_{2,}/g, '_');
        const filename = `portfolio/${timestamp}_${safeName}`;

        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: false,
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
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// GET - список всех файлов
export async function GET() {
    try {
        const { blobs } = await list({
            prefix: 'portfolio/',
            limit: 100
        });

        return NextResponse.json({
            success: true,
            files: blobs.map(blob => ({
                url: blob.url,
                pathname: blob.pathname,
                size: blob.size,
                uploadedAt: blob.uploadedAt,
                downloadUrl: blob.downloadUrl
            }))
        });

    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json(
            { error: 'Не удалось получить список файлов' },
            { status: 500 }
        );
    }
}

// DELETE - удаление файла
export async function DELETE(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url || !url.includes('blob.vercel-storage.com')) {
            return NextResponse.json(
                { error: 'Некорректный URL' },
                { status: 400 }
            );
        }

        await del(url);

        return NextResponse.json({
            success: true,
            message: 'Файл успешно удален'
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { error: 'Не удалось удалить файл' },
            { status: 500 }
        );
    }
}
