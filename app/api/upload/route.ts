import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, unlink, stat } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    console.log("=== Upload POST Request ===");

    try {
        const formData = await request.formData();
        console.log("FormData received");

        const file = formData.get('file') as File;
        console.log("File from formData:", file?.name, file?.size, file?.type);

        if (!file) {
            console.error("No file in request");
            return NextResponse.json({ error: 'Файл не предоставлен' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            console.error("Wrong file type:", file.type);
            return NextResponse.json({ error: 'Разрешены только PDF файлы' }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            console.error("File too large:", file.size);
            return NextResponse.json({ error: 'Файл слишком большой (макс 10MB)' }, { status: 400 });
        }

        // Получаем байты файла
        console.log("Reading file bytes...");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log("Buffer created, size:", buffer.length);

        // Имя файла
        const filename = file.name;
        console.log("Filename:", filename);

        // Путь к папке public/pdf
        const publicDir = path.join(process.cwd(), 'public', 'pdf');
        const filePath = path.join(publicDir, filename);
        console.log("Target path:", filePath);

        // Создаём папку если не существует
        try {
            await mkdir(publicDir, { recursive: true });
            console.log("Directory ensured:", publicDir);
        } catch (mkdirError) {
            console.log("Directory already exists or created");
        }

        // Сохраняем файл
        console.log("Writing file...");
        await writeFile(filePath, buffer);
        console.log("✅ File saved successfully:", filename);

        // URL для доступа
        const fileUrl = `/pdf/${filename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: filename,
            size: file.size
        });

    } catch (error) {
        console.error("❌ Upload error:", error);
        console.error("Error stack:", error instanceof Error ? error.stack : 'No stack');

        return NextResponse.json(
            {
                error: 'Не удалось загрузить файл',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), 'public', 'pdf');
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
