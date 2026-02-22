// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

const DEFAULT_DATA = {
    telegram: {
        username: "@Alya_Wolf29",
        url: "https://t.me/Alya_Wolf29",
        description: "Быстрый ответ в течение часа",
        isPrimary: true
    },
    email: {
        address: "alya_wolf2907@mail.ru",
        description: "Для официальных запросов",
        isPrimary: false
    },
    workHours: "Пн-Пт: 9:00 - 18:00",
    location: "Москва, Россия",
    responseTime: "Обычно отвечаю в течение 1-2 часов",
    features: [
        "Бесплатная консультация",
        "Оценка проекта за 24 часа",
        "Индивидуальный подход",
        "Гарантия качества"
    ],
    heading: {
        main: "Давайте создадим",
        accent: "что-то прекрасное вместе"
    },
    description: "Расскажите о своем проекте, и я помогу воплотить ваши идеи в жизнь",
    ctaTitle: "Начните свой проект",
    ctaDescription: "Каждый проект уникален, и я готова уделить вам максимум внимания",
    bottomBanner: {
        title: "Готовы начать работу над проектом?",
        description: "Свяжитесь со мной сегодня, и давайте обсудим, как я могу помочь воплотить ваши идеи в жизнь"
    }
};

export async function GET() {
    try {
        // Временно используем DEFAULT_DATA вместо Edge Config
        console.log("Using default contacts data (Edge Config not available)");
        return NextResponse.json(DEFAULT_DATA);
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
                            key: "contacts",
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
            message: "Contacts updated successfully"
        });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { error: "Failed to update contacts" },
            { status: 500 }
        );
    }
}
