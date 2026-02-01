// components/Portfolio.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Box, Maximize2, ChevronLeft, ChevronRight, Eye, X, ZoomIn, ZoomOut, Download } from "lucide-react";

interface Drawing {
    id: number;
    pdfUrl: string;
    title: string;
    description: string;
    year: string;
    category?: string;
    canvasId: string;
}

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-а-яё]/g, "")
        .replace(/-+/g, "-")
        .trim();

type PdfLike = any;

// PDF Preview Modal Component
const PDFPreviewModal = ({
                             isOpen,
                             onClose,
                             pdfUrl,
                             title
                         }: {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.5);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pdfRef = useRef<PdfLike | null>(null);
    const canvasId = `preview-canvas-${pdfUrl.replace(/[^a-z0-9]/gi, '')}`;

    useEffect(() => {
        if (!isOpen) {
            setPageNumber(1);
            setScale(1.5);
            pdfRef.current = null;
            return;
        }

        let cancelled = false;
        const loadPDF = async () => {
            try {
                setIsLoading(true);
                const pdfjsLib = await import("pdfjs-dist");

                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

                const loadingTask = pdfjsLib.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;

                if (!cancelled) {
                    pdfRef.current = pdf;
                    setTotalPages(pdf.numPages);
                    setPageNumber(1);
                }
            } catch (error) {
                console.error("Ошибка загрузки PDF:", error);
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadPDF();
        return () => {
            cancelled = true;
        };
    }, [isOpen, pdfUrl]);

    useEffect(() => {
        if (!isOpen || !pdfRef.current) return;

        const renderPage = async () => {
            const pdf = pdfRef.current;
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
            if (!pdf || !canvas) return;

            try {
                setIsLoading(true);
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale });
                const context = canvas.getContext("2d");
                if (!context) return;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                context.clearRect(0, 0, canvas.width, canvas.height);

                await page.render({
                    canvasContext: context,
                    canvas: canvas,
                    viewport: viewport
                }).promise;
            } catch (e) {
                console.error("Render page error", e);
            } finally {
                setIsLoading(false);
            }
        };

        renderPage();
    }, [pageNumber, scale, canvasId, isOpen]);

    const handlePrevPage = () => setPageNumber((p) => Math.max(1, p - 1));
    const handleNextPage = () => setPageNumber((p) => Math.min(totalPages, p + 1));
    const handleZoomIn = () => setScale((s) => Math.min(3, s + 0.25));
    const handleZoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl h-[90vh] bg-slate-900 border border-white/10 p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-bold text-white">{title}</DialogTitle>
                            <DialogDescription className="text-white/60 text-sm mt-1">
                                Предпросмотр PDF документа
                            </DialogDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10 flex-shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="px-6 py-3 bg-slate-800/50 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handlePrevPage}
                            disabled={pageNumber === 1}
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Badge className="bg-black/40 text-white border border-white/20 px-4 py-1">
                            {pageNumber} / {totalPages}
                        </Badge>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleNextPage}
                            disabled={pageNumber === totalPages}
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleZoomOut}
                            disabled={scale <= 0.5}
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Badge className="bg-black/40 text-white border border-white/20 px-4 py-1">
                            {Math.round(scale * 100)}%
                        </Badge>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleZoomIn}
                            disabled={scale >= 3}
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0"
                    >
                        <a href={pdfUrl} download>
                            <Download className="w-4 h-4 mr-2" />
                            Скачать PDF
                        </a>
                    </Button>
                </div>

                <div className="flex-1 overflow-auto bg-slate-950 p-6 relative">
                    <div className="flex items-center justify-center min-h-full">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-white/70 text-base font-medium">Загрузка страницы...</span>
                                </div>
                            </div>
                        )}
                        <canvas
                            id={canvasId}
                            className="shadow-2xl shadow-black/50 max-w-full h-auto"
                            style={{ display: isLoading ? 'none' : 'block' }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const DrawingCard = ({ drawing }: { drawing: Drawing }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const pdfRef = useRef<PdfLike | null>(null);

    useEffect(() => {
        let cancelled = false;
        const renderPDFPreview = async () => {
            try {
                const pdfjsLib = await import("pdfjs-dist");

                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

                const loadingTask = pdfjsLib.getDocument(drawing.pdfUrl);
                const pdf = await loadingTask.promise;

                if (!cancelled) {
                    pdfRef.current = pdf;
                    setTotalPages(pdf.numPages);
                }

                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.getElementById(drawing.canvasId) as HTMLCanvasElement | null;

                if (!canvas || cancelled) return;

                const context = canvas.getContext("2d");
                if (!context) return;

                const containerWidth = canvas.parentElement?.clientWidth || 400;
                const scale = containerWidth / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                await page.render({
                    canvasContext: context,
                    canvas: canvas,
                    viewport: scaledViewport
                }).promise;

                if (!cancelled) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Ошибка загрузки PDF:", error);
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };
        renderPDFPreview();
        return () => {
            cancelled = true;
        };
    }, [drawing.pdfUrl, drawing.canvasId]);

    useEffect(() => {
        const renderPage = async () => {
            const pdf = pdfRef.current;
            const canvas = document.getElementById(drawing.canvasId) as HTMLCanvasElement | null;
            if (!pdf || !canvas) return;

            try {
                setIsLoading(true);
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 1 });
                const context = canvas.getContext("2d");
                if (!context) return;

                const containerWidth = canvas.parentElement?.clientWidth || 400;
                const scale = containerWidth / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                await page.render({
                    canvasContext: context,
                    canvas: canvas,
                    viewport: scaledViewport
                }).promise;
            } catch (e) {
                console.error("Render page error", e);
            } finally {
                setIsLoading(false);
            }
        };
        if (pdfRef.current) {
            renderPage();
        }
    }, [pageNumber, drawing.canvasId]);

    const openFullscreen = () => {
        if (typeof window !== "undefined") {
            window.open(drawing.pdfUrl, "_blank");
        }
    };

    const handlePrevPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPageNumber((p) => Math.max(1, p - 1));
    };

    const handleNextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPageNumber((p) => Math.min(totalPages, p + 1));
    };

    const handlePreviewClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPreviewOpen(true);
    };

    return (
        <>
            <Card className="group overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2">
                <div className="relative h-64 lg:h-72 bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer overflow-hidden" onClick={handlePreviewClick}>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-white/70 text-sm font-medium">Загрузка...</span>
                            </div>
                        </div>
                    )}

                    <canvas id={drawing.canvasId} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Button size="sm" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20">
                                <Eye className="w-4 h-4 mr-2" />
                                Открыть предпросмотр
                            </Button>
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="absolute top-3 left-3 flex gap-2 z-20" onClick={(e) => e.stopPropagation()}>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 bg-black/40 backdrop-blur-md border-white/20 hover:bg-black/60 text-white disabled:opacity-30"
                                onClick={handlePrevPage}
                                disabled={pageNumber === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Badge className="bg-black/40 backdrop-blur-md text-white border border-white/20 h-8 px-3 flex items-center">
                                {pageNumber} / {totalPages}
                            </Badge>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 bg-black/40 backdrop-blur-md border-white/20 hover:bg-black/60 text-white disabled:opacity-30"
                                onClick={handleNextPage}
                                disabled={pageNumber === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {drawing.category && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-800 text-white border-0 shadow-lg">
                            {drawing.category}
                        </Badge>
                    )}
                </div>

                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                        {drawing.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-white/70 text-sm leading-relaxed">{drawing.description}</p>
                        <span className="text-xs text-white/50 font-medium">{drawing.year}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            asChild
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0 shadow-lg shadow-green-500/30"
                        >
                            <a href={`/${slugify(drawing.title)}/pdf?src=${encodeURIComponent(drawing.pdfUrl)}`} className="flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>PDF</span>
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-900 hover:from-green-500 hover:to-green-800 text-white border-0 shadow-lg shadow-green-600/30"
                        >
                            <a href={`/${slugify(drawing.title)}/3d`} className="flex items-center justify-center gap-2">
                                <Box className="w-4 h-4" />
                                <span>3D</span>
                            </a>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                            onClick={openFullscreen}
                        >
                            <Maximize2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <PDFPreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                pdfUrl={drawing.pdfUrl}
                title={drawing.title}
            />
        </>
    );
};

