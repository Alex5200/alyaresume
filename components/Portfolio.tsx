// components/Portfolio.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Box, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface Drawing {
    id: number;
    pdfUrl: string;
    title: string;
    description: string;
    year: string;
    pageCountId: string;
    canvasId: string;
}

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-а-яё]/g, "")
        .replace(/-+/g, "-")
        .trim();

type PdfLike = {
    numPages: number;
    getPage: (pageNumber: number) => Promise<{
        getViewport: (params: { scale: number }) => { width: number; height: number };
        render: (params: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
    }>;
};

const DrawingCard = ({ drawing }: { drawing: Drawing }) => {
    const [pageCount, setPageCount] = useState<string>("Загрузка...");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pdfRef = useRef<PdfLike | null>(null);
    useEffect(() => {
        let cancelled = false;
        const renderPDFPreview = async () => {
            try {
                const pdfjsLib = await import("pdfjs-dist");
                // Настраиваем воркер на ТУ ЖЕ версию, что и пакет (5.4.149), иначе будет ошибка несовпадения версий
                // @ts-expect-error vendor global provided at runtime
                pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.149/build/pdf.worker.min.mjs";

                // @ts-expect-error typed at runtime by pdf.js
                const loadingTask = pdfjsLib.getDocument(drawing.pdfUrl);
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.getElementById(drawing.canvasId) as HTMLCanvasElement | null;
                if (!canvas) return;
                const context = canvas.getContext("2d");
                if (!context) return;
                canvas.height = viewport.height as number;
                canvas.width = viewport.width as number;
                await page.render({ canvasContext: context, viewport }).promise;
                if (!cancelled) {
                    pdfRef.current = pdf;
                    setPageCount(`${pdf.numPages} стр.`);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Ошибка загрузки PDF:", error);
                if (!cancelled) {
                    setPageCount("Ошибка");
                    setIsLoading(false);
                }
            }
        };
        renderPDFPreview();
        return () => {
            cancelled = true;
        };
    }, [drawing.pdfUrl, drawing.canvasId]);

    // Рендер другой страницы по кнопкам навигации
    useEffect(() => {
        const renderPage = async () => {
            const pdf = pdfRef.current;
            const canvas = document.getElementById(drawing.canvasId) as HTMLCanvasElement | null;
            if (!pdf || !canvas) return;
            try {
                setIsLoading(true);
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 0.5 });
                const context = canvas.getContext("2d");
                if (!context) return;
                canvas.height = viewport.height as number;
                canvas.width = viewport.width as number;
                await page.render({ canvasContext: context, viewport }).promise;
            } catch (e) {
                console.error("Render page error", e);
            } finally {
                setIsLoading(false);
            }
        };
        renderPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    const openFullscreen = () => {
        if (typeof window !== "undefined") {
            window.open(drawing.pdfUrl, "_blank");
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1">
            <div className="relative h-48 bg-gray-50 cursor-pointer" onClick={openFullscreen}>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-black text-sm">Загрузка...</div>
                    </div>
                )}
                <canvas id={drawing.canvasId} className="w-full h-full object-contain"></canvas>
                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white hover:bg-black/70">{pageCount}</Badge>
                {/* Переключение страниц в превью */}
                <div className="absolute top-2 left-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => {
                        const total = pdfRef.current?.numPages ?? 1;
                        setPageNumber((p) => Math.min(total, p + 1));
                    }}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">{drawing.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-black mb-3 text-xs">{drawing.description}</p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-black">{drawing.year}</span>
                    <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                            <a href={`/${slugify(drawing.title)}/pdf?src=${encodeURIComponent(drawing.pdfUrl)}`} className="flex items-center">
                                <FileText className="w-4 h-4 mr-1" />
                                <span>Открыть PDF</span>
                            </a>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <a href={`/${slugify(drawing.title)}/3d`} className="flex items-center">
                                <Box className="w-4 h-4 mr-1" />
                                <span>3D Модель</span>
                            </a>
                        </Button>
                        <Button size="sm" variant="ghost" className="text-black hover:text-black/80" onClick={openFullscreen}>
                            <Maximize2 className="w-4 h-4 mr-1" />
                            <span>Полный экран</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Portfolio() {
    const drawings: Drawing[] = [
        {
            id: 1,
            pdfUrl: "/pdf/крузенштерна23.07.pdf",
            title: "Крузенштерна 23.07",
            description: "Детализированный чертеж",
            year: "2024 г.",
            pageCountId: "page-count-1",
            canvasId: "pdf-canvas-1",
        },
        {
            id: 2,
            pdfUrl: "/Краснодар.pdf",
            title: "Дизайн проект квартиры 73квм",
            description: "Детализированный чертеж",
            year: "2023 г.",
            pageCountId: "page-count-2",
            canvasId: "pdf-canvas-2",
        },
        {
            id: 3,
            pdfUrl: "/Свобода.pdf",
            title: "Дизайн проект квартиры 73квм",
            description: "Детализированный чертеж",
            year: "2023 г.",
            pageCountId: "page-count-3",
            canvasId: "pdf-canvas-3",
        },
    ];

    return (
        <section id="portfolio" className="section bg-transparent">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center text-white mb-8">Примеры работ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {drawings.map((drawing) => (
                        <DrawingCard key={drawing.id} drawing={drawing} />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <a href="#contact" className="primary-btn inline-block px-6 py-3 text-2xl text-white">
                        Заказать подобный проект
                    </a>
                </div>
            </div>
        </section>
    );
}