import { NextRequest, NextResponse } from "next/server";
import { getPortfolioMetadata, savePortfolioMetadata } from "@/lib/s3";

// S3 Portfolio configuration
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
      pdfUrl: process.env.S3_BUCKET_NAME 
        ? `${process.env.PUBLIC_S3_ENDPOINT}/portfolio/sample1.pdf`
        : "/pdf/1.pdf",
      category: "Квартиры",
      isActive: true,
      order: 1
    },
    {
      id: 2,
      title: "Проект 2",
      description: "Описание проекта 2",
      pdfUrl: process.env.S3_BUCKET_NAME
        ? `${process.env.PUBLIC_S3_ENDPOINT}/portfolio/sample2.pdf`
        : "/pdf/2.pdf",
      category: "Дома",
      isActive: true,
      order: 2
    }
  ]
};

// GET - Read portfolio data from S3
export async function GET() {
  try {
    console.log("=== /api/portfolio-s3 GET ===");
    console.log("Environment check:", {
      hasBucket: !!process.env.S3_BUCKET_NAME,
      hasEndpoint: !!process.env.S3_ENDPOINT,
      hasPublicEndpoint: !!process.env.PUBLIC_S3_ENDPOINT,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Получаем метаданные из S3
    const s3Data = await getPortfolioMetadata();
    
    if (s3Data) {
      console.log("Using S3 portfolio metadata, projects count:", s3Data.projects?.length || 0);
      return NextResponse.json(s3Data);
    }

    // Если в S3 нет данных - возвращаем default
    console.log("No S3 metadata found, returning DEFAULT_DATA");
    return NextResponse.json(DEFAULT_DATA);

  } catch (error) {
    console.error("GET /api/portfolio-s3 error:", error);
    // Return default data with error info
    return NextResponse.json({
      ...DEFAULT_DATA,
      _error: error instanceof Error ? error.message : String(error),
      _env_check: {
        hasBucket: !!process.env.S3_BUCKET_NAME,
        hasEndpoint: !!process.env.S3_ENDPOINT,
        hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      }
    }, { status: 200 });
  }
}

// PUT - Update portfolio data in S3
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== /api/portfolio-s3 PUT ===");
    console.log("Received body:", JSON.stringify(body, null, 2));

    // Валидация данных
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

    // Сохраняем в S3
    await savePortfolioMetadata(body);

    console.log("Portfolio saved to S3 successfully");
    return NextResponse.json({
      success: true,
      message: "Portfolio saved to S3 successfully"
    });

  } catch (error) {
    console.error("PUT /api/portfolio-s3 error:", error);
    return NextResponse.json(
      {
        error: "Failed to save portfolio to S3",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
