// app/api/portfolio/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PORTFOLIO_FILE = path.join(process.cwd(), "data", "portfolio.json");

// GET - Получить портфолио
export async function GET() {
    try {
        const data = await fs.readFile(PORTFOLIO_FILE, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to read portfolio" },
            { status: 500 }
        );
    }
}

// PUT - Обновить портфолио
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(body, null, 2));
        return NextResponse.json({ message: "Portfolio updated successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update portfolio" },
            { status: 500 }
        );
    }
}
