// app/api/portfolio/route.ts
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
            title: "Дизайн проект квартиры",
            description: "Детализированный чертеж с полной технической документацией",
            pdfUrl: "/pdf/крузенштерна23.07.pdf",
            category: "Квартиры",
            isActive: true,
            order: 1
        }
    ]
};

export async function GET() {
    try {
        const data = await get("portfolio");
        return NextResponse.json(data || DEFAULT_DATA);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(DEFAULT_DATA);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const edgeConfigId = process.env.EDGE_CONFIG_ID;
        const vercelToken = process.env.VERCEL_API_TOKEN;

        if (!edgeConfigId || !vercelToken) {
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
            throw new Error("Failed to update Edge Config");
        }

        return NextResponse.json({
            success: true,
            message: "Portfolio updated successfully"
        });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { error: "Failed to update portfolio" },
            { status: 500 }
        );
    }
}