export default function Portfolio() {
    const drawings: Drawing[] = [
        {
            id: 1,
            pdfUrl: "/pdf/крузенштерна23.07.pdf",
            title: "Крузенштерна 23.07",
            description: "Детализированный чертеж с полной технической документацией",
            year: "2024 г.",
            category: "Квартиры",
            canvasId: "pdf-canvas-1",
        },
        {
            id: 2,
            pdfUrl: "/Краснодар.pdf",
            title: "Дизайн проект квартиры 73 кв.м",
            description: "Комплексный дизайн-проект с планировочными решениями",
            year: "2023 г.",
            category: "Квартиры",
            canvasId: "pdf-canvas-2",
        },
        {
            id: 3,
            pdfUrl: "/Свобода.pdf",
            title: "Жилой комплекс Свобода",
            description: "Архитектурные чертежи и визуализации интерьера",
            year: "2023 г.",
            category: "Квартиры",
            canvasId: "pdf-canvas-3",
        },
    ];

    return (
        <section id="portfolio" className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(22,163,74,0.1),transparent_50%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-block">
                        <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-green-800/20 text-green-400 border border-green-500/30 px-4 py-1">
                            Портфолио
                        </Badge>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent tracking-wide">
                        Примеры работ
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Профессиональные чертежи и дизайн-проекты с детальной проработкой
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {drawings.map((drawing) => (
                        <DrawingCard key={drawing.id} drawing={drawing} />
                    ))}
                </div>

                <div className="text-center mt-12 lg:mt-16">
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-green-500 to-green-800 hover:from-green-400 hover:to-green-700 text-white border-0 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                    >
                        <a href="#contact">Заказать подобный проект</a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
