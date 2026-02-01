// components/SitePlans.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ZoomIn, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SitePlan {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    area: string;
    year: string;
}

const SitePlanCard = ({ plan }: { plan: SitePlan }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card className="group overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2">
                <div className="relative h-80 lg:h-96 bg-slate-950 cursor-pointer" onClick={() => setIsOpen(true)}>
                    <Image
                        src={plan.imageUrl}
                        alt={plan.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="lg" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20">
                            <ZoomIn className="w-5 h-5 mr-2" />
                            Увеличить
                        </Button>
                    </div>

                    {/* Category Badge */}
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-800 text-white border-0 shadow-lg">
                        {plan.category}
                    </Badge>
                </div>

                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                        {plan.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">{plan.description}</p>

                    <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                        <span>Площадь: {plan.area}</span>
                        <span>{plan.year}</span>
                    </div>

                    <Button
                        className="w-full bg-gradient-to-r from-green-500/10 to-green-800/10 hover:from-green-500/20 hover:to-green-800/20 text-green-400 border border-green-500/30"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать план
                    </Button>
                </CardContent>
            </Card>

            {/* Fullscreen Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-7xl h-[90vh] bg-slate-900 border border-white/10 p-0">
                    <DialogHeader className="px-6 py-4 border-b border-white/10">
                        <DialogTitle className="text-xl font-bold text-white">{plan.title}</DialogTitle>
                        <DialogDescription className="text-white/60">{plan.description}</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-auto p-6 relative">
                        <div className="relative w-full h-full min-h-[600px]">
                            <Image
                                src={plan.imageUrl}
                                alt={plan.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function SitePlans() {
    const plans: SitePlan[] = [
        {
            id: 1,
            title: "Генеральный план участка",
            description: "Комплексный план благоустройства территории с ландшафтным дизайном",
            imageUrl: "/site-plans/plan-1.jpg", // Замените на ваши изображения
            category: "Генплан",
            area: "2500 м²",
            year: "2024 г."
        },
        {
            id: 2,
            title: "План участка с зонированием",
            description: "Детальная планировка с функциональным зонированием территории",
            imageUrl: "/site-plans/plan-2.jpg",
            category: "Зонирование",
            area: "1800 м²",
            year: "2023 г."
        },
        {
            id: 3,
            title: "Ситуационный план",
            description: "Архитектурный план с привязкой к местности и окружению",
            imageUrl: "/site-plans/plan-3.jpg",
            category: "Ситуплан",
            area: "3200 м²",
            year: "2023 г."
        },
    ];

    return (
        <section id="site-plans" className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_60%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 lg:mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-green-800/20 text-green-400 border border-green-500/30 px-4 py-1">
                        Планы участков
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent tracking-wide">
                        Генеральные планы
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Профессиональная разработка генеральных планов участков и территорий
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <SitePlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}
