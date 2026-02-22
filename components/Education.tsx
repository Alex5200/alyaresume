// components/Education.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Sparkles } from "lucide-react";

interface EducationItem {
    id: number;
    year: string;
    title: string;
    subtitle: string;
    type: "education" | "certificate";
    isActive: boolean;
    order: number;
}

interface EducationData {
    heading: {
        main: string;
        description: string;
    };
    items: EducationItem[];
}

export default function Education() {
    const [data, setData] = useState<EducationData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/education")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load education:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-24 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#64748B]">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!data || !data.items) {
        return (
            <div className="py-24 text-center">
                <p className="text-[#64748B]">Нет данных для отображения</p>
            </div>
        );
    }

    // Фильтруем активные элементы и сортируем
    const activeItems = data.items
        .filter((item) => item.isActive)
        .sort((a, b) => a.order - b.order);

    return (
        <section id="education" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
            {/* Декоративные элементы */}
            <div className="absolute top-20 right-10 w-64 h-64 border border-[#1E3A5F]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 border border-[#1E3A5F]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1E3A5F] to-transparent mx-auto mb-6" />
                    <h2 className="text-4xl lg:text-5xl font-semibold text-[#1E293B] mb-6 tracking-tight">
                        {data.heading?.main || "Образование"}
                    </h2>
                    <div className="inline-flex gap-2 items-center">
                        <p className="text-lg text-[#64748B] font-normal leading-relaxed">
                            {data.heading?.description || "Профессиональная подготовка и квалификация"}
                        </p>
                        <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    </div>
                </div>

                {/* Timeline */}
                {activeItems.length > 0 ? (
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#1E3A5F] via-[#2E5A8B] to-[#1E3A5F]" />

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {activeItems.map((item, index) => {
                                    const Icon = item.type === "education" ? GraduationCap : Award;
                                    const isEven = index % 2 === 0;

                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative flex items-center ${
                                                isEven ? "md:flex-row" : "md:flex-row-reverse"
                                            } flex-col md:gap-8`}
                                        >
                                            {/* Year Badge - Desktop */}
                                            <div className="hidden md:block md:w-1/2" />

                                            {/* Center Circle */}
                                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#1E3A5F] to-[#2E5A8B] rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Content Card */}
                                            <Card
                                                className={`group w-full md:w-1/2 bg-white border border-[#E2E8F0] hover:border-[#1E3A5F]/30 transition-all duration-300 hover:shadow-lg rounded-xl ml-16 md:ml-0 ${
                                                    isEven ? "md:mr-8" : "md:ml-8"
                                                }`}
                                            >
                                                <CardContent className="p-8">
                                                    {/* Year Badge */}
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] rounded-md mb-4">
                            <span className="text-2xl font-medium text-[#1E3A5F]">
                              {item.year}
                            </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-xl font-medium text-[#1E293B] mb-3 group-hover:text-[#1E3A5F] transition-colors duration-300">
                                                        {item.title}
                                                    </h3>

                                                    {/* Subtitle */}
                                                    <p className="text-[#64748B] font-normal leading-relaxed">
                                                        {item.subtitle}
                                                    </p>

                                                    {/* Type Badge */}
                                                    <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                            <span
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium ${
                                    item.type === "education"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-amber-50 text-amber-600"
                                }`}
                            >
                              <Icon className="w-3 h-3" />
                                {item.type === "education"
                                    ? "Образование"
                                    : "Сертификат"}
                            </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[#64748B]">Нет записей для отображения</p>
                    </div>
                )}

                {/* Bottom Stats */}
                {/*{activeItems.length > 0 && (*/}
                {/*    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20">*/}
                {/*        {[*/}
                {/*            {*/}
                {/*                value: activeItems.filter((i) => i.type === "education").length,*/}
                {/*                label: "Образование",*/}
                {/*            },*/}
                {/*            {*/}
                {/*                value: activeItems.filter((i) => i.type === "certificate").length,*/}
                {/*                label: "Сертификаты",*/}
                {/*            },*/}
                {/*            {*/}
                {/*                value: "7+",*/}
                {/*                label: "Лет опыта",*/}
                {/*            },*/}
                {/*            {*/}
                {/*                value: "50+",*/}
                {/*                label: "Проектов",*/}
                {/*            },*/}
                {/*        ].map((stat, idx) => (*/}
                {/*            <Card*/}
                {/*                key={idx}*/}
                {/*                className="bg-white border border-[#E2E8F0] hover:border-[#1E3A5F]/30 transition-all duration-300 rounded-xl"*/}
                {/*            >*/}
                {/*                <CardContent className="p-6 text-center">*/}
                {/*                    <div className="text-3xl font-medium text-[#1E3A5F] mb-2">*/}
                {/*                        {stat.value}*/}
                {/*                    </div>*/}
                {/*                    <div className="text-sm text-[#64748B] font-normal">*/}
                {/*                        {stat.label}*/}
                {/*                    </div>*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </section>
    );
}
