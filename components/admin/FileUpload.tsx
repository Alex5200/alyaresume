// components/admin/FileUpload.tsx
"use client";
import { useState, useRef } from "react";
import { Upload, File, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
    onUploadComplete: (url: string) => void;
    currentFile?: string;
}

export default function FileUpload({ onUploadComplete, currentFile }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(currentFile || "");
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        console.log("=== FileUpload handleUpload ===");
        console.log("File:", file.name, file.size, file.type);

        if (!file) {
            console.error("No file provided");
            return;
        }

        // Проверка размера файла
        if (file.size > 10 * 1024 * 1024) {
            setError("Файл слишком большой. Максимум 10MB");
            alert("Файл слишком большой. Максимум 10MB");
            return;
        }

        // Проверка типа файла
        if (file.type !== "application/pdf") {
            setError("Можно загружать только PDF файлы");
            alert("Можно загружать только PDF файлы");
            return;
        }

        setUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            console.log("Sending to /api/upload...");

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", response.status);

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            setUploadedFile(data.url);
            onUploadComplete(data.url);
            alert("Файл успешно загружен!");
            console.log("✅ Upload successful:", data.url);

        } catch (error) {
            console.error("❌ Upload error:", error);
            const errorMsg = error instanceof Error ? error.message : "Неизвестная ошибка";
            setError(errorMsg);
            alert("Ошибка при загрузке файла: " + errorMsg);
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        console.log("File dropped");

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        console.log("File selected");

        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        console.log("Button clicked, opening file dialog");
        fileInputRef.current?.click();
    };

    const clearFile = () => {
        setUploadedFile("");
        setError("");
        onUploadComplete("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleChange}
                className="hidden"
            />

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {!uploadedFile ? (
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragActive
                            ? "border-[#D4A574] bg-[#D4A574]/5"
                            : "border-gray-300 hover:border-[#8B7355]"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-12 h-12 text-[#8B7355] animate-spin" />
                            <p className="text-[#8B7355]/70">Загрузка файла...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#8B7355]/10 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-[#8B7355]" />
                            </div>
                            <div>
                                <p className="text-[#8B7355] font-medium mb-1">
                                    Перетащите PDF файл сюда
                                </p>
                                <p className="text-[#8B7355]/60 text-sm">или</p>
                            </div>
                            <Button
                                type="button"
                                onClick={handleButtonClick}
                                disabled={uploading}
                                className="bg-[#8B7355] hover:bg-[#D4A574] text-white"
                            >
                                Выбрать файл
                            </Button>
                            <p className="text-xs text-[#8B7355]/50">
                                Максимальный размер: 10MB
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="border-2 border-[#8B7355]/20 rounded-xl p-6 bg-[#F5F0E8]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#8B7355]/10 flex items-center justify-center">
                                <File className="w-6 h-6 text-[#8B7355]" />
                            </div>
                            <div>
                                <p className="text-[#8B7355] font-medium">PDF загружен</p>
                                <p className="text-[#8B7355]/60 text-sm break-all">{uploadedFile}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleButtonClick}
                                disabled={uploading}
                            >
                                Заменить
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={clearFile}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
