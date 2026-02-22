// app/api/education/route.ts
import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

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
        },
        {
            id: 3,
            year: "2020",
            title: "WorldSkills",
            subtitle: "WorldSkills Russia совместно с ФГБОУ «ВДЦ Орленок», Дизайн интерьера",
            type: "certificate",
            isActive: true,
            order: 3
        },
        {
            id: 4,
            year: "2018",
            title: "Свидетельство",
            subtitle: "АНОО Центр художественного и эстетического развития «Параллель»",
            type: "certificate",
            isActive: true,
            order: 4
        }
    ]
};

// GET - Получить образование
export async function GET() {
    try {
        // Временно используем DEFAULT_DATA вместо Edge Config
        console.log("Using default education data (Edge Config not available)");
        return NextResponse.json(DEFAULT_DATA);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(DEFAULT_DATA);
    }
}

// PUT - Обновить образование
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Валидация
        if (!body.heading || !body.items) {
            return NextResponse.json(
                { error: "Invalid data format" },
                { status: 400 }
            );
        }

        // Получаем токен из переменных окружения
        const edgeConfigId = process.env.EDGE_CONFIG_ID;
        const vercelToken = process.env.VERCEL_API_TOKEN;

        if (!edgeConfigId || !vercelToken) {
            return NextResponse.json(
                { error: "Edge Config not configured" },
                { status: 500 }
            );
        }

        // Обновляем через Vercel API
        const response = await fetch(
            `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${vercelToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        {
                            operation: "upsert",
                            key: "education",
                            value: body,
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Edge Config update failed:", errorText);
            throw new Error("Failed to update Edge Config");
        }

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
