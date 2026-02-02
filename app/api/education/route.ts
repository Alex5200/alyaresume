// app/api/education/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const DEFAULT_DATA = {
    heading: {
        main: "Образование",
        description: "Профессиональная подготовка и квалификация"
    },
    items: [
        {
            id: 1,
            year: "2027",
            title: "Московский технологический институт \"ВТУ\", Москва",
            subtitle: "Строительство, Промышленное и гражданское строительство",
            type: "education",
            isActive: true,
            order: 1
        },
        {
            id: 2,
            year: "2023",
            title: "Колледж Архитектуры Дизайна и Реинжиниринга №26",
            subtitle: "Дизайн по отраслям 2019-2023г",
            type: "education",
            isActive: true,
            order: 2
        }
    ]
};

// GET - Получить образование
export async function GET() {
    try {
        let data = await kv.get("education");

        // Если данных нет, создаем дефолтные
        if (!data) {
            await kv.set("education", DEFAULT_DATA);
            data = DEFAULT_DATA;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("GET error:", error);
        // Возвращаем дефолтные данные при ошибке
        return NextResponse.json(DEFAULT_DATA);
    }
}

// PUT - Обновить образование
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Валидация данных
        if (!body.heading || !body.items) {
            return NextResponse.json(
                { error: "Invalid data format" },
                { status: 400 }
            );
        }

        await kv.set("education", body);

        return NextResponse.json({
            success: true,
            message: "Education updated successfully"
        });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            {
                error: "Failed to update education",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
