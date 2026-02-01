// components/Portfolio.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Drawing {
    id: number;
    pdfUrl?: string;
    imageUrl: string;
    title: string;
    description: string;
    year: string;
    category: string;
    area?: string;
}

const DrawingCard = ({ drawing }: { drawing: Drawing }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card className="group overflow-hidden bg-[#F5F0E8] border border-[#8B7355]/10 hover:border-[#D4A574]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B7355]/10 hover:-translate-y-2 rounded-3xl">
                <div className="relative h-80 bg-white cursor-pointer overflow-hidden" onClick={() => setIsOpen(true)}>
                    <Image
                        src={drawing.imageUrl}
                        alt={drawing.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/80 via-[#8B7355]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Button size="lg" className="bg-white/95 hover:bg-white text-[#8B7355] rounded-full shadow-xl backdrop-blur-sm">
                            <Eye className="w-5 h-5 mr-2" />
                            Посмотреть
                        </Button>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-[#D4A574] text-white text-xs font-light tracking-wide rounded-full shadow-lg">
                        {drawing.category}
                    </div>
                </div>

                <CardContent className="p-6">
                    <h3 className="text-xl font-light text-[#8B7355] mb-2 group-hover:text-[#D4A574] transition-colors duration-300">
                        {drawing.title}
                    </h3>
                    <p className="text-[#8B7355]/60 text-sm font-light leading-relaxed mb-4">
                        {drawing.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#8B7355]/50 font-light">
                        {drawing.area && <span>{drawing.area}</span>}
                        <span>{drawing.year}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Preview Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-6xl h-[90vh] bg-[#F5F0E8] border border-[#8B7355]/20 rounded-3xl p-0">
                    <DialogHeader className="px-8 py-6 border-b border-[#8B7355]/10">
                        <DialogTitle className="text-2xl font-light text-[#8B7355]">{drawing.title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-auto p-8 relative">
                        <div className="relative w-full h-full min-h-[600px]">
                            <Image
                                src={drawing.imageUrl}
                                alt={drawing.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="px-8 py-6 border-t border-[#8B7355]/10 flex gap-4">
                        {drawing.pdfUrl && (
                            <Button asChild className="flex-1 bg-[#8B7355] hover:bg-[#D4A574] text-white rounded-full">
                                <a href={drawing.pdfUrl} download>
                                    <Download className="w-4 h-4 mr-2" />
                                    Скачать PDF
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="outline" className="flex-1 border-[#8B7355]/30 text-[#8B7355] hover:bg-[#8B7355]/5 rounded-full">
                            <a href={drawing.imageUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Открыть в полном размере
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function Portfolio() {
    const drawings: Drawing[] = [
        {
            id: 1,
            imageUrl: "/site-plans/plan-1.jpg",
            title: "Генеральный план усадьбы",
            description: "Комплексный план благоустройства с ландшафтным дизайном и зонированием",
            year: "2024",
            category: "Генплан",
            area: "2500 м²",
        },
        {
            id: 2,
            imageUrl: "/site-plans/plan-2.jpg",
            title: "Ситуационный план участка",
            description: "Детальная планировка территории с учетом рельефа и окружения",
            year: "2024",
            category: "Ситуплан",
            area: "1800 м²",
        },
        {
            id: 3,
            imageUrl: "/site-plans/plan-3.jpg",
            title: "Архитектурный план",
            description: "Профессиональный чертеж с полной технической документацией",
            year: "2023",
            category: "Архитектура",
            area: "3200 м²",
        },
    ];

    return (
        <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden blueprint-pattern">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent mx-auto mb-6" />
                    <h2 className="text-4xl lg:text-5xl font-light text-[#8B7355] mb-6 tracking-tight">
                        Портфолио работ
                    </h2>
                    <p className="text-lg text-[#8B7355]/60 font-light leading-relaxed">
                        Каждый проект создается с любовью и вниманием к деталям
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {drawings.map((drawing) => (
                        <DrawingCard key={drawing.id} drawing={drawing} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Button
                        asChild
                        size="lg"
                        className="px-10 py-6 bg-[#8B7355] hover:bg-[#D4A574] text-[#F5F0E8] rounded-full font-light tracking-wide transition-all duration-500 shadow-xl shadow-[#8B7355]/20 hover:shadow-2xl hover:shadow-[#D4A574]/30"
                    >
                        <a href="#contact">Заказать подобный проект</a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
