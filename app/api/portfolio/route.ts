import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

const DEFAULT_DATA = {
    heading: {
        main: "Портфолио работ",
        description: "Профессиональные чертежи и дизайн-проекты с детальной проработкой"
    },
    ctaButton: {
        text: "Заказать подобный проект",
        link: "#contact"
    },
    projects: [
        {
            id: 1,
            title: "Проект 1",
            description: "Описание проекта 1",
            pdfUrl: "/pdf/1.pdf",
            category: "Квартиры",
            isActive: true,
            order: 1
        },
        {
            id: 2,
            title: "Проект 2",
            description: "Описание проекта 2",
            pdfUrl: "/pdf/2.pdf",
            category: "Дома",
            isActive: true,
            order: 2
        },
        {
            id: 3,
            title: "Дизайн проект квартиры Крузенштерна",
            description: "Детализированный чертеж с полной технической документацией",
            pdfUrl: "/pdf/крузенштерна23.07.pdf",
            category: "Квартиры",
            isActive: true,
            order: 3
        }
    ]
};

export async function GET() {
    try {
        console.log("=== /api/portfolio GET ===");

        const data = await get("portfolio");
        console.log("Edge Config data:", data);

        // Если данных нет - возвращаем DEFAULT_DATA
        if (!data) {
            console.log("No Edge Config data, returning DEFAULT_DATA");
            return NextResponse.json(DEFAULT_DATA);
        }

        // Проверяем структуру
        const portfolioData = data as any;

        if (!portfolioData.projects || !Array.isArray(portfolioData.projects)) {
            console.warn("Invalid structure, returning DEFAULT_DATA");
            return NextResponse.json(DEFAULT_DATA);
        }

        // Убедимся что есть все обязательные поля
        if (!portfolioData.heading || !portfolioData.ctaButton) {
            console.warn("Missing required fields, returning DEFAULT_DATA");
            return NextResponse.json(DEFAULT_DATA);
        }

        console.log("Returning valid portfolio data");
        return NextResponse.json(portfolioData);

    } catch (error) {
        console.error("GET /api/portfolio error:", error);
        return NextResponse.json(DEFAULT_DATA);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("=== /api/portfolio PUT ===");
        console.log("Received body:", JSON.stringify(body, null, 2));

        // Валидация
        if (!body.projects || !Array.isArray(body.projects)) {
            return NextResponse.json(
                { error: "Invalid data format: projects must be an array" },
                { status: 400 }
            );
        }

        if (!body.heading || !body.ctaButton) {
            return NextResponse.json(
                { error: "Invalid data format: missing heading or ctaButton" },
                { status: 400 }
            );
        }

        const edgeConfigId = process.env.EDGE_CONFIG_ID;
        const vercelToken = process.env.VERCEL_API_TOKEN;

        if (!edgeConfigId || !vercelToken) {
            console.error("Edge Config not configured");
            return NextResponse.json(
                { error: "Edge Config not configured" },
                { status: 500 }
            );
        }

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
                            key: "portfolio",
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

        console.log("Portfolio updated successfully");
        return NextResponse.json({
            success: true,
            message: "Portfolio updated successfully"
        });

    } catch (error) {
        console.error("PUT /api/portfolio error:", error);
        return NextResponse.json(
            {
                error: "Failed to update portfolio",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
