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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file) return;

        // Проверка размера файла (максимум 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("Файл слишком большой. Максимум 10MB");
            return;
        }

        // Проверка типа файла
        if (file.type !== "application/pdf") {
            alert("Можно загружать только PDF файлы");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setUploadedFile(data.url);
            onUploadComplete(data.url);
            alert("Файл успешно загружен!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Ошибка при загрузке файла");
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

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const clearFile = () => {
        setUploadedFile("");
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
                                <p className="text-[#8B7355]/60 text-sm">{uploadedFile}</p>
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
