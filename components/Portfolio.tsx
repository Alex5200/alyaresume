"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Box, ChevronLeft, ChevronRight, Eye, X, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Drawing {
    id: number;
    pdfUrl: string;
    title: string;
    description: string;
    category?: string;
    canvasId: string;
}

interface PortfolioData {
    heading: {
        main: string;
        description: string;
    };
    ctaButton: {
        text: string;
        link: string;
    };
    projects: Array<{
        id: number;
        title: string;
        description: string;
        pdfUrl: string;
        category?: string;
        isActive: boolean;
        order: number;
    }>;
}

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-а-яё]/g, "")
        .replace(/-+/g, "-")
        .trim();

type PdfLike = any;

const isBlobUrl = (url: string) => {
    return url.includes('blob.vercel-storage.com') || url.includes('public.blob.vercel-storage.com');
};

const loadPdfDocument = async (pdfUrl: string) => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        ...(isBlobUrl(pdfUrl) && {
            httpHeaders: {},
            withCredentials: false,
        })
    });

    return await loadingTask.promise;
};

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
    const [loadError, setLoadError] = useState<string | null>(null);
    const pdfRef = useRef<PdfLike | null>(null);
    const canvasId = `preview-canvas-${pdfUrl.replace(/[^a-z0-9]/gi, '')}`;

    useEffect(() => {
        if (!isOpen) {
            setPageNumber(1);
            setScale(1.5);
            pdfRef.current = null;
            setLoadError(null);
            return;
        }

        let cancelled = false;
        const loadPDF = async () => {
            try {
                setIsLoading(true);
                setLoadError(null);
                console.log("Loading PDF from:", pdfUrl);
                const pdf = await loadPdfDocument(pdfUrl);
                if (!cancelled) {
                    pdfRef.current = pdf;
                    setTotalPages(pdf.numPages);
                    setPageNumber(1);
                    console.log("PDF loaded successfully, pages:", pdf.numPages);
                }
            } catch (error) {
                console.error("Ошибка загрузки PDF:", error);
                if (!cancelled) {
                    setLoadError("Не удалось загрузить PDF");
                    setIsLoading(false);
                }
            }
        };
        loadPDF();
        return () => { cancelled = true; };
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
            <DialogContent className="max-w-7xl h-[90vh] bg-[#F5F0E8] border border-[#8B7355]/20 p-0 overflow-hidden rounded-3xl">
                <DialogHeader className="px-8 py-6 border-b border-[#8B7355]/10">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-light text-[#8B7355]">{title}</DialogTitle>
                            <DialogDescription className="text-[#8B7355]/60 text-sm font-light mt-1">
                                Предпросмотр документа
                            </DialogDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="text-[#8B7355]/70 hover:text-[#8B7355] hover:bg-[#8B7355]/5 rounded-full flex-shrink-0">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </DialogHeader>

                {!loadError && (
                    <div className="px-8 py-4 bg-white/50 border-b border-[#8B7355]/10 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <Button size="sm" variant="outline" onClick={handlePrevPage} disabled={pageNumber === 1} className="bg-white border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] disabled:opacity-30 rounded-full">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="px-5 py-2 bg-[#D4A574]/10 text-[#8B7355] rounded-full text-sm font-light">
                                {pageNumber} / {totalPages}
                            </div>
                            <Button size="sm" variant="outline" onClick={handleNextPage} disabled={pageNumber === totalPages} className="bg-white border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] disabled:opacity-30 rounded-full">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button size="sm" variant="outline" onClick={handleZoomOut} disabled={scale <= 0.5} className="bg-white border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] disabled:opacity-30 rounded-full">
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <div className="px-5 py-2 bg-[#D4A574]/10 text-[#8B7355] rounded-full text-sm font-light min-w-[80px] text-center">
                                {Math.round(scale * 100)}%
                            </div>
                            <Button size="sm" variant="outline" onClick={handleZoomIn} disabled={scale >= 3} className="bg-white border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/5 hover:border-[#D4A574] disabled:opacity-30 rounded-full">
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                        </div>
                        {/*<Button size="sm" asChild className="bg-[#8B7355] hover:bg-[#D4A574] text-white rounded-full font-light">*/}
                        {/*    <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">*/}
                        {/*        <Download className="w-4 h-4 mr-2" />*/}
                        {/*        Скачать*/}
                        {/*    </a>*/}
                        {/*</Button>*/}
                    </div>
                )}

                <div className="flex-1 overflow-auto bg-white p-8 relative">
                    <div className="flex items-center justify-center min-h-full">
                        {loadError ? (
                            <div className="text-center">
                                <p className="text-red-600 mb-4">{loadError}</p>
                                <Button onClick={onClose} variant="outline">
                                    Закрыть
                                </Button>
                            </div>
                        ) : (
                            <>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#F5F0E8]/90 backdrop-blur-sm z-10">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-[#8B7355]/70 text-base font-light">Загрузка страницы...</span>
                                        </div>
                                    </div>
                                )}
                                <canvas id={canvasId} className="shadow-2xl shadow-[#8B7355]/20 max-w-full h-auto rounded-2xl" style={{ display: isLoading ? 'none' : 'block' }} />
                            </>
                        )}
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
    const [loadError, setLoadError] = useState<boolean>(false);
    const pdfRef = useRef<PdfLike | null>(null);

    useEffect(() => {
        let cancelled = false;
        const renderPDFPreview = async () => {
            try {
                setLoadError(false);
                const pdf = await loadPdfDocument(drawing.pdfUrl);
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
                await page.render({ canvasContext: context, canvas: canvas, viewport: scaledViewport }).promise;
                if (!cancelled) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Ошибка загрузки PDF:", drawing.pdfUrl, error);
                if (!cancelled) {
                    setIsLoading(false);
                    setLoadError(true);
                }
            }
        };
        renderPDFPreview();
        return () => { cancelled = true; };
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
                await page.render({ canvasContext: context, canvas: canvas, viewport: scaledViewport }).promise;
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
            <Card className="group overflow-hidden bg-[#F5F0E8] border border-[#8B7355]/10 hover:border-[#D4A574]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B7355]/10 hover:-translate-y-2 rounded-3xl">
                <div className="relative h-72 lg:h-80 bg-white cursor-pointer overflow-hidden rounded-t-3xl" onClick={handlePreviewClick}>
                    {isLoading && !loadError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                                <span className="text-[#8B7355]/70 text-sm font-light">Загрузка...</span>
                            </div>
                        </div>
                    )}

                    {loadError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="text-center p-4">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Не удалось загрузить превью</p>
                            </div>
                        </div>
                    ) : (
                        <canvas id={drawing.canvasId} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/80 via-[#8B7355]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <Button size="lg" className="bg-white/95 hover:bg-white text-[#8B7355] rounded-full shadow-xl backdrop-blur-sm font-light">
                                <Eye className="w-5 h-5 mr-2" />
                                Посмотреть
                            </Button>
                        </div>
                    </div>

                    {totalPages > 1 && !loadError && (
                        <div className="absolute top-4 left-1/4 flex gap-2 z-20" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="outline" className="h-9 px-3 bg-white/90 backdrop-blur-md border-[#8B7355]/20 hover:bg-white text-[#8B7355] disabled:opacity-30 rounded-full" onClick={handlePrevPage} disabled={pageNumber === 1}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="bg-white/90 backdrop-blur-md text-[#8B7355] border border-[#8B7355]/20 h-9 px-4 flex items-center rounded-full text-sm font-light">
                                {pageNumber} / {totalPages}
                            </div>
                            <Button size="sm" variant="outline" className="h-9 px-3 bg-white/90 backdrop-blur-md border-[#8B7355]/20 hover:bg-white text-[#8B7355] disabled:opacity-30 rounded-full" onClick={handleNextPage} disabled={pageNumber === totalPages}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {drawing.category && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r bg-[#8B7355] rounded-2xl p-2 text-white border-0 shadow-lg">
                            {drawing.category}
                        </Badge>
                    )}
                </div>
                <CardContent className="p-6 space-y-4">
                    <div>
                        <h3 className="text-xl font-light text-[#8B7355] mb-2 group-hover:text-[#D4A574] transition-colors duration-300">
                            {drawing.title}
                        </h3>
                        <p className="text-[#8B7355]/60 text-sm font-light leading-relaxed">{drawing.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <Button asChild size="sm" className="flex-1 bg-[#8B7355] hover:bg-[#D4A574] text-white rounded-full font-light shadow-lg shadow-[#8B7355]/20">
                            <a href={`/${slugify(drawing.title)}/pdf?src=${encodeURIComponent(drawing.pdfUrl)}`} className="flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>PDF</span>
                            </a>
                        </Button>
                        <Button asChild size="sm" className="flex-1 bg-[#D4A574] hover:bg-[#8B7355] text-white rounded-full font-light shadow-lg shadow-[#D4A574]/20">
                            <a href={`/${slugify(drawing.title)}/3d`} className="flex items-center justify-center gap-2">
                                <Box className="w-4 h-4" />
                                <span>3D</span>
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <PDFPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} pdfUrl={drawing.pdfUrl} title={drawing.title} />
        </>
    );
};

export default function Portfolio() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);

        // ✅ Загружаем из API, если не получилось - из localStorage
        fetch("/api/portfolio")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((apiData) => {
                console.log("Portfolio data from API:", apiData);

                // ✅ Пытаемся взять из localStorage если есть более свежие данные
                const localData = localStorage.getItem('portfolio_backup');
                if (localData) {
                    try {
                        const parsedLocal = JSON.parse(localData);
                        console.log("Portfolio data from localStorage:", parsedLocal);

                        // Если в localStorage больше проектов или есть Blob URLs - используем его
                        if (parsedLocal.projects && Array.isArray(parsedLocal.projects)) {
                            const hasBlob URLs = parsedLocal.projects.some((p: any) =>
                                p.pdfUrl && isBlobUrl(p.pdfUrl)
                            );

                            if (hasBlob || parsedLocal.projects.length > apiData.projects?.length) {
                                console.log("Using localStorage data (has Blob URLs or more projects)");
                                setData(parsedLocal);
                                setIsLoading(false);
                                return;
                            }
                        }
                    } catch (e) {
                        console.error("Failed to parse localStorage:", e);
                    }
                }

                // Используем данные из API
                setData(apiData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load from API, trying localStorage:", err);

                // ✅ Fallback на localStorage
                const localData = localStorage.getItem('portfolio_backup');
                if (localData) {
                    try {
                        const parsedLocal = JSON.parse(localData);
                        console.log("Using localStorage fallback:", parsedLocal);
                        setData(parsedLocal);
                    } catch (parseErr) {
                        setError("Не удалось загрузить данные");
                    }
                } else {
                    setError(err.message);
                }
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="py-24 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#8B7355]/70">Загрузка портфолио...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-24 text-center">
                <p className="text-red-600">Ошибка загрузки: {error}</p>
            </div>
        );
    }

    if (!data || !data.projects || !Array.isArray(data.projects)) {
        return (
            <div className="py-24 text-center">
                <p className="text-[#8B7355]/70">Проекты не найдены</p>
            </div>
        );
    }

    const activeProjects = data.projects
        .filter(p => p.isActive !== false)
        .sort((a, b) => a.order - b.order)
        .map(p => ({
            id: p.id,
            pdfUrl: p.pdfUrl,
            title: p.title,
            description: p.description,
            category: p.category,
            canvasId: `pdf-canvas-${p.id}`
        }));

    if (activeProjects.length === 0) {
        return (
            <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden blueprint-pattern">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-light text-[#8B7355] mb-6">
                        {data.heading?.main || "Портфолио"}
                    </h2>
                    <p className="text-[#8B7355]/60">Проекты скоро появятся</p>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden blueprint-pattern">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6 animate-pulse" />
                    <h2 className="text-4xl lg:text-5xl font-light text-[#8B7355] mb-6 tracking-tight">
                        {data.heading.main}
                    </h2>
                    <div className="inline-flex gap-2">
                        <p className="text-lg text-[#8B7355]/60 font-light leading-relaxed">
                            {data.heading.description}
                        </p>
                        <Sparkles className="w-4 h-4 text-[#D4A574] animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {activeProjects.map((drawing) => (
                        <DrawingCard key={drawing.id} drawing={drawing} />
                    ))}
                </div>

                {data.ctaButton && (
                    <div className="text-center mt-16">
                        <Button asChild size="lg" className="px-10 py-6 bg-[#8B7355] hover:bg-[#D4A574] text-white rounded-full font-light tracking-wide transition-all duration-500 shadow-xl shadow-[#8B7355]/20 hover:shadow-2xl hover:shadow-[#D4A574]/30">
                            <a href={data.ctaButton.link}>{data.ctaButton.text}</a>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
