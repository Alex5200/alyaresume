"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";

export default function RoomPdfPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const room = params?.room as string;
  const src = searchParams.get("src");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [loading, setLoading] = useState<boolean>(false);
  interface PdfLike {
    numPages: number;
    getPage: (pageNumber: number) => Promise<{
      getViewport: (params: { scale: number }) => { width: number; height: number };
      render: (params: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
    }>;
  }
  const pdfRef = useRef<PdfLike | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!src) return;
      try {
        setLoading(true);
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.149/build/pdf.worker.min.mjs";
        const loadingTask = pdfjsLib.getDocument(src);
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        // pdfRef.current = pdf;
        // setPageCount(pdf.numPages);
        setPageNumber(1);
      } catch (e) {
        console.error("PDF load error", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const render = async () => {
      const pdf = pdfRef.current;
      const canvas = canvasRef.current;
      if (!pdf || !canvas) return;
      try {
        setLoading(true);
        const page = await pdf.getPage(pageNumber);
        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const viewport = page.getViewport({ scale: scale * dpr });
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.width = viewport.width as number;
        canvas.height = viewport.height as number;
        canvas.style.width = `${(viewport.width as number) / dpr}px`;
        canvas.style.height = `${(viewport.height as number) / dpr}px`;
        await page.render({ canvasContext: context, viewport }).promise;
      } catch (e) {
        console.error("PDF render error", e);
      } finally {
        setLoading(false);
      }
    };
    render();
  }, [pageNumber, scale]);

  return (
    <main className="section container mx-auto px-4">
      <div className="mb-4">
        <Link href="/" className="primary-link text-4xl text-white">← На главную</Link>
      </div>
      <h1 className="section-title text-white mb-4">PDF визуализация: {room}</h1>
      {!src ? (
        <div className="card p-4 text-black">
          <p className="mb-2">Не передан параметр src. Добавьте к URL параметр src с путём к PDF, например:</p>
          <code className="break-words text-xs">/[room]/pdf?src=/pdf/крузенштерна23.07.pdf</code>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-black text-2xl">Просмотр PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Button size="sm" className="text-xl" variant="outline" onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1 || loading}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Назад</span>
              </Button>
              <Button size="sm" className="text-xl" variant="outline" onClick={() => setPageNumber(p => Math.min(pageCount || 1, p + 1))} disabled={pageNumber >= pageCount || loading}>
                <span>Вперёд</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <div className="text-sm text-black/80">Стр. {pageNumber} / {pageCount || "?"}</div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setScale(s => Math.max(0.5, +(s - 0.1).toFixed(2)))} disabled={loading}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <div className="text-sm text-black/80">{Math.round(scale * 100)}%</div>
                <Button size="sm" variant="outline" onClick={() => setScale(s => Math.min(3, +(s + 0.1).toFixed(2)))} disabled={loading}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" asChild variant="outline">
                  <a href={src} target="_blank" rel="noreferrer" className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span>Новая вкладка</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="w-full overflow-auto">
              <canvas ref={canvasRef} className="mx-auto block bg-white" />
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
