// app/api/education/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const EDUCATION_FILE = path.join(process.cwd(), "data", "education.json");

// GET - Получить образование
export async function GET() {
    try {
        const data = await fs.readFile(EDUCATION_FILE, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to read education" },
            { status: 500 }
        );
    }
}

// PUT - Обновить образование
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("Trying to save to:", EDUCATION_FILE);
        console.log("Data:", body);

        // Проверяем существует ли директория
        const dir = path.dirname(EDUCATION_FILE);
        try {
            await fs.access(dir);
        } catch {
            // Создаем директорию если её нет
            await fs.mkdir(dir, { recursive: true });
        }

        // Сохраняем файл
        await fs.writeFile(EDUCATION_FILE, JSON.stringify(body, null, 2), 'utf-8');

        return NextResponse.json({
            message: "Education updated successfully",
            path: EDUCATION_FILE
        });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json(
            {
                error: "Failed to update education",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}