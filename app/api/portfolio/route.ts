import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, unlink, stat } from 'fs/promises';
import path from 'path';

// POST - загрузить PDF в public/pdf
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Файл не предоставлен' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Разрешены только PDF файлы' }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'Файл слишком большой (макс 10MB)' }, { status: 400 });
        }

        // Получаем байты файла
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Сохраняем оригинальное имя файла
        const filename = file.name;

        // Путь к папке public/pdf
        const publicDir = path.join(process.cwd(), 'public', 'pdf');
        const filePath = path.join(publicDir, filename);

        // Создаём папку если не существует
        await mkdir(publicDir, { recursive: true });

        // Сохраняем файл
        await writeFile(filePath, buffer);
        console.log('✅ PDF saved:', filename);

        // URL в формате /pdf/filename.pdf
        const fileUrl = `/pdf/${filename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: filename,
            size: file.size
        });

    } catch (error) {
        console.error('❌ Upload error:', error);
        return NextResponse.json(
            {
                error: 'Не удалось загрузить файл',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// GET - получить список всех PDF из public/pdf
export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), 'public', 'pdf');

        // Создаём папку если не существует
        await mkdir(publicDir, { recursive: true });

        const files = await readdir(publicDir);
        const pdfFiles = files.filter((file: string) => file.endsWith('.pdf'));

        const fileList = await Promise.all(
            pdfFiles.map(async (file: string) => {
                const filePath = path.join(publicDir, file);
                const stats = await stat(filePath);
                return {
                    filename: file,
                    url: `/pdf/${file}`,
                    size: stats.size,
                    uploadedAt: stats.birthtime,
                };
            })
        );

        // Сортируем по дате (новые первые)
        fileList.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

        return NextResponse.json({
            success: true,
            files: fileList,
            count: fileList.length
        });

    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json({ error: 'Не удалось получить список файлов' }, { status: 500 });
    }
}

// DELETE - удалить PDF из public/pdf
export async function DELETE(request: NextRequest) {
    try {
        const { filename } = await request.json();

        if (!filename || !filename.endsWith('.pdf')) {
            return NextResponse.json({ error: 'Некорректное имя файла' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'public', 'pdf', filename);
        await unlink(filePath);

        console.log('🗑️ File deleted:', filename);

        return NextResponse.json({
            success: true,
            message: 'Файл успешно удален'
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Не удалось удалить файл' }, { status: 500 });
    }
}
