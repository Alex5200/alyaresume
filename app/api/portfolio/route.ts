// app/api/portfolio/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const DEFAULT_DATA = {
    heading: {
        main: "Портфолио работ",
        description: "Профессиональные чертежи и дизайн-проекты с детальной проработкой"
    },
    ctaButton: {
        text: "Заказать подобный проект",
        link: "#contact"
    },
    projects: []
};

export async function GET() {
    try {
        let data = await kv.get("portfolio");
        if (!data) {
            await kv.set("portfolio", DEFAULT_DATA);
            data = DEFAULT_DATA;
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(DEFAULT_DATA);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        await kv.set("portfolio", body);
        return NextResponse.json({ success: true, message: "Portfolio updated" });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { error: "Failed to update portfolio" },
            { status: 500 }
        );
    }
}
