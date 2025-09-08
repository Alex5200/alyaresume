"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Room3DPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const room = params?.room as string;
  const src = searchParams.get("src") || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dynamically inject the model-viewer script if not already present
    const existing = document.querySelector('script[src*="model-viewer.min.js"]');
    if (existing) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // keep the script for subsequent navigations
    };
  }, []);

  return (
    <main className="section container mx-auto px-4">
      <div className="mb-4">
        <Link href="/" className="primary-link text-3xl text-white">← На главную</Link>
      </div>
      <h1 className="section-title text-white mb-4">3D визуализация: {room}</h1>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-black text-sm">Просмотр модели</CardTitle>
        </CardHeader>
        <CardContent>
          {!loaded ? (
            <p className="text-black">Загрузка просмотрщика 3D…</p>
          ) : (
            // @ts-expect-error web component
            <model-viewer
              src={src}
              alt={`3D модель: ${room}`}
              camera-controls
              auto-rotate
              ar
              style={{ width: "100%", height: "70vh", background: "#fff" }}
            />
          )}
          <div className="mt-3 text-black text-sm">
            Текущая модель: <code className="break-words">{src}</code>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-white text-sm">
        Подсказка: добавьте к URL параметр src со ссылкой на ваш GLB/GLTF, например:
        <div>
          <code className="break-words">/[room]/3d?src=/models/room.glb</code>
        </div>
      </div>
    </main>
  );
}
