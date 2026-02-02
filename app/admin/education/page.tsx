// app/admin/education/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, MoveUp, MoveDown, GraduationCap, Award } from "lucide-react";

interface EducationItem {
    id: number;
    year: string;
    title: string;
    subtitle: string;
    type: "education" | "certificate";
    isActive: boolean;
    order: number;
}

export default function AdminEducation() {
    const [data, setData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/education")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/education", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            alert("Образование успешно обновлено!");
        } catch (error) {
            alert("Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    };

    const addItem = () => {
        const newId = Math.max(...data.items.map((i: EducationItem) => i.id), 0) + 1;
        setData({
            ...data,
            items: [
                ...data.items,
                {
                    id: newId,
                    year: new Date().getFullYear().toString(),
                    title: "",
                    subtitle: "",
                    type: "education",
                    isActive: true,
                    order: data.items.length + 1,
                },
            ],
        });
    };

    const deleteItem = (id: number) => {
        if (!confirm("Удалить запись?")) return;
        setData({
            ...data,
            items: data.items.filter((i: EducationItem) => i.id !== id),
        });
    };

    const updateItem = (id: number, field: string, value: any) => {
        setData({
            ...data,
            items: data.items.map((i: EducationItem) =>
                i.id === id ? { ...i, [field]: value } : i
            ),
        });
    };

    const moveItem = (index: number, direction: "up" | "down") => {
        const items = [...data.items];
        const newIndex = direction === "up" ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= items.length) return;

        [items[index], items[newIndex]] = [items[newIndex], items[index]];

        items.forEach((item, i) => {
            item.order = i + 1;
        });

        setData({ ...data, items });
    };

    if (!data) return <div className="py-12 text-center">Загрузка...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Редактирование образования</h1>
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
                        <Input
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

            {/* Список записей */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Записи</h2>
                <Button onClick={addItem} variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить запись
                </Button>
            </div>

            {data.items
                .sort((a: EducationItem, b: EducationItem) => a.order - b.order)
                .map((item: EducationItem, index: number) => {
                    const Icon = item.type === "education" ? GraduationCap : Award;

                    return (
                        <Card key={item.id} className={!item.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            item.type === "education" ? "bg-blue-100" : "bg-amber-100"
                                        }`}>
                                            <Icon className={`w-5 h-5 ${
                                                item.type === "education" ? "text-blue-600" : "text-amber-600"
                                            }`} />
                                        </div>
                                        <CardTitle className="text-lg">
                                            #{item.order}: {item.year} - {item.title || "Без названия"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => moveItem(index, "up")}
                                            disabled={index === 0}
                                        >
                                            <MoveUp className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => moveItem(index, "down")}
                                            disabled={index === data.items.length - 1}
                                        >
                                            <MoveDown className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Год</label>
                                        <Input
                                            value={item.year}
                                            onChange={(e) => updateItem(item.id, "year", e.target.value)}
                                            placeholder="2023"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium block mb-2">Название</label>
                                        <Input
                                            value={item.title}
                                            onChange={(e) => updateItem(item.id, "title", e.target.value)}
                                            placeholder="Московский технологический институт"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">Описание</label>
                                    <Textarea
                                        value={item.subtitle}
                                        onChange={(e) => updateItem(item.id, "subtitle", e.target.value)}
                                        placeholder="Строительство, Промышленное и гражданское строительство"
                                        rows={2}
                                    />
                                </div>

                                <div className="flex items-center gap-6">
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Тип</label>
                                        <select
                                            value={item.type}
                                            onChange={(e) =>
                                                updateItem(item.id, "type", e.target.value as "education" | "certificate")
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                                        >
                                            <option value="education">Образование</option>
                                            <option value="certificate">Сертификат</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2 pt-6">
                                        <input
                                            type="checkbox"
                                            checked={item.isActive}
                                            onChange={(e) => updateItem(item.id, "isActive", e.target.checked)}
                                            className="w-4 h-4 text-[#8B7355] bg-gray-100 border-gray-300 rounded focus:ring-[#8B7355] focus:ring-2"
                                        />
                                        <label className="text-sm font-medium">Показывать</label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

            <div className="flex justify-end pb-8">
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить все изменения"}
                </Button>
            </div>
        </div>
    );
}
