// app/admin/portfolio/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";

interface Project {
    id: number;
    title: string;
    description: string;
    pdfUrl: string;
    category?: string;
    isActive: boolean;
    order: number;
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
    projects: Project[];
}

export default function AdminPortfolio() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/portfolio")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Admin received data:", data);

                // ✅ Проверка структуры данных
                if (!data.projects || !Array.isArray(data.projects)) {
                    console.error("Invalid data structure:", data);
                    setError("Некорректная структура данных");
                    return;
                }

                setData(data);
            })
            .catch((err) => {
                console.error("Failed to load portfolio:", err);
                setError(err.message);
            });
    }, []);

    const handleSave = async () => {
        if (!data) return;

        setSaving(true);
        try {
            const response = await fetch("/api/portfolio", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Ошибка сохранения");
            }

            alert("Портфолио успешно обновлено!");
        } catch (error) {
            console.error("Save error:", error);
            alert(`Ошибка при сохранении: ${error instanceof Error ? error.message : 'Unknown'}`);
        } finally {
            setSaving(false);
        }
    };

    const addProject = () => {
        if (!data) return;

        // ✅ Безопасное вычисление нового ID
        const existingIds = data.projects.length > 0
            ? data.projects.map((p) => p.id)
            : [0];
        const newId = Math.max(...existingIds) + 1;

        setData({
            ...data,
            projects: [
                ...data.projects,
                {
                    id: newId,
                    title: "",
                    description: "",
                    pdfUrl: "",
                    category: "Квартиры",
                    isActive: true,
                    order: data.projects.length + 1,
                },
            ],
        });
    };

    const deleteProject = (id: number) => {
        if (!data) return;
        if (!confirm("Удалить проект?")) return;

        setData({
            ...data,
            projects: data.projects.filter((p) => p.id !== id),
        });
    };

    const updateProject = (id: number, field: string, value: any) => {
        if (!data) return;

        setData({
            ...data,
            projects: data.projects.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            ),
        });
    };

    const moveProject = (index: number, direction: "up" | "down") => {
        if (!data) return;

        const projects = [...data.projects];
        const newIndex = direction === "up" ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= projects.length) return;

        [projects[index], projects[newIndex]] = [projects[newIndex], projects[index]];

        projects.forEach((p, i) => {
            p.order = i + 1;
        });

        setData({ ...data, projects });
    };

    // ✅ Обработка состояния загрузки
    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Ошибка загрузки</h2>
                    <p className="text-red-600">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4"
                        variant="outline"
                    >
                        Перезагрузить
                    </Button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="max-w-6xl mx-auto py-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#8B7355]/70">Загрузка портфолио...</span>
                </div>
            </div>
        );
    }

    // ✅ Дополнительная проверка
    if (!data.projects || !Array.isArray(data.projects)) {
        return (
            <div className="max-w-6xl mx-auto py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-yellow-800 mb-2">Некорректные данные</h2>
                    <p className="text-yellow-600">Структура данных портфолио повреждена</p>
                    <pre className="mt-4 text-xs bg-white p-4 rounded overflow-auto">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Редактирование портфолио</h1>
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить"}
                </Button>
            </div>

            {/* Заголовок секции */}
            <Card>
                <CardHeader>
                    <CardTitle>Заголовок секции</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-2">Основной заголовок</label>
                        <Input
                            value={data.heading?.main || ""}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    heading: { ...data.heading, main: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">Описание</label>
                        <Textarea
                            value={data.heading?.description || ""}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    heading: { ...data.heading, description: e.target.value },
                                })
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* CTA Button */}
            <Card>
                <CardHeader>
                    <CardTitle>Кнопка призыва к действию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-2">Текст кнопки</label>
                        <Input
                            value={data.ctaButton?.text || ""}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    ctaButton: { ...data.ctaButton, text: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">Ссылка</label>
                        <Input
                            value={data.ctaButton?.link || ""}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    ctaButton: { ...data.ctaButton, link: e.target.value },
                                })
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Проекты */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Проекты ({data.projects.length})
                </h2>
                <Button onClick={addProject} variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить проект
                </Button>
            </div>

            {data.projects.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center text-gray-500">
                        <p>Нет проектов. Нажмите "Добавить проект" чтобы создать первый.</p>
                    </CardContent>
                </Card>
            ) : (
                data.projects
                    .sort((a, b) => a.order - b.order)
                    .map((project, index) => (
                        <Card key={project.id} className={!project.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Проект #{project.order}: {project.title || "Без названия"}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => moveProject(index, "up")}
                                            disabled={index === 0}
                                        >
                                            <MoveUp className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => moveProject(index, "down")}
                                            disabled={index === data.projects.length - 1}
                                        >
                                            <MoveDown className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => deleteProject(project.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Название</label>
                                        <Input
                                            value={project.title}
                                            onChange={(e) =>
                                                updateProject(project.id, "title", e.target.value)
                                            }
                                            placeholder="Дизайн проект квартиры"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Категория</label>
                                        <Input
                                            value={project.category || ""}
                                            onChange={(e) =>
                                                updateProject(project.id, "category", e.target.value)
                                            }
                                            placeholder="Квартиры"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">Описание</label>
                                    <Textarea
                                        value={project.description}
                                        onChange={(e) =>
                                            updateProject(project.id, "description", e.target.value)
                                        }
                                        placeholder="Детализированный чертеж..."
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">PDF файл</label>
                                    <FileUpload
                                        currentFile={project.pdfUrl}
                                        onUploadComplete={(url) => updateProject(project.id, "pdfUrl", url)}
                                    />
                                    {project.pdfUrl && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            Текущий: <code className="bg-gray-100 px-2 py-1 rounded">{project.pdfUrl}</code>
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={project.isActive}
                                        onChange={(e) =>
                                            updateProject(project.id, "isActive", e.target.checked)
                                        }
                                        className="w-4 h-4 text-[#8B7355] bg-gray-100 border-gray-300 rounded focus:ring-[#8B7355] focus:ring-2"
                                    />
                                    <label className="text-sm font-medium">Показывать на сайте</label>
                                </div>
                            </CardContent>
                        </Card>
                    ))
            )}

            <div className="flex justify-end pb-8">
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить все изменения"}
                </Button>
            </div>
        </div>
    );
}
