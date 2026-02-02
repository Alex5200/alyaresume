// app/admin/contacts/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AdminContacts() {
    const [data, setData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/contacts")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/contacts", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            alert("Контакты успешно обновлены!");
        } catch (error) {
            alert("Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    };

    if (!data) return <div>Загрузка...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Редактирование контактов</h1>
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить"}
                </Button>
            </div>

            {/* Telegram */}
            <Card>
                <CardHeader>
                    <CardTitle>Telegram</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p>Username</p>
                        <Input
                            value={data.telegram.username}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    telegram: { ...data.telegram, username: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <p>URL</p>
                        <Input
                            value={data.telegram.url}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    telegram: { ...data.telegram, url: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <p>Описание</p>
                        <Input
                            value={data.telegram.description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    telegram: { ...data.telegram, description: e.target.value },
                                })
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Email */}
            <Card>
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p>Email адрес</p>
                        <Input
                            type="email"
                            value={data.email.address}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: { ...data.email, address: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <p>Описание</p>
                        <Input
                            value={data.email.description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: { ...data.email, description: e.target.value },
                                })
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Дополнительная информация */}
            <Card>
                <CardHeader>
                    <CardTitle>Дополнительная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p>Время работы</p>
                        <Input
                            value={data.workHours}
                            onChange={(e) => setData({ ...data, workHours: e.target.value })}
                        />
                    </div>
                    <div>
                        <p>Локация</p>
                        <Input
                            value={data.location}
                            onChange={(e) => setData({ ...data, location: e.target.value })}
                        />
                    </div>
                    <div>
                        <p>Время ответа</p>
                        <Input
                            value={data.responseTime}
                            onChange={(e) => setData({ ...data, responseTime: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Заголовки */}
            <Card>
                <CardHeader>
                    <CardTitle>Заголовки секции</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p>Основной заголовок</p>
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
                        <p>Акцентный текст</p>
                        <Input
                            value={data.heading.accent}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    heading: { ...data.heading, accent: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div>
                        <p>Описание</p>
                        <Textarea
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Преимущества */}
            <Card>
                <CardHeader>
                    <CardTitle>Преимущества</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                            <Input
                                value={feature}
                                onChange={(e) => {
                                    const newFeatures = [...data.features];
                                    newFeatures[idx] = e.target.value;
                                    setData({ ...data, features: newFeatures });
                                }}
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    const newFeatures = data.features.filter(
                                        (_: any, i: number) => i !== idx
                                    );
                                    setData({ ...data, features: newFeatures });
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() =>
                            setData({ ...data, features: [...data.features, ""] })
                        }
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить преимущество
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end pb-8">
                <Button onClick={handleSave} disabled={saving} size="lg">
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить изменения"}
                </Button>
            </div>
        </div>
    );
}
