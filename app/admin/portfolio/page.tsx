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

export default function AdminPortfolio() {
    const [data, setData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/portfolio")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/portfolio", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            alert("Портфолио успешно обновлено!");
        } catch (error) {
            alert("Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    };

    const addProject = () => {
        const newId = Math.max(...data.projects.map((p: Project) => p.id), 0) + 1;
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
        if (!confirm("Удалить проект?")) return;
        setData({
            ...data,
            projects: data.projects.filter((p: Project) => p.id !== id),
        });
    };

    const updateProject = (id: number, field: string, value: any) => {
        setData({
            ...data,
            projects: data.projects.map((p: Project) =>
                p.id === id ? { ...p, [field]: value } : p
            ),
        });
    };

    const moveProject = (index: number, direction: "up" | "down") => {
        const projects = [...data.projects];
        const newIndex = direction === "up" ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= projects.length) return;

        [projects[index], projects[newIndex]] = [projects[newIndex], projects[index]];

        projects.forEach((p, i) => {
            p.order = i + 1;
        });

        setData({ ...data, projects });
    };

    if (!data) return <div className="py-12 text-center">Загрузка...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
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
                            value={data.heading.main}
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
                            value={data.heading.description}
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
                            value={data.ctaButton.text}
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
                            value={data.ctaButton.link}
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
                <h2 className="text-2xl font-bold text-gray-800">Проекты</h2>
                <Button onClick={addProject} variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить проект
                </Button>
            </div>

            {data.projects
                .sort((a: Project, b: Project) => a.order - b.order)
                .map((project: Project, index: number) => (
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
                ))}

            <div className="flex justify-end pb-8">
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить все изменения"}
                </Button>
            </div>
        </div>
    );
}
