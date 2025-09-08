"use client";

import React from "react";

type Props = { src: string };

// Лёгкий fallback‑viewer без внешних пакетов (исправляет ошибку отсутствия @react-pdf-viewer/*)
export default function PdfViewerClient({ src }: Props) {
  if (!src) {
    return <div className="card p-4 text-black">Не указан путь к PDF.</div>;
  }
  return (
    <div className="card overflow-hidden">
      <object data={src} type="application/pdf" className="w-full" style={{ minHeight: "80vh" }}>
        <p className="p-4 text-black">
          Не удалось отобразить PDF. Вы можете открыть его по ссылке: {" "}
          <a href={src} target="_blank" rel="noreferrer" className="primary-link">Открыть PDF</a>
        </p>
      </object>
    </div>
  );
}