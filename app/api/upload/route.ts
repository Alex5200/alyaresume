import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'Файл слишком большой (макс 10MB)' },
                { status: 400 }
            );
        }

        // Получаем байты файла
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Генерируем безопасное имя файла
        const timestamp = Date.now();
        const safeName = file.name
            .toLowerCase()
            .replace(/[^a-zа-я0-9.-]/g, '_')
            .replace(/_{2,}/g, '_');
        const filename = `${timestamp}_${safeName}`;

        // Путь к папке public/pdf
        const publicDir = path.join(process.cwd(), 'public', 'pdf');
        const filePath = path.join(publicDir, filename);

        // Создаём папку если не существует
        try {
            await mkdir(publicDir, { recursive: true });
        } catch (error) {
            console.log('Directory already exists or created');
        }

        // Сохраняем файл
        await writeFile(filePath, buffer);
        console.log('File saved:', filePath);

        // URL для доступа к файлу
        const fileUrl = `/pdf/${filename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: filename,
            size: file.size,
            path: filePath
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

// GET - получить список всех PDF
export async function GET() {
    try {
        const fs = require('fs').promises;
        const publicDir = path.join(process.cwd(), 'public', 'pdf');

        // Создаём папку если не существует
        try {
            await mkdir(publicDir, { recursive: true });
        } catch (error) {
            // Папка уже существует
        }

        const files = await fs.readdir(publicDir);
        const pdfFiles = files.filter((file: string) => file.endsWith('.pdf'));

        const fileList = await Promise.all(
            pdfFiles.map(async (file: string) => {
                const filePath = path.join(publicDir, file);
                const stats = await fs.stat(filePath);
                return {
                    filename: file,
                    url: `/pdf/${file}`,
                    size: stats.size,
                    uploadedAt: stats.birthtime,
                };
            })
        );

        return NextResponse.json({
            success: true,
            files: fileList
        });

    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json(
            { error: 'Не удалось получить список файлов' },
            { status: 500 }
        );
    }
}

// DELETE - удалить файл
export async function DELETE(request: NextRequest) {
    try {
        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json(
                { error: 'Имя файла обязательно' },
                { status: 400 }
            );
        }

        const { unlink } = require('fs').promises;
        const filePath = path.join(process.cwd(), 'public', 'pdf', filename);

        await unlink(filePath);

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
